import { useState } from 'react';

interface ProductSortProps {
    onChange: (sort: string) => void;
}

export const ProductSort = ({ onChange }: ProductSortProps) => {
    const [selectedSort, setSelectedSort] = useState<string | null>(null);

    const handleSortClick = (sortValue: string) => {
        setSelectedSort(sortValue);
        onChange(sortValue);
    };

    const sortOptions = [
        { value: 'priceAsc', label: 'Giá: Thấp đến Cao' },
        { value: 'priceDesc', label: 'Giá: Cao đến Thấp' },
        { value: 'nameAsc', label: 'Tên: A đến Z' },
        { value: 'nameDesc', label: 'Tên: Z đến A' },
    ];

    return (
        <div className="flex gap-2 flex-wrap">
            {sortOptions.map((option) => (
                <button
                    key={option.value}
                    onClick={() => handleSortClick(option.value)}
                    className={`px-4 py-2 border rounded hover:bg-gray-100 transition-colors ${
                        selectedSort === option.value
                            ? 'bg-blue-100 border-blue-500 text-blue-700 font-medium'
                            : 'bg-white border-gray-300'
                    }`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};
        