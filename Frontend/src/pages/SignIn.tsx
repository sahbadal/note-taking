import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, KeyRound,StickyNote } from 'lucide-react';
import googleIcon from '../assets/google.png';
import registerImage from '../assets/registerpage_image.jpg'

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', otp: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (formData.email && formData.otp.length === 6) {
      console.log('Logging in with', formData);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f7f8fc] to-[#e6ecf5] flex items-center justify-center px-4 py-8">
      <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Left: Form Section */}
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
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* OTP */}
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

          {/* Remember + Resend */}
          <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 accent-indigo-500 cursor-pointer" />
              Keep me logged in
            </label>
            <button className="text-blue-600 hover:underline cursor-pointer">Resend OTP</button>
          </div>

          {/* Sign In Button */}
          <button
            onClick={handleLogin}
            className="w-full text-white py-2 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all cursor-pointer"
          >
            Sign In
          </button>

          <div className="my-4 flex items-center justify-center text-gray-400 text-sm">
            <span className="border-t border-gray-300 w-1/5"></span>
            <span className="mx-3">or</span>
            <span className="border-t border-gray-300 w-1/5"></span>
          </div>

          {/* Google Sign-In */}
          <button className="w-full flex items-center justify-center border py-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <img src={googleIcon} alt="google" className="h-5 mr-2" />
            Continue with Google
          </button>

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

        {/* Right: Image Section */}
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
