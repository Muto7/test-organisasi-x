import { useEffect, useState } from 'react';
import axios from 'axios';
import ExportExcelButton from './ExportExcelButton';

interface RekapData {
  nama: string;
  nik: string;
  noHp: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  kelurahan: string;
  createdAt: string;
}

const RekapProvinsiSection = () => {
  const [data, setData] = useState<RekapData[]>([]);

  useEffect(() => {
    axios.get('http://backend:3000/api/pendaftar/provinsi')
      .then(res => setData(res.data))
      .catch(err => console.error('Gagal ambil data:', err));
  }, []);

  return (
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-2">📊 Rekap Anggota per Provinsi</h3>

      <ExportExcelButton
        data={data.map((item, i) => ({
          No: i + 1,
          Nama: item.nama,
          NIK: item.nik,
          'No HP': item.noHp,
          Provinsi: item.provinsi,
          Kabupaten: item.kabupaten,
          Kecamatan: item.kecamatan,
          Kelurahan: item.kelurahan,
          'Tanggal Daftar': new Date(item.createdAt).toLocaleDateString(),
        }))}
        fileName="data-pendaftar.xlsx"
        sheetName="Pendaftar"
      />
    </div>
  );
};

export default RekapProvinsiSection;
