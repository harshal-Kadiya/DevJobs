
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getStorageString,
  setStorageString,
  STORAGE_KEYS,
} from "../assets/utils/storage";

const AuthContext = createContext(null);

// Mock credentials for this frontend assessment.
const ADMIN_EMAIL = "admin@devjobs.com";
const ADMIN_PASSWORD = "Admin@123";

function getStoredAuth() {
  return getStorageString(STORAGE_KEYS.ADMIN_AUTH, "false") === "true";
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(getStoredAuth);

  useEffect(() => {
    setStorageString(
      STORAGE_KEYS.ADMIN_AUTH,
      String(isAuthenticated)
    );
  }, [isAuthenticated]);

  function login(email, password) {
    if (
      email.trim().toLowerCase() === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      setIsAuthenticated(true);
      return { success: true };
    }

    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  function logout() {
    setIsAuthenticated(false);
  }

  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
