import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

export function EditableList({ title, items, onUpdate }) {
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim()) {
      onUpdate([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  const removeItem = (index) => {
    onUpdate(items.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-indigo-600 mb-3">{title}</h2>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2 group bg-gray-50 p-2 rounded-lg">
            <span className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0" />
            <span className="flex-grow break-words">{item}</span>
            <button
              onClick={() => removeItem(index)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        <div className="flex items-center gap-2 mt-4">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
            className="flex-grow bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:outline-none py-1"
            placeholder={`Add ${title.toLowerCase()}...`}
          />
          <button
            onClick={addItem}
            className="text-indigo-500 hover:text-indigo-700 transition-colors flex-shrink-0"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}