import Marquee from "react-fast-marquee";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const videos = [
  { id: "VZyeSy7yxR8", title: "Generic Drugs" },
  { id: "wA-b9dK-JYU", title: "Generic vs Branded" },
  { id: "ASJjSGTcVHc", title: "VERIFY: Generics?" },
  { id: "r323eckDm7Y", title: "US Supply Chain" },
  { id: "fECW-ggP0Lo", title: "Dr. Ibrahim Overview" },
];

const images = [
  "/image/p.png",
  "/image/p1.png",
  "/image/p2.png",
  "/image/p3.png",
  "/image/p4.png",
  "/image/p5.png",
  "/image/p6.png",
  "/image/p7.png",
  "/image/p8.png",
];

const texts = [
  "Tablet",
  "Injection",
  "Drop",
  "Ointment",
  "Syrup",
  "Cream",
  "Gel",
  "Sachet",
  "Face Wash",
];

const VideoCarousel = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const closePopup = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="px-4 sm:px-10 lg:px-20 my-10 mt-20">
      
      <h2 className="text-xl sm:text-2xl font-serif mb-8 text-gray-800">
        Generic Medicine Explained
      </h2>

      <Marquee speed={30} pauseOnHover gradient={false}>
        {videos.map((video) => (
          <motion.div
            key={video.id}
            whileHover={{ scale: 1.05 }}
            className="mx-3 mb-6 cursor-pointer w-[250px] sm:w-[280px] md:w-[300px]"
            onClick={() => handleVideoClick(video)}
          >
            <img
              src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
              alt={video.title}
              className="rounded-xl w-full h-[160px] sm:h-[170px] object-cover shadow-md"
            />
            <p className="text-center text-sm mt-2 text-gray-700 font-medium">
              {video.title}
            </p>
          </motion.div>
        ))}
      </Marquee>

   
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg p-4 w-full max-w-3xl mx-auto"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                  title={selectedVideo.title}
                  className="w-full h-full rounded"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <button
                onClick={closePopup}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition mx-auto block"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      <h1 className="text-xl sm:text-2xl font-serif mb-6 text-gray-800 mt-10">
        Shop by Categories
      </h1>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-10 bg-white shadow-xl rounded-2xl p-4  sm:p-6 mb-20">
        {images.map((img, index) => (
          <div key={index} className="flex flex-col items-center space-y-2 ">
            <button className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-100 cursor-pointer shadow-md transition">
              <img
                src={img}
                alt={`icon-${index}`}
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
            </button>
            <span className="text-xs sm:text-sm font-medium text-gray-700 text-center ">
              {texts[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;
