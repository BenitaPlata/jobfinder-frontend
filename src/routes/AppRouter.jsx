import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Jobs from '../pages/Jobs';
import JobDetail from '../pages/JobDetail';
import Profile from '../pages/Profile';
import MyApplications from '../pages/MyApplications';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Navbar from '../components/common/Navbar';
import About from '../pages/About';
import AnalyzeCV from '../pages/AnalyzeCV';
import AdminRoute from '../components/common/AdminRoute';

function AppRouter() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <JobDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/analyze-cv" element={<AnalyzeCV />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <div style={{ padding: '2rem' }}>
                <h1>Admin Panel</h1>
                <p>Ruta protegida solo para administradores</p>
              </div>
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default AppRouter;
