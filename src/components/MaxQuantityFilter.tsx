type MaxQuantityFilterProps = {
    onMaxQuantityChange: (maxQuantity: number | null) => void;
  };
  
  export default function MaxQuantityFilter({
    onMaxQuantityChange,
  }: MaxQuantityFilterProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      onMaxQuantityChange(value === "" ? null : parseInt(value, 10));
    };
  
    return (
      <div className="mb-4">
        <label htmlFor="max-quantity" className="mr-2">
          Filter by Max Quantity:
        </label>
        <input
          id="max-quantity"
          type="number"
          min="0"
          onChange={handleInputChange}
          placeholder="Enter max quantity"
          className="border rounded p-2"
        />
      </div>
    );
  }
  