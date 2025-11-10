import React, { useEffect } from "react";

interface Province {
    code: number;
    name: string;
}

interface District {
    code: number;
    name: string;
}

interface Ward {
    code: number;
    name: string;
}

interface AddressSelectProps {
    onProvinceChange?: (provinceName: string, provinceCode: string) => void;
    onDistrictChange?: (districtName: string, districtCode: string) => void;
    onWardChange?: (wardName: string, wardCode: string) => void;
    defaultProvince?: string;
    defaultDistrict?: string;
    defaultWard?: string;
}

export default function AddressSelect({
    onProvinceChange,
    onDistrictChange,
    onWardChange,
    defaultProvince = "",
    defaultDistrict = "",
    defaultWard = ""
}: AddressSelectProps) {
    const [provinces, setProvinces] = React.useState<Province[]>([]);
    const [districts, setDistricts] = React.useState<District[]>([]);
    const [wards, setWards] = React.useState<Ward[]>([]);
    const [selectedProvince, setSelectedProvince] = React.useState(defaultProvince);
    const [selectedDistrict, setSelectedDistrict] = React.useState(defaultDistrict);
    const [selectedWard, setSelectedWard] = React.useState(defaultWard);

    // load danh sách tỉnh thành 
    useEffect(() => {   
        fetch("https://provinces.open-api.vn/api/?depth=1")
            .then((res) => res.json())
            .then((data) => setProvinces(data))
            .catch((error) => console.error('Error loading provinces:', error));
    }, []);

    // load danh sách quận huyện 
    useEffect(() => {
        if(!selectedProvince) {
            setDistricts([]);
            setWards([]);
            return;
        }
        
        fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
            .then((res) => res.json())
            .then((data) => {
                setDistricts(data.districts || []);
                setSelectedDistrict(""); // Reset district khi đổi tỉnh
                setWards([]);
            })
            .catch((error) => console.error('Error loading districts:', error));
    }, [selectedProvince]);

    // load danh sách phường xã 
    useEffect(() => {
        if(!selectedDistrict) {
            setWards([]);
            return;
        }
        
        fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
            .then((res) => res.json())
            .then((data) => {
                setWards(data.wards || []);
                setSelectedWard(""); // Reset ward khi đổi quận
            })
            .catch((error) => console.error('Error loading wards:', error));
    }, [selectedDistrict]);

    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const code = e.target.value;
        const province = provinces.find(p => p.code.toString() === code);
        setSelectedProvince(code);
        
        if (onProvinceChange && province) {
            onProvinceChange(province.name, code);
        }
    };

    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const code = e.target.value;
        const district = districts.find(d => d.code.toString() === code);
        setSelectedDistrict(code);
        
        if (onDistrictChange && district) {
            onDistrictChange(district.name, code);
        }
    };

    const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const code = e.target.value;
        const ward = wards.find(w => w.code.toString() === code);
        setSelectedWard(code);
        
        if (onWardChange && ward) {
            onWardChange(ward.name, code);
        }
    };

    return (
        <div className="flex flex-col gap-3 w-full">
            {/* Tỉnh/Thành phố */}
            <select
                value={selectedProvince}
                onChange={handleProvinceChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
            >
                <option value="">Chọn tỉnh/thành phố *</option>
                {provinces.map((province) => (
                    <option key={province.code} value={province.code}>
                        {province.name}
                    </option>
                ))}
            </select>

            {/* Quận/Huyện */}
            <select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={!selectedProvince || districts.length === 0}
                required
            >
                <option value="">Chọn quận/huyện *</option>
                {districts.map((district) => (
                    <option key={district.code} value={district.code}>
                        {district.name}
                    </option>
                ))}
            </select>

            {/* Phường/Xã */}
            <select
                value={selectedWard}
                onChange={handleWardChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={!selectedDistrict || wards.length === 0}
                required
            >
                <option value="">Chọn phường/xã *</option>
                {wards.map((ward) => (
                    <option key={ward.code} value={ward.code}>
                        {ward.name}
                    </option>
                ))}
            </select>
        </div>
    );
}