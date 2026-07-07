"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OtpModal({ isOpen, onClose }: OtpModalProps) {
  const [step, setStep] = useState<'contact' | 'verify'>('contact');
  const [contact, setContact] = useState('');
  const [method, setMethod] = useState<'sms' | 'email'>('sms');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  if (!isOpen) return null;

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (timeLeft > 0) return; // Prevent spamming
    
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch("https://farah-origin.vercel.app/api/auth/send-otp", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact, method }),
      });
      
      if (res.ok) {
        const data = await res.json();
        setStep('verify');
        setTimeLeft(30); // 30 second cooldown!
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch("https://farah-origin.vercel.app/api/auth/verify-otp", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact, otp }),
      });
      
      if (res.ok) {
        alert('Login Successful!');
        onClose();
      } else {
        const data = await res.json();
        setError(data.error || 'Invalid OTP');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <X className="w-5 h-5" />
        </button>

        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-white">
          {step === 'contact' ? 'Sign In / Register' : 'Verify OTP'}
        </h2>

        {error && <div className="mb-4 text-sm text-red-500 text-center">{error}</div>}

        {step === 'contact' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <input type="radio" checked={method === 'sms'} onChange={() => setMethod('sms')} className="accent-pink-600" />
                SMS
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <input type="radio" checked={method === 'email'} onChange={() => setMethod('email')} className="accent-pink-600" />
                Email
              </label>
            </div>
            
            <input
              type={method === 'email' ? 'email' : 'tel'}
              placeholder={method === 'email' ? 'Enter email address' : 'Enter phone number'}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            
            <button
              type="submit"
              disabled={loading || timeLeft > 0}
              className="w-full px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Sending...' : (timeLeft > 0 ? `Wait ${timeLeft}s` : 'Send OTP')}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              Enter the verification code sent to <br /><span className="font-semibold text-gray-900 dark:text-white">{contact}</span>
            </p>
            <input
              type="text"
              placeholder="000000"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 text-center tracking-widest text-2xl border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => setStep('contact')}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                Change Contact Details
              </button>
              
              <button
                type="button"
                disabled={timeLeft > 0 || loading}
                onClick={() => handleSendOtp()}
                className="text-sm font-medium text-pink-600 dark:text-pink-400 hover:underline disabled:opacity-50 disabled:no-underline"
              >
                {timeLeft > 0 ? `Resend OTP in ${timeLeft}s` : 'Resend OTP'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
