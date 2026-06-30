import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">My Gunupur</h1>
          <p className="text-xl md:text-2xl mb-8">Everything You Need, All in One Place</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Explore Services
          </button>
        </div>
      </div>

      {/* Quick Services */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Quick Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Home Loan', icon: '🏠' },
            { name: 'Building Plan', icon: '🏗️' },
            { name: 'Emergency Contacts', icon: '🚨' },
            { name: 'Tourist Places', icon: '🌄' },
          ].map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="font-semibold text-lg">{service.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
