import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Background_IMG, User_Avatar } from "../utils/constants";


const Login = () => {
  const [isSignInForm, SetIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // Validate the form data

    console.log(email.current.value);
    console.log(password.current.value);

    const message = checkValidData(email.current.value, password.current.value);
    console.log(message);
    setErrorMessage(message);

    // if(message==null){
    // signup or signin
    // }

    if (message) return;

    // signup signin

    if (!isSignInForm) {
      // signup
      // const auth = getAuth();
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
            photoURL: User_Avatar,
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName, photoURL } = auth.currentUser;

              dispatch(addUser({ uid, email, displayName, photoURL }));
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrorMessage(error);
            });
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      // signin
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    SetIsSignInForm(!isSignInForm);
  };

  return (
    <>
      <Header />
      <div className="absolute">
        <img
        className="h-screen md:h-full object-cover"
          src={Background_IMG}
          alt=""
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-10  absolute bg-black w-12/12 md:w-3/12 mx-auto right-0 left-0 my-40 text-white opacity-80 rounded-2xl"
      >
        <h1 className="font-bold text-3xl py-3 px-4">
          {isSignInForm ? "Sign In " : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4  rounded-2xl w-full bg-gray-800"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email address"
          className="p-4 my-4  rounded-2xl w-full bg-gray-800"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4  rounded-2xl w-full bg-gray-800"
        />

        <p className="font-medium text-red-500 text-lg">{errorMessage}</p>

        <button
          className="py-4 my-4 w-full bg-red-500 rounded-lg cursor-pointer"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="px-2 py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to NetFlix? Sign Up Now"
            : "Already a User ? Sign In Now"}
        </p>
      </form>
    </>
  );
};

export default Login;
