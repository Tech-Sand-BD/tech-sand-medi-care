import React, { useState } from 'react';
import { Plus, X, Edit2 } from 'lucide-react';

export function MedicineList({ medicines, onUpdate, options, onSelect, onRemove }) {
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const addMedicine = () => {
    const newMedicine = {
      id: Date.now().toString(),
      name: '',
      schedule: '1+1+1',
      duration: { value: 7, unit: 'days' },
      timing: 'After Meal'
    };
    onUpdate([...medicines, newMedicine]);
    setEditingId(newMedicine.id);
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
    setEditingId(null);
  };

  const calculateEndDate = (medicine) => {
    const date = new Date();
    const days = medicine.duration.unit === 'weeks'
      ? medicine.duration.value * 7
      : medicine.duration.value;
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString();
  };

  const renderEditableCard = (medicine) => (
    <div className="space-y-3">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
        <input
          type="text"
          value={medicine.name}
          onChange={(e) => updateMedicine(medicine.id, 'name', e.target.value)}
          className="flex-grow text-lg font-medium bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:outline-none w-full md:w-auto"
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

      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2 w-full md:w-auto">
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
          className="bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:outline-none w-full md:w-auto"
        >
          <option value="Before Meal">Before Meal</option>
          <option value="After Meal">After Meal</option>
          <option value="Any Time">Any Time</option>
        </select>
      </div>
    </div>
  );

  const renderViewCard = (medicine) => (
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{medicine.name}</h3>
          <p className="text-indigo-600 font-medium">{medicine.schedule}</p>
        </div>
        <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
          {medicine.timing}
        </span>
      </div>
      <div className="text-sm text-gray-600">
        <p>Duration: {medicine.duration.value} {medicine.duration.unit}</p>
        <p className="text-gray-500 text-xs">Until {calculateEndDate(medicine)}</p>
      </div>
    </div>
  );

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Rx</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
        placeholder="Search medicines..."
      />
      <ul className="mt-2">
        {filteredOptions.map((option, index) => (
          <li
            key={index}
            onClick={() => {
              onSelect(option);
              setSearchTerm('');
            }}
            className="cursor-pointer p-2 hover:bg-indigo-100 rounded-lg"
          >
            {option}
          </li>
        ))}
      </ul>
      <div className="space-y-4 mt-4">
        {medicines.map((medicine) => (
          <div
            key={medicine.id}
            className="group relative bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all border border-gray-100"
          >
            <div className="absolute right-2 top-2 flex gap-2">
              {editingId === medicine.id ? (
                <button
                  onClick={() => setEditingId(null)}
                  className="text-indigo-500 hover:text-indigo-700 transition-colors bg-white rounded-full p-1"
                >
                  <Edit2 size={16} />
                </button>
              ) : (
                <button
                  onClick={() => setEditingId(medicine.id)}
                  className="opacity-0 group-hover:opacity-100 text-indigo-500 hover:text-indigo-700 transition-all bg-white rounded-full p-1"
                >
                  <Edit2 size={16} />
                </button>
              )}
              <button
                onClick={() => removeMedicine(medicine.id)}
                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all bg-white rounded-full p-1"
              >
                <X size={16} />
              </button>
            </div>

            {editingId === medicine.id ? renderEditableCard(medicine) : renderViewCard(medicine)}
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