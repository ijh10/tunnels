import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  const authenticate = async () => {
    if (!token) {
      throw new Error("No token available for authentication");
    }

    try {
      const response = await fetch(API + "/authenticate", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Authentication failed");
      }

      setLocation("TUNNEL");
    } catch (error) {
      console.error("Authentication error:", error);
      throw error; // Re-throw so calling components can handle it
    }
  };

  const signup = async (username) => {
    try {
      const response = await fetch(API + "/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: "super-secret-999",
        }),
      });
      const result = await response.json();
      if (!response.ok) throw result;
      setToken(result.token);
      // token is special auth string. replacmenet for username/password/ so when the user tries to do somehting later in the app they dont have to re login. they just pass this token
      // token can ID you wihtout loggin in again
      // token is returned from the API after sign up
      setLocation("TABLET");
      //updating the state inside the token
      // state changes something within the componant itself
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const value = { location, signup, authenticate };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
