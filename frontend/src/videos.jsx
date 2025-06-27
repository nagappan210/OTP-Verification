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
      <h2 className="text-xl sm:text-2xl font-serif mb-8 text-gray-800 ">
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
    </div>
  );
};

export default VideoCarousel;
