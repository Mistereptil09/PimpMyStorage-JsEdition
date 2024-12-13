import React, { useState } from 'react';

interface EditRowProps {
  item: any;
  columns: string[];
  apiLink: string;
  onSave: () => void;
}

const EditRow: React.FC<EditRowProps> = ({ item, columns, apiLink, onSave }) => {
  const [formData, setFormData] = useState(item);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(apiLink, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(formData)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      onSave();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    }
  };

  return (
    <tr>
      {columns.map((column) => (
        <td key={column} className="p-2 border">
          <input
            type="text"
            name={column}
            value={formData[column]}
            onChange={handleChange}
            className="border rounded p-1 w-full"
          />
        </td>
      ))}
      <td className="p-2 border">
        <button onClick={handleSave} className="bg-blue-500 text-white px-2 py-1 rounded">
          Save
        </button>
        {error && <div className="text-red-500 mt-2">Error: {error}</div>}
      </td>
    </tr>
  );
};

export default EditRow;