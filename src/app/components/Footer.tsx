import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Uno Lab</h3>
            <p className="text-gray-400 text-sm">
              Fluid-rock Interaction Laboratory
              <br />
              University of Tokyo
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <nav className="space-y-2">
              <Link to="/about" className="block text-gray-400 hover:text-white text-sm">
                About
              </Link>
              <Link to="/research" className="block text-gray-400 hover:text-white text-sm">
                Research
              </Link>
              <Link to="/members" className="block text-gray-400 hover:text-white text-sm">
                Members
              </Link>
              <Link to="/publications" className="block text-gray-400 hover:text-white text-sm">
                Publications
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <p className="text-gray-400 text-sm">
              7-3-1 Hongo, Bunkyo-ku
              <br />
              Tokyo 113-0033, Japan
              <br />
              Email: contact@unolab.u-tokyo.ac.jp
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          © 2026 Uno Lab, University of Tokyo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}