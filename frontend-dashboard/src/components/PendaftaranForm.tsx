import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PendaftaranForm = () => {
  const [form, setForm] = useState({
    nik: '',
    nama: '',
    noHp: '',
    provinsi: '',
    kabupaten: '',
    kecamatan: '',
    kelurahan: ''
  });

  const navigate = useNavigate(); // ⬅️ Pindahkan ke sini

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://backend:3000/api/pendaftaran', form);
      alert('Pendaftaran berhasil!');
      console.log(res.data);
      navigate('/dashboard'); // ⬅️ Arahkan ke dashboard atau halaman lain jika perlu
    } catch (error) {
      console.error(error);
      alert('Pendaftaran gagal.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>📝 Form Pendaftaran</h2>

        {['nik', 'nama', 'noHp', 'provinsi', 'kabupaten', 'kecamatan', 'kelurahan'].map((field) => (
          <div key={field}>
            <label>{field.toUpperCase()}:</label><br />
            <input
              type="text"
              name={field}
              value={(form as any)[field]}
              onChange={handleChange}
              required
            /><br /><br />
          </div>
        ))}

        <button type="submit">Daftar</button>
      </form>

      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 mt-4"
      >
        ← Kembali
      </button>
    </>
  );
};

export default PendaftaranForm;
