// hooks/useGeoData.js
import { useState, useEffect } from "react";

export function useGeoData() {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGeoData() {
      try {
        const [districtsRes, upazilasRes] = await Promise.all([
          fetch("/geoInfo/districts.json"),
          fetch("/geoInfo/upazilas.json"),
        ]);

        const districtsData = await districtsRes.json();
        const upazilasData = await upazilasRes.json();

        const districtList = districtsData[2]?.data || [];
        const upazilaList = upazilasData[2]?.data || [];

        setDistricts(districtList);
        setUpazilas(upazilaList);
      } catch (error) {
        console.error("Error loading geo data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGeoData();
  }, []);

  const getUpazilasByDistrict = (districtId) => {
    if (!districtId) return [];
    return upazilas.filter((upazila) => upazila.district_id === districtId);
  };

  return { districts, upazilas, getUpazilasByDistrict, loading };
}
