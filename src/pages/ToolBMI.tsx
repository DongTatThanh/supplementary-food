import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const ToolBMI = () => {
  const navigate = useNavigate();
  const [sex, setSex] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [result, setResult] = useState<{ bmi: number; category: string } | null>(null);


  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    let category = '';
    if (bmi < 18.5) {
      category = 'Thiếu cân';
    } else if (bmi < 25) {
      category = 'Bình thường';
    } else if (bmi < 30) {
      category = 'Thừa cân';
    } else {
      category = 'Béo phì';
    }

    setResult({ bmi: Math.round(bmi * 10) / 10, category });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-red-600 flex items-center gap-1">
            <Home className="w-4 h-4" />
            <span>Trang chủ</span>
          </button>
          <span>/</span>
          <span className="text-gray-800 font-medium">Công cụ tính BMI Online</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        
        {/* Chọn giới tính */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Giới tính</label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="sex"
                value="male"
                checked={sex === "male"}
                onChange={(e) => setSex(e.target.value as "male" | "female")}
                className="mr-2"
              />
              <span>Nam</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="sex"
                value="female"
                checked={sex === "female"}
                onChange={(e) => setSex(e.target.value as "male" | "female")}
                className="mr-2"
              />
              <span>Nữ</span>
            </label>
          </div>
        </div>

        {/* Slider ngang - 2 cột */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Chiều cao với slider */}
          <div className="p-6 border-2 rounded-lg shadow-sm bg-gray-50">
            <label className="block text-sm font-semibold mb-3 text-gray-700 uppercase tracking-wide text-center">
              Chiều cao <span className="text-gray-500 font-normal">(cm)</span>
            </label>
            <div className="text-center mb-4">
              <span className="text-6xl font-bold text-red-600">{height}</span>
            </div>
            <Slider
              value={[height]}
              onValueChange={(value) => setHeight(value[0])}
              min={100}
              max={220}
              step={1}
              className="w-full [&_[role=slider]]:bg-red-600 [&_[role=slider]]:border-red-600"
            />
          </div>

          {/* Cân nặng với slider */}
          <div className="p-6 border-2 rounded-lg shadow-sm bg-gray-50">
            <label className="block text-sm font-semibold mb-3 text-gray-700 uppercase tracking-wide text-center">
              Cân nặng <span className="text-gray-500 font-normal">(kg)</span>
            </label>
            <div className="text-center mb-4">
              <span className="text-6xl font-bold text-red-600">{weight}</span>
            </div>
            <Slider
              value={[weight]}
              onValueChange={(value) => setWeight(value[0])}
              min={30}
              max={200}
              step={1}
              className="w-full [&_[role=slider]]:bg-red-600 [&_[role=slider]]:border-red-600"
            />
          </div>
        </div>
        
        <div className="text-center mb-4">
          <button 
            className='bg-red-600 text-white py-3 px-8 rounded-md hover:bg-red-700 font-semibold uppercase text-sm'
            onClick={calculateBMI}
          >
            NHẬN KẾT QUẢ BMI
          </button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <p className="text-lg font-semibold">BMI: {result.bmi}</p>
            <p className="text-sm text-gray-600">Phân loại: {result.category}</p>
          </div>
        )}
      </div>

      {/* Thông tin về BMI */}
      <div className="max-w-4xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-red-600 uppercase">BMI LÀ GÌ?</h2>
        <p className="mb-4 text-gray-800 leading-relaxed">
          BMI (Chỉ số khối cơ thể) là phép tính đơn giản ước tính lượng mỡ trong cơ thể dựa trên chiều cao và cân nặng. 
          Đây là công cụ được sử dụng rộng rãi để đánh giá xem một người có bị thiếu cân, thừa cân hay béo phì hay không.
        </p>

       
        <h3 className="text-xl font-semibold mb-3  text-red-600 uppercase mt-6">CHẨN ĐOÁN CÁC TÌNH TRẠNG CÂN NẶNG QUA BMI</h3>
        <p className="mb-3 text-gray-800">Nhìn chung, các phạm vi BMI sau đây (tính bằng kg/m²) phân loại các loại cân nặng khác nhau:</p>
        
        <div className="space-y-2 mb-6">
          <div className="text-gray-800">
            <span className="font-semibold text-blue-700">Thiếu cân :</span> Dưới 18,5
          </div>
          <div className="text-gray-800">
            <span className="font-semibold text-blue-700">Bình thường :</span> 18,5 đến 24,9
          </div>
          <div className="text-gray-800">
            <span className="font-semibold text-blue-700">Thừa cân :</span> 25 đến 29,9
          </div>
          <div className="text-gray-800">
            <span className="font-semibold text-blue-700">Béo phì độ I :</span> 30 đến 34,9
          </div>
          <div className="text-gray-800">
            <span className="font-semibold text-blue-700">Béo phì độ II :</span> 35 đến 39,9
          </div>
          <div className="text-gray-800">
            <span className="font-semibold text-blue-700">Béo phì độ III :</span> Trên 40
          </div>
        </div>

        <p className="text-gray-800 leading-relaxed mb-6">
          BMI không phải là công cụ duy nhất mà nhà cung cấp sử dụng để phân loại các loại cân nặng. Các công cụ khác bao gồm:
        </p>
        
        <ul className="space-y-2 text-gray-800 mb-6 pl-4">
          <li>• Đo vòng eo.</li>
          <li>• Đo độ dày của da bằng thước kẹp da ở một số vùng nhất định trên cơ thể, chẳng hạn như mặt sau cánh tay trên và dưới xương bả vai.</li>
          <li>• Quét DEXA và phép đo thể tích dịch chuyển không khí (ADP) — những phương pháp này ít được sử dụng hơn.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3 text-red-600 uppercase">LỢI ÍCH CỦA VIỆC CHỈ SỐ BMI KHỎE MẠNH</h3>
        <ul className="space-y-2 text-gray-800">
          <li>• Giúp giảm đau khớp</li>
          <li>• Có nhiều năng lượng hơn, năng động hơn</li>
          <li>• Cải thiện huyết áp</li>
          <li>• Giảm hoàn toàn gánh nặng cho tim và hệ thống</li>
          <li>• Giảm chất béo có hại trong máu, lượng đường trong máu và bệnh tiểu đường loại 2</li>
          <li>• Giảm nguy cơ mắc các bệnh mãn tính như bệnh tim, ung thư.</li>
        </ul>
      </div>
    </div>
  );
};

export default ToolBMI;