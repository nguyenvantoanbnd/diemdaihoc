import React, { useState, useEffect } from 'react';
import { IELTS_CONVERSIONS, TSA_SECTIONS } from '../data';
import { Calculator, Award, HelpCircle, GraduationCap, CheckCircle2, RotateCcw, Info } from 'lucide-react';

interface ScoreCalculatorProps {
  onCalculated: (scores: {
    thptScore: number;
    tsaScore: number;
    ieltsScore: number;
    convertedEnglish: number;
  }) => void;
}

export default function ScoreCalculator({ onCalculated }: ScoreCalculatorProps) {
  const [calcTab, setCalcTab] = useState<'english' | 'thpt' | 'tsa'>('english');

  // IELTS State
  const [selectedIelts, setSelectedIelts] = useState<number>(6.5);
  const [convertedEnglish, setConvertedEnglish] = useState<number>(10.0);

  // THPT State
  const [mathScore, setMathScore] = useState<string>('8.5');
  const [physicsScore, setPhysicsScore] = useState<string>('8.0');
  const [chemistryScore, setChemistryScore] = useState<string>('8.0');
  const [rawEnglishScore, setRawEnglishScore] = useState<string>('7.5');
  const [useIeltsForEnglish, setUseIeltsForEnglish] = useState<boolean>(true);
  const [priorityPoints, setPriorityPoints] = useState<string>('0.0');
  const [isMathMainSubject, setIsMathMainSubject] = useState<boolean>(true);
  const [finalThptScore, setFinalThptScore] = useState<number>(25.68);

  // TSA State
  const [tsaMath, setTsaMath] = useState<string>('26.5');
  const [tsaReading, setTsaReading] = useState<string>('14.0');
  const [tsaScience, setTsaScience] = useState<string>('24.5');
  const [tsaPriority, setTsaPriority] = useState<string>('0.0');
  const [finalTsaScore, setFinalTsaScore] = useState<number>(65.0);

  // 1. Calculate English conversion
  useEffect(() => {
    const conversion = IELTS_CONVERSIONS.find((c) => c.ielts === selectedIelts);
    if (conversion) {
      setConvertedEnglish(conversion.convertedEnglishScore);
    }
  }, [selectedIelts]);

  // 2. Calculate THPT score
  const calculateTHPT = () => {
    const math = parseFloat(mathScore) || 0;
    const phys = parseFloat(physicsScore) || 0;
    const thirdScore = useIeltsForEnglish ? convertedEnglish : (parseFloat(rawEnglishScore) || 0);
    const chem = parseFloat(chemistryScore) || 0;
    const priority = parseFloat(priorityPoints) || 0;

    let score = 0;
    if (isMathMainSubject) {
      // Formula: ĐXT = ((Math * 2 + Phys + Third) * 3/4) + Priority
      score = ((math * 2 + phys + thirdScore) * 3) / 4 + priority;
    } else {
      // Standard Formula: ĐXT = Math + Phys + Chem/Third + Priority
      score = math + phys + chem + priority;
    }

    const roundedScore = Number(score.toFixed(2));
    setFinalThptScore(roundedScore);
    return roundedScore;
  };

  // 3. Calculate TSA score
  const calculateTSA = () => {
    const math = parseFloat(tsaMath) || 0;
    const reading = parseFloat(tsaReading) || 0;
    const science = parseFloat(tsaScience) || 0;
    const priority = parseFloat(tsaPriority) || 0;

    // TSA priority points = THPT priority * 100/30
    const scaledPriority = priority * (100 / 30);

    const score = math + reading + science + scaledPriority;
    const roundedScore = Number(score.toFixed(2));
    setFinalTsaScore(roundedScore);
    return roundedScore;
  };

  // Update global predicted scores
  const handleUpdatePredictor = () => {
    const thpt = calculateTHPT();
    const tsa = calculateTSA();
    onCalculated({
      thptScore: thpt,
      tsaScore: tsa,
      ieltsScore: selectedIelts,
      convertedEnglish: convertedEnglish,
    });
  };

  // Recalculate and sync on load or state changes
  useEffect(() => {
    handleUpdatePredictor();
  }, [selectedIelts, convertedEnglish, mathScore, physicsScore, chemistryScore, rawEnglishScore, useIeltsForEnglish, priorityPoints, isMathMainSubject, tsaMath, tsaReading, tsaScience, tsaPriority]);

  return (
    <div className="bg-white rounded-xs border border-black/10 p-6 shadow-xs" id="admission-calculator">
      <div className="flex items-center gap-3 border-b border-black/10 pb-5">
        <span className="p-2 bg-[#CE1126]/10 rounded-xs border border-[#CE1126]/20">
          <Calculator className="h-5 w-5 text-[#CE1126]" />
        </span>
        <div>
          <h2 className="text-xl font-serif font-black text-[#1a1a1a]">
            Công cụ Quy đổi & Tính điểm Xét tuyển
          </h2>
          <p className="text-neutral-500 text-xs sm:text-sm mt-0.5">
            Tự động quy đổi chứng chỉ IELTS/TOEFL và áp dụng chính xác các công thức tính điểm của Đại học Bách khoa Hà Nội.
          </p>
        </div>
      </div>

      {/* Internal Tabs */}
      <div className="flex border-b border-black/10 mt-5">
        <button
          onClick={() => setCalcTab('english')}
          className={`flex-1 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider cursor-pointer transition-all border-b-2 ${
            calcTab === 'english'
              ? 'border-[#CE1126] text-[#CE1126]'
              : 'border-transparent text-neutral-500 hover:text-[#1a1a1a]'
          }`}
        >
          1. Quy đổi Anh văn
        </button>
        <button
          onClick={() => setCalcTab('thpt')}
          className={`flex-1 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider cursor-pointer transition-all border-b-2 ${
            calcTab === 'thpt'
              ? 'border-[#CE1126] text-[#CE1126]'
              : 'border-transparent text-neutral-500 hover:text-[#1a1a1a]'
          }`}
        >
          2. Điểm THPT
        </button>
        <button
          onClick={() => setCalcTab('tsa')}
          className={`flex-1 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider cursor-pointer transition-all border-b-2 ${
            calcTab === 'tsa'
              ? 'border-[#CE1126] text-[#CE1126]'
              : 'border-transparent text-neutral-500 hover:text-[#1a1a1a]'
          }`}
        >
          3. Điểm Tư duy TSA
        </button>
      </div>

      <div className="py-6">
        {/* TAB 1: IELTS / TOEFL CONVERSION */}
        {calcTab === 'english' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                  Chứng chỉ IELTS của bạn
                </label>
                <div className="mt-2 grid grid-cols-5 gap-2">
                  {[5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map((val) => (
                    <button
                      key={val}
                      onClick={() => setSelectedIelts(val)}
                      className={`py-2 rounded-xs text-sm font-mono font-bold cursor-pointer transition-all border ${
                        selectedIelts === val
                          ? 'bg-[#CE1126] border-[#CE1126] text-white shadow-xs'
                          : 'bg-white border-black/10 text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      {val.toFixed(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#F4F4F2] p-4 rounded-xs border border-black/10">
                <h4 className="text-xs font-mono font-bold text-neutral-800 uppercase flex items-center gap-1.5">
                  <Info className="h-3.5 w-3.5 text-[#CE1126]" /> Quy định quy đổi chứng chỉ 2026:
                </h4>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  Tại Đại học Bách khoa Hà Nội, chứng chỉ IELTS được quy đổi trực tiếp sang điểm thi môn tiếng Anh để xét tuyển cho các tổ hợp thi tốt nghiệp THPT như A01, D01, D07, v.v.
                </p>
                <ul className="text-xs text-neutral-600 mt-2 space-y-1 font-mono">
                  <li>• IELTS 5.0 quy đổi thành <strong className="text-[#CE1126]">8.5 điểm</strong></li>
                  <li>• IELTS 5.5 quy đổi thành <strong className="text-[#CE1126]">9.0 điểm</strong></li>
                  <li>• IELTS 6.0 quy đổi thành <strong className="text-[#CE1126]">9.5 điểm</strong></li>
                  <li>• IELTS 6.5 trở lên quy đổi thành <strong className="text-[#CE1126]">10.0 điểm</strong></li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center bg-[#F4F4F2] rounded-xs border border-black/10 p-8 text-center h-full">
              <span className="p-3 bg-[#CE1126]/10 rounded-full border border-[#CE1126]/20 text-[#CE1126] mb-3">
                <Award className="h-8 w-8" />
              </span>
              <p className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                Kết quả quy đổi tương đương
              </p>
              <div className="mt-4 flex items-baseline justify-center gap-2">
                <span className="text-6xl font-black text-[#CE1126] font-mono">
                  {convertedEnglish.toFixed(1)}
                </span>
                <span className="text-lg font-bold text-neutral-400">/ 10</span>
              </div>
              <p className="text-xs text-neutral-600 mt-3 font-sans max-w-sm leading-relaxed">
                Điểm này sẽ được tự động đồng bộ sang ô tiếng Anh ở mục tính điểm THPT bên dưới nếu bạn kích hoạt tính năng đổi điểm.
              </p>
              <div className="mt-6 flex gap-2 w-full">
                <button
                  onClick={() => {
                    setCalcTab('thpt');
                    setUseIeltsForEnglish(true);
                  }}
                  className="flex-1 py-3 bg-[#CE1126] hover:bg-[#CE1126]/95 text-white rounded-xs text-xs uppercase tracking-wider font-bold cursor-pointer transition-all shadow-xs"
                >
                  Sử dụng điểm này cho THPT
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: THPT SCORE CALCULATOR */}
        {calcTab === 'thpt' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                    Môn 1: Toán học
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={mathScore}
                    onChange={(e) => setMathScore(e.target.value)}
                    className="mt-2 w-full bg-white border border-black/15 rounded-xs px-4 py-2.5 text-neutral-900 font-mono focus:border-[#CE1126] focus:ring-1 focus:ring-[#CE1126] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                    Môn 2: Vật lý
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={physicsScore}
                    onChange={(e) => setPhysicsScore(e.target.value)}
                    className="mt-2 w-full bg-white border border-black/15 rounded-xs px-4 py-2.5 text-neutral-900 font-mono focus:border-[#CE1126] focus:ring-1 focus:ring-[#CE1126] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* English vs Chemistry Toggle depending on main subject setting */}
                <div className="p-4 bg-white rounded-xs border border-black/10">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-sans font-bold text-neutral-700">
                      Sử dụng IELTS quy đổi ({convertedEnglish.toFixed(1)}) cho Tiếng Anh?
                    </label>
                    <input
                      type="checkbox"
                      checked={useIeltsForEnglish}
                      onChange={(e) => setUseIeltsForEnglish(e.target.checked)}
                      className="h-4 w-4 text-[#CE1126] focus:ring-[#CE1126] border-black/20 bg-white rounded cursor-pointerAccent"
                    />
                  </div>

                  <div className="mt-3">
                    <label className="block text-xs font-mono text-neutral-500">
                      {useIeltsForEnglish ? 'Điểm Tiếng Anh quy đổi' : 'Điểm Tiếng Anh THPT của bạn'}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      disabled={useIeltsForEnglish}
                      value={useIeltsForEnglish ? convertedEnglish.toString() : rawEnglishScore}
                      onChange={(e) => setRawEnglishScore(e.target.value)}
                      className="mt-1 w-full bg-neutral-50 border border-black/10 rounded-xs px-3 py-2 text-neutral-600 font-mono disabled:opacity-60"
                    />
                  </div>
                </div>

                {!isMathMainSubject && (
                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                      Môn 3: Hóa học (hoặc môn khác)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={chemistryScore}
                      onChange={(e) => setChemistryScore(e.target.value)}
                      className="mt-2 w-full bg-white border border-black/15 rounded-xs px-4 py-2.5 text-neutral-900 font-mono focus:border-[#CE1126] focus:ring-1 focus:ring-[#CE1126] focus:outline-none"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                    Điểm ưu tiên (0 - 2.75)
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    max="2.75"
                    value={priorityPoints}
                    onChange={(e) => setPriorityPoints(e.target.value)}
                    className="mt-2 w-full bg-white border border-black/15 rounded-xs px-4 py-2.5 text-neutral-900 font-mono focus:border-[#CE1126] focus:ring-1 focus:ring-[#CE1126] focus:outline-none"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      id="isMathMain"
                      checked={isMathMainSubject}
                      onChange={(e) => setIsMathMainSubject(e.target.checked)}
                      className="h-4 w-4 text-[#CE1126] focus:ring-[#CE1126] border-black/20 bg-white rounded cursor-pointer font-bold"
                    />
                    <label htmlFor="isMathMain" className="text-xs text-neutral-700 font-semibold cursor-pointer">
                      Môn Toán nhân hệ số 2
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center bg-[#F4F4F2] rounded-xs border border-black/10 p-8 text-center h-full">
              <span className="p-3 bg-[#CE1126]/10 rounded-full border border-[#CE1126]/20 text-[#CE1126] mb-3">
                <GraduationCap className="h-8 w-8" />
              </span>
              <p className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                Điểm Xét Tuyển THPT Ước Tính
              </p>
              <div className="mt-4 flex items-baseline justify-center gap-2">
                <span className="text-6xl font-black text-[#CE1126] font-mono">
                  {finalThptScore.toFixed(2)}
                </span>
                <span className="text-lg font-bold text-neutral-400">/ 30</span>
              </div>
              <p className="text-[10px] text-neutral-500 mt-2 font-mono">
                {isMathMainSubject
                  ? 'Công thức: ((Toán × 2 + Lý + Anh) × 3/4) + Ưu tiên'
                  : 'Công thức: Toán + Lý + Hóa + Ưu tiên'}
              </p>
              <div className="mt-6 w-full p-4 bg-white rounded-xs border border-black/10 text-xs text-neutral-600 text-left leading-relaxed">
                <strong className="text-neutral-900">Hệ số 2:</strong> Đại đa số các ngành khối kỹ thuật và kinh tế hàng đầu (như EM4, EM5, IT1, IT2) đều áp dụng nhân đôi môn Toán để tăng độ chính xác trong lựa chọn sinh viên năng lực cao.
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TSA SCORE CALCULATOR */}
        {calcTab === 'tsa' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xs border border-black/10 space-y-4">
                <h4 className="text-xs font-mono font-bold text-neutral-800 uppercase flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#CE1126]" /> Điểm thành phần thi tư duy (TSA):
                </h4>

                <div>
                  <div className="flex justify-between text-xs font-mono text-neutral-600">
                    <span>1. Tư duy Toán học (Max: 40)</span>
                    <span className="text-neutral-400">Nhập 0 - 40</span>
                  </div>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="40"
                    value={tsaMath}
                    onChange={(e) => setTsaMath(e.target.value)}
                    className="mt-1.5 w-full bg-white border border-black/15 rounded-xs px-4 py-2 text-neutral-900 font-mono focus:border-[#CE1126] focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-neutral-600">
                    <span>2. Tư duy Đọc hiểu (Max: 20)</span>
                    <span className="text-neutral-400">Nhập 0 - 20</span>
                  </div>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="20"
                    value={tsaReading}
                    onChange={(e) => setTsaReading(e.target.value)}
                    className="mt-1.5 w-full bg-white border border-black/15 rounded-xs px-4 py-2 text-neutral-900 font-mono focus:border-[#CE1126] focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-neutral-600">
                    <span>3. Tư duy Khoa học & GQVD (Max: 40)</span>
                    <span className="text-neutral-400">Nhập 0 - 40</span>
                  </div>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="40"
                    value={tsaScience}
                    onChange={(e) => setTsaScience(e.target.value)}
                    className="mt-1.5 w-full bg-white border border-black/15 rounded-xs px-4 py-2 text-neutral-900 font-mono focus:border-[#CE1126] focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-neutral-600">
                    <span>Điểm ưu tiên THPT của bạn (0 - 2.75)</span>
                    <span className="text-neutral-400">Sẽ tự động quy đổi nhân 3.33</span>
                  </div>
                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    max="2.75"
                    value={tsaPriority}
                    onChange={(e) => setTsaPriority(e.target.value)}
                    className="mt-1.5 w-full bg-white border border-black/15 rounded-xs px-4 py-2 text-neutral-900 font-mono focus:border-[#CE1126] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center bg-[#F4F4F2] rounded-xs border border-black/10 p-8 text-center h-full">
              <span className="p-3 bg-[#CE1126]/10 rounded-full border border-[#CE1126]/20 text-[#CE1126] mb-3">
                <CheckCircle2 className="h-8 w-8" />
              </span>
              <p className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                Điểm Xét Tuyển TSA Ước Tính
              </p>
              <div className="mt-4 flex items-baseline justify-center gap-2">
                <span className="text-6xl font-black text-[#CE1126] font-mono">
                  {finalTsaScore.toFixed(2)}
                </span>
                <span className="text-lg font-bold text-neutral-400">/ 100</span>
              </div>
              <p className="text-[10px] text-neutral-500 mt-2 font-mono">
                Tương đương: <strong className="text-neutral-700">{(finalTsaScore * 0.3).toFixed(2)} / 30</strong> điểm trên thang tốt nghiệp
              </p>

              <div className="mt-6 w-full p-4 bg-white rounded-xs border border-black/10 text-left text-xs text-neutral-600 leading-relaxed">
                <strong className="text-neutral-900">Kỳ thi TSA:</strong> Là kỳ thi đánh giá năng lực đặc trưng của HUST, đề thi tích hợp hướng đến tư duy toán học sâu, kiểm tra IQ và giải quyết bài toán thực tế phức tạp.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

