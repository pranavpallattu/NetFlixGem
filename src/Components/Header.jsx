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
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  const handeGPTSearchClick = () => {
    dispatch(toggleGPTSearch());
    dispatch(removeGPTMovieResult());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="absolute w-full px-6 py-4 bg-gradient-to-b from-black/95 to-transparent z-10 flex justify-between items-center">
      {/* Netflix Logo */}
      <img 
        src={NetFlix_Logo} 
        className="w-32 md:w-44 h-10 md:h-12 cursor-pointer transform hover:scale-105 transition-transform duration-300" 
        alt="Netflix Logo" 
        onClick={() => navigate("/browse")}
      />

      {user && (
        <div className="flex items-center space-x-3 md:space-x-6">
          {/* Language Selector - Clean Style */}
          {showGptSearch && (
            <div className="relative">
              <select
                onChange={handleLanguageChange}
                className="bg-gray-900/90 border border-gray-600 text-white py-2 px-4 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 appearance-none cursor-pointer hover:border-gray-400 transition-colors duration-200 pr-8"
              >
                {Supported_Languages?.map((lang, index) => (
                  <option key={index} value={lang.identifier} className="bg-gray-800">
                    {lang.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          )}
          
          {/* GPT Search Toggle Button */}
          <button
            className="bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white px-4 md:px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl shadow-purple-500/20"
            onClick={handeGPTSearchClick}
          >
            <span className="flex items-center">
              {showGptSearch ? (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  AI Search
                </>
              )}
            </span>
          </button>

          {/* User Profile Section */}
          <div className="flex items-center space-x-3 bg-gray-900/80 rounded-full pl-2 pr-4 py-1 border border-gray-700 hover:border-gray-500 transition-all duration-300 group">
            <div className="relative">
              <img
                className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-transparent group-hover:border-red-500 transition-all duration-300"
                src={user.photoURL}
                alt="User Profile"
              />
            </div>
            
            <div className="hidden md:flex flex-col">
              <span className="text-white text-sm font-medium">{user.displayName || 'User'}</span>
              <button
                className="text-gray-300 text-xs hover:text-white transition-colors duration-200 flex items-center"
                onClick={handleSignOut}
              >
                Sign Out
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
            
            {/* Mobile Sign Out */}
            <button
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
              onClick={handleSignOut}
              title="Sign Out"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;