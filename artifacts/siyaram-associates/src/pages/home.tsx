import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { EmiCalculator } from "@/components/emi-calculator";
import { motion } from "framer-motion";
import { Home, Briefcase, Car, Building2, Shield, CreditCard, CheckCircle2, Star, MessageCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Home Loan",
    description: "Make your dream home a reality with our competitive interest rates and flexible repayment options.",
    icon: Home,
    image: "/images/home-loan.png"
  },
  {
    title: "Personal Loan",
    description: "Quick personal loans for your immediate financial needs, medical emergencies, or personal goals.",
    icon: CreditCard,
    image: "/images/personal-loan.png"
  },
  {
    title: "Business Loan",
    description: "Fuel your business growth with our customized business loan solutions and working capital.",
    icon: Briefcase,
    image: "/images/business-loan.png"
  },
  {
    title: "Car Loan",
    description: "Drive home your new or pre-owned car with easy financing and quick approvals.",
    icon: Car,
    image: "/images/car-loan.png"
  },
  {
    title: "Loan Against Property",
    description: "Unlock the value of your property to meet large business or personal financial requirements.",
    icon: Building2,
    image: "/images/property-loan.png"
  },
  {
    title: "Insurance",
    description: "Comprehensive insurance solutions to protect your family, health, and valuable assets.",
    icon: Shield,
    image: "/images/insurance.png"
  }
];

const testimonials = [
  {
    name: "Rajesh Kulkarni",
    role: "Business Owner, Pune",
    content: "Siyaram Associates helped me expand my business with a hassle-free loan. The documentation was minimal and approval was incredibly fast.",
    rating: 5
  },
  {
    name: "Sneha Deshmukh",
    role: "IT Professional",
    content: "I got my home loan approved within days. The team is very professional and transparent about all the charges. Highly recommended!",
    rating: 5
  },
  {
    name: "Amit Patil",
    role: "Self Employed",
    content: "Excellent service! They guided me through the entire process for my car loan. Very satisfied with their customer-first approach.",
    rating: 4
  }
];

export default function HomePage() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section id="home" className="relative min-h-[90vh] flex items-center pt-20">
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/hero.png" 
              alt="Modern Bank Interior" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />
          </div>
          
          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-white space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/30 text-sm font-medium backdrop-blur-sm">
                <Shield className="w-4 h-4" />
                Trusted by 500+ Families in Pune
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
                Fast & Easy <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">
                  Loan Approval
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
                Trusted financial partner for your needs. We provide reliable and hassle-free loan services with minimum documentation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg h-14 px-8 shadow-xl shadow-primary/30" onClick={scrollToContact}>
                  Apply Now
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg h-14 px-8 backdrop-blur-sm" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
                  Explore Services
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-20 md:py-28 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-sm font-bold text-primary uppercase tracking-wider">Our Services</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Financial Solutions Tailored For You</h3>
              <p className="text-muted-foreground text-lg">We offer a wide range of financial products to help you achieve your personal and business goals.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-border group"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow-md">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <h4 className="text-xl font-bold text-foreground">{service.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    <Button variant="link" className="text-primary p-0 hover:text-primary/80 font-semibold group/btn" onClick={scrollToContact}>
                      Apply Now <span className="ml-1 group-hover/btn:translate-x-1 transition-transform">→</span>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-sm font-bold text-primary uppercase tracking-wider">About Siyaram Associates</h2>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground leading-tight">
                  Your Trusted Partner in Financial Growth
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We provide fast, reliable and hassle-free loan services with minimum documentation. Trusted by customers across Pune for quick approvals, transparency, and expert financial guidance.
                </p>
                
                <ul className="space-y-4 pt-4">
                  {[
                    "Minimum Documentation Required",
                    "Quick Processing & Approvals",
                    "100% Transparency & No Hidden Charges",
                    "Personalized Financial Advice"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
                  <div>
                    <p className="text-3xl font-bold text-primary">500+</p>
                    <p className="text-sm font-medium text-muted-foreground mt-1">Loans Approved</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">10+</p>
                    <p className="text-sm font-medium text-muted-foreground mt-1">Years Experience</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">100%</p>
                    <p className="text-sm font-medium text-muted-foreground mt-1">Transparency</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-accent/10 rounded-3xl transform -rotate-3" />
                <img 
                  src="/images/about.png" 
                  alt="Financial Meeting" 
                  className="relative rounded-2xl shadow-2xl object-cover w-full"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* EMI CALCULATOR SECTION */}
        <section id="calculator" className="py-20 md:py-28 bg-slate-900 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-sm font-bold text-accent uppercase tracking-wider">Plan Your Finances</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">EMI Calculator</h3>
              <p className="text-slate-300 text-lg">Calculate your monthly EMIs easily and plan your loan repayment.</p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <EmiCalculator />
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section id="testimonials" className="py-20 md:py-28 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-sm font-bold text-primary uppercase tracking-wider">Client Stories</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground">What Our Customers Say</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-border"
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`w-5 h-5 ${j < t.rating ? "fill-accent text-accent" : "fill-muted text-muted"}`} />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-lg mb-8 italic">"{t.content}"</p>
                  <div>
                    <p className="font-bold text-foreground">{t.name}</p>
                    <p className="text-sm text-primary">{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 md:py-28 bg-white relative">
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-slate-50" />
          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div className="space-y-8 lg:mt-10">
                <div className="space-y-4">
                  <h2 className="text-sm font-bold text-primary uppercase tracking-wider">Get In Touch</h2>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Ready to take the next step?</h3>
                  <p className="text-lg text-muted-foreground">Fill out the form or reach out to us directly. Our experts are here to guide you.</p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-lg">Office Address</h4>
                      <p className="text-muted-foreground mt-1 leading-relaxed">
                        Office no 1 Ground floor, Amisa building<br />
                        Bharati Vidyapeeth Rd, Shriram Nagar, Ambegaon BK<br />
                        Pune - 411073
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-lg">Contact Numbers</h4>
                      <div className="flex flex-col gap-1 mt-1">
                        <a href="tel:+919665025656" className="text-primary hover:underline text-lg font-medium">+91 96650 25656</a>
                        <a href="tel:+919850855656" className="text-primary hover:underline text-lg font-medium">+91 98508 55656</a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-lg">Email Address</h4>
                      <a href="mailto:siyaramassociates56@gmail.com" className="text-primary hover:underline mt-1 inline-block text-lg font-medium break-all">siyaramassociates56@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* FLOATING WHATSAPP BUTTON */}
      <a 
        href="https://wa.me/919665025656?text=Hello%20I%20am%20interested%20in%20loan%20services"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
      </a>
    </div>
  );
}
