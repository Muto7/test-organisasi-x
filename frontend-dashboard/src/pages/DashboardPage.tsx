import Dashboard from '../components/Dashboard';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import RekapProvinsiSection from '../components/RekapProvinsiSection';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      setRole(decoded.role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleGoToUsers = () => {
    navigate('/users');
  };

  const handleGoToPendaftaran = () => {
    navigate('/pendaftaran');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>📋 Dashboard</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {/* ✅ Hanya tampil jika role === 'PUSAT' */}
          {role === 'PUSAT' && (
            <button onClick={handleGoToUsers} style={{ padding: '8px 16px' }}>
              ➕ Tambah User
            </button>
          )}

          {/* Semua role bisa tambah pendaftar */}
          <button onClick={handleGoToPendaftaran} style={{ padding: '8px 16px' }}>
            📝 Tambah Pendaftar
          </button>

          <button onClick={handleLogout} style={{ padding: '8px 16px' }}>
            🔓 Logout
          </button>
          <RekapProvinsiSection />
        </div>
      </div>

      <hr />
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
