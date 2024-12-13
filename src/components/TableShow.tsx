"use client";

import React, { useState, useEffect } from 'react';
import EditRow from './EditRow';

interface TableShowProps {
  apiLink: string;
}

const TableShow: React.FC<TableShowProps> = ({ apiLink }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiLink);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiLink]);

  const handleEdit = (index: number) => {
    setEditIndex(index);
  };

  const handleSave = () => {
    setEditIndex(null);
    // Re-fetch data to get the updated data
    const fetchData = async () => {
      try {
        const response = await fetch(apiLink);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      }
    };

    fetchData();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  const columns = Object.keys(data[0]);

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          editIndex === index ? (
            <EditRow
              key={index}
              item={item}
              columns={columns}
              apiLink={apiLink}
              onSave={handleSave}
            />
          ) : (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column}>{item[column]}</td>
              ))}
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </td>
            </tr>
          )
        ))}
      </tbody>
    </table>
  );
};

export default TableShow;