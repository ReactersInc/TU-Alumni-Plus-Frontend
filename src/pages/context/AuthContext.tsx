import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  user: any | null;
  setIsLoggedIn: (val: boolean) => void;
  setUser: (user: any | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  setIsLoggedIn: () => {},
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data.user);
        setIsLoggedIn(true);
      } catch (err) {
        console.error(err);
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("token");
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setIsLoggedIn, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
