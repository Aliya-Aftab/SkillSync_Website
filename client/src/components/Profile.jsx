import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { FiUser, FiLock } from "react-icons/fi";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-center px-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-3xl shadow-sm">
            <FiLock className="text-slate-400" />
        </div>
        <h2 className="text-xl font-display font-bold text-slate-900">Access Restricted</h2>
        <p className="text-slate-500 mt-2 font-medium">
          Please log in to manage your profile.
        </p>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 text-center sm:text-left animate-fade-in-down">
          <h1 className="text-3xl font-display font-black text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-3">
            <span className="p-2 bg-indigo-100 text-[#4F46E5] rounded-xl">
                <FiUser className="w-6 h-6" />
            </span>
            Profile Settings
          </h1>
          <p className="mt-2 text-slate-500 font-medium max-w-2xl">
            Manage your public presence and account details. This is what other developers will see.
          </p>
        </div>

       
        <div className="animate-fade-in-up">
           <EditProfile />
        </div>

      </div>
    </div>
  );
};

export default Profile;