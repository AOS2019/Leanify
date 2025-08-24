import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function PrivateRoute({ children, role }) {
  const [user, loading] = useAuthState(auth);
  const [userRole, setUserRole] = React.useState(null);
  const [checkingRole, setCheckingRole] = React.useState(true);

  React.useEffect(() => {
    const fetchRole = async () => {
      if (user) {
        try {
          const ref = doc(db, "users", user.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            setUserRole(snap.data().role);
          } else {
            setUserRole(null);
          }
        } catch (err) {
          console.error("Error fetching role:", err);
          setUserRole(null);
        }
      }
      setCheckingRole(false);
    };
    fetchRole();
  }, [user]);

  if (loading || checkingRole) return <p className="text-center mt-10">Loading...</p>;

  if (!user) return <Navigate to="/login" replace />;

  // ✅ strict role check
  if (role && userRole !== role) {
    return <Navigate to={`/${userRole}-dashboard`} replace />;
  }

  return children;
}
