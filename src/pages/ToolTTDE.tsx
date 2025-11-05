import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ToolTTDE = () => {
  const navigate = useNavigate();
  const [sex, setSex] = useState<"male" | "female">("male");
  const [age, setAge] = useState<number>(25);
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [activityLevel, setActivityLevel] = useState<"sedentary" | "light" | "moderate" | "active" | "veryActive">("sedentary");
  const [goal, setGoal] = useState<"lose" | "maintain" | "gain">("maintain");
  const [result, setResult] = useState<{ bmr: number; tdee: number } | null>(null);

  const calculateTDEE = () => {
    // Công thức BMR (Mifflin-St Jeor)
    let bmr = sex === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

    // Tính TDEE dựa trên mức độ vận động
    let tdee = bmr * (
      activityLevel === 'sedentary' ? 1.2 :
      activityLevel === 'light' ? 1.375 :
      activityLevel === 'moderate' ? 1.55 :
      activityLevel === 'active' ? 1.725 :
      1.9
    );

    // Điều chỉnh theo mục tiêu
    if (goal === 'lose') {
      tdee -= 500;
    } else if (goal === 'gain') {
      tdee += 500;
    }

    setResult({ bmr: Math.round(bmr), tdee: Math.round(tdee) });
  };

  const activityOptions = [
    { value: 'sedentary', label: 'Ít', desc: 'Hoạt động ít, ngồi nhiều' },
    { value: 'light', label: 'Nhẹ', desc: 'Hoạt động nhẹ, có đi lại nhẹ trong ngày' },
    { value: 'moderate', label: 'Vừa phải', desc: 'Hoạt động trung bình, vận động ít là nhiều' },
    { value: 'active', label: 'Nhiều', desc: 'Hoạt động nhiều, tập gym rất ít ngày' },
    { value: 'veryActive', label: 'Rất nhiều', desc: 'Lao động chân tay nặng' },
  ];

  const goalOptions = [
    { value: 'lose', label: 'Không tập', desc: 'Không tập thể dục' },
    { value: 'maintain', label: 'Ít', desc: 'Tập thể dục nhẹ những ổn định ngày' },
    { value: 'gain', label: 'Vừa phải', desc: 'Tập ổn lực vài ngày 1 tuần' },
  ];

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
          <span className="text-gray-800 font-medium">Công cụ tính TDEE Online</span>
        </nav>
      </div>

      {/* Header Banner */}
 

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          
          {/* Mục tiêu */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3 text-gray-700 uppercase">Mục tiêu</label>
            <Select value={goal} onValueChange={(value: any) => setGoal(value)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lose">Tăng cân</SelectItem>
                <SelectItem value="maintain">Giữ nguyên</SelectItem>
                <SelectItem value="gain">Giảm cân</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Giới tính */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3 text-gray-700 uppercase">Giới tính</label>
            <div className="flex gap-4">
              <button
                onClick={() => setSex('male')}
                className={`flex-1 py-3 px-6 rounded-md font-semibold transition-colors ${
                  sex === 'male' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-red-600'
                }`}
              >
                Nam
              </button>
              <button
                onClick={() => setSex('female')}
                className={`flex-1 py-3 px-6 rounded-md font-semibold transition-colors ${
                  sex === 'female' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-red-600'
                }`}
              >
                Nữ
              </button>
            </div>
          </div>

          {/* Sliders - 3 cột */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Tuổi */}
            <div className="p-6 border-2 rounded-lg shadow-sm bg-gray-50">
              <label className="block text-sm font-semibold mb-3 text-gray-700 uppercase text-center">
                Tuổi
              </label>
              <div className="text-center mb-4">
                <span className="text-6xl font-bold text-red-600">{age}</span>
              </div>
              <Slider
                value={[age]}
                onValueChange={(value) => setAge(value[0])}
                min={10}
                max={100}
                step={1}
                className="w-full [&_[role=slider]]:bg-red-600 [&_[role=slider]]:border-red-600"
              />
            </div>

            {/* Chiều cao */}
            <div className="p-6 border-2 rounded-lg shadow-sm bg-gray-50">
              <label className="block text-sm font-semibold mb-3 text-gray-700 uppercase text-center">
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

            {/* Cân nặng */}
            <div className="p-6 border-2 rounded-lg shadow-sm bg-gray-50">
              <label className="block text-sm font-semibold mb-3 text-gray-700 uppercase text-center">
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

          {/* Mức độ vận động hàng ngày */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3 text-gray-700 uppercase text-center">
              Mức độ vận động hàng ngày
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {activityOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setActivityLevel(option.value as any)}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    activityLevel === option.value
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white border-gray-300 hover:border-red-600'
                  }`}
                >
                  <div className="font-semibold mb-1">{option.label}</div>
                  <div className="text-xs">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tần suất tập thể dục */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3 text-gray-700 uppercase text-center">
              Tần suất tập thể dục
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {goalOptions.map((option, index) => (
                <button
                  key={index}
                  className="p-4 rounded-lg border-2 border-gray-300 bg-white hover:border-red-600 transition-colors"
                >
                  <div className="font-semibold mb-1">{option.label}</div>
                  <div className="text-xs text-gray-600">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Nút tính TDEE */}
          <div className="text-center mb-6">
            <button
              onClick={calculateTDEE}
              className="bg-red-600 text-white py-3 px-12 rounded-md hover:bg-red-700 font-semibold uppercase text-sm"
            >
              NHẬN KẾT QUẢ TDEE
            </button>
          </div>

          {/* Kết quả */}
          {result && (
            <div className="mt-6 p-6 bg-blue-50 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Công thức BMR (?)</p>
                  <p className="text-3xl font-bold text-red-600">{result.bmr} calories</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tỷ lệ mỡ</p>
                  <p className="text-3xl font-bold text-red-600">Chưa tính</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-1">Tốc độ tăng cân</p>
                <p className="text-3xl font-bold text-red-600">{result.tdee} calories/ngày</p>
              </div>
            </div>
          )}
        </div>

        {/* Thông tin về TDEE */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-red-600 uppercase">TDEE LÀ GÌ? KHÁI NIỆM VỀ TDEE</h2>
          <p className="text-gray-800 leading-relaxed mb-4">
            TDEE (Total Daily Energy Expenditure) là tổng năng lượng tiêu thụ hàng ngày của cơ thể. 
            Đây là chỉ số quan trọng giúp bạn xác định lượng calo cần nạp vào mỗi ngày để đạt được mục tiêu của mình.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToolTTDE;