/** @format */

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
import { API_BASE_URL } from "../config";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      if (response.ok) {
        window.dispatchEvent(new Event("authUpdated"));
        navigate("/products");
      } else {
        const data = await response.json();
        console.log("Login failed response:", data); // Debug log
        alert(`Login failed: ${JSON.stringify(data)}`); // Show full JSON
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-orange-50 px-4'>
      {/* Decorative Background Elements */}
      <div className='fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
        <div className='absolute top-[-10%] right-[-5%] w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob'></div>
        <div className='absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000'></div>
      </div>

      <div className='w-full max-w-md bg-white rounded-3xl shadow-xl shadow-orange-500/10 p-8 md:p-10 relative z-10'>
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-12 h-12 bg-orange-500 rounded-xl rotate-3 mb-6 shadow-lg shadow-orange-500/30'>
            <span className='text-white font-bold text-2xl'>O</span>
          </div>
          <h2 className='text-3xl font-bold text-gray-900 mb-2'>
            Welcome Back
          </h2>
          <p className='text-gray-500'>
            Enter your details to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-1'>
            <label className='text-sm font-medium text-gray-700 ml-1'>
              Username
            </label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none'
              placeholder='Username'
              required
            />
          </div>

          <div className='space-y-1'>
            <div className='flex justify-between ml-1'>
              <label className='text-sm font-medium text-gray-700'>
                Password
              </label>
              <a
                href='#'
                className='text-sm text-orange-500 hover:text-orange-600 font-medium'>
                Forgot?
              </a>
            </div>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none'
              placeholder=''
              required
            />
          </div>

          <Button
            type='submit'
            className='w-full py-3.5 text-lg shadow-orange-500/25'
            disabled={isLoading}>
            {isLoading ? (
              <span className='flex items-center gap-2'>
                <svg
                  className='animate-spin h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'>
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>

          <div className='relative my-8'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-100'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-white text-gray-400'>
                Or continue with
              </span>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <button
              type='button'
              className='flex items-center justify-center py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer'>
              <span className='font-medium text-gray-600'>Google</span>
            </button>
            <button
              type='button'
              className='flex items-center justify-center py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer'>
              <span className='font-medium text-gray-600'>Apple</span>
            </button>
          </div>
        </form>

        <p className='mt-8 text-center text-sm text-gray-500'>
          Don't have an account?{" "}
          <Link
            to='/register'
            className='font-semibold text-orange-500 hover:text-orange-600'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
