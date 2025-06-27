import Marquee from "react-fast-marquee";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const images = [
  "/image/c.png",
  "/image/c1.png",
  "/image/c2.png",
  "/image/c3.png",
];

const Body = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleImageClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="py-6 relative">

      <Marquee speed={30} pauseOnHover gradient={false} className="overflow-hidden">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`carousel-${index}`}
            onClick={handleImageClick}
            className="h-40 sm:h-48 md:h-60 w-auto mx-4 sm:mx-6 rounded-xl shadow-md object-cover transition-transform duration-300 hover:scale-95 hover:cursor-pointer"
          />
        ))}
      </Marquee>

 
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 px-4"
            onClick={closePopup}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md text-center px-6 py-8 relative"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white bg-gradient-to-r from-red-500 to-yellow-500 px-4 py-2 rounded-md mb-4 shadow-md inline-block">
                ⚠️ Limited Time Offer
              </h2>

              <p className="text-gray-700 text-sm sm:text-base mb-6 leading-relaxed">
                Hurry! This offer will be ending soon. Check it out now and save big.
              </p>

              <motion.button
                onClick={closePopup}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white px-6 py-2 rounded-full font-medium"
              >
                Close
              </motion.button>

              <button
                onClick={closePopup}
                className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-xl"
                aria-label="Close"
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 px-4 pt-10 pb-10">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col sm:flex-row items-center gap-4 hover:shadow-lg transition duration-300">
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-1">
              Order with Prescription
            </h3>
            <p className="text-gray-600 text-sm">
              Take a photo or select from the gallery.
            </p>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm transition whitespace-nowrap"
            onClick={() => navigate("/login")}
          >
            → Order Now
          </button>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex flex-col sm:flex-row items-center gap-4 hover:shadow-lg transition duration-300">
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-1">
              Chat with Us
            </h3>
            <p className="text-gray-600 text-sm">
              Chat with our experts for any queries.
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm transition whitespace-nowrap">
            → Chat Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Body;
  