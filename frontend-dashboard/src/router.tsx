import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UserPage from './pages/UserPage';
import PendaftaranPage from './pages/PendaftaranPage';
import RekapProvinsiPage from './pages/RekapProvinsiPage';
import ProtectedRoute from './components/ProtectedRoute';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pendaftaran"
          element={
            <ProtectedRoute>
              <PendaftaranPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rekap-provinsi"
          element={
            <ProtectedRoute>
              <RekapProvinsiPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
