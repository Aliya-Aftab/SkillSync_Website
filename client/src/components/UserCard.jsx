

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
    <div className="w-full bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-500/15 border border-slate-100 overflow-hidden relative group">
      
      {/* Image Header */}
      <div className="h-72 w-full relative bg-slate-100 overflow-hidden">
        <img
          src={photoURL || "https://geographyandyou.com/images/user-profile.png"}
          alt="Profile"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
        <div className="absolute bottom-5 left-6 text-white z-10">
          <h2 className="text-3xl font-black tracking-tight mb-1 shadow-black drop-shadow-md">
            {firstName} {lastName}
          </h2>
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-indigo-200">
             {age && <span>{age} Yrs</span>}
             {gender && <span>• {gender}</span>}
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 pt-5">
        <div className="flex flex-wrap gap-2 mb-6">
          {skills && skills.length > 0 ? (
            skills.slice(0, 4).map((skill, idx) => (
              <span key={idx} className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#4F46E5] bg-indigo-50 rounded-full border border-indigo-100">
                {skill}
              </span>
            ))
          ) : (
            <span className="flex items-center gap-1 text-xs text-slate-400 font-bold bg-slate-50 px-3 py-1 rounded-full">
               <FiCode /> No skills listed
            </span>
          )}
        </div>

        <div className="mb-8">
            <p className="text-sm font-medium text-slate-500 leading-relaxed line-clamp-3">
               {about || "This developer prefers to let their code speak for itself."}
            </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className="flex-1 py-4 rounded-2xl border border-slate-200 text-slate-400 text-xs font-black uppercase tracking-widest hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <FiX className="text-lg" /> Pass
          </button>
          
          <button
            onClick={() => handleSendRequest("interested", _id)}
            className="flex-1 py-4 rounded-2xl bg-[#4F46E5] text-white text-xs font-black uppercase tracking-widest hover:bg-[#4338ca] hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <FiCheck className="text-lg" /> Connect
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserCard;