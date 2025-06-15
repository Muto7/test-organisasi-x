import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: '',
    wilayah: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://backend:3000/api/users', form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Pengguna berhasil ditambahkan!');
      setForm({ username: '', password: '', role: '', wilayah: '' });
    } catch (err) {
      console.error(err);
      alert('Gagal menambahkan pengguna');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>➕ Tambah Pengguna Baru</h2>

      <label>Username:</label><br />
      <input type="text" name="username" value={form.username} onChange={handleChange} required /><br /><br />

      <label>Password:</label><br />
      <input type="password" name="password" value={form.password} onChange={handleChange} required /><br /><br />

      <label>Role:</label><br />
      <select name="role" value={form.role} onChange={handleChange} required>
        <option value="">-- Pilih Role --</option>
        <option value="PROVINSI">Admin Provinsi</option>
        <option value="KABUPATEN">Admin Kabupaten</option>
        <option value="KECAMATAN">Admin Kecamatan</option>
        <option value="KELURAHAN">Admin Kelurahan</option>
      </select><br /><br />

      <label>Wilayah:</label><br />
      <input type="text" name="wilayah" value={form.wilayah} onChange={handleChange} required /><br /><br />

      <button type="submit">Tambah User</button>
      <hr/>
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 mt-4"
      >
        ← Kembali
      </button>
    </form>
  );
};

export default UserForm;
