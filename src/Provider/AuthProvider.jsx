import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import auth from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from '../components/reusuable/Loading';

export const AuthContext = createContext();
const googleAuth = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dark, setDark] = useState(JSON.parse(localStorage.getItem('dark')) || false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                axios.post("http://localhost:5000/jwt", { email: currentUser.email }, { withCredentials: true })
                    .then(() => setLoading(false))

            } else {
                setLoading(false)
            }
        });

        return unsubscribe;
    }, []);

    // Google Signin
    const googleSignin = () => signInWithPopup(auth, googleAuth);

    // Create new user with email & password
    const createNewUser = (email, password, name, photoURL) => {
        return createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                const updateFields = { displayName: name, photoURL };
                updateProfile(auth.currentUser, updateFields)
                    .then(() => {
                        setUser({ ...auth.currentUser, ...updateFields });
                    })
            })
    }

    // Login user with email & password
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Logout function
    const logOut = () => {
        signOut(auth)
            .then(() => {
                axios.post("http://localhost:5000/logout", {}, { withCredentials: true })
                    .then(() => navigate("/login"))
            })
    }

    const values = { user, logOut, loginUser, createNewUser, googleSignin, setDark, dark }

    return (<div className={dark ? "dark" : ""}>
        <AuthContext.Provider value={values}>
            {loading ? <Loading loading={loading} /> : children}
        </AuthContext.Provider>
    </div>);
};

AuthProvider.propTypes = {
    children: PropTypes.array
}

export default AuthProvider;