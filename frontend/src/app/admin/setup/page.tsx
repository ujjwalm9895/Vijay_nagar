'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/card';
import { Lock, CheckCircle, XCircle, Loader } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function AdminSetupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [checking, setChecking] = useState(true);
  const [adminExists, setAdminExists] = useState(false);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/status`);
      const data = await response.json();
      
      setAdminExists(data.adminExists);
      
      if (data.adminExists) {
        // Admin already exists, redirect to login
        setTimeout(() => {
          router.push('/admin');
        }, 2000);
      }
    } catch (err) {
      console.error('Failed to check admin status:', err);
    } finally {
      setChecking(false);
    }
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/admin/setup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/admin');
        }, 2000);
      } else {
        setError(data.error || 'Failed to create admin user');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Network error: ${errorMessage}. Please check your connection.`);
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
        <Card className="w-full max-w-md">
          <div className="p-8 text-center">
            <Loader className="h-8 w-8 mx-auto animate-spin text-zinc-600 dark:text-zinc-400 mb-4" />
            <p className="text-zinc-600 dark:text-zinc-400">Checking admin status...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (adminExists) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
        <Card className="w-full max-w-md">
          <div className="p-8 text-center space-y-4">
            <CheckCircle className="h-12 w-12 mx-auto text-green-600 dark:text-green-400" />
            <h1 className="text-2xl font-bold">Admin Already Exists</h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Redirecting to login page...
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
        <Card className="w-full max-w-md">
          <div className="p-8 text-center space-y-4">
            <CheckCircle className="h-12 w-12 mx-auto text-green-600 dark:text-green-400" />
            <h1 className="text-2xl font-bold">Admin Created Successfully!</h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Redirecting to login page...
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 p-4">
      <Card className="w-full max-w-md">
        <div className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <Lock className="h-12 w-12 mx-auto text-zinc-600 dark:text-zinc-400" />
            <h1 className="text-2xl font-bold">Admin Setup</h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Create the first admin user
            </p>
          </div>

          <form onSubmit={handleSetup} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded text-red-700 dark:text-red-300 text-sm">
                <div className="font-semibold">⚠️ Error:</div>
                <div>{error}</div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Minimum 8 characters"
                required
                minLength={8}
              />
              <p className="text-xs text-zinc-500 mt-1">Must be at least 8 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
                required
                minLength={8}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Creating Admin...
                </>
              ) : (
                'Create Admin User'
              )}
            </button>
          </form>

          <div className="text-center text-sm text-zinc-500">
            <p>This will create the first admin user.</p>
            <p className="mt-1">You can only run this setup once.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
