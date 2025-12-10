import React from 'react';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import LandingPage from './pages/LandingPage';
import SellerRegister from './pages/SellerRegister';
import SellerLogin from './pages/SellerLogin';
import SellerDashboard from './pages/SellerDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/common/ProtectedRoute';
import EmailVerification from './pages/EmailVerification';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<LandingPage />} />
      <Route path="verify-email" element={<EmailVerification />} />

      {/* Seller Routes */}
      <Route path="seller/register" element={<SellerRegister />} />
      <Route path="seller/login" element={<SellerLogin />} />
      <Route
        path="seller/dashboard"
        element={
          <ProtectedRoute allowedRoles={['ROLE_SELLER']}>
            <SellerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route path="admin/login" element={<AdminLogin />} />
      <Route
        path="admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
