import React from 'react';
import { GraduationCap, Landmark, HelpCircle, Activity } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const tabs = [
    { id: 'overview', name: 'Tổng quan & Phương án 2026', icon: GraduationCap },
    { id: 'charts', name: 'Biểu đồ Điểm chuẩn', icon: Activity },
    { id: 'calculator', name: 'Công cụ Quy đổi & Tính điểm', icon: Landmark },
    { id: 'predictor', name: 'Bộ Dự đoán Ngành đỗ', icon: HelpCircle },
  ];

  return (
    <header className="bg-white text-[#1a1a1a] border-b border-black/10 sticky top-0 z-50 shadow-sm">
      {/* Top Editorial Bar */}
      <div className="border-b border-black/5 bg-white py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center space-x-3">
            <div className="bg-[#CE1126] text-white px-3 py-1.5 font-sans font-extrabold tracking-tighter text-lg leading-none rounded-xs shadow-xs">
              HUST
            </div>
            <div className="h-6 w-[1px] bg-black/10"></div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-neutral-600">
              Dữ liệu Giáo dục & Kinh tế
            </div>
          </div>
          <div className="text-[11px] font-serif italic text-neutral-500 sm:text-right">
            Cập nhật: 2026 / Phân tích bởi Ban Thời sự tuyển sinh
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-2">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#CE1126] block mb-1">
              Khảo sát chuyên đề tuyển sinh
            </span>
            <h1 className="text-2xl sm:text-4.5xl font-serif font-black tracking-tight text-[#1a1a1a] leading-tight">
              Hệ thống Quy đổi & Dự đoán Điểm chuẩn Bách khoa
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-3xl">
              Phân tích cơ cấu điểm số nhóm ngành <span className="font-semibold text-[#1a1a1a]">Kinh tế & Công nghệ</span>. Cung cấp bộ quy đổi chứng chỉ ngoại ngữ và ma trận đối chiếu khả năng trúng tuyển năm học mới.
            </p>
          </div>

          <div className="flex items-center gap-2 border border-black/10 bg-neutral-50 px-3 py-2 rounded text-xs font-mono text-neutral-700 shrink-0">
            <span className="flex h-2 w-2 rounded-full bg-[#CE1126]" />
            <span>Dữ liệu chính thức: Báo Nhân Dân & HUST</span>
          </div>
        </div>

        {/* Tab Navigation with Editorial styling */}
        <div className="border-t border-black/10 mt-6">
          <nav className="flex space-x-2 sm:space-x-6 py-1.5 overflow-x-auto scrollbar-none" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-btn-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-150 cursor-pointer border-b-2 ${
                    isActive
                      ? 'border-[#CE1126] text-[#CE1126] font-extrabold bg-[#CE1126]/5'
                      : 'border-transparent text-neutral-500 hover:text-[#1a1a1a] hover:border-neutral-300'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0 text-[#CE1126]" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
