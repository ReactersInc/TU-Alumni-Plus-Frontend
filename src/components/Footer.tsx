import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-navy-dark via-navy to-navy-light text-gray-200 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

        {/* Column 1 - About */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Alumni Plus</h3>
          <p className="text-sm text-gray-300 font-medium mb-4 leading-relaxed">
            Connecting Tezpur University alumni, students, and faculty through a shared community of learning, mentorship, and growth.
          </p>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-indigo-400 transition">About</Link></li>
            <li><Link to="/events/upcoming" className="hover:text-indigo-400 transition">Events</Link></li>
            <li><Link to="/alumni-family" className="hover:text-indigo-400 transition">Alumni Family</Link></li>
            <li><Link to="/blog" className="hover:text-indigo-400 transition">Blog</Link></li>
            <li><Link to="/gallery" className="hover:text-indigo-400 transition">Gallery</Link></li>
          </ul>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/services" className="hover:text-blue-400 transition">Services</Link></li>
            <li><Link to="/service/transcript" className="hover:text-blue-400 transition">Transcript</Link></li>
            <li><a href="http://www.tezu.ernet.in/bus_time/Bus_Timing_01_02_2025.pdf" target="_blank" className="hover:text-blue-400 transition">Bus Timing</a></li>
            <li><a href="http://agnee.tezu.ernet.in:8001/online/login" target="_blank" className="hover:text-blue-400 transition">Guest House</a></li>
            <li><a href="https://www.tezu.ernet.in/" target="_blank" className="hover:text-blue-400 transition">TU Home</a></li>
            <li><a href="https://www.tezu.ernet.in/newsfeeds.html" target="_blank" className="hover:text-blue-400 transition">TU News</a></li>
            <li><a href="https://www.tezu.ernet.in/dba/new/student-magazine.php" target="_blank" className="hover:text-blue-400 transition">Magazine</a></li>
            <li><a href="https://www.tezu.ernet.in/students_affairs/" target="_blank" className="hover:text-blue-400 transition">Student Affairs</a></li>
            <li><a href="https://webmail.tezu.ernet.in/src/login.php" target="_blank" className="hover:text-blue-400 transition">TU Mail</a></li>
          </ul>
        </div>

        {/* Column 3 - Social & Contact */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Connect With Us</h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="https://www.youtube.com/c/TezpurUniversity94" target="_blank" className="hover:text-red-500 transition">YouTube</a>
            <a href="https://www.facebook.com/TezpurUniversity/" target="_blank" className="hover:text-blue-600 transition">Facebook</a>
            <a href="https://www.linkedin.com/school/tezpur-university/posts/?feedView=all" target="_blank" className="hover:text-blue-400 transition">LinkedIn</a>
            <a href="https://www.instagram.com/tezpur.uni/?hl=en" target="_blank" className="hover:text-pink-500 transition">Instagram</a>
          </div>

          <div className="mt-6 border-t border-gray-600 pt-4">
            <h4 className="font-semibold text-lg text-white mb-2">Contact Us</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              Tezpur University Alumni Association <br />
              Tezpur, Assam, India <br />
              <span className="font-semibold text-gray-100">Phone:</span> +91 37122 75305
            </p>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-white text-sm">
        <p>© {new Date().getFullYear()} Alumni Plus, Tezpur University. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
