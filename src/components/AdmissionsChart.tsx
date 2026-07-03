import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import { HUST_MAJORS } from '../data';
import { Major } from '../types';
import { BarChart3, PieChart, Landmark, Cpu, ArrowUpRight, TrendingUp } from 'lucide-react';

export default function AdmissionsChart() {
  const [selectedGroup, setSelectedGroup] = useState<'all' | 'economics' | 'technology'>('all');
  const [admissionMethod, setAdmissionMethod] = useState<'thpt' | 'tsa'>('thpt');
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(HUST_MAJORS[0]);

  // Filter data based on selected major group
  const filteredData = HUST_MAJORS.filter((m) => {
    if (selectedGroup === 'all') return true;
    return m.group === selectedGroup;
  });

  // Prepare chart-friendly keys depending on admission method
  const chartData = filteredData.map((m) => ({
    code: m.code,
    name: m.name.split(' (')[0], // shorten name for x-axis
    fullName: m.name,
    'Năm 2024': admissionMethod === 'thpt' ? m.thptScore2024 : m.tsaScore2024,
    'Năm 2023': admissionMethod === 'thpt' ? m.thptScore2023 : m.tsaScore2023,
    tuition: m.tuitionFeeMillion,
    group: m.group,
  }));

  // Calculate averages
  const avg2024 = Number(
    (chartData.reduce((acc, curr) => acc + curr['Năm 2024'], 0) / chartData.length).toFixed(2)
  );
  const avg2023 = Number(
    (chartData.reduce((acc, curr) => acc + curr['Năm 2023'], 0) / chartData.length).toFixed(2)
  );

  const formatYAxis = (value: number) => {
    return value.toString();
  };

  const handleBarClick = (state: any) => {
    if (state && state.activePayload) {
      const code = state.activePayload[0].payload.code;
      const major = HUST_MAJORS.find((m) => m.code === code);
      if (major) setSelectedMajor(major);
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl" id="admissions-chart-section">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-rose-500" />
            Biểu đồ so sánh Điểm chuẩn Bách khoa Hà Nội
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            So sánh dữ liệu điểm chuẩn năm 2024 và 2023 giữa các ngành Kinh tế và Công nghệ. Click vào cột biểu đồ để xem chi tiết ngành.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Group Filter */}
          <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700 text-xs sm:text-sm">
            <button
              onClick={() => setSelectedGroup('all')}
              className={`px-3 py-1.5 rounded-md cursor-pointer transition-all ${
                selectedGroup === 'all'
                  ? 'bg-rose-600 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setSelectedGroup('economics')}
              className={`px-3 py-1.5 rounded-md cursor-pointer transition-all flex items-center gap-1 ${
                selectedGroup === 'economics'
                  ? 'bg-rose-600 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Landmark className="h-3 w-3" /> Kinh tế & Quản lý
            </button>
            <button
              onClick={() => setSelectedGroup('technology')}
              className={`px-3 py-1.5 rounded-md cursor-pointer transition-all flex items-center gap-1 ${
                selectedGroup === 'technology'
                  ? 'bg-rose-600 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="h-3 w-3" /> Công nghệ
            </button>
          </div>

          {/* Method Filter */}
          <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700 text-xs sm:text-sm">
            <button
              onClick={() => setAdmissionMethod('thpt')}
              className={`px-3 py-1.5 rounded-md cursor-pointer transition-all ${
                admissionMethod === 'thpt'
                  ? 'bg-emerald-600 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              THPT (Thang 30)
            </button>
            <button
              onClick={() => setAdmissionMethod('tsa')}
              className={`px-3 py-1.5 rounded-md cursor-pointer transition-all ${
                admissionMethod === 'tsa'
                  ? 'bg-emerald-600 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              TSA (Thang 100)
            </button>
          </div>
        </div>
      </div>

      {/* Grid Layout: Chart and Sidebar Details */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex justify-between items-center mb-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-4">
              <span>ĐXT trung bình 2024: <strong className="text-emerald-400">{avg2024}</strong></span>
              <span>ĐXT trung bình 2023: <strong className="text-rose-400">{avg2023}</strong></span>
            </div>
            <span className="hidden sm:inline bg-slate-800 px-2 py-0.5 rounded text-rose-300">
              * Click cột để xem phân tích ngành
            </span>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
                onClick={handleBarClick}
                barGap={4}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="code"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  domain={admissionMethod === 'thpt' ? [20, 30] : [45, 90]}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={formatYAxis}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                  }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="Năm 2024" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={30} />
                <Bar dataKey="Năm 2023" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={30} />
                <ReferenceLine
                  y={avg2024}
                  stroke="#10b981"
                  strokeDasharray="3 3"
                  label={{
                    value: `TB 2024: ${avg2024}`,
                    fill: '#10b981',
                    fontSize: 10,
                    position: 'top',
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Selected Major Details Card */}
        <div className="lg:col-span-1 flex flex-col justify-between bg-slate-950 rounded-xl border border-slate-800 p-5">
          {selectedMajor ? (
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold bg-slate-800 text-rose-400 px-2 py-1 rounded border border-slate-700">
                    Mã ngành: {selectedMajor.code}
                  </span>
                  <span
                    className={`text-[10px] font-sans font-semibold uppercase px-2 py-0.5 rounded-full ${
                      selectedMajor.group === 'economics'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                    }`}
                  >
                    {selectedMajor.group === 'economics' ? 'Kinh tế' : 'Công nghệ'}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-slate-100 leading-tight">
                  {selectedMajor.name}
                </h3>

                <div className="mt-4 space-y-3">
                  <div className="grid grid-cols-2 gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-mono">Điểm THPT 2024</p>
                      <p className="text-xl font-bold text-slate-200 flex items-baseline gap-1 mt-0.5">
                        {selectedMajor.thptScore2024}
                        <span className="text-[10px] font-normal text-slate-400">/30</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-mono">Điểm TSA 2024</p>
                      <p className="text-xl font-bold text-slate-200 flex items-baseline gap-1 mt-0.5">
                        {selectedMajor.tsaScore2024}
                        <span className="text-[10px] font-normal text-slate-400">/100</span>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-mono">Điểm THPT 2023</p>
                      <p className="text-sm font-semibold text-slate-400 mt-0.5">
                        {selectedMajor.thptScore2023}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-mono">Điểm TSA 2023</p>
                      <p className="text-sm font-semibold text-slate-400 mt-0.5">
                        {selectedMajor.tsaScore2023}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-mono">Xu hướng biến động</p>
                    {(() => {
                      const diffTHPT = Number((selectedMajor.thptScore2024 - selectedMajor.thptScore2023).toFixed(2));
                      return (
                        <p className={`text-xs mt-1 font-medium flex items-center gap-1 ${
                          diffTHPT > 0 ? 'text-rose-400' : diffTHPT < 0 ? 'text-emerald-400' : 'text-slate-400'
                        }`}>
                          <TrendingUp className="h-3 w-3 shrink-0" />
                          Điểm chuẩn THPT {diffTHPT > 0 ? `tăng ${diffTHPT}` : diffTHPT < 0 ? `giảm ${Math.abs(diffTHPT)}` : 'ổn định'}
                        </p>
                      );
                    })()}
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-mono">Ước tính học phí</p>
                    <p className="text-sm text-amber-400 font-semibold mt-0.5">
                      ~ {selectedMajor.tuitionFeeMillion} Triệu VND / năm
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-900/60 rounded-lg border border-slate-800/80">
                  <h4 className="text-xs font-bold text-slate-300 uppercase font-mono">Cơ hội nghề nghiệp:</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {selectedMajor.careerProspect}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-900 flex justify-end">
                <a
                  href="#admission-calculator"
                  className="text-xs font-medium text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
                >
                  Tính điểm đỗ ngành này
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          ) : (
            <p className="text-slate-500 text-sm text-center my-auto">Hãy click chọn một ngành trên biểu đồ để xem chi tiết.</p>
          )}
        </div>
      </div>
    </div>
  );
}
