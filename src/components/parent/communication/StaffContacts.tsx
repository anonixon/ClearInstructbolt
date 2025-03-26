import React from 'react';
import { Mail, Phone } from 'lucide-react';

interface StaffContactsProps {
  searchQuery: string;
}

const StaffContacts: React.FC<StaffContactsProps> = ({ searchQuery }) => {
  const contacts = [
    {
      id: 1,
      name: 'Ms. Smith',
      role: 'English Teacher',
      email: 'smith@school.edu',
      phone: '+44 123 456 7890',
      avatar: 'MS'
    },
    {
      id: 2,
      name: 'Mr. Johnson',
      role: 'Mathematics Teacher',
      email: 'johnson@school.edu',
      phone: '+44 123 456 7891',
      avatar: 'MJ'
    },
    {
      id: 3,
      name: 'Mrs. Davis',
      role: 'Science Teacher',
      email: 'davis@school.edu',
      phone: '+44 123 456 7892',
      avatar: 'MD'
    }
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Staff Contacts</h2>
      <p className="text-gray-400">Contact information for teachers and staff</p>

      <div className="space-y-4">
        {filteredContacts.map(contact => (
          <div key={contact.id} className="bg-gray-800/50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-lg">
                  {contact.avatar}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">{contact.name}</h3>
                  <p className="text-sm text-gray-400">{contact.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-white bg-gray-900/50 rounded-lg">
                  <Mail className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white bg-gray-900/50 rounded-lg">
                  <Phone className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${contact.email}`} className="hover:text-white">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <a href={`tel:${contact.phone}`} className="hover:text-white">
                  {contact.phone}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffContacts;