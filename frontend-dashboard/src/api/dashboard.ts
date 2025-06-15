import axios from 'axios';

const API_BASE = 'http://backend:3000/api';

export const getDashboardData = async () => {
  const token = localStorage.getItem('token');
  return await axios
    .get(`${API_BASE}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};
