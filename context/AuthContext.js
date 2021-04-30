import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '@/config/index';

const AuthContext = createContext();

//create a wrapper provider that will provide certain variables/functions
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  //check if the user is logged in
  useEffect(() => checkUserLoggedIn(), []);

  //---methods
  // Register user (argument function is the user object)
  // user object is like this { username, email, password }
  const register = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push('/account/dashboard');
    } else {
      //we get the error message from api/login.js POST request we've just did
      setError(data.message);
      setError(null);
    }
  };

  // Login user (destructure user object details and rename email field to identifier)
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identifier,
        password
      })
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push('/account/dashboard');
    } else {
      //we get the error message from api/login.js POST request we've just did
      setError(data.message);
      setError(null);
    }
  };

  // Logout user
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST'
    });

    if (res.ok) {
      setUser(null);
      router.push('/');
    }
  };

  // Check if user is logged in
  const checkUserLoggedIn = async (user) => {
    //poke our own api
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    //get the user object
    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
