import React, { useState } from 'react';
import Header from './components/Header';
import AdmissionsChart from './components/AdmissionsChart';
import ScoreCalculator from './components/ScoreCalculator';
import MajorPredictor from './components/MajorPredictor';
import { IELTS_CONVERSIONS } from './data';
import {
  GraduationCap,
  Award,
  Zap,
  BookOpen,
  Calendar,
  CheckCircle2,
  FileText,
  Landmark,
  Cpu,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Calculated state synced across widgets
  const [scores, setScores] = useState({
    thptScore: 25.68,
    tsaScore: 65.0,
    ieltsScore: 6.5,
    convertedEnglish: 10.0,
  });

  const handleScoreCalculated = (newScores: {
    thptScore: number;
    tsaScore: number;
    ieltsScore: number;
    convertedEnglish: number;
  }) => {
    setScores(newScores);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1a1a1a] selection:bg-[#CE1126] selection:text-white">
      {/* Top Header & Tab Navigation */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-fade-in">
            {/* Hero / Promo Section - Styled like a premium editorial cover story */}
            <div className="relative overflow-hidden bg-[#F4F4F2] rounded-xs border border-black/15 p-6 sm:p-10 shadow-xs">
              <div className="absolute top-0 right-0 w-80 h-80 bg-neutral-200/50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

              <div className="relative max-w-4xl">
                <span className="text-[10px] font-mono font-bold text-[#CE1126] bg-[#CE1126]/5 px-3 py-1 rounded-sm border border-[#CE1126]/20 uppercase tracking-wider">
                  Cập nhật phương án tuyển sinh 2026
                </span>
                <h2 className="mt-4 text-3xl sm:text-5xl font-serif font-black text-[#1a1a1a] tracking-tight leading-tight">
                  Tối ưu hóa điểm chuẩn Đại học Bách khoa Hà Nội
                </h2>
                <p className="mt-4 text-sm sm:text-base text-neutral-700 leading-relaxed max-w-3xl font-sans">
                  Để tăng khả năng trúng tuyển vào các ngành học có nhu cầu kinh tế xã hội cực cao như <strong className="text-[#CE1126] font-bold">Logistics (EM5)</strong>, <strong className="text-[#CE1126] font-bold">Phân tích Kinh doanh (EM4)</strong> hay <strong className="text-[#CE1126] font-bold">Khoa học Máy tính (IT1)</strong>, học sinh cần nắm chắc phương pháp quy đổi điểm IELTS/TOEFL và điểm thi tư duy TSA mới nhất.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveTab('calculator')}
                    className="px-6 py-3 bg-[#CE1126] hover:bg-[#CE1126]/90 text-white font-bold text-xs uppercase tracking-wider rounded-xs cursor-pointer shadow-sm transition-all flex items-center gap-2"
                  >
                    Quy đổi chứng chỉ của bạn
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab('charts')}
                    className="px-6 py-3 bg-white hover:bg-neutral-50 text-neutral-800 border border-black/15 font-bold text-xs uppercase tracking-wider rounded-xs cursor-pointer transition-all"
                  >
                    So sánh điểm chuẩn 2023-2024
                  </button>
                </div>
              </div>
            </div>

            {/* Three Main Admission Paths */}
            <div>
              <h3 className="text-sm font-bold font-serif text-neutral-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="h-2 w-2 bg-[#CE1126]" />
                3 Phương thức tuyển sinh trọng tâm của HUST
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Method 1 */}
                <div className="bg-white border border-black/10 rounded-xs p-6 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-[#CE1126]/10 border border-[#CE1126]/20 rounded-xs text-[#CE1126]">
                      <Award className="h-5 w-5" />
                    </span>
                    <h4 className="font-serif font-bold text-base text-[#1a1a1a]">1. Xét tuyển Tài năng (XTTN)</h4>
                  </div>
                  <p className="mt-3 text-xs text-neutral-600 leading-relaxed">
                    Dành cho học sinh có giải quốc gia/quốc tế, học sinh trường chuyên có thành tích xuất sắc, hoặc thí sinh sở hữu chứng chỉ quốc tế cao cấp như <strong className="text-neutral-800">SAT (≥ 1300), ACT (≥ 26)</strong> kết hợp học bạ.
                  </p>
                  <div className="mt-5 pt-3 border-t border-black/5 text-[11px] font-mono text-neutral-500 flex items-center justify-between">
                    <span>Trọng số học bạ: 40%</span>
                    <span>Chứng chỉ: 60%</span>
                  </div>
                </div>

                {/* Method 2 */}
                <div className="bg-white border border-black/10 rounded-xs p-6 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-[#CE1126]/10 border border-[#CE1126]/20 rounded-xs text-[#CE1126]">
                      <Zap className="h-5 w-5" />
                    </span>
                    <h4 className="font-serif font-bold text-base text-[#1a1a1a]">2. Xét tuyển bằng Tư duy (TSA)</h4>
                  </div>
                  <p className="mt-3 text-xs text-neutral-600 leading-relaxed">
                    Sử dụng điểm từ kỳ thi Đánh giá tư duy do HUST chủ trì gồm 3 phần thi: Toán học, Đọc hiểu và Khoa học giải quyết vấn đề. Thang điểm tổng là <strong className="text-neutral-800">100 điểm</strong>.
                  </p>
                  <div className="mt-5 pt-3 border-t border-black/5 text-[11px] font-mono text-neutral-500 flex items-center justify-between">
                    <span>Thời lượng: 150 phút</span>
                    <span>Hình thức: Máy tính</span>
                  </div>
                </div>

                {/* Method 3 */}
                <div className="bg-white border border-black/10 rounded-xs p-6 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-[#CE1126]/10 border border-[#CE1126]/20 rounded-xs text-[#CE1126]">
                      <BookOpen className="h-5 w-5" />
                    </span>
                    <h4 className="font-serif font-bold text-base text-[#1a1a1a]">3. Xét tuyển bằng THPT</h4>
                  </div>
                  <p className="mt-3 text-xs text-neutral-600 leading-relaxed">
                    Dành cho thí sinh thi tốt nghiệp THPT truyền thống (tổ hợp A00, A01, D01, D07). Thí sinh có thể chọn <strong className="text-neutral-800">quy đổi chứng chỉ IELTS</strong> để lấy điểm 10 tuyệt đối thay cho bài thi ngoại ngữ.
                  </p>
                  <div className="mt-5 pt-3 border-t border-black/5 text-[11px] font-mono text-neutral-500 flex items-center justify-between">
                    <span>Thang điểm: 30 điểm</span>
                    <span>Áp dụng hệ số 2 môn Toán</span>
                  </div>
                </div>
              </div>
            </div>

            {/* IELTS Conversion Matrix & HUST Admission Calendar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white border border-black/10 rounded-xs p-6 shadow-xs">
                <h3 className="text-base font-serif font-bold text-[#1a1a1a] flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-[#CE1126]" />
                  Bảng quy đổi chứng chỉ Tiếng Anh chính thức tại HUST
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                  Thí sinh có chứng chỉ IELTS / TOEFL iBT được quy đổi sang điểm thi Tiếng Anh (thang 10) để xét tuyển tổ hợp tương ứng. Dưới đây là bảng chuyển đổi tương đương:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-black/10 text-neutral-500 font-mono">
                        <th className="py-2.5 px-3 uppercase tracking-wider">IELTS Score</th>
                        <th className="py-2.5 px-3 uppercase tracking-wider">TOEFL iBT Score</th>
                        <th className="py-2.5 px-3 text-right uppercase tracking-wider">Điểm Quy Đổi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5 font-mono text-neutral-700">
                      {IELTS_CONVERSIONS.map((item) => (
                        <tr
                          key={item.ielts}
                          className={`hover:bg-neutral-50 transition-colors ${
                            item.ielts === scores.ieltsScore ? 'bg-[#CE1126]/5 text-[#CE1126] font-bold' : ''
                          }`}
                        >
                          <td className="py-2.5 px-3">IELTS {item.ielts.toFixed(1)}</td>
                          <td className="py-2.5 px-3">≥ {item.toefl}</td>
                          <td className="py-2.5 px-3 text-right text-[#CE1126] font-bold">
                            {item.convertedEnglishScore.toFixed(1)} / 10.0
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* HUST Admission Calendar & Milestones */}
              <div className="lg:col-span-1 bg-[#F4F4F2] border border-black/10 rounded-xs p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-serif font-bold text-[#1a1a1a] flex items-center gap-2 mb-4">
                    <Calendar className="h-5 w-5 text-[#CE1126]" />
                    Lịch trình dự kiến 2026
                  </h3>

                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <span className="h-6 w-6 rounded-full bg-[#CE1126] text-white text-[11px] font-serif font-bold flex items-center justify-center shrink-0 mt-0.5">
                        1
                      </span>
                      <div>
                        <p className="text-xs font-bold text-[#1a1a1a]">Đăng ký Xét tuyển Tài năng (XTTN)</p>
                        <p className="text-[10px] text-neutral-500 font-mono">Thời gian: Tháng 4 - Tháng 5, 2026</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <span className="h-6 w-6 rounded-full bg-[#CE1126] text-white text-[11px] font-serif font-bold flex items-center justify-center shrink-0 mt-0.5">
                        2
                      </span>
                      <div>
                        <p className="text-xs font-bold text-[#1a1a1a]">Tổ chức các đợt thi tư duy TSA</p>
                        <p className="text-[10px] text-neutral-500 font-mono">Thời gian: Tháng 12/2025 - Tháng 5/2026</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <span className="h-6 w-6 rounded-full bg-[#CE1126] text-white text-[11px] font-serif font-bold flex items-center justify-center shrink-0 mt-0.5">
                        3
                      </span>
                      <div>
                        <p className="text-xs font-bold text-[#1a1a1a]">Kỳ thi Tốt nghiệp THPT Quốc gia</p>
                        <p className="text-[10px] text-neutral-500 font-mono">Thời gian: Cuối tháng 6, 2026</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <span className="h-6 w-6 rounded-full bg-[#CE1126] text-white text-[11px] font-serif font-bold flex items-center justify-center shrink-0 mt-0.5">
                        4
                      </span>
                      <div>
                        <p className="text-xs font-bold text-[#1a1a1a]">Công bố điểm chuẩn đỗ chính thức</p>
                        <p className="text-[10px] text-neutral-500 font-mono">Thời gian: Tháng 8, 2026</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-black/10 text-xs text-neutral-600">
                  <span className="font-bold text-[#CE1126]">Lời khuyên:</span> Học sinh nên tham gia ít nhất 2 đợt thi TSA để tích lũy điểm cao nhất trước khi nộp hồ sơ xét tuyển.
                </div>
              </div>
            </div>

            {/* Economics & Engineering Integration info block */}
            <div className="bg-white border border-black/10 rounded-xs p-6 sm:p-8">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#CE1126]" />
                Cơ hội kinh tế khi theo học các ngành lai ghép Công nghệ - Kinh tế tại HUST
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-neutral-600 leading-relaxed">
                <div>
                  <p>
                    Đại học Bách khoa Hà Nội không chỉ nổi tiếng với khối kỹ thuật nặng, mà hiện nay <strong className="text-neutral-900 font-semibold">Trường Kinh tế và Quản lý HUST</strong> đang là lựa chọn ưu tú của thí sinh nhờ triết lý giảng dạy ứng dụng mạnh mẽ kỹ năng phân tích định lượng và công nghệ thông tin.
                  </p>
                  <p className="mt-3">
                    Các ngành học tiên phong như <strong className="text-[#CE1126] font-semibold">Phân tích Kinh doanh (EM4)</strong> hay <strong className="text-[#CE1126] font-semibold">Logistics & Quản lý chuỗi cung ứng (EM5)</strong> có điểm chuẩn tăng vọt trong những năm gần đây (vượt 26 điểm tốt nghiệp) vì sinh viên tốt nghiệp sở hữu nền tảng công nghệ ưu việt hơn hẳn cử nhân kinh tế thuần túy.
                  </p>
                </div>
                <div>
                  <div className="bg-[#F4F4F2] p-5 rounded-xs border border-black/5 space-y-3 text-xs text-neutral-700 font-sans">
                    <div className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#CE1126] shrink-0" />
                      <span><strong>Thu nhập vượt trội:</strong> Sinh viên tốt nghiệp ngành EM4/EM5 làm việc tại các quỹ đầu tư, công ty công nghiệp số và hãng logistics đa quốc gia với mức lương khởi điểm cao hơn 25-30% so với mặt bằng chung.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#CE1126] shrink-0" />
                      <span><strong>Nhu cầu nhân lực bùng nổ:</strong> Việt Nam đang vươn lên thành trung tâm logistics và công nghiệp bán dẫn của khu vực, mở ra hàng ngàn cơ hội nghề nghiệp chất lượng cao mỗi năm cho các kỹ sư tài năng toán-tin.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COMPARISON CHARTS TAB */}
        {activeTab === 'charts' && (
          <div className="space-y-6 animate-fade-in">
            <AdmissionsChart />
          </div>
        )}

        {/* SCORE CALCULATOR TAB */}
        {activeTab === 'calculator' && (
          <div className="space-y-6 animate-fade-in">
            <ScoreCalculator onCalculated={handleScoreCalculated} />
          </div>
        )}

        {/* MAJOR PREDICTOR TAB */}
        {activeTab === 'predictor' && (
          <div className="space-y-6 animate-fade-in">
            {/* Quick Score Banner */}
            <div className="bg-[#F4F4F2] border border-black/10 rounded-xs p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-[#CE1126]/10 rounded-xs text-[#CE1126] border border-[#CE1126]/20">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-serif font-bold text-neutral-800">Điểm số hiện tại của bạn đang xét:</h3>
                  <p className="text-xs text-neutral-500 mt-0.5">Bạn có thể quay lại tab "Công cụ Quy đổi & Tính điểm" bất cứ lúc nào để thay đổi.</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-xs font-mono bg-white px-4 py-2.5 rounded-xs border border-black/10">
                <span className="text-neutral-700">THPT: <strong className="text-[#CE1126] text-sm">{scores.thptScore.toFixed(2)} / 30</strong></span>
                <span className="text-neutral-700">TSA: <strong className="text-[#CE1126] text-sm">{scores.tsaScore.toFixed(2)} / 100</strong></span>
                <span className="text-neutral-700">IELTS: <strong className="text-[#CE1126] text-sm">{scores.ieltsScore.toFixed(1)}</strong></span>
              </div>
            </div>

            <MajorPredictor
              thptScore={scores.thptScore}
              tsaScore={scores.tsaScore}
              ieltsScore={scores.ieltsScore}
            />
          </div>
        )}
      </main>

      {/* Elegant minimalist Footer */}
      <footer className="bg-white border-t border-black/10 py-10 text-center text-xs text-neutral-500 font-sans mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-left">&copy; 2026 Hệ thống Dự tính & Quy đổi Điểm chuẩn Đại học Bách khoa Hà Nội.</p>
          <p className="text-right text-[10px] uppercase tracking-wider font-bold text-neutral-400">Thiết kế bởi Editorial Hub</p>
        </div>
      </footer>
    </div>
  );
}

