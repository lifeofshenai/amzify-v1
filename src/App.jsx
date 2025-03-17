import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";
import Home from "./pages/Home";
import Auth from "./pages/AuthLayout";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Users from "./pages/Users";
import SalesChannels from "./pages/SalesChannels";
import Content from "./pages/Content";
import Accounting from "./pages/Accounting";
import Payroll from "./pages/Payroll";
import Payment from "./pages/Payment";
import Advertising from "./pages/Advertising";
import Onboarding from "./pages/Onboarding";

const App = () => {
  const { user, token } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        {/* Onboarding route */}
        <Route path="/onboarding/*" element={<Onboarding />} />

        <Route path={`/`} element={<Auth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Protected routes - only accessible after onboarding */}

        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="sales-channels" element={<SalesChannels />} />
          <Route path="advertising" element={<Advertising />} />
          <Route path="content" element={<Content />} />
          <Route path="support" element={<div>Support Page</div>} />
          <Route path="accounting" element={<Accounting />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="payout" element={<Payment />} />
        </Route>
        <Route path="/" element={<AdminLayout />}>
          <Route path="vendors" element={<Users />} />
        </Route>
        <Route path="*" element={<Onboarding />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
