import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { FiCheck, FiX, FiCode } from "react-icons/fi";

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
      
      if (onRequestSent) onRequestSent(status);
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error("Request Error:", error);
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden relative group">
      
      {/* IMAGE SECTION: Balanced Height (h-64) */}
      <div className="h-64 w-full relative bg-slate-100 overflow-hidden">
        <img
          src={photoURL || "https://geographyandyou.com/images/user-profile.png"}
          alt="Profile"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        
        {/* Name Overlay */}
        <div className="absolute bottom-4 left-5 text-white z-10">
          <h2 className="text-2xl font-black tracking-tight drop-shadow-md">
            {firstName} {lastName}
          </h2>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-90">
              {age && <span>{age} Yrs</span>}
              {gender && <span>• {gender}</span>}
          </div>
        </div>
      </div>

      {/* CONTENT BODY */}
      <div className="p-5">
        
        {/* SKILLS: Show Everything (No Limit) */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {skills && skills.length > 0 ? (
            skills.map((skill, idx) => (
              <span key={idx} className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 border border-slate-200 rounded-lg">
                {skill}
              </span>
            ))
          ) : (
            <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-1 rounded-md flex items-center gap-1">
               <FiCode /> No skills listed
            </span>
          )}
        </div>

        {/* ABOUT: Shows up to 4 lines (Enough for detail, doesn't break layout) */}
        <div className="mb-6 min-h-[3rem]">
            <p className="text-sm font-medium text-slate-500 leading-relaxed line-clamp-4">
               {about || "This developer prefers to let their code speak for itself."}
            </p>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3">
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-500 text-xs font-black uppercase tracking-widest hover:bg-rose-100 hover:text-rose-600 transition-colors flex items-center justify-center gap-2"
          >
            <FiX className="text-lg" /> Pass
          </button>
          
          <button
            onClick={() => handleSendRequest("interested", _id)}
            className="flex-1 py-3 rounded-xl bg-[#4F46E5] text-white text-xs font-black uppercase tracking-widest hover:bg-[#4338ca] shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <FiCheck className="text-lg" /> Connect
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserCard;