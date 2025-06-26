import { Link, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  BadgePercentIcon,
  BellIcon,
  UserIcon,
  ShoppingBagIcon,
  PhoneCallIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-zinc-50 shadow-md py-3 px-6 flex justify-between items-center sticky top-0 z-50">

      <Link to="/">
        <img src="/image/nav.png" className="h-10" alt="Logo" />
      </Link>

      <div className="sm:hidden">
        <button onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>


      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`${
          open ? "block" : "hidden"
        } sm:flex gap-4 sm:gap-6 text-sm sm:text-base items-center absolute sm:static top-16 left-0 w-full sm:w-auto bg-zinc-50 sm:bg-transparent px-6 py-4 sm:p-0 transition-all duration-300 shadow-sm sm:shadow-none`}
      >
        {[
          { label: "Home", icon: <HomeIcon size={18} />, to: "/" },
          { label: "Offers", icon: <BadgePercentIcon size={18} />, to: "/" },
          { label: "Notifications", icon: <BellIcon size={18} />, to: "/" },
          { label: "Profile", icon: <UserIcon size={18} />, to: "/" },
        ].map((item, i) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            key={i}
          >
            <Link
              to={item.to}
              className="flex items-center gap-1 hover:text-blue-700 font-medium"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </motion.div>
        ))}
      </motion.div>

   
      <motion.div
        className="hidden sm:flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="p-2 hover:bg-gray-200 rounded-full transition"
        >
          <ShoppingBagIcon size={24} className="text-gray-700" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          className="p-2 hover:bg-gray-200 rounded-full transition"
        >
          <PhoneCallIcon size={24} className="text-gray-700" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/login")} 
          className="bg-green-600 px-4 py-2 rounded-full text-white hover:bg-green-700 transition"
        >
          Login
        </motion.button>
      </motion.div>
    </nav>
  );
};

export default Nav;
