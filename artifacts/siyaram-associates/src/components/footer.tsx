import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-white">Siyaram <span className="text-accent">Associates</span></h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Your trusted local financial partner in Pune. We provide fast, reliable, and hassle-free loan services with minimum documentation and complete transparency.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-accent transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-accent transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#calculator" className="hover:text-accent transition-colors">EMI Calculator</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
              <li><Link href="/admin/login" className="hover:text-accent transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li>Home Loan</li>
              <li>Personal Loan</li>
              <li>Business Loan</li>
              <li>Car Loan</li>
              <li>Loan Against Property</li>
              <li>Insurance</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>Office no 1 Ground floor, Amisa building, Bharati Vidyapeeth Rd, Shriram Nagar, Ambegaon BK, Pune - 411073</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+919665025656" className="hover:text-white transition-colors">+91 96650 25656</a>
                  <a href="tel:+919850855656" className="hover:text-white transition-colors">+91 98508 55656</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a href="mailto:siyaramassociates56@gmail.com" className="hover:text-white transition-colors break-all">siyaramassociates56@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Siyaram Associates. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
