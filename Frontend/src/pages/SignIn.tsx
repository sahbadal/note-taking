import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Mail, KeyRound, StickyNote } from 'lucide-react';
import googleIcon from '../assets/google.png';
import registerImage from '../assets/registerpage_image.jpg';

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ email: '', otp: '' });
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_BACKEND_URL

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${url}/api/auth/login/send-otp`, {
        email: formData.email,
      });
      if (res.status === 200) {
        setStep(2);
      }
    } catch (err) {
      alert('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpAndLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${url}/api/auth/login/verify-otp`, {
        email: formData.email,
        otp: formData.otp,
      });

      const { token, user } = res.data;
      localStorage.setItem('token', token);
      login(user);
      navigate('/dashboard');
    } catch (err) {
      alert('Invalid OTP or Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${url}/api/auth/google`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f7f8fc] to-[#e6ecf5] flex items-center justify-center px-4 py-8">
      <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="flex items-center justify-center mb-6 gap-x-2">
            <div className="bg-yellow-400 p-2 rounded-full shadow-md">
              <StickyNote className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Note</h1>
          </div>

          <h2 className="text-2xl font-semibold text-center mb-2">Sign in</h2>
          <p className="text-sm text-gray-500 text-center mb-6">Access your account securely</p>

          {/* Email */}
          <div className="mb-4 relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              disabled={step === 2}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-100"
            />
          </div>

          {/* OTP */}
          {step === 2 && (
            <div className="mb-4 relative">
              <KeyRound className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          )}

          {/* Button */}
          <button
            onClick={step === 1 ? sendOtp : verifyOtpAndLogin}
            disabled={loading || !formData.email || (step === 2 && formData.otp.length !== 6)}
            className="w-full text-white py-2 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-purple-500  cursor-pointer"
          >
            {loading ? 'Please wait...' : step === 1 ? 'Get OTP' : 'Sign In'}
          </button>

          {/* OR */}
          <div className="my-4 flex items-center justify-center text-gray-400 text-sm">
            <span className="border-t border-gray-300 w-1/5"></span>
            <span className="mx-3">or</span>
            <span className="border-t border-gray-300 w-1/5"></span>
          </div>

          {/* Google Sign-In */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center border py-2 rounded-lg hover:bg-gray-50 transition cursor-pointer"
          >
            <img src={googleIcon} alt="google" className="h-5 mr-2" />
            Continue with Google
          </button>

          {/* Redirect */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Don&apos;t have an account?{' '}
            <span
              className="text-indigo-600 hover:underline cursor-pointer"
              onClick={() => navigate('/')}
            >
              Sign Up
            </span>
          </p>
        </div>

        {/* Right Image */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-r from-indigo-100 to-purple-100">
          <img
            src={registerImage}
            alt="Sign In Illustration"
            className="w-full h-full object-cover rounded-r-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
