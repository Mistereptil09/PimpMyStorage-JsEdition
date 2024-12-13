import React from 'react';

interface DeleteRowProps {
  rowId: number;
  apiLink: string;
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const DeleteRow: React.FC<DeleteRowProps> = ({ rowId, apiLink, data, setData, setError }) => {
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${apiLink}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setData(data.filter((_, index) => index !== id));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.error('Error deleting row:', error.message);
      } else {
        setError(String(error));
        console.error('Error deleting row:', String(error));
      }
    }
  };

  return (
    <button onClick={() => handleDelete(rowId)}>
      Delete
    </button>
  );
};

export default DeleteRow;