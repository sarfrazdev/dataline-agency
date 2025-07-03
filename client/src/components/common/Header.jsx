import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, User } from 'lucide-react';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({
        pathname: '/shop',
        search: `?query=${encodeURIComponent(searchQuery.trim())}`,
      });
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="w-full  top-0 left-0 bg-white/90 backdrop-blur z-50 shadow-sm transition-all">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
        {/* Logo */}
        <Link to="/">
          <img
            src="/logo.jpg"
            alt="Dataline logo"
            className="h-12 w-auto hover:scale-105 transition-transform"
          />
        </Link>

        {/* Desktop search bar */}
   <form onSubmit={handleSearchSubmit} className="hidden md:block flex-1 mx-6">
  <div className="relative max-w-md mx-auto">
    <input
      type="search"
      placeholder="Search products..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-teal-400 transition-all"
    />
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
  </div>
</form>


        {/* Icons and login (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <button className="px-4 py-2 rounded-full text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 transition-colors">
              Login/Register
            </button>
          </Link>
          <Link to="/wishlist" className="text-gray-600 hover:text-teal-500 transition-colors">
            <Heart size={20} />
          </Link>
          <Link to="/cart" className="text-gray-600 hover:text-teal-500 transition-colors">
            <ShoppingCart size={20} />
          </Link>
        </div>

        {/* Mobile icons */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setShowSearch(!showSearch)}>
            <Search className="text-gray-600 hover:text-teal-500 transition-colors" size={20} />
          </button>
          <button onClick={() => setShowLogin(!showLogin)}>
            <User className="text-gray-600 hover:text-teal-500 transition-colors" size={20} />
          </button>
            <Link to="/wishlist" className="text-gray-600 hover:text-teal-500 transition-colors">
            <Heart size={20} />
          </Link>
          <Link to="/cart" className="text-gray-600 hover:text-teal-500 transition-colors">
            <ShoppingCart size={20} />
          </Link>
        </div>
      </div>

      {/* Mobile search bar */}
      {showSearch && (
        <form onSubmit={handleSearchSubmit} className="md:hidden px-4 pb-3">
          <div className="relative">
            <input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-teal-400 transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          </div>
        </form>
      )}

      {/* Mobile login dropdown */}
      {showLogin && (
        <div className="md:hidden bg-white px-4 py-2 border-t border-gray-200 shadow-inner">
          <Link to="/login" className="block w-full text-center text-teal-500 hover:bg-gray-100 py-2 rounded transition-colors">
            Login/Register
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
