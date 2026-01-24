import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";
import { FiSave, FiAlertCircle, FiLoader } from "react-icons/fi";
import toast from "react-hot-toast"; 

// Prevents background re-render on every keystroke
const PremiumBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#F8FAFC]">
    <div className="absolute top-[-20%] left-[-10%] w-[900px] h-[900px] bg-[#4F46E5] opacity-[0.2] rounded-full blur-[120px]"></div>
    <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] border border-indigo-300/60 rounded-full opacity-50"></div>
    <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl"></div>
    <div className="absolute inset-0 opacity-[0.6]" style={{ backgroundImage: 'radial-gradient(#94a3b8 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}></div>
  </div>
);

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [firstName, setFirstname] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills?.join(", ") || "");

  const [error, setError] = useState("");
  
  // ❌ REMOVED: Manual Toast State (const [showToast, setShowToast]...)

  useEffect(() => {
    if (user) {
      setFirstname(user.firstName || "");
      setLastName(user.lastName || "");
      setPhotoURL(user.photoURL || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
      setSkills(user.skills?.join(", ") || "");
    }
  }, [user]);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoURL,
          age,
          gender,
          about,
          skills: skills.length > 0 
            ? skills.split(",").map((s) => s.trim()).filter((s) => s !== "") 
            : [],
        },
        { withCredentials: true }
      );
      
      dispatch(addUser(res.data.data));
      
      toast.success("Profile updated successfully");
      
    } catch (error) {
      console.error(error);
      setError(error.response?.data || "An error occurred");
    }
  };

  if (!user) {
    return (
      <div className="min-h-[500px] flex items-center justify-center relative">
        <FiLoader className="animate-spin text-4xl text-[#4F46E5]" />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/40">
      
      <PremiumBackground />

      <div className="relative z-10 flex flex-col lg:flex-row bg-white/60 backdrop-blur-2xl">
        
        {/* LEFT COLUMN: Form */}
        <div className="flex-1 p-8 lg:p-10 border-r border-indigo-100/50">
          <h3 className="text-2xl font-display font-black text-slate-900 mb-6 tracking-tight">Edit Profile</h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">First Name</label>
                <input type="text" value={firstName} onChange={(e) => setFirstname(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/50 border border-indigo-100 text-slate-900 font-medium focus:bg-white focus:ring-4 focus:ring-[#4F46E5]/10 focus:border-[#4F46E5] transition-all outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Last Name</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/50 border border-indigo-100 text-slate-900 font-medium focus:bg-white focus:ring-4 focus:ring-[#4F46E5]/10 focus:border-[#4F46E5] transition-all outline-none" />
              </div>
            </div>

            <div>
               <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Photo URL</label>
               <input type="text" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} placeholder="https://..." className="w-full px-4 py-3 rounded-xl bg-white/50 border border-indigo-100 text-slate-900 font-medium focus:bg-white focus:ring-4 focus:ring-[#4F46E5]/10 focus:border-[#4F46E5] transition-all outline-none" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Age</label>
                  <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/50 border border-indigo-100 text-slate-900 font-medium focus:bg-white focus:ring-4 focus:ring-[#4F46E5]/10 focus:border-[#4F46E5] transition-all outline-none" />
               </div>
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Gender</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/50 border border-indigo-100 text-slate-900 font-medium focus:bg-white focus:ring-4 focus:ring-[#4F46E5]/10 focus:border-[#4F46E5] transition-all outline-none appearance-none cursor-pointer">
                     <option value="" disabled>Select Gender</option>
                     <option value="Male">Male</option>
                     <option value="Female">Female</option>
                     <option value="Others">Others</option>
                  </select>
               </div>
            </div>

            <div>
               <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">About</label>
               <textarea rows={4} value={about} onChange={(e) => setAbout(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/50 border border-indigo-100 text-slate-900 font-medium focus:bg-white focus:ring-4 focus:ring-[#4F46E5]/10 focus:border-[#4F46E5] transition-all outline-none resize-none" />
            </div>

            <div>
               <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Skills</label>
               <textarea rows={3} value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="React, Node.js..." className="w-full px-4 py-3 rounded-xl bg-white/50 border border-indigo-100 text-slate-900 font-medium focus:bg-white focus:ring-4 focus:ring-[#4F46E5]/10 focus:border-[#4F46E5] transition-all outline-none resize-none" />
               <p className="text-[10px] font-bold text-slate-400 mt-2">Separate skills with commas.</p>
            </div>

            {error && (
               <div className="p-3 rounded-lg bg-rose-50 text-rose-600 text-sm flex items-center gap-2 font-bold border border-rose-100">
                  <FiAlertCircle /> {error}
               </div>
            )}

            <div className="pt-4">
               <button onClick={saveProfile} className="w-full py-4 rounded-xl bg-[#4F46E5] hover:bg-[#3730A3] text-white font-bold uppercase tracking-widest shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                  <FiSave /> Save Changes
               </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Preview */}
        <div className="hidden lg:flex flex-1 p-10 flex-col items-center justify-center bg-white/20 backdrop-blur-sm border-l border-white/40">
           <div className="mb-8 text-center">
              <span className="bg-white/80 border border-indigo-100 text-[#4F46E5] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">Your Profile Preview</span>
              <p className="text-slate-600 text-sm mt-3 font-medium">Update your profile</p>
           </div>
           <div className="w-[360px] pointer-events-none select-none transform scale-100 drop-shadow-2xl">
              <UserCard user={{ firstName, lastName, photoURL, about, age, gender, skills: skills ? skills.split(",").map(s => s.trim()).filter(s => s !== "") : [] }} />
           </div>
        </div>
      </div>

    </div>
  );
};

export default EditProfile;