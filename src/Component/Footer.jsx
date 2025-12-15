const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Details */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
          <p>Email: support@example.com</p>
          <p>Phone: +880 1234-567890</p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>

        {/* Working Hours */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Working Hours
          </h3>
          <p>Saturday - Thursday</p>
          <p>9:00 AM – 6:00 PM</p>
          <p>Friday: Closed</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white transition">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} BD Decor. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
