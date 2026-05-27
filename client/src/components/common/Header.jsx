import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, User, LogOut } from "lucide-react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header
      className="w-full  z-50 
      bg-white/10
      backdrop-blur-xl border-b border-white/10 
      shadow-[0_8px_30px_rgb(0,0,0,0.3)]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-white border-2 border-gray-500 shadow-lg  backdrop-blur-md px-3 py-1 rounded-full">
              <img
                src="/logo.jpg"
                alt="Dataline logo"
                className="h-15 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Center Title */}
          <div className="hidden lg:flex flex-col items-center">
            <h1
              className="text-4xl font-extrabold tracking-widest
    bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-400
    bg-clip-text text-transparent drop-shadow-lg font-serif"
            >
              WELCOME TO DATALINE
            </h1>

            <div className="h-[3px] w-40 mt-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full"></div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/wishlist"
              className="text-black-600 hover:text-blue-600 transition duration-300 hover:scale-110"
            >
              <Heart size={22} />
            </Link>

            <Link
              to="/cart"
              className="text-black-300 hover:text-blue-600 transition duration-300 hover:scale-110"
            >
              <ShoppingCart size={22} />
            </Link>

            {!isLoggedIn ? (
              <Link to="/login">
                <button
                  className="px-6 py-2 rounded-full text-sm font-semibold text-white 
                  bg-gradient-to-r from-blue-600 to-blue-600 
                  hover:scale-105 transition duration-300 
                  shadow-lg shadow-blue-600/20"
                >
                  Login / Register
                </button>
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 rounded-full 
                  bg-white/10 hover:bg-white/20 text-2xl transition text-black  hover:scale-115 duration-300 backdrop-blur-md"
                >
                  <User size={18} />
                  <span className="text-sm font-medium text-black-600">Profile</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 transition"
                >
                  <LogOut size={18} className="text-red-400" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
              <User
                className="text-black-300 hover:text-blue-600 transition"
                size={22}
              />
            </button>
            <Link to="/cart">
              <ShoppingCart
                className="text-black-300 hover:text-blue-600 transition"
                size={22}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {showMobileMenu && (
        <div className="md:hidden bg-slate-900 border-t border-white/10 px-6 py-4 space-y-3">
          <Link
            to="/wishlist"
            className="block text-black-300 hover:text-blue-600"
          >
            Wishlist
          </Link>

          <Link to="/cart" className="block text-gray-300 hover:text-blue-600">
            Cart
          </Link>

          {!isLoggedIn ? (
            <Link
              to="/login"
              className="block w-full text-center py-2 rounded-lg 
              bg-gradient-to-r from-blue-600 to-blue-600 
              text-black font-medium hover:opacity-90 transition"
            >
              Login / Register
            </Link>
          ) : (
            <>
              <Link
                to="/profile"
                className="block text-black-300 hover:text-blue-600"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-center py-2 rounded-lg 
                bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
