/** @format */

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight } from "lucide-react";
import Button from "../components/Button";
import { API_BASE_URL } from "../config";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (response.ok) {
        navigate("/login");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden z-0'>
        <div className='absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-orange-200/30 blur-3xl'></div>
        <div className='absolute top-[40%] -right-[10%] w-[60%] h-[60%] rounded-full bg-orange-300/20 blur-3xl'></div>
      </div>

      <div className='max-w-md w-full space-y-8 relative z-10 bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-white/50'>
        <div className='text-center'>
          <div className='mx-auto h-16 w-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 transform rotate-3'>
            <UserPlus className='h-8 w-8 text-orange-600' />
          </div>
          <h2 className='text-3xl font-black text-gray-900 tracking-tight'>
            Create Account
          </h2>
          <p className='mt-2 text-sm text-gray-600'>
            Join the OrangeShop community today
          </p>
        </div>

        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='space-y-4'>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                <User className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type='text'
                required
                className='block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all'
                placeholder='Full Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                <Mail className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type='email'
                required
                className='block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all'
                placeholder='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                <Lock className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type='password'
                required
                className='block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button
            type='submit'
            className='w-full py-4 text-lg shadow-lg shadow-orange-500/20'>
            Sign Up <ArrowRight className='ml-2 h-5 w-5' />
          </Button>
        </form>

        <div className='text-center mt-6'>
          <p className='text-sm text-gray-600'>
            Already have an account?{" "}
            <Link
              to='/login'
              className='font-bold text-orange-600 hover:text-orange-500 transition-colors'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
