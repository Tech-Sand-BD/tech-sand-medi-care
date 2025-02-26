import React, { useState, useEffect } from 'react';
import { PrescriptionHeader } from './PrescriptionHeader';
import { EditableList } from './EditableList';
import { MedicineList } from './MedicineList';
import { assets, symptom, labTests, medicine } from '../assets/assets';

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

  const [selectionFrequency, setSelectionFrequency] = useState({});
  const [medicineSearchTerm, setMedicineSearchTerm] = useState('');

  useEffect(() => {
    const storedFrequency = JSON.parse(localStorage.getItem('selectionFrequency')) || {};
    setSelectionFrequency(storedFrequency);
  }, []);

  useEffect(() => {
    localStorage.setItem('selectionFrequency', JSON.stringify(selectionFrequency));
  }, [selectionFrequency]);

  const updateDoctorInfo = (field, value) => {
    setPrescription(prev => ({
      ...prev,
      doctorInfo: {
        ...prev.doctorInfo,
        [field]: value
      }
    }));
  };

  const handleSelect = (field, item) => {
    if (field === 'medicines') {
      const medicineDetails = {
        name: item,
        dosage: '1/2+1+1/3',
        instructions: 'After Meal',
        timesPerDay: 3,
        duration: '7 days'
      };
      setPrescription(prev => ({
        ...prev,
        [field]: [...prev[field], medicineDetails]
      }));
    } else {
      setPrescription(prev => ({
        ...prev,
        [field]: [...prev[field], item]
      }));
    }
    setSelectionFrequency(prev => ({
      ...prev,
      [item]: (prev[item] || 0) + 1
    }));
  };

  const handleRemove = (field, index) => {
    setPrescription(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const getSortedOptions = (options) => {
    return options.sort((a, b) => (selectionFrequency[b] || 0) - (selectionFrequency[a] || 0));
  };

  const handleMedicineSearch = (e) => {
    setMedicineSearchTerm(e.target.value);
  };

  const filteredMedicineOptions = (options) => {
    return getSortedOptions(options).filter(option => option.toLowerCase().includes(medicineSearchTerm.toLowerCase())).slice(0, 5);
  };



  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        {/* <PrescriptionHeader 
          doctorInfo={prescription.doctorInfo}
          onUpdate={updateDoctorInfo}
        /> */}

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div className="col-span-1">
            <EditableList
              title="Symptoms"
              items={prescription.symptoms}
              onUpdate={(items) => setPrescription(prev => ({ ...prev, symptoms: items }))}
              options={getSortedOptions(symptom.map(s => s.name)).slice(0, 2)}
              onSelect={(item) => handleSelect('symptoms', item)}
              onRemove={(index) => handleRemove('symptoms', index)}
            />

            <EditableList
              title="Lab Tests"
              items={prescription.tests}
              onUpdate={(items) => setPrescription(prev => ({ ...prev, tests: items }))}
              options={getSortedOptions(labTests.map(t => t.name)).slice(0, 2)}
              onSelect={(item) => handleSelect('tests', item)}
              onRemove={(index) => handleRemove('tests', index)}
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

          <div className="col-span-2">
            <MedicineList
              medicines={prescription.medicines}
              onUpdate={(medicines) => setPrescription(prev => ({ ...prev, medicines }))}
              options={filteredMedicineOptions(medicine.map(m => m.name))}
              onSelect={(item) => handleSelect('medicines', item)}
              onRemove={(index) => handleRemove('medicines', index)}
              searchTerm={medicineSearchTerm}
              onSearch={handleMedicineSearch}
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
