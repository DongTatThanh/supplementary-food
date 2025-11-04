
import React, { useState } from 'react';


interface PriceFilterProps 
{
  onChange: (min: number | null, max: number | null) => void;
  
}
const priceRanges = 
[
    { label: 'Dưới 500.000đ', min: 0, max: 500000 },
    { label: '500.000đ - 1.000.000đ', min: 500000, max: 1000000 },
    { label: '1.000.000đ - 2.000.000đ', min: 1000000, max: 2000000 },
    { label: '2.000.000đ - 2.500.000đ', min: 2000000, max: 2500000 },
    { label: 'Trên 2.500.000đ', min: 2500000, max: null },
  ];

const PriceFilterproducts: React.FC<PriceFilterProps> = ({ onChange }) => 
    {
  const [selectedRange, setSelectedRange] = useState<string | null>(null);

  const handlePriceClick = (range: { label: string; min: number; max: number | null }) =>
  {
    setSelectedRange(range.label);
    onChange(range.min, range.max);
  };

  return (
    <div>
      <ul className="space-y-2">
        {priceRanges.map((range) => (
          <li key={range.label}>
            <button
              onClick={() => handlePriceClick(range)}
              className={`block w-full text-left border px-4 py-2 rounded hover:bg-gray-100 transition-colors ${
                selectedRange === range.label
                  ? 'bg-blue-100 border-blue-500 text-blue-700 font-medium'
                  : 'border-gray-300'
              }`}
            >
              {range.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriceFilterproducts;
