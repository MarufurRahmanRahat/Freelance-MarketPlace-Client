import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.config';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

     const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const signOutUSer = () => {
        setLoading(true);
        // notify();
        return signOut(auth);
    }

    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            // console.log('inside observer: if', currentUser)
        } else {
            // console.log('inside observer: else', currentUser)
        }
    })

    const updateUser = (updatedData) =>{
        return updateProfile(auth.currentUser,updatedData);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // console.log('current user in Auth state change', currentUser)
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    })

     const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUSer,
        updateUser,
        setUser,
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;