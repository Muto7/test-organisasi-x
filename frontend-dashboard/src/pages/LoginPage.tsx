import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://backend:3000/api/login', form,{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Respon login:', res.data);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (error) {
      alert('Login gagal');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>🔐 Login</h2>
      <label>Username:</label><br />
      <input name="username" onChange={handleChange} required /><br /><br />
      <label>Password:</label><br />
      <input name="password" type="password" onChange={handleChange} required /><br /><br />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
