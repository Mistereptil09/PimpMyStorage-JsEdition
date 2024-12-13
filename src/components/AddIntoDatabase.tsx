"use client";

import React, { useState, useEffect } from 'react';

interface RegisterDataProps {
  apiLink: string;
}

const RegisterData: React.FC<RegisterDataProps> = ({ apiLink }) => {
  const [data, setData] = useState<any[]>([]);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiLink);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);

        if (result.length > 0) {
          const initialFormData = Object.keys(result[0]).reduce((acc, key) => {
            if (key !== 'id') {
              acc[key] = '';
            }
            return acc;
          }, {} as { [key: string]: string });
          setFormData(initialFormData);
        }
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError(null);
    try {
      const response = await fetch(apiLink, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response status:', response.status);
        console.error('Response body:', errorText);
        throw new Error('Failed to insert data');
      }
      const data = await response.json();
      console.log('Data inserted successfully:', data);
    } catch (error) {
      console.error('Error inserting data:', error);
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
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
      <form onSubmit={handleSubmit}>
        {columns.filter(column => column !== 'id').map((column) => (
          <div key={column}>
            <label htmlFor={column}>{column.charAt(0).toUpperCase() + column.slice(1)}:</label>
            <input
              type="text"
              id={column}
              name={column}
              value={formData[column]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Add to Database'}
        </button>
      </form>
      {submitError && <div style={{ color: 'red' }}>Error: {submitError}</div>}
    </div>
  );
};

export default RegisterData;