import { useEffect, useState } from 'react';
import axios from 'axios';
import ExportExcelButton from '../components/ExportExcelButton';

interface RekapData {
  wilayah: string;
  total: number;
}

const RekapProvinsiPage = () => {
  const [data, setData] = useState<RekapData[]>([]);

  useEffect(() => {
    axios.get('http://backend:3000/api/rekap/provinsi')
      .then(res => setData(res.data))
      .catch(err => console.error('Gagal ambil data rekap:', err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">📊 Rekap Anggota per Provinsi</h2>

      <table className="table-auto w-full border mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">No</th>
            <th className="border px-2 py-1">Wilayah</th>
            <th className="border px-2 py-1">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td className="border px-2 py-1">{i + 1}</td>
              <td className="border px-2 py-1">{item.wilayah}</td>
              <td className="border px-2 py-1">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Export Excel */}
      <ExportExcelButton
        data={data.map((item, i) => ({
          No: i + 1,
          Wilayah: item.wilayah,
          Total: item.total,
        }))}
        fileName="rekap-provinsi.xlsx"
        sheetName="Provinsi"
      />
    </div>
  );
};

export default RekapProvinsiPage;
