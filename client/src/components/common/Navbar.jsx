
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const userInitial = user ? user.name.charAt(0).toUpperCase() : '';

  const getNavLinks = () => {
    const links = [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'About Us' },
      { to: '/our-team', label: 'Our Team' },
      { to: '/contact', label: 'Contact' },
      { to: '/support', label: 'Faq' },
      { to: '/blog', label: 'Blog' },
    ];

    if (user) {
      switch (user.role) {
        case 'enduser-admin':
          links.splice(1, 0, { to: '/shop', label: 'Shop' });
          links.push({ to: '/enduser-admin/dashboard', label: 'Dashboard' });
          break;
        case 'reseller-admin':
          links.push({ to: '/reseller-admin/dashboard', label: 'Dashboard' });
          break;
        case 'distributor-admin':
          links.push({ to: '/distributor-admin/dashboard', label: 'Dashboard' });
          break;
        case 'superadmin':
          links.push({ to: '/superadmin/dashboard', label: 'Dashboard' });
          break;
        case 'reseller':
          links.splice(1, 0, { to: '/reseller/shop', label: 'Shop' });
          links.push({ to: '/dashboard', label: 'Dashboard' });
          break;
        case 'distributor':
          links.splice(1, 0, { to: '/distributor/shop', label: 'Shop' });
          links.push({ to: '/dashboard', label: 'Dashboard' });
          break;
        default:
          links.splice(1, 0, { to: '/shop', label: 'Shop' });
          links.push({ to: '/dashboard', label: 'Dashboard' });
          break;
      }
    } else {
      links.splice(1, 0, { to: '/shop', label: 'Shop' });
    }

    return links;
  };

  const navLinks = getNavLinks();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    setShowMenu(false);
    setShowDropdown(false);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  return (
    <nav className={`w-full bg-[#1e1e1e]/90 backdrop-blur z-50 shadow-md transition-all duration-300 ${isSticky ? 'fixed top-0 left-0' : 'relative'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center h-16">
        
        {/* Desktop Menu (visible on lg and up) */}
        <div className={`hidden lg:flex gap-6 items-center transition-all duration-300 ${isSticky ? 'py-2' : 'py-4'}`}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded font-medium transition-colors duration-200 ${
                location.pathname === link.to
                  ? 'bg-teal-400 text-black'
                  : 'text-gray-300 hover:text-teal-400'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* User Dropdown */}
          {user && (
            <div
              className="relative ml-4 flex items-center"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div className="w-8 h-8 rounded-full bg-teal-400 text-black flex items-center justify-center font-bold cursor-pointer relative z-10">
                {userInitial}
              </div>
              {showDropdown && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded shadow-lg py-1 z-[9999] border border-gray-200">
                  <div className="px-4 py-2 text-sm text-black border-b border-gray-300">
                    {user.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
]
        <div className="lg:hidden flex justify-start w-full">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-300 hover:text-teal-400 transition-colors duration-75"
          >
            {showMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {showMenu && (
        <div className="lg:hidden bg-[#1e1e1e] border-t border-gray-700 shadow-inner z-[9999]">
          <div className="flex flex-col gap-2 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setShowMenu(false)}
                className={`px-3 py-2 rounded font-medium transition-colors duration-200 ${
                  location.pathname === link.to
                    ? 'bg-teal-400 text-black'
                    : 'text-gray-300 hover:text-teal-400'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile User Info */}
            {user && (
              <div className="mt-4 border-t border-gray-700 pt-4 justify-end">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-teal-400 text-black flex items-center justify-center font-bold">
                    {userInitial}
                  </div>
                  <span className="text-gray-300 text-sm">{user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 px-3 bg-red-600 text-white rounded font-medium mt-2"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;