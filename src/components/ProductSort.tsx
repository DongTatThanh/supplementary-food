

    

interface ProductSortProps {
  onSortChange: (sort: string) => void;
}



export const ProductSort = ({ onSortChange }: ProductSortProps) => {

    return (    
        <div>
            <button onClick={() => onSortChange('priceAsc')}>Giá: Thấp đến Cao</button>
            <button onClick={() => onSortChange('priceDesc')}>Giá: Cao đến Thấp</button>
            <button onClick={() => onSortChange('nameAsc')}>Tên: A đến Z</button>
            <button onClick={() => onSortChange('nameDesc')}>Tên: Z đến A</button>
        </div>
    );  

}
        