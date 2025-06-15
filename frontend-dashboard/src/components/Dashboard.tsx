import { useEffect, useState } from 'react';
import { getDashboardData } from '../api/dashboard';
import DashboardTable from './DashboardTable';

interface GrafikItem {
  waktu: string;
  total: number;
}

const Dashboard = () => {
  const [totalAll, setTotalAll] = useState(0);
  const [totalToday, setTotalToday] = useState(0);
  const [grafik, setGrafik] = useState<GrafikItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData();
        console.log('Data dashboard:', data); //
        setTotalAll(data.totalAll);
        setTotalToday(data.totalToday);
        setGrafik(data.grafik);
      } catch (err) {
        console.error('Gagal ambil data dashboard:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p><strong>Total Semua Pendaftar:</strong> {totalAll}</p>
      <p><strong>Total Hari Ini:</strong> {totalToday}</p>

      <h2>📈 Grafik Pendaftaran per 5 Menit (30 Menit Terakhir)</h2>
      <ul>
        {grafik.map((item, idx) => (
          <li key={idx}>
            {item.waktu} → {item.total} pendaftar
          </li>
        ))}
      </ul>

      <hr />

        <h2>📋 Daftar Anggota yang Mendaftar</h2>
        <DashboardTable />
    </div>
  );
};

export default Dashboard;
