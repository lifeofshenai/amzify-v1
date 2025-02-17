import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Mail, Lock, Loader2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { ForgetPassword, ResetPassword } from "../redux/slices/auth";

export default function ResetPasswordComponent() {
  const dispatch = useDispatch();
  const { isLoading, forgetPasswordEmail } = useSelector((state) => state.auth);

  const [resetPasswordObject, setResetPasswordObject] = useState({
    code: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setResetPasswordObject({
      ...resetPasswordObject,
      [name]: value,
    });
  };

  const onResendCode = () => {
    dispatch(ForgetPassword({ email: forgetPasswordEmail })).then(
      ({ payload }) => {
        if (payload.success) {
          toast.success("OTP Sent to your email!");
        } else {
          toast.error(payload.error?.message);
        }
      }
    );
  };

  const handleSubmit = async () => {
    const { code, password, confirmPassword } = resetPasswordObject;
    if (!code) {
      toast.error("Code is Required!");
      return;
    }
    if (!forgetPasswordEmail) {
      toast.error("Email is Required!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (!/\d/.test(password)) {
      toast.error("Password must contain at least one number");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      return;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      toast.error(
        "Password must contain at least one special character (!@#$%^&*)"
      );
      return;
    }

    dispatch(
      ResetPassword({ code, email: forgetPasswordEmail, password })
    ).then(({ payload }) => {
      if (payload.success) {
        toast.success("Welcome back!");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          <h1 className="text-4xl font-bold font-logo text-primary-500">
            AMZIFY
          </h1>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Reset Password!
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We've sent a verification code to {forgetPasswordEmail}{" "}
          <Link
            to="/forgot-password"
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            (Not your email?)
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="space-y-6 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Verification Code
            </label>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="code"
                value={resetPasswordObject.code}
                onChange={handleInputChange}
                className="pl-10 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent px-4 py-2"
                placeholder="Enter 6-digit code"
                required
              />
            </div>
            <button
              type="button"
              onClick={onResendCode}
              className="mt-2 text-sm text-primary-600 hover:text-primary-700"
            >
              Resend code
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Create Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={resetPasswordObject.password}
                  onChange={handleInputChange}
                  className="pl-10 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent px-4 py-2"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={resetPasswordObject.confirmPassword}
                  onChange={handleInputChange}
                  className="pl-10 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent px-4 py-2"
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-medium">Password requirements:</p>
              <ul className="mt-1 list-disc list-inside">
                <li>At least 8 characters long</li>
                <li>Contains at least one number</li>
                <li>Contains at least one uppercase letter</li>
                <li>Contains at least one lowercase letter</li>
                <li>Contains at least one special character (!@#$%^&*)</li>
              </ul>
            </div>
          </div>

          <button
            disabled={isLoading}
            onClick={handleSubmit}
            className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
