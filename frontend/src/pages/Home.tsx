import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Holiday Haven</h1>
          <nav className="hidden md:flex gap-6">
            <a href="#home" className="text-gray-700 hover:text-blue-600">
              Home
            </a>
            <a href="#features" className="text-gray-700 hover:text-blue-600">
              Features
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600">
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </a>
          </nav>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md md:hidden">
            Menu
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="h-screen bg-[url('/hero-image.jpg')] bg-cover bg-center flex items-center justify-center"
      >
        <div className="text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold">Your Dream Stay Awaits</h2>
          <p className="text-lg md:text-xl mt-4">
            Discover amazing destinations and luxury stays.
          </p>
          <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-500">
            Book Now
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h4 className="text-xl font-semibold mb-4">Luxury Stays</h4>
              <p className="text-gray-600">
                Enjoy premium accommodations and top-tier services.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h4 className="text-xl font-semibold mb-4">Affordable Prices</h4>
              <p className="text-gray-600">
                Get the best deals for your perfect holiday destination.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h4 className="text-xl font-semibold mb-4">24/7 Support</h4>
              <p className="text-gray-600">
                Our team is here to help anytime you need assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} Holiday Haven. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
