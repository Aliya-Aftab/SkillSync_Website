
import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { FiCheck, FiX, FiBell, FiUser } from "react-icons/fi";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const [acceptedIds, setAcceptedIds] = useState([]);
  const [toastMsg, setToastMsg] = useState("");

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      setToastMsg(`Request ${status} successfully!`);
      setAcceptedIds((prev) => [...prev, _id]);
      
      
      setTimeout(() => {
        dispatch(removeRequest(_id));
        setToastMsg("");
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, { 
        withCredentials: true,
      });
      // Safety check for data structure
      const data = res.data.connectionRequests || res.data.data || [];
      dispatch(addRequests(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // --- BACKGROUND ---
  const PremiumBackground = () => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#F8FAFC]">
       {/* 1. Deep Purple Orb */}
       <div className="absolute top-[-20%] left-[-10%] w-[900px] h-[900px] bg-[#4F46E5] opacity-[0.15] rounded-full blur-[120px]"></div>
       
       {/* 2. Sharp Geometry */}
       <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] border border-indigo-200/60 rounded-full opacity-50"></div>
       <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl"></div>

       {/* 3. Precision Grid */}
       <div className="absolute inset-0 opacity-[0.5]" 
            style={{ 
              backgroundImage: 'radial-gradient(#94a3b8 1.5px, transparent 1.5px)', 
              backgroundSize: '32px 32px' 
            }}>
       </div>
    </div>
  );

  if (!requests) return null;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* 1. Add Background Layer */}
      <PremiumBackground />

      {/* 2. Content sits on top (z-10) */}
      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight flex items-center gap-3">
              Incoming Requests
              <span className="px-3 py-1 bg-[#4F46E5]/10 text-[#4F46E5] text-sm font-bold rounded-full border border-[#4F46E5]/20">
                {requests.length}
              </span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Review developers who want to connect with you.
            </p>
          </div>
        </div>

        {/* Toast Notification */}
        {toastMsg && (
          <div className="fixed top-24 right-6 z-50 animate-fade-in-up">
            <div className="bg-slate-900 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-3">
              <FiCheck className="text-green-400" />
              <span className="font-medium">{toastMsg}</span>
            </div>
          </div>
        )}

        {/* Request List */}
        {requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/60 backdrop-blur-md rounded-[2rem] border border-white/60 shadow-xl shadow-indigo-500/5 text-center px-4">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
              <FiBell className="text-4xl text-[#4F46E5]" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">No pending requests</h2>
            <p className="text-slate-500 mt-2 max-w-sm font-medium">
              You're all caught up! Go to the feed to find more people.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => {
              const { _id, firstName, lastName, photoURL, age, gender, about } =
                request.fromUserId;

              const isFading = acceptedIds.includes(request._id);

              return (
                <div
                  key={request._id}
                  // Updated Card Style: Glassmorphism to show background
                  className={`flex flex-col md:flex-row items-center gap-6 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-lg shadow-indigo-500/5 hover:shadow-indigo-500/10 transition-all duration-500 ${
                    isFading ? "opacity-0 -translate-x-10 pointer-events-none" : "opacity-100"
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <img
                      src={photoURL || "https://geographyandyou.com/images/user-profile.png"}
                      alt={firstName}
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shadow-sm"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center md:text-left min-w-0">
                    <h2 className="text-lg font-bold text-slate-900 truncate">
                      {firstName} {lastName}
                    </h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      {age ? `${age} YRS • ` : ""} {gender || "Developer"}
                    </p>
                    <p className="text-slate-600 text-sm line-clamp-2 font-medium">
                      {about || "No bio provided."}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                    <button
                      onClick={() => reviewRequest("rejected", request._id)}
                      className="flex-1 md:flex-none px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <FiX className="text-lg" /> Ignore
                    </button>
                    <button
                      onClick={() => reviewRequest("accepted", request._id)}
                      className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-[#4F46E5] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#3730A3] shadow-lg shadow-indigo-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <FiCheck className="text-lg" /> Accept
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;