import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/constants";
import { FiCpu, FiCheck, FiX, FiZap, FiActivity } from "react-icons/fi";

const PremiumBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#F8FAFC]">
    {/* 1. Deep Purple Orb */}
    <div className="absolute top-[-20%] left-[-10%] w-[900px] h-[900px] bg-[#4F46E5] opacity-[0.15] rounded-full blur-[120px]"></div>
    {/* 2. Sharp Geometry */}
    <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] border border-indigo-200/60 rounded-full opacity-50"></div>
    <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl"></div>
    {/* 3. Precision Grid */}
    <div className="absolute inset-0 opacity-[0.6]" 
         style={{ 
           backgroundImage: 'radial-gradient(#94a3b8 1.5px, transparent 1.5px)', 
           backgroundSize: '32px 32px' 
         }}>
    </div>
  </div>
);

const SmartMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSmartMatches = async () => {
    try {
      const res = await axios.get(BASE_URL + "/api/smart-matches", {
        withCredentials: true,
      });
      setMatches(res.data.matches || []);
    } catch (err) {
      console.error("Error fetching smart matches:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInterest = async (targetId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/interested/${targetId}`,
        {},
        { withCredentials: true }
      );
      toast.success("Interest sent! ");
      setMatches((prev) => prev.filter((m) => m.user._id !== targetId));
    } catch {
      toast.error("Failed to send interest.");
    }
  };

  const handleIgnore = async (targetId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/ignored/${targetId}`,
        {},
        { withCredentials: true }
      );
      toast("Ignored successfully");
      setMatches((prev) => prev.filter((m) => m.user._id !== targetId));
    } catch {
      toast.error("Failed to ignore.");
    }
  };

  useEffect(() => {
    fetchSmartMatches();
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Layer 1: Background (z-0) */}
      <PremiumBackground />

      {/* Layer 2: Content (z-10) - Sits ON TOP of background */}
      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-10 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight mb-3">
            Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-purple-600">Matches</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-xl mx-auto text-lg">
              Algorithmic compatibility based on your unique tech stack.
          </p>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
              <FiCpu className="text-4xl text-[#4F46E5] animate-spin mb-4" />
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest animate-pulse">Computing Compatibility...</p>
          </div>
        ) : matches.length === 0 ? (
          <div className="max-w-md mx-auto bg-white/60 backdrop-blur-md rounded-[2rem] border border-white/60 shadow-xl shadow-indigo-500/5 p-12 text-center">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 mx-auto">
               <FiZap className="text-3xl text-[#4F46E5]" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">No suggestions yet</h2>
            <p className="text-slate-500 font-medium">Add more skills to your profile to help our AI find better matches.</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 animate-fade-in-up">
            {matches.map(({ user, similarity }, idx) => (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-md p-6 rounded-[1.5rem] shadow-lg shadow-indigo-500/5 border border-white/60 hover:shadow-indigo-500/15 hover:border-indigo-100 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={user.photoURL || "https://geographyandyou.com/images/user-profile.png"}
                          alt="profile"
                          className="w-16 h-16 rounded-2xl object-cover border border-white shadow-md"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                           <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-slate-900 leading-tight">
                          {user.firstName} {user.lastName}
                        </h2>
                        
                        {/* MATCH SCORE */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                              style={{ width: `${similarity * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-black text-[#4F46E5]">
                            {(similarity * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-[#4F46E5] shadow-inner">
                        <FiActivity />
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 font-medium leading-relaxed line-clamp-2 mb-5">
                    {user.about || "This developer is a match based on their technical proficiency."}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {user.skills?.slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                    {user.skills?.length > 4 && (
                      <span className="text-[10px] font-bold text-slate-400 p-1">+{user.skills.length - 4}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-auto">
                  <button
                    onClick={() => handleIgnore(user._id)}
                    className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-widest hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all flex items-center justify-center gap-2"
                  >
                    <FiX className="text-lg" /> Pass
                  </button>
                  <button
                    onClick={() => handleInterest(user._id)}
                    className="flex-1 py-3 rounded-xl bg-[#4F46E5] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#3730A3] shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <FiCheck className="text-lg" /> Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartMatches;