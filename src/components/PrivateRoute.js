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
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setUserRole(snap.data().role);
        }
      }
      setCheckingRole(false);
    };
    fetchRole();
  }, [user]);

  if (loading || checkingRole) return <p className="text-center mt-10">Loading...</p>;

  if (!user) return <Navigate to="/login" replace />;

  // Protect by role
  if (role && userRole !== role) {
    return <Navigate to={`/${userRole}-dashboard`} replace />;
  }

  return children;
}
