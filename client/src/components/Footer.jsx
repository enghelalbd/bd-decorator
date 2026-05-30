import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-secondary text-base-100 mt-10">
      <div className="container-app py-12 grid gap-8 md:grid-cols-4">
        <div>
          <h3 className="font-display text-2xl font-bold text-primary">
            StyleDecor
          </h3>
          <p className="mt-3 text-sm text-base-100/70">
            Smart booking for home & ceremony decoration services across
            Bangladesh.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-base-100/80">
            <li className="flex items-center gap-2">
              <FaPhone /> +880 1711-000000
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> hello@styledecor.com
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <FaClock /> Working Hours
          </h4>
          <ul className="space-y-1 text-sm text-base-100/80">
            <li>Mon – Fri: 9:00 AM – 9:00 PM</li>
            <li>Sat – Sun: 10:00 AM – 8:00 PM</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Follow</h4>
          <div className="flex gap-3 text-xl">
            <a href="#" aria-label="Facebook" className="hover:text-primary">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-primary">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-primary">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-base-100/10">
        <div className="container-app py-4 text-center text-sm text-base-100/60">
          © {new Date().getFullYear()} StyleDecor. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
