import { toast } from 'react-toastify';

const icons = {
  success: { bg: '#E1F5EE', color: '#0F6E56', border: '#1D9E75', icon: '✔' },
  error: { bg: '#FCEBEB', color: '#A32D2D', border: '#E24B4A', icon: '✖' },
  warning: { bg: '#FAEEDA', color: '#854F0B', border: '#EF9F27', icon: '⚠' },
  info: { bg: '#E6F1FB', color: '#185FA5', border: '#378ADD', icon: 'i' },
};

function BloodToast({ title, message, type }) {
  const t = icons[type];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          flexShrink: 0,
          background: t.bg,
          color: t.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        {t.icon}
      </div>
      <div>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#111' }}>
          {title}
        </p>
        <p style={{ margin: '2px 0 0', fontSize: 12, color: '#555' }}>
          {message}
        </p>
      </div>
    </div>
  );
}

function fire(type, title, message) {
  const t = icons[type];
  toast(<BloodToast title={title} message={message} type={type} />, {
    style: {
      borderLeft: `3px solid ${t.border}`,
      borderRadius: 8,
      padding: '12px 16px',
    },
    progressStyle: { background: t.border },
  });
}

export const showToast = {
  success: (title, message) => fire('success', title, message),
  error: (title, message) => fire('error', title, message),
  warning: (title, message) => fire('warning', title, message),
  info: (title, message) => fire('info', title, message),
};
