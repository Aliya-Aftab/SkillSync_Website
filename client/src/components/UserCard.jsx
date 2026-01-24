import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { FiBriefcase, FiCheck, FiX, FiCode } from "react-icons/fi";

// 1. Accept the prop 'onRequestSent'
const UserCard = ({ user, onRequestSent }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, gender, about, photoURL, skills } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      
      // 2. Call the parent trigger (This shows the toast in Feed.jsx)
      if (onRequestSent) onRequestSent(status);

      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error("Request Error:", error);
    }
  };

  return (
  
    <div className="w-full bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden relative group">
      
      {/* Image Header */}
      <div className="h-[26rem] w-full relative bg-slate-100 overflow-hidden">
        <img
          src={photoURL || "https://geographyandyou.com/images/user-profile.png"}
          alt="Profile"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-6 left-6 text-white z-10">
          <h2 className="text-3xl font-black tracking-tight mb-1 drop-shadow-md">
            {firstName} {lastName}
          </h2>
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest opacity-90">
              {age && <span>{age} Yrs</span>}
              {gender && <span>• {gender}</span>}
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {skills && skills.length > 0 ? (
            skills.slice(0, 4).map((skill, idx) => (
              <span key={idx} className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 rounded-lg">
                {skill}
              </span>
            ))
          ) : (
            <span className="flex items-center gap-1 text-xs text-slate-400 font-bold bg-slate-50 px-3 py-1 rounded-lg">
               <FiCode /> No skills listed
            </span>
          )}
        </div>

        <div className="mb-8 min-h-[3rem]">
            <p className="text-sm font-medium text-slate-500 leading-relaxed line-clamp-3">
               {about || "This developer prefers to let their code speak for itself."}
            </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className="flex-1 py-4 rounded-xl bg-slate-100 text-slate-500 text-xs font-black uppercase tracking-widest hover:bg-rose-100 hover:text-rose-600 transition-colors flex items-center justify-center gap-2"
          >
            <FiX className="text-lg" /> Pass
          </button>
          
          <button
            onClick={() => handleSendRequest("interested", _id)}
            className="flex-1 py-4 rounded-xl bg-[#4F46E5] text-white text-xs font-black uppercase tracking-widest hover:bg-[#4338ca] shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <FiCheck className="text-lg" /> Connect
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserCard;