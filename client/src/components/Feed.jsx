import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { FiLoader, FiSearch, FiRefreshCw } from "react-icons/fi";
import toast from "react-hot-toast"; // 

// Background Component
const PremiumBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50">
    <div className="absolute top-[-20%] left-[-10%] w-[900px] h-[900px] bg-[#4F46E5] opacity-[0.4] rounded-full blur-[120px]"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-purple-600 opacity-[0.3] rounded-full blur-[120px]"></div>
    <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] border border-indigo-200/60 rounded-full opacity-50"></div>
    <div className="absolute inset-0 opacity-[0.5]" style={{ backgroundImage: 'radial-gradient(#94a3b8 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}></div>
  </div>
);

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res?.data?.data || res?.data));
    } catch (err) {
      console.error("Feed Fetch Error:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const handleRequestSent = (status) => {
    if (status === "interested") {
       toast.success("Connection Request Sent!");
    } else if (status === "ignored") {
       toast("Profile Skipped");
    }
  };

  if (!feed) return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-50">
       <div className="flex flex-col items-center gap-4">
         <FiLoader className="text-4xl animate-spin text-[#4F46E5]" />
         <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Feed...</p>
       </div>
    </div>
  );

  if (feed.length <= 0) return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
       <PremiumBackground />
       <div className="relative z-10 w-full max-w-sm mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-10 shadow-2xl shadow-indigo-500/10 text-center">
              <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiSearch className="text-2xl text-[#4F46E5]" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">No new profiles</h2>
              <p className="text-slate-500 text-sm font-medium mb-8">Check back later for more connections.</p>
              <button onClick={() => window.location.reload()} className="w-full py-4 bg-[#4F46E5] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#3730A3] transition-all shadow-lg shadow-indigo-500/20 active:scale-95 flex items-center justify-center gap-2">
                  <FiRefreshCw /> Refresh
              </button>
          </div>
       </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center min-h-screen pt-28 pb-20 relative overflow-hidden">
      <PremiumBackground />
      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="text-center mb-8 animate-fade-in-down select-none">
           <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 tracking-tighter leading-tight">
             CONNECT. <br className="md:hidden"/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-purple-600">DISCOVER.</span> <br className="md:hidden"/>
             SYNC.
           </h1>
        </div>
        <div className="w-full max-w-[380px] drop-shadow-2xl animate-fade-in-up px-4 relative">
           <div className="absolute top-3 left-6 right-6 bottom-0 bg-white/40 rounded-[2.5rem] -z-10 scale-95 blur-[1px]"></div>
           
           {feed[0] && <UserCard user={feed[0]} onRequestSent={handleRequestSent} />}
        </div>
      </div>
      
    </div>
  );
};

export default Feed;