import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Address</h3>
              <p>Gunupur, Rayagada, Odisha, India</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Phone</h3>
              <a href="tel:+911234567890" className="text-blue-600">+91 12345 67890</a>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <a href="mailto:info@mygunupur.com" className="text-blue-600">info@mygunupur.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
