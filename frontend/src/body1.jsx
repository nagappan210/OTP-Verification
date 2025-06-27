import Video from "./videos";

const images = [
  '/image/image-20.png',
  '/image/image-21.png',
  '/image/image-22-1.png',
  '/image/image-22.png',
  '/image/reminder_icon.png',
];

const texts = [
  'MIG coins',
  'Prescriptions',
  'Refill Medicines',
  'Remainder',
  'Compare',
];

const Body1 = () => {
  

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4 shadow-xl bg-white rounded-2xl mx-4 sm:mx-10 lg:mx-20 my-5 mb-10">
      {images.map((img, index) => (
        <div key={index} className="flex flex-col items-center space-y-2">
          <button className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 cursor-pointer shadow-md transition">
            <img
              src={img}
              alt={`icon-${index}`}
              className="w-8 h-8 sm:w-15 sm:h-15 object-contain"
            />
          </button>
          <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">
            {texts[index]}
          </span>
        </div>
      ))}
      
    </div>
    <Video/>
    </div>
    
  );
};

export default Body1;
