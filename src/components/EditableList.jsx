import React, { useState } from 'react';

export const EditableList = ({ title, items, onUpdate, options, onSelect, onRemove }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-indigo-600 mb-3">{title}</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
        placeholder={`Search ${title.toLowerCase()}...`}
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
      <ul className="mt-4">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between items-center p-2 border-b border-gray-200">
            <span>{item}</span>
            <button
              onClick={() => onRemove(index)}
              className="text-red-500 hover:text-red-700"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};