"use client";

import React from "react";

interface DeleteFromDatabaseProps {
  rowId: number;
  apiLink: string;
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const DeleteFromDatabase: React.FC<DeleteFromDatabaseProps> = ({
  rowId,
  apiLink,
  data,
  setData,
  setError,
}) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`${apiLink}/${rowId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the entry.");
      }
      
      const updatedData = data.filter((_, index) => index !== rowId);
      setData(updatedData);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred while deleting.");
      }
    }
  };

  return (
    <button onClick={handleDelete} className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
      Delete
    </button>
  );
};

export default DeleteFromDatabase;