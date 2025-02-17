import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Onboarding route */}
        <Route path="/onboarding/*" element={<Onboarding />} />

        {/* Protected routes - only accessible after onboarding */}
        {token ? (
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
        ) : (
          <Route path="/*" element={<Navigate to="/onboarding" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
