import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 relative z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="grid lg:grid-cols-4 gap-8 mb-8 ">
          {/* About ADRES Network */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">
              About ADRES Network
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed mb-4 ">
              The Adaptation, Resilience and Sustainability Network integrates
              research, science and technology with policy planning for disaster
              risk reduction and sustainable development in India.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/icars-gnec-iit-roorkee/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/clusters"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Thematic Clusters
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Resources */}
          {/* <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/resources"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Research Papers
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Policy Briefs
                </Link>
              </li>
              <li>
                <Link
                  href="/academy"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Training Materials
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Webinars
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Publications
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">
              Contact Information
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
               
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a
                  href="mailto:contact@adresnetwork.org"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  contact@adresnetwork.org
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+91-120-XXXX-XXXX</span>
              </div>

              <div className="mt-4">
               <Link
                href= "https://13.203.206.32/Noticeboard?type=newsletter">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                  Subscribe to Newsletter
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 ADRES Network. All rights reserved. 
          </p>
          <div className="mt-2 space-x-4">
            <Link
              href=""
              className="text-gray-400 hover:text-white text-sm"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              href=""
              className="text-gray-400 hover:text-white text-sm"
            >
              Terms of Service
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              href=""
              className="text-gray-400 hover:text-white text-sm"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
