
import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X,House, Info ,UsersRound, Contact } from "lucide-react";
import { FaBlogger } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";


const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || null;
  const userInitial = user ? user.name.charAt(0).toUpperCase() : "";

  const openTimer = useRef(null);
  const closeTimer = useRef(null);

  


  const getNavLinks = () => {
  const links = [
    { to: "/", icon: <House />, label: "Home" },
    { to: "/about", icon: <Info />, label: "About Us" },
    { to: "/our-team", icon: <UsersRound />, label: "Our Team" },
    { to: "/contact", icon: <Contact />, label: "Contact" },
    { to: "/support", icon: <FaQuestion />, label: "Faq" },
    { to: "/blog", icon: <FaBlogger />, label: "Blog" },
  ];

  if (user) {
    switch (user.role) {
      case 'enduser-admin':
        links.splice(1, 0, { to: '/shop', icon: <FaShoppingBag />, label: 'Shop' });
        links.push({ to: '/enduser-admin/dashboard', icon: <MdDashboard />, label: 'Dashboard' });
        break;

      case 'reseller-admin':
        links.push({ to: '/reseller-admin/dashboard', icon: <MdDashboard />, label: 'Dashboard' });
        break;

      case 'distributor-admin':
        links.push({ to: '/distributor-admin/dashboard', icon: <MdDashboard />, label: 'Dashboard' });
        break;

      case 'superadmin':
        links.push({ to: '/superadmin/dashboard', icon: <MdDashboard />, label: 'Dashboard' });
        break;

      case 'reseller':
        links.splice(1, 0, { to: '/reseller/shop', icon: <FaShoppingBag />, label: 'Shop' });
        links.push({ to: '/dashboard', icon: <MdDashboard />, label: 'Dashboard' });
        break;

      case 'distributor':
        links.splice(1, 0, { to: '/distributor/shop', icon: <FaShoppingBag />, label: 'Shop' });
        links.push({ to: '/dashboard', icon: <MdDashboard />, label: 'Dashboard' });
        break;

      default:
        links.splice(1, 0, { to: '/shop', icon: <FaShoppingBag />, label: 'Shop' });
        links.push({ to: '/dashboard', icon: <MdDashboard />, label: 'Dashboard' });
        break;
    }
  } else {
    links.splice(1, 0, { to: '/shop', icon: <FaShoppingBag />, label: 'Shop' });
  }

  return links;
};
 const navLinks = getNavLinks();


  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 120);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full transition-all duration-300 border-b border-blue-100
      bg-white shadow-sm ${isSticky ? "fixed top-0 left-0 z-40" : "relative"}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center h-16">

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-3 py-2 font-medium transition duration-200 ${
                location.pathname === link.to
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
            <div className="flex gap-2">
                {link.icon}
              {link.label}
            </div>

              {/* Animated underline */}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-blue-600 transition-all duration-300 ${
                  location.pathname === link.to
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}


        
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden w-full flex justify-start">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-700 hover:text-blue-600 transition"
          >
            {showMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {showMenu && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="flex flex-col gap-2 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setShowMenu(false)}
                className={`px-3 py-2 font-medium ${
                  location.pathname === link.to
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
             <div className="flex gap-2">
                 {link.icon}
                {link.label}
             </div >
              </Link>
            ))}

          
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
