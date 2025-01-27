import React from 'react';
import { Plus, X } from 'lucide-react';

export function MedicineList({ medicines, onUpdate }) {
  const addMedicine = () => {
    const newMedicine = {
      id: Date.now().toString(),
      name: '',
      schedule: '1+1+1',
      duration: { value: 7, unit: 'days' },
      timing: 'After Meal'
    };
    onUpdate([...medicines, newMedicine]);
  };

  const updateMedicine = (id, field, value) => {
    onUpdate(
      medicines.map((med) =>
        med.id === id ? { ...med, [field]: value } : med
      )
    );
  };

  const removeMedicine = (id) => {
    onUpdate(medicines.filter((med) => med.id !== id));
  };

  const calculateEndDate = (medicine) => {
    const date = new Date();
    const days = medicine.duration.unit === 'weeks' 
      ? medicine.duration.value * 7 
      : medicine.duration.value;
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Rx</h2>
      <div className="space-y-6">
        {medicines.map((medicine) => (
          <div key={medicine.id} className="group relative bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <button
              onClick={() => removeMedicine(medicine.id)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
            >
              <X size={16} />
            </button>
            
            <div className="flex items-center gap-4 mb-2">
              <input
                type="text"
                value={medicine.name}
                onChange={(e) => updateMedicine(medicine.id, 'name', e.target.value)}
                className="flex-grow text-lg font-medium bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:outline-none"
                placeholder="Medicine name"
              />
              <input
                type="text"
                value={medicine.schedule}
                onChange={(e) => updateMedicine(medicine.id, 'schedule', e.target.value)}
                className="w-24 text-center bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:outline-none"
                placeholder="1+1+1"
              />
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span>Take for:</span>
                <input
                  type="number"
                  value={medicine.duration.value}
                  onChange={(e) => updateMedicine(medicine.id, 'duration', {
                    ...medicine.duration,
                    value: parseInt(e.target.value)
                  })}
                  className="w-16 bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:outline-none"
                />
                <select
                  value={medicine.duration.unit}
                  onChange={(e) => updateMedicine(medicine.id, 'duration', {
                    ...medicine.duration,
                    unit: e.target.value
                  })}
                  className="bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="days">days</option>
                  <option value="weeks">weeks</option>
                </select>
              </div>
              
              <select
                value={medicine.timing}
                onChange={(e) => updateMedicine(medicine.id, 'timing', e.target.value)}
                className="bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:outline-none"
              >
                <option value="Before Meal">Before Meal</option>
                <option value="After Meal">After Meal</option>
                <option value="Any Time">Any Time</option>
              </select>
              
              <span className="text-gray-500">
                (Until {calculateEndDate(medicine)})
              </span>
            </div>
          </div>
        ))}
        
        <button
          onClick={addMedicine}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-indigo-500 hover:text-indigo-500 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          <span>Add Medicine</span>
        </button>
      </div>
    </div>
  );
}