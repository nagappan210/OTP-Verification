const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
   
        <div>
          <img src="/image/foot.png" alt="Logo" className="h-10 mb-4" />
          <h2 className="text-lg font-semibold">Medingen</h2>
          <p className="text-sm text-gray-400 mt-1">Saves you health and wealth</p>
        </div>

    
        <div>
          <h3 className="font-semibold mb-2">Website</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>Home</li>
            <li>Features</li>
            <li>How it works</li>
            <li>Sitemap</li>
          </ul>
        </div>


        <div>
          <h3 className="font-semibold mb-2">Our Policies</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>Privacy Policies</li>
            <li>Terms and Conditions</li>
            <li>Grievance Redressal Policy</li>
            <li>Return Policy</li>
          </ul>
        </div>

 
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>Instagram</li>
            <li>Facebook</li>
            <li>YouTube</li>
            <li>LinkedIn</li>
          </ul>
        </div>


        <div>
          <h3 className="font-semibold mb-2">More</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>About Us</li>
            <li>Blogs</li>
            <li>Help Center</li>
          </ul>
        </div>
      </div>

      
      <div className="border-t border-gray-700 mt-8 p-2 text-center text-sm text-gray-400">
        ©{new Date().getFullYear()} Medingen. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
