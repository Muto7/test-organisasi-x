import { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

interface Pendaftaran {
  id: number;
  nik: string;
  nama: string;
  noHp: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  kelurahan: string;
  createdAt: string;
}

interface DecodedToken {
  role: string;
  wilayah: string;
}

const DashboardTable = () => {
  const [data, setData] = useState<Pendaftaran[]>([]);
  const [role, setRole] = useState('');
  const [wilayah, setWilayah] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Anda belum login');
      return;
    }

    const decoded = jwtDecode<DecodedToken>(token);
    setRole(decoded.role);
    setWilayah(decoded.wilayah);

    axios
      .get('http://backend:3000/api/pendaftaran', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.error('Gagal ambil data:', err));
  }, []);

  return (
    <div>
      <p><strong>Role:</strong> {role}</p>
      <p><strong>Wilayah Akses:</strong> {wilayah}</p>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>NIK</th>
            <th>No HP</th>
            <th>Provinsi</th>
            <th>Kabupaten</th>
            <th>Kecamatan</th>
            <th>Kelurahan</th>
            <th>Tanggal Daftar</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={9}>Data tidak tersedia</td>
            </tr>
          )}
          {data.map((d, i) => (
            <tr key={d.id}>
              <td>{i + 1}</td>
              <td>{d.nama}</td>
              <td>{d.nik}</td>
              <td>{d.noHp}</td>
              <td>{d.provinsi}</td>
              <td>{d.kabupaten}</td>
              <td>{d.kecamatan}</td>
              <td>{d.kelurahan}</td>
              <td>{new Date(d.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
