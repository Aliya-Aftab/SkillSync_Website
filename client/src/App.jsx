import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore"; 

// Components
import Body from "./components/Body"; 
import Home from "./components/Home"; 
import Login from "./components/Login"; 
import NavBar from "./components/NavBar"; 
import Footer from "./components/Footer"; 
import ScrollToTop from "./components/ScrollToTop"; 

// Private Pages
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Requests from "./components/Requests";
import Connections from "./components/Connections";
import SmartMatches from "./components/SmartMatches";
import Assistant from "./pages/Assistant";
import Chat from "./components/Chat";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={appStore}>
      <div className="min-h-screen flex flex-col bg-canvas text-ink font-sans selection:bg-primary/20">
        <Router>
          
          
          <ScrollToTop />

          <NavBar />

          <Routes>
            {/* --- PUBLIC ROUTES --- */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* --- PROTECTED ROUTES --- */}
            {/* Body.jsx acts as the Wrapper (Outlet) for these pages */}
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

          <Footer />
        
          <Toaster position="top-center" />
        </Router>
      </div>
    </Provider>
  );
}

export default App;