import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);        // firebase auth user
  const [profile, setProfile] = useState(null);  // firestore user doc
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setLoading(false);

      // if signed in, attach a real-time listener to the Firestore profile
      if (u?.uid) {
        const ref = doc(db, "users", u.uid);
        const unsubDoc = onSnapshot(ref, (snap) => {
          if (snap.exists()) setProfile(snap.data());
          else setProfile(null);
        });
        // clean up Firestore listener when auth changes/unmount
        return () => unsubDoc();
      } else {
        setProfile(null);
      }
    });

    return () => unsubAuth();
  }, []);

  return (
    <UserContext.Provider value={{ user, profile, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
