
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { FiArrowRight, FiAlertCircle, FiLock, FiUser, FiMail } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);
  
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const isSignup = searchParams.get("mode") === "signup";

  useEffect(() => {
    if (user) {
      navigate("/feed", { replace: true });
    }
  }, [user, navigate]);

  const handleAuth = async () => {
    try {
      setError(null);
      
      let res;
      if (isSignup) {
        // SIGN UP
        res = await axios.post(
          BASE_URL + "/signup",
          { firstName, lastName, emailId: email, password },
          { withCredentials: true }
        );
      } else {
        // LOGIN
        res = await axios.post(
          BASE_URL + "/login",
          { emailId: email, password },
          { withCredentials: true }
        );
      }

      dispatch(addUser(res.data));
      navigate("/feed");
      
    } catch (err) {
      console.error(err);
      setError(err.response?.data || "Authentication failed. Please check your connection.");
    }
  };

  // --- PREMIUM BACKGROUND ---
  const PremiumBackground = () => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#F8FAFC]">
       {/* Deep Purple Orb */}
       <div className="absolute top-[-20%] left-[-10%] w-[900px] h-[900px] bg-[#4F46E5] opacity-[0.15] rounded-full blur-[120px]"></div>
       {/* Sharp Geometry */}
       <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] border border-indigo-200/60 rounded-full opacity-50"></div>
       <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl"></div>
       {/* Precision Grid */}
       <div className="absolute inset-0 opacity-[0.5]" style={{ backgroundImage: 'radial-gradient(#94a3b8 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}></div>
    </div>
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden pt-20 pb-20">
      
      <PremiumBackground />

      <div className="relative z-10 w-full max-w-md px-6">
        
        {/* GLASS CARD */}
        <div className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-indigo-500/10">
          
          {/* Header (Cleaned up) */}
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight mb-2">
              {isSignup ? "Join Protocol" : "Welcome Back"}
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              {isSignup ? "Create your developer identity" : "Enter your credentials to access the terminal"}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {isSignup && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 group">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">First Name</label>
                    <div className="relative">
                        <input 
                          type="text" 
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full bg-white/50 border border-slate-200 rounded-xl pl-4 pr-4 py-3.5 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 transition-all"
                          placeholder="John"
                        />
                    </div>
                </div>
                <div className="space-y-1 group">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Last Name</label>
                    <input 
                      type="text" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-white/50 border border-slate-200 rounded-xl pl-4 pr-4 py-3.5 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 transition-all"
                      placeholder="Doe"
                    />
                </div>
              </div>
            )}

            <div className="space-y-1 group">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4F46E5] transition-colors">
                        <FiMail />
                    </div>
                    <input 
                      type="text" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 transition-all"
                      placeholder="dev@skillsync.com"
                    />
                </div>
            </div>

            <div className="space-y-1 group">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Password</label>
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4F46E5] transition-colors">
                        <FiLock />
                    </div>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 transition-all"
                      placeholder="••••••••"
                    />
                </div>
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-rose-600 text-xs font-bold bg-rose-50 border border-rose-100 p-4 rounded-xl animate-pulse">
                <FiAlertCircle className="text-lg" /> {error}
              </div>
            )}

            <button 
              onClick={handleAuth}
              className="w-full bg-[#4F46E5] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#3730A3] hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group mt-4"
            >
              {isSignup ? "Initialize Account" : "Access Terminal"} 
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Footer Toggle */}
          <div className="mt-8 text-center pt-6 border-t border-slate-200/60">
            <p className="text-slate-500 text-xs font-medium">
              {isSignup ? "Already have an identity?" : "New to the protocol?"}
              <span 
                onClick={() => {
                   setError(null);
                   const newMode = isSignup ? "" : "?mode=signup";
                   navigate("/login" + newMode);
                }}
                className="ml-2 text-[#4F46E5] font-black cursor-pointer hover:underline uppercase tracking-wide"
              >
                {isSignup ? "Sign In" : "Create Account"}
              </span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;