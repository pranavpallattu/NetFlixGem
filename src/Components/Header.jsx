import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { NetFlix_Logo, Supported_Languages } from "../utils/constants";
import { removeGPTMovieResult, toggleGPTSearch } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const user = useSelector((store) => store.user);

  const showGptSearch = useSelector((store) => store.gpt?.showGptSearch);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  const handeGPTSearchClick = () => {

    // Toggle my gpt search
    dispatch(toggleGPTSearch());
    dispatch(removeGPTMovieResult())
  };

  const handleLanguageChange = (e) => {
    console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;

        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");

        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });

    // unsubscribe when component unmounts
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <>
      <div className="absolute w-full px-8 py-1 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row md:justify-between">
        <img src={NetFlix_Logo} className="w-44 h-20 mx-auto md:mx-0" alt="" />

        {user && (
          <div className="flex justify-around">
            {showGptSearch && (
              <select
                onChange={handleLanguageChange}
                className="bg-black py-1 px-4 rounded-2xl text-white font-bold"
              >
                {Supported_Languages?.map((lang, index) => (
                  <option key={index} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}
            <button
              className="p-1 md:px-4 md:py-2 m-2 bg-purple-700 rounded-2xl text-white cursor-pointer"
              onClick={handeGPTSearchClick}
            >
              {showGptSearch ? "Home Page" : "GPT Search"}
            </button>
       <div>
             <img
              className="w-12 mt-3 h-12 rounded-full"
              src={user.photoURL}
              alt="usericon"
            />
            <button
              className="ml-2 mt-2 font-bold text-white cursor-pointer"
              onClick={handleSignOut}
            >
              (Sign Out)
            </button>
       </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
