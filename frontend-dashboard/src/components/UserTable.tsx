import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


interface User {
    id: number;
    username: string;
    role: string;
    wilayah: string;
}

const UserTable = () => {
    const [ users, setUsers ] = useState<User[]>([]);
    const [ role, setRole ] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) return;

        const decode: any = jwtDecode(token);
        setRole(decode.role);

        axios.get('http://backend:3000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
        }).then((res) => setUsers(res.data)).catch((err) => console.error('Gagal Mengambil User', err));
    }, []);

    const handleDelete = async (id: number) => {
        const token = localStorage.getItem('token');
    if (!token) return;

    if (!confirm('Yakin ingin hapus user ini?')) return;

    try {
        await axios.delete(`http://backend:3000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
        console.error('Gagal hapus user:', err);
        alert('Gagal hapus user');
    }
    };

    if (role !== 'PUSAT') return null;

    return (
        <div>
          <h3>👥 Daftar Admin</h3>
          <table border={1} cellPadding={8}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Role</th>
                <th>Wilayah</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.role}</td>
                  <td>{u.wilayah}</td>
                  <td>
                    {/* Untuk edit, kamu bisa tambahkan setForm atau buka modal */}
                    {/* Edit nanti bisa kita buat step selanjutnya */}
                    <button onClick={() => handleDelete(u.id)}>🗑️ Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

 export default UserTable;