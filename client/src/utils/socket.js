import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    // Added withCredentials for local testing
    return io(BASE_URL, {
      withCredentials: true,
    });
  } else {
    // Added withCredentials for Production (Vercel -> Render)
    return io(BASE_URL, { 
      path: "/api/socket.io",
      withCredentials: true, 
    });
  }
};