import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";
import { FiSearch, FiMessageSquare, FiLoader, FiZap, FiX, FiTrash2 } from "react-icons/fi";

const PremiumBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#F8FAFC]">
    <div className="absolute top-[-20%] left-[-10%] w-[900px] h-[900px] bg-[#4F46E5] opacity-[0.2] rounded-full blur-[120px]"></div>
    <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] border border-indigo-200/60 rounded-full opacity-50"></div>
    <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl"></div>
    <div className="absolute inset-0 opacity-[0.6]" style={{ backgroundImage: 'radial-gradient(#94a3b8 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}></div>
  </div>
);

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // --- HANDLE REMOVE CONNECTION ---
  const handleRemoveConnection = async (targetUserId) => {
    try {
      // 1. Call the Disconnect API
      await axios.delete(`${BASE_URL}/request/disconnect/${targetUserId}`, {
        withCredentials: true,
      });
      
      // 2. Refresh the list immediately
      fetchConnections();
      
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };

  const filteredConnections = connections
    ? connections.filter((conn) => {
        if (!conn) return false;
        
        const firstName = conn.firstName?.toLowerCase() || "";
        const lastName = conn.lastName?.toLowerCase() || "";
        const fullName = `${firstName} ${lastName}`;
        const skills = Array.isArray(conn.skills) ? conn.skills : [];
        const skillsString = skills.join(" ").toLowerCase();
        const search = searchTerm.toLowerCase().trim();
        
        return fullName.includes(search) || skillsString.includes(search);
      })
    : [];

  return (
    <div className="min-h-screen pt-28 pb-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      <PremiumBackground />

      <div className="relative z-10 max-w-5xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              Your Network
              <span className="px-3 py-1 bg-[#4F46E5]/10 text-[#4F46E5] text-sm font-bold rounded-full border border-[#4F46E5]/20">
                {connections?.length || 0}
              </span>
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Engineers you have established a protocol with.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiSearch className="text-slate-400 group-focus-within:text-[#4F46E5] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search by name or skill..."
              className="block w-full pl-11 pr-10 py-3.5 border border-slate-200 rounded-xl leading-5 bg-white/80 backdrop-blur-md text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-rose-500 transition-colors">
                <FiX />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        {!connections ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
              <FiLoader className="text-3xl animate-spin text-[#4F46E5]" />
              <span className="text-xs font-bold uppercase tracking-widest">Loading Nodes...</span>
          </div>
        ) : connections.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/60 backdrop-blur-md rounded-[2rem] border border-white/60 shadow-xl shadow-indigo-500/5 text-center px-4">
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                <FiZap className="text-2xl text-[#4F46E5]" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">No active connections</h2>
            <Link to="/feed" className="mt-8 px-8 py-3 bg-[#4F46E5] hover:bg-[#3730A3] text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
              Go to Feed
            </Link>
          </div>
        ) : filteredConnections.length === 0 ? (
          <div className="text-center py-20 bg-white/40 rounded-3xl border border-slate-200 border-dashed">
              <p className="text-slate-500 font-medium">No developers found matching <span className="text-slate-900 font-bold">"{searchTerm}"</span></p>
              <button onClick={() => setSearchTerm("")} className="mt-2 text-[#4F46E5] text-xs font-bold uppercase tracking-widest hover:underline">Clear Search</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredConnections.map((conn) => (
              <div
                key={conn._id}
                className="bg-white/80 backdrop-blur-md rounded-[1.5rem] p-5 border border-white/60 shadow-lg shadow-indigo-500/5 hover:shadow-indigo-500/10 hover:border-indigo-100 transition-all duration-300 flex items-center gap-5 group"
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                    <img
                      src={conn.photoURL || "https://geographyandyou.com/images/user-profile.png"}
                      alt={conn.firstName}
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shadow-sm"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-slate-900 truncate">
                    {conn.firstName} {conn.lastName}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      {conn.age ? `${conn.age} YRS • ` : ""} {conn.gender || "Developer"}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {Array.isArray(conn.skills) && conn.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="text-[10px] px-2 py-1 bg-indigo-50 text-[#4F46E5] rounded-md font-bold border border-indigo-100/50">
                            {skill}
                        </span>
                    ))}
                    {Array.isArray(conn.skills) && conn.skills.length > 3 && (
                        <span className="text-[10px] px-2 py-1 text-slate-400 font-bold">+{conn.skills.length - 3}</span>
                    )}
                  </div>
                </div>

                {/* Actions: Chat & Delete */}
                <div className="flex flex-col gap-2">
                    {/* Chat Button */}
                    <Link to={`/chat/${conn._id}`}>
                        <button className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-[#4F46E5] hover:text-white transition-all shadow-sm active:scale-95 group-hover:bg-white group-hover:text-[#4F46E5] group-hover:border group-hover:border-indigo-100">
                           <FiMessageSquare className="text-lg" />
                        </button>
                    </Link>

                    {/* Remove Button */}
                    <button 
                        onClick={() => handleRemoveConnection(conn._id)}
                        className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-95 hover:border-transparent"
                        title="Remove Connection"
                    >
                        <FiTrash2 className="text-lg" />
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

export default Connections;