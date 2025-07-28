import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Calendar, Mail, KeyRound } from 'lucide-react';
import googleIcon from '../assets/google.png';

const SignUp = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    otp: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOTPRequest = () => {
    if (formData.email && formData.name && formData.dob) {
      console.log('Sending OTP to', formData.email);
      setStep(2);
    }
  };

  const handleSignUp = () => {
    if (formData.otp.length === 6) {
      console.log('Verifying OTP:', formData.otp);
      login({ name: formData.name, email: formData.email });
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#f7f8fc] to-[#e6ecf5] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">HD</div>
          <h1 className="ml-2 text-2xl font-bold text-gray-800">HD</h1>
        </div>

        <h2 className="text-3xl font-semibold text-center mb-2">Sign up</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Sign up to enjoy the features of HD</p>

        {/* Input Field */}
        <div className="mb-4 relative">
          <User className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            disabled={step === 2}
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-100"
          />
        </div>

        <div className="mb-4 relative">
          <Calendar className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            disabled={step === 2}
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-100"
          />
        </div>

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

        <button
          onClick={step === 1 ? handleOTPRequest : handleSignUp}
          className={`w-full text-white py-2 rounded-lg transition-all font-medium cursor-pointer ${
            step === 1
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 '
              : 'bg-gradient-to-r from-green-500 to-emerald-500 '
          }`}
        >
          {step === 1 ? 'Get OTP' : 'Sign Up'}
        </button>

        <div className="my-4 flex items-center justify-center text-gray-400 text-sm">
          <span className="border-t border-gray-300 w-1/5"></span>
          <span className="mx-3">or</span>
          <span className="border-t border-gray-300 w-1/5"></span>
        </div>

        <button className="w-full flex items-center justify-center border py-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
          <img src={googleIcon} alt="google" className="h-5 mr-2" />
          Continue with Google
        </button>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <span
            className="text-indigo-600 hover:underline cursor-pointer"
            onClick={() => navigate('/signin')}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
