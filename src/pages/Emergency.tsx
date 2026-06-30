import React from 'react';

const Emergency: React.FC = () => {
  const contacts = [
    { category: 'Police', name: 'Police Station Gunupur', phone: '100' },
    { category: 'Fire', name: 'Fire Station Gunupur', phone: '101' },
    { category: 'Ambulance', name: 'Ambulance Service', phone: '108' },
    { category: 'Hospital', name: 'District Headquarters Hospital', phone: '06857-222222' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Emergency Contacts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contacts.map((contact, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <span className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {contact.category}
              </span>
              <h3 className="text-xl font-bold mb-2">{contact.name}</h3>
              <a
                href={`tel:${contact.phone}`}
                className="block bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Call {contact.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Emergency;
