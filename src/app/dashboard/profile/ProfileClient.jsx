'use client';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { uploadImageToImgBB } from '@/lib/imageUpload';
import { useGeoData } from '@/hooks/useGeoData';
import { FaSpinner, FaCamera } from 'react-icons/fa';
import Image from 'next/image';
import { getUserById } from '@/lib/api/users';
import { updateUserById } from '@/lib/action/users';
import { showToast } from '@/utils/toast';

export default function ProfileClient({ initialUser }) {
  const { user, refreshSession } = useContext(AuthContext);
  const {
    districts,
    getUpazilasByDistrict,
    loading: geoLoading,
  } = useGeoData();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [originalData, setOriginalData] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: '',
    district: '',
    districtName: '',
    upazila: '',
    upazilaName: '',
    image: '',
    role: '',
    status: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        if (!user?.id) return;
        const data = await getUserById(user.id);
        const loaded = {
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          bloodGroup: data.bloodGroup || '',
          district: data.district || '',
          districtName: data.districtName || '',
          upazila: data.upazila || '',
          upazilaName: data.upazilaName || '',
          image: data.image || '',
          role: data.role || 'donor',
          status: data.status || 'active',
        };
        setFormData(loaded);
        setOriginalData(loaded);
      } catch {
        showToast.error('Failed to load', 'Could not load profile data.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
  };

  const handleDistrictChange = e => {
    const id = e.target.value;
    const found = districts.find(d => d.id === id);
    setFormData(p => ({
      ...p,
      district: id,
      districtName: found?.name || '',
      upazila: '',
      upazilaName: '',
    }));
  };

  const handleUpazilaChange = e => {
    const id = e.target.value;
    const list = getUpazilasByDistrict(formData.district);
    const found = list.find(u => u.id === id);
    setFormData(p => ({ ...p, upazila: id, upazilaName: found?.name || '' }));
  };

  const handleImageUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast.error('File too large', 'Image must be under 5MB.');
      return;
    }
    try {
      setIsUploading(true);
      const result = await uploadImageToImgBB(file);
      if (result) {
        setFormData(p => ({ ...p, image: result.url }));
        showToast.success('Avatar updated', 'Your photo has been uploaded.');
      }
    } catch {
      showToast.error('Upload failed', 'Could not upload avatar.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const payload = {
        name: formData.name,
        phone: formData.phone,
        bloodGroup: formData.bloodGroup,
        district: formData.district,
        districtName: formData.districtName,
        upazila: formData.upazila,
        upazilaName: formData.upazilaName,
        image: formData.image,
      };
      const res = await updateUserById(user.id, payload);
      showToast.success(
        'Profile saved',
        res.message || 'Your changes have been saved.',
      );
      if (refreshSession) await refreshSession();
      setOriginalData({ ...formData });
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      showToast.error('Save failed', err.message || 'Could not save profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin text-red-600 text-3xl" />
      </div>
    );

  const currentUpazilas = getUpazilasByDistrict(formData.district);

  const roleConfig = {
    admin: {
      label: 'Admin',
      cls: 'bg-purple-50 text-purple-700 border-purple-200',
      dot: 'bg-purple-500',
    },
    volunteer: {
      label: 'Volunteer',
      cls: 'bg-blue-50 text-blue-700 border-blue-200',
      dot: 'bg-blue-500',
    },
    donor: {
      label: 'Donor',
      cls: 'bg-red-50 text-red-700 border-red-200',
      dot: 'bg-red-500',
    },
  };
  const statusConfig = {
    active: {
      label: 'Active',
      cls: 'bg-green-50 text-green-700 border-green-200',
      dot: 'bg-green-500',
    },
    blocked: {
      label: 'Blocked',
      cls: 'bg-red-50 text-red-700 border-red-200',
      dot: 'bg-red-400',
    },
  };
  const role = roleConfig[formData.role?.toLowerCase()] || roleConfig.donor;
  const status =
    statusConfig[formData.status?.toLowerCase()] || statusConfig.active;

  const inputCls = (editable = true) =>
    `w-full px-3 py-2.5 text-sm rounded-lg border outline-none transition-all ${
      isEditing && editable
        ? 'bg-white border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
        : 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed'
    }`;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* ── Hero Banner ── */}
      <div className="relative bg-gradient-to-r from-red-600 to-red-800 px-7 pt-7 pb-16">
        <p className="text-xs font-semibold tracking-widest text-red-200 mb-1">
          MEMBER SINCE
        </p>
        <p className="text-white font-semibold text-sm">
          January 2026 · BloodSync Community
        </p>
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-white rounded-t-2xl" />
      </div>

      {/* ── Avatar + Actions ── */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 px-7 mt-[-36px] relative z-10 mb-5">
        {/* Avatar */}
        <div className="relative w-20 h-20 rounded-full border-[3px] border-white shadow-md bg-red-100 flex items-center justify-center text-red-600 text-2xl font-bold overflow-hidden flex-shrink-0">
          {formData.image ? (
            <Image
              src={formData.image}
              alt="avatar"
              fill
              className="object-cover"
              sizes="80px"
            />
          ) : (
            <span>{formData.name?.charAt(0)?.toUpperCase() || 'U'}</span>
          )}
          {isEditing && (
            <label
              htmlFor="avatar-upload"
              className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
            >
              {isUploading ? (
                <FaSpinner className="text-white animate-spin text-sm" />
              ) : (
                <FaCamera className="text-white text-sm" />
              )}
            </label>
          )}
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={isUploading}
          />
        </div>

        {/* Name + badges */}
        <div className="flex-1 pb-1">
          <h3 className="text-lg font-bold text-gray-900">{formData.name}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{formData.email}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {[role, status].map((b, i) => (
              <span
                key={i}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${b.cls}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${b.dot}`} />
                {b.label}
              </span>
            ))}
          </div>
        </div>

        {/* Edit / Save buttons */}
        <div className="pb-1">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 border-2 border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"
                />
              </svg>
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving || isUploading}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 shadow-sm"
              >
                {isSaving ? <FaSpinner className="animate-spin" /> : null}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Quick Stats ── */}
      <div className="grid grid-cols-3 gap-3 mx-7 mb-6">
        {[
          { val: formData.bloodGroup || '—', lbl: 'Blood Group' },
          { val: formData.districtName || '—', lbl: 'District' },
          { val: formData.upazilaName || '—', lbl: 'Upazila' },
        ].map((s, i) => (
          <div
            key={i}
            className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center"
          >
            <p className="text-base font-bold text-gray-900 truncate">
              {s.val}
            </p>
            <p className="text-[11px] text-gray-400 font-medium mt-0.5">
              {s.lbl}
            </p>
          </div>
        ))}
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-gray-100 mx-7 mb-6" />

      {/* ── Section label ── */}
      <div className="px-7 mb-4 flex items-center gap-3">
        <span className="text-[11px] font-semibold tracking-widest text-gray-400">
          PERSONAL INFORMATION
        </span>
        <div className="flex-1 h-px bg-gray-100" />
        {isEditing && (
          <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
            ● Editing
          </span>
        )}
      </div>

      {/* ── Form Fields ── */}
      <div className="px-7 pb-7 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
            className={inputCls()}
          />
        </div>

        {/* Email — always disabled */}
        <div>
          <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Email{' '}
            <span className="normal-case font-normal text-gray-300">
              (non-editable)
            </span>
          </label>
          <input
            type="email"
            value={formData.email}
            disabled
            className={inputCls(false)}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditing}
            className={inputCls()}
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Blood Group
          </label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            disabled={!isEditing}
            className={inputCls()}
          >
            <option value="">Select</option>
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            District
          </label>
          <select
            value={formData.district}
            onChange={handleDistrictChange}
            disabled={!isEditing || geoLoading}
            className={inputCls()}
          >
            <option value="">
              {geoLoading ? 'Loading...' : 'Select District'}
            </option>
            {districts.map(d => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Upazila */}
        <div>
          <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Upazila
          </label>
          <select
            value={formData.upazila}
            onChange={handleUpazilaChange}
            disabled={!isEditing || !formData.district}
            className={inputCls()}
          >
            <option value="">
              {!formData.district ? 'Select district first' : 'Select Upazila'}
            </option>
            {currentUpazilas.map(u => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
