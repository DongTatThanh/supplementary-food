

    

interface ProductSortProps {

    onChange: (sort: string) => void;
}



export const ProductSort = ({ onChange }: ProductSortProps) => {

    return (    
        <div className="flex gap-4 flex-wrap">
            <button onClick={() => onChange('priceAsc')}>Giá: Thấp đến Cao</button>
            <button onClick={() => onChange('priceDesc')}>Giá: Cao đến Thấp</button>
            <button onClick={() => onChange('nameAsc')}>Tên: A đến Z</button>
            <button onClick={() => onChange('nameDesc')}>Tên: Z đến A</button>
        </div>
    );  

}
        