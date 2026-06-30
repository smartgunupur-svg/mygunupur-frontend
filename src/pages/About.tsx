import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">About Gunupur</h1>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-lg mb-4">
            Gunupur is a town located in the Rayagada district of the Indian state of Odisha.
            It is known for its scenic beauty, rich culture, and historical significance.
          </p>
          <p className="text-lg mb-4">
            This portal is an independent citizen facilitation platform aimed at providing
            easy access to important services, emergency contacts, and information about
            Gunupur.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
