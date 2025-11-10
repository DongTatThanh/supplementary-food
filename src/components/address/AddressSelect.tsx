import React, { useEffect } from "react";

export default function AddressSelect() {
    const [provinces, setProvinces] = React.useState([]);
    const [districts, setDistricts] = React.useState([]);
    const [wards, setWards] = React.useState([]);
    const [selectedProvince, setSelectedProvince] = React.useState("");
    const [selectedDistrict, setSelectedDistrict] = React.useState("");
    const [selectedWard, setSelectedWard] = React.useState("");

    // load danh sách cách tỉnh thành 

    useEffect(() => {   
      fetch("https://provinces.open-api.vn/api/?depth=1")
      .then((res) => res.json())
      .then((data) => setProvinces(data));
    }, []);

    // load danh sách quận huyện 
    useEffect(() => {
        if(!selectedProvince) return;
        fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
        .then((res) => res.json())
        .then((data) => setDistricts(data.districts || []));
    }, [selectedProvince]);

    // load danh sách phường xã 
    useEffect(() => {
        if(!selectedDistrict) return;
        fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
        .then((res) => res.json())
        .then((data) => setWards(data.wards || []));
    }, [selectedDistrict]);

}