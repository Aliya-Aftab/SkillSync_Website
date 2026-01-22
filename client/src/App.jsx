
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore"; 

// Components
import Body from "./components/Body"; // (Wraps private routes)
import Home from "./components/Home"; // Public Landing Page
import Login from "./components/Login"; // Public Login Page

// Private Pages (Protected by Body)
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Requests from "./components/Requests";
import Connections from "./components/Connections";
import SmartMatches from "./components/SmartMatches";
import Assistant from "./pages/Assistant";
import Chat from "./components/Chat";
import NavBar from "./components/NavBar"; 

import { Toaster } from "react-hot-toast";

function App() {
  return (
    // 1. Provider must wrap everything
    <Provider store={appStore}>
      <div className="min-h-screen flex flex-col bg-canvas text-ink font-sans selection:bg-primary/20">
        <Router>
          
          <Routes>
            {/* --- PUBLIC ROUTES (No Login Required) --- */}
            {/* Home and Login stand alone. They don't use Body, so no redirect loop. */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* --- PROTECTED ROUTES (Require Login) --- */}
            {/* Everything inside here is wrapped by Body.jsx */}
            {/* Body will check if user is logged in. If not -> Redirects to Login */}
            <Route element={<Body />}>
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/chat/:targetUserId" element={<Chat />} />
              <Route path="/smart-matches" element={<SmartMatches />} />
              <Route path="/assistant" element={<Assistant />} />
            </Route>

          </Routes>

          <Toaster position="top-center" />
          {/* ScrollToTop can stay here or move to Body */}
        </Router>
      </div>
    </Provider>
  );
}

export default App;