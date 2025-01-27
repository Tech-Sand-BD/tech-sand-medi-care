import React, { useState } from 'react';
import { PrescriptionHeader } from './PrescriptionHeader';
import { EditableList } from './EditableList';
import { MedicineList } from './MedicineList';

export default function PrePrescription() {
  const [prescription, setPrescription] = useState({
    doctorInfo: {
      name: '',
      chamberName: '',
      address: '',
      mobile: ''
    },
    symptoms: [],
    tests: [],
    advice: '',
    medicines: [],
    date: new Date().toLocaleDateString()
  });

  const updateDoctorInfo = (field, value) => {
    setPrescription(prev => ({
      ...prev,
      doctorInfo: {
        ...prev.doctorInfo,
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        {/* <PrescriptionHeader 
          doctorInfo={prescription.doctorInfo}
          onUpdate={updateDoctorInfo}
        /> */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div>
            <EditableList
              title="Symptoms"
              items={prescription.symptoms}
              onUpdate={(items) => setPrescription(prev => ({ ...prev, symptoms: items }))}
            />
            
            <EditableList
              title="Tests"
              items={prescription.tests}
              onUpdate={(items) => setPrescription(prev => ({ ...prev, tests: items }))}
            />
            
            <div className="p-4">
              <h2 className="text-lg font-semibold text-indigo-600 mb-3">Advice</h2>
              <textarea
                value={prescription.advice}
                onChange={(e) => setPrescription(prev => ({ ...prev, advice: e.target.value }))}
                className="w-full h-32 p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
                placeholder="Write your advice here..."
              />
            </div>
          </div>
          
          <div>
            <MedicineList
              medicines={prescription.medicines}
              onUpdate={(medicines) => setPrescription(prev => ({ ...prev, medicines }))}
            />
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 text-right text-sm text-gray-500">
          Date: {prescription.date}
        </div>
      </div>
    </div>
  );
}
