"use client";

import React, { useState, useEffect } from 'react';
import AddIntoDatabase from './AddIntoDatabase';
import EditRow from './EditRow';
import DeleteRow from './DeleteRow';

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

  const exportToCSV = () => {
    const csvRows: string[] = [];
    const headers = [...Object.keys(data[0]), "Actions"];
    csvRows.push(headers.join(","));
    data.forEach((item) => {
      const row = Object.values(item).join(",");
      csvRows.push(row);
    });
    const csvContent = `data:text/csv;charset=utf-8,${csvRows.join("\n")}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    <div>
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={exportToCSV}
        >
          Download CSV
        </button>
      </div>
      <AddIntoDatabase apiLink={apiLink}/>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-6 py-3 border-b text-left text-sm font-medium text-gray-800">{column}</th>
            ))}
            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-800">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            if (editIndex === index) {
              return (
                <EditRow
                  key={index}
                  item={item}
                  columns={columns}
                  apiLink={apiLink}
                  onSave={handleSave}
                />
              );
            } else {
              return (
                <tr key={index} className="hover:bg-gray-100">
                  {columns.map((column) => (
                    <td key={column} className="px-6 py-4 border-b text-sm text-gray-700">{item[column]}</td>
                  ))}
                  <td className="px-6 py-4 border-b text-sm text-gray-700">
                    <button onClick={() => handleEdit(index)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                    {/*<DeleteRow
                      rowId={index}
                      apiLink={apiLink}
                      data={data}
                      setData={setData}
                      setError={setError}
                    />*/}
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableShow;