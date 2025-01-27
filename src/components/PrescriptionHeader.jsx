import React from 'react';
import { Stethoscope } from 'lucide-react';

export function PrescriptionHeader({ doctorInfo, onUpdate }) {
  return (
    <div className="border-b-2 border-gray-200 p-6 flex items-center gap-6">
      <div className="w-20 h-20 flex-shrink-0">
        <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center">
          <Stethoscope className="w-10 h-10 text-indigo-600" />
        </div>
      </div>
      
      <div className="flex-grow">
        <input
          type="text"
          value={doctorInfo.name}
          onChange={(e) => onUpdate('name', e.target.value)}
          className="text-2xl font-bold text-gray-800 w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-indigo-500 focus:outline-none transition-colors"
          placeholder="Doctor Name"
        />
        <input
          type="text"
          value={doctorInfo.chamberName}
          onChange={(e) => onUpdate('chamberName', e.target.value)}
          className="text-lg text-gray-600 w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-indigo-500 focus:outline-none mt-1 transition-colors"
          placeholder="Chamber Name"
        />
        <input
          type="text"
          value={doctorInfo.address}
          onChange={(e) => onUpdate('address', e.target.value)}
          className="text-sm text-gray-500 w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-indigo-500 focus:outline-none mt-1 transition-colors"
          placeholder="Address"
        />
        <input
          type="text"
          value={doctorInfo.mobile}
          onChange={(e) => onUpdate('mobile', e.target.value)}
          className="text-sm text-gray-500 w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-indigo-500 focus:outline-none mt-1 transition-colors"
          placeholder="Mobile Number"
        />
      </div>
    </div>
  );
}