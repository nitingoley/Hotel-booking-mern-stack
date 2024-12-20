type Props = {
    selectedPrice?: number;
    onChange: (value: number) => void;
  };
  
  const PriceFilter = ({ selectedPrice, onChange }: Props) => {
    return (
      <div className="border-b border-slate-300 pb-5">
        <h4 className="text-md font-semibold mb-2">Max Price</h4>
        <select
        className="border rounded-md p-2 w-full"
          value={selectedPrice || ""}
          onChange={(event) =>
            onChange(event.target.value ? parseInt(event.target.value) : 0)
          }
        >
          <option value="">Max Price</option>
          {[40, 100, 200, 300, 400, 500].map((price) => (
            <option key={price} value={price}>
              {price}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default PriceFilter;
  