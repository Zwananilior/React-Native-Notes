Auth




import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = { email: string; username: string; password: string };

type AuthContextType = {
  user: User | null;
  initializing: boolean;
  register: (u: User) => Promise<{success:boolean; message:string}>;
  login: (email:string,password:string) => Promise<{success:boolean; message:string}>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = 'RN_NOTES_USERS';
const CURR_USER_KEY = 'RN_NOTES_CURR_USER';

export const AuthProvider: React.FC<{children:any}> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(CURR_USER_KEY);
        if (raw) setUser(JSON.parse(raw));
      } catch(e){ console.warn(e); }
      setInitializing(false);
    })();
  }, []);

  const register = async (u: User) => {
    u.email = u.email.trim().toLowerCase();
    u.password = u.password.trim();

    const raw = await AsyncStorage.getItem(USERS_KEY);
    const users: User[] = raw ? JSON.parse(raw) : [];

    if (users.find(x => x.email === u.email)) {
      return {success:false, message:'Email already registered'};
    }

    users.push(u);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    await AsyncStorage.setItem(CURR_USER_KEY, JSON.stringify(u));
    setUser(u);

    return {success:true, message:'Registered'};
  };

  const login = async (email:string,password:string) => {
    email = email.trim().toLowerCase();
    password = password.trim();

    const raw = await AsyncStorage.getItem(USERS_KEY);
    const users: User[] = raw ? JSON.parse(raw) : [];

    const found = users.find(
      x => x.email === email && x.password === password
    );

    if (!found) {
      return {success:false, message:'Email or password is incorrect'};
    }

    await AsyncStorage.setItem(CURR_USER_KEY, JSON.stringify(found));
    setUser(found);

    return {success:true, message:'Logged in'};
  };

  const logout = async () => {
    await AsyncStorage.removeItem(CURR_USER_KEY);
    setUser(null);
  };

  const updateProfile = async (updates: Partial<User>) => {
    const raw = await AsyncStorage.getItem(USERS_KEY);
    const users: User[] = raw ? JSON.parse(raw) : [];

    const idx = users.findIndex(x => x.email === (user?.email));
    if (idx >= 0) {
      users[idx] = {...users[idx], ...updates};

      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
      const updated = {...users[idx]};

      await AsyncStorage.setItem(CURR_USER_KEY, JSON.stringify(updated));
      setUser(updated);
    }
  };

  return (
    <AuthContext.Provider value={{ user, initializing, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};