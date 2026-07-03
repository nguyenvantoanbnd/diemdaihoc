import React, { useState } from 'react';
import { HUST_MAJORS } from '../data';
import { Major } from '../types';
import { Search, Sparkles, CheckCircle2, AlertTriangle, XCircle, Info, Landmark, Cpu, Filter } from 'lucide-react';

interface MajorPredictorProps {
  thptScore: number;
  tsaScore: number;
  ieltsScore: number;
}

export default function MajorPredictor({ thptScore, tsaScore, ieltsScore }: MajorPredictorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<'all' | 'economics' | 'technology'>('all');
  const [method, setMethod] = useState<'thpt' | 'tsa'>('thpt');
  const [chanceFilter, setChanceFilter] = useState<'all' | 'safe' | 'borderline' | 'challenging'>('all');

  // Determine admission chance
  const getChance = (major: Major) => {
    if (method === 'thpt') {
      const diff = thptScore - major.thptScore2024;
      if (diff >= 0.5) return { status: 'safe', label: 'An Toàn', color: 'text-emerald-800 bg-emerald-50 border-emerald-200/60', icon: CheckCircle2 };
      if (diff >= -0.5) return { status: 'borderline', label: 'Cơ Hội', color: 'text-amber-800 bg-amber-50 border-amber-200/60', icon: AlertTriangle };
      return { status: 'challenging', label: 'Thử Thách', color: 'text-[#CE1126] bg-[#CE1126]/5 border-[#CE1126]/10', icon: XCircle };
    } else {
      const diff = tsaScore - major.tsaScore2024;
      if (diff >= 2.0) return { status: 'safe', label: 'An Toàn', color: 'text-emerald-800 bg-emerald-50 border-emerald-200/60', icon: CheckCircle2 };
      if (diff >= -2.0) return { status: 'borderline', label: 'Cơ Hội', color: 'text-amber-800 bg-amber-50 border-amber-200/60', icon: AlertTriangle };
      return { status: 'challenging', label: 'Thử Thách', color: 'text-[#CE1126] bg-[#CE1126]/5 border-[#CE1126]/10', icon: XCircle };
    }
  };

  // Filter majors
  const filteredMajors = HUST_MAJORS.filter((major) => {
    const chance = getChance(major);
    const matchesSearch =
      major.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      major.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === 'all' || major.group === selectedGroup;
    const matchesChance = chanceFilter === 'all' || chance.status === chanceFilter;

    return matchesSearch && matchesGroup && matchesChance;
  });

  return (
    <div className="bg-white rounded-xs border border-black/10 p-6 shadow-xs" id="major-predictor-section">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-black/10 pb-5">
        <div>
          <h2 className="text-xl font-serif font-black text-[#1a1a1a] flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#CE1126]" />
            Bộ dự toán khả năng trúng tuyển HUST 2026
          </h2>
          <p className="text-neutral-500 text-xs sm:text-sm mt-1">
            Hệ thống đối chiếu điểm số của bạn ({method === 'thpt' ? `THPT: ${thptScore.toFixed(2)}` : `TSA: ${tsaScore.toFixed(2)}`}) với điểm chuẩn năm trước để dự báo cơ hội đỗ.
          </p>
        </div>

        {/* Option Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setMethod('thpt')}
            className={`px-4 py-2 rounded-xs text-xs font-mono font-bold border transition-all cursor-pointer ${
              method === 'thpt'
                ? 'bg-[#CE1126] border-[#CE1126] text-white shadow-xs'
                : 'bg-white border-black/15 text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            Theo Điểm THPT (Thang 30)
          </button>
          <button
            onClick={() => setMethod('tsa')}
            className={`px-4 py-2 rounded-xs text-xs font-mono font-bold border transition-all cursor-pointer ${
              method === 'tsa'
                ? 'bg-[#CE1126] border-[#CE1126] text-white shadow-xs'
                : 'bg-white border-black/15 text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            Theo Điểm Tư Duy TSA (Thang 100)
          </button>
        </div>
      </div>

      {/* Control Panel: Search & Advanced Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        {/* Search */}
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Tìm theo mã ngành hoặc tên ngành (ví dụ: EM1, Quản trị, IT1...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-black/15 rounded-xs pl-10 pr-4 py-2 text-sm text-[#1a1a1a] placeholder-neutral-400 focus:border-[#CE1126] focus:outline-none focus:ring-1 focus:ring-[#CE1126]"
          />
        </div>

        {/* Group Selector */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value as any)}
            className="w-full bg-white border border-black/15 rounded-xs pl-10 pr-3 py-2 text-sm text-neutral-700 focus:border-[#CE1126] focus:outline-none cursor-pointer"
          >
            <option value="all">Tất cả Nhóm Ngành</option>
            <option value="economics">Kinh tế & Quản lý</option>
            <option value="technology">Công nghệ & Kỹ thuật</option>
          </select>
        </div>

        {/* Probability Chance Selector */}
        <div className="relative">
          <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <select
            value={chanceFilter}
            onChange={(e) => setChanceFilter(e.target.value as any)}
            className="w-full bg-white border border-black/15 rounded-xs pl-10 pr-3 py-2 text-sm text-neutral-700 focus:border-[#CE1126] focus:outline-none cursor-pointer"
          >
            <option value="all">Tất cả Mức Khả năng</option>
            <option value="safe">Mức An Toàn (Đỗ cao)</option>
            <option value="borderline">Mức Cơ Hội (Sát nút)</option>
            <option value="challenging">Mức Thử Thách</option>
          </select>
        </div>
      </div>

      {/* Majors Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
        {filteredMajors.length > 0 ? (
          filteredMajors.map((major) => {
            const chance = getChance(major);
            const IconComponent = chance.icon;
            const diff = method === 'thpt' ? (thptScore - major.thptScore2024) : (tsaScore - major.tsaScore2024);
            const targetBenchmark = method === 'thpt' ? major.thptScore2024 : major.tsaScore2024;
            const myScoreValue = method === 'thpt' ? thptScore : tsaScore;

            return (
              <div
                key={major.code}
                id={`major-card-${major.code}`}
                className="bg-white border border-black/10 rounded-xs p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#CE1126] bg-[#CE1126]/5 px-2 py-0.5 rounded-xs border border-[#CE1126]/10">
                      {major.code}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs border ${chance.color} flex items-center gap-1`}>
                      <IconComponent className="h-3 w-3" />
                      {chance.label}
                    </span>
                  </div>

                  <h3 className="mt-3 text-sm sm:text-base font-serif font-bold text-neutral-900 line-clamp-2 h-12 leading-snug">
                    {major.name}
                  </h3>

                  <div className="mt-4 grid grid-cols-2 gap-4 bg-[#F4F4F2] p-3 rounded-xs border border-black/5">
                    <div>
                      <span className="text-[10px] text-neutral-500 font-mono block uppercase">Điểm của bạn</span>
                      <strong className="text-sm font-mono text-neutral-800">
                        {myScoreValue.toFixed(2)}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 font-mono block uppercase">Điểm chuẩn '24</span>
                      <strong className="text-sm font-mono text-neutral-800">
                        {targetBenchmark.toFixed(2)}
                      </strong>
                    </div>
                  </div>

                  <div className="mt-3 text-xs font-mono flex items-center gap-1">
                    <span className="text-neutral-500">Chênh lệch:</span>
                    <span className={diff >= 0 ? 'text-emerald-700 font-bold' : 'text-[#CE1126] font-bold'}>
                      {diff >= 0 ? `+${diff.toFixed(2)}` : diff.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-black/5 flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-medium">Học phí: {major.tuitionFeeMillion}M VND/năm</span>
                  <span className="text-neutral-600 flex items-center gap-1">
                    {major.group === 'economics' ? (
                      <span className="flex items-center gap-1 text-amber-800 font-semibold">
                        <Landmark className="h-3.5 w-3.5" /> Kinh tế
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-indigo-900 font-semibold">
                        <Cpu className="h-3.5 w-3.5" /> Công nghệ
                      </span>
                    )}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full bg-[#F4F4F2] rounded-xs border border-black/10 p-8 text-center text-neutral-500 font-mono text-xs">
            Không tìm thấy ngành học nào thỏa mãn bộ lọc hiện tại. Hãy điều chỉnh từ khóa tìm kiếm hoặc mức khả năng của bạn.
          </div>
        )}
      </div>
    </div>
  );
}
