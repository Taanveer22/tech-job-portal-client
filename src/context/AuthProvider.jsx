import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import auth from "../utilities/firebase.config";
import AuthContext from "./AuthContext";

const provider = new GoogleAuthProvider();
provider.addScope("email");
provider.addScope("profile");
provider.setCustomParameters({
  prompt: "select_account consent",
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleSignIn = () => {
    return signInWithPopup(auth, provider);
  };

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userDetailsData = currentUser?.providerData?.[0] || {};
        setUser({
          uid: currentUser.uid,
          emailVerified: currentUser.emailVerified,
          displayName:
            currentUser.displayName || userDetailsData?.displayName || null,
          email: currentUser.email || userDetailsData?.email || null,
          photoURL: currentUser.photoURL || userDetailsData?.photoURL || null,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    updateUserProfile,
    signOutUser,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
