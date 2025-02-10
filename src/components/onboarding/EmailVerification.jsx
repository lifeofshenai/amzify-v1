import React, { useState } from 'react';
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { useVendorStore } from '../../stores/vendorStore';
// import { useOnboardingStore } from '../../stores/onboardingStore';
import toast from 'react-hot-toast';

export default function EmailVerification({ email }) {
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const { setOnboarded } = useVendorStore();
  // const { completeStep } = useOnboardingStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    if (!/\d/.test(password)) {
      toast.error('Password must contain at least one number');
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error('Password must contain at least one uppercase letter');
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error('Password must contain at least one lowercase letter');
      return;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      toast.error('Password must contain at least one special character (!@#$%^&*)');
      return;
    }

    setIsVerifying(true);
    try {
      // Mock verification process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (verificationCode !== '123456') { // Mock verification code
        throw new Error('Invalid verification code');
      }

      // completeStep('email-verification');
      setOnboarded(true);
      toast.success('Email verified successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to verify email');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    try {
      // Mock resend code process
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Verification code resent');
    } catch (error) {
      toast.error('Failed to resend verification code');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Verify Your Email</h2>
        <p className="mt-1 text-sm text-gray-500">
          We've sent a verification code to {email}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Verification Code
          </label>
          <div className="mt-1 relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="pl-10 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent px-4 py-2"
              placeholder="Enter 6-digit code"
              required
            />
          </div>
          <button
            type="button"
            onClick={handleResendCode}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
          type="submit"
          disabled={isVerifying}
          className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isVerifying ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Verifying...
            </>
          ) : (
            'Complete Setup'
          )}
        </button>
      </form>
    </div>
  );
}