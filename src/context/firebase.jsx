import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";

const FirebaseContext = createContext(null);
const firebaseConfig = {
    apiKey: "AIzaSyAWA3rb5sjOjgTMjtw9dK93NcXRD9RSS-o",
    authDomain: "bookstore-6617e.firebaseapp.com",
    projectId: "bookstore-6617e",
    storageBucket: "bookstore-6617e.firebasestorage.app",
    messagingSenderId: "215570984065",
    appId: "1:215570984065:web:b974c520205cb3efe43180",
    measurementId: "G-5KP0MND15N"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

const firebaseAuth = getAuth(firebaseApp);

const firebaseFirestore = getFirestore(firebaseApp);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            console.log(user);
            if(user){
                setUser(user)
                setLoading(false);
            }
            else setUser(null);
        })
    }, [])

    const SignupWithEmailandpassword = async (email, password) => {
        const res = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        return res;
    }

    const SigninWithEmailandpassword = async (email, password) => {
        const res = await signInWithEmailAndPassword(firebaseAuth, email, password)
        return res;
    }

    const SigninWithGoogle = async () => {
        const res = await signInWithPopup(firebaseAuth, googleProvider);
        return res;
    }

    const isLoggedIn = user? true : false;

    const HandleListing = async (title, author, price, ISBN, desc) => {
        const res = await addDoc(collection(firebaseFirestore, "books"), {
            title: title,
            author: author,
            price: price,
            ISBN: ISBN,
            desc: desc,
            userId: user.uid,
            userEmail: user.email,
            userName: user.displayName,
            userPhoto: user.photoURL,
            createdAt: new Date().toISOString()
        });

        return res;
    }

    const HandleGetListing = async () => {
        const res = await getDocs(collection(firebaseFirestore, "books"));

        return res;
    }

    const HandleGetListingById = async (id) => {
        const ref = doc(collection(firebaseFirestore, "books"), id);
        const res = await getDoc(ref);

        return res;
    }



    return (
        <FirebaseContext.Provider value={{SignupWithEmailandpassword, SigninWithEmailandpassword, SigninWithGoogle, isLoggedIn, HandleListing, HandleGetListing, HandleGetListingById}}>
            {props.children}
        </FirebaseContext.Provider>
    );
};




