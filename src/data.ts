import { Major, CertificateConversion } from './types';

export const HUST_MAJORS: Major[] = [
  // Kinh tế & Quản lý (Economics & Management)
  {
    code: 'EM1',
    name: 'Quản trị Kinh doanh (Business Administration)',
    group: 'economics',
    thptScore2024: 25.68,
    tsaScore2024: 56.50,
    thptScore2023: 25.83,
    tsaScore2023: 55.20,
    hasMainSubject: false,
    tuitionFeeMillion: 30,
    careerProspect: 'Trở thành quản lý dự án, chuyên viên phát triển kinh doanh, nhà tư vấn doanh nghiệp hoặc khởi nghiệp kinh doanh.'
  },
  {
    code: 'EM2',
    name: 'Kế toán (Accounting)',
    group: 'economics',
    thptScore2024: 25.22,
    tsaScore2024: 54.10,
    thptScore2023: 25.40,
    tsaScore2023: 53.00,
    hasMainSubject: false,
    tuitionFeeMillion: 30,
    careerProspect: 'Kế toán viên, kiểm toán viên, chuyên viên phân tích tài chính tại các công ty kiểm toán quốc tế (Big 4) và tập đoàn.'
  },
  {
    code: 'EM3',
    name: 'Tài chính - Ngân hàng (Finance & Banking)',
    group: 'economics',
    thptScore2024: 25.75,
    tsaScore2024: 55.80,
    thptScore2023: 25.90,
    tsaScore2023: 54.50,
    hasMainSubject: false,
    tuitionFeeMillion: 30,
    careerProspect: 'Nhà phân tích đầu tư, chuyên viên quản trị rủi ro, chuyên viên tín dụng hoặc giao dịch viên tại các ngân hàng thương mại và quỹ đầu tư.'
  },
  {
    code: 'EM4',
    name: 'Phân tích Kinh doanh (Business Analytics)',
    group: 'economics',
    thptScore2024: 26.15,
    tsaScore2024: 58.20,
    thptScore2023: 26.25,
    tsaScore2023: 57.00,
    hasMainSubject: true, // Math is main subject
    tuitionFeeMillion: 35,
    careerProspect: 'Chuyên viên phân tích dữ liệu kinh doanh (BA), hoạch định chiến lược kinh tế số, tối ưu hóa vận hành dựa trên công nghệ và dữ liệu.'
  },
  {
    code: 'EM5',
    name: 'Logistics và Quản lý chuỗi cung ứng (Logistics & Supply Chain Management)',
    group: 'economics',
    thptScore2024: 26.54,
    tsaScore2024: 60.30,
    thptScore2023: 26.60,
    tsaScore2023: 59.50,
    hasMainSubject: true,
    tuitionFeeMillion: 35,
    careerProspect: 'Quản lý kho bãi, chuyên viên điều phối vận tải toàn cầu, thiết kế mạng lưới cung ứng tại các công ty đa quốc gia và cảng biển quốc tế.'
  },
  {
    code: 'EM-E14',
    name: 'Quản trị Khách sạn và Du lịch (Hospitality & Tourism Management)',
    group: 'economics',
    thptScore2024: 24.85,
    tsaScore2024: 52.50,
    thptScore2023: 24.95,
    tsaScore2023: 51.00,
    hasMainSubject: false,
    tuitionFeeMillion: 40,
    careerProspect: 'Quản lý chuỗi khách sạn nghỉ dưỡng cao cấp, điều hành du lịch quốc tế, tổ chức sự kiện quy mô lớn.'
  },

  // Công nghệ & Kỹ thuật (Technology & Engineering)
  {
    code: 'IT1',
    name: 'Khoa học Máy tính (Computer Science)',
    group: 'technology',
    thptScore2024: 28.29,
    tsaScore2024: 83.90,
    thptScore2023: 29.42,
    tsaScore2023: 82.50,
    hasMainSubject: true,
    tuitionFeeMillion: 35,
    careerProspect: 'Kỹ sư phần mềm cốt lõi, chuyên gia nghiên cứu AI/ML, kiến trúc sư hệ thống phần mềm hiệu năng cao tại các tập đoàn công nghệ lớn.'
  },
  {
    code: 'IT2',
    name: 'Kỹ thuật Máy tính (Computer Engineering)',
    group: 'technology',
    thptScore2024: 28.18,
    tsaScore2024: 73.19,
    thptScore2023: 28.80,
    tsaScore2023: 72.00,
    hasMainSubject: true,
    tuitionFeeMillion: 35,
    careerProspect: 'Kỹ sư thiết kế vi mạch (IC/ASIC), phát triển hệ thống nhúng (Embedded Systems), thiết kế phần cứng thông minh cho thiết bị IoT.'
  },
  {
    code: 'IT-E10',
    name: 'Khoa học Dữ liệu và Trí tuệ Nhân tạo (Data Science & AI)',
    group: 'technology',
    thptScore2024: 28.15,
    tsaScore2024: 75.31,
    thptScore2023: 29.01,
    tsaScore2023: 74.50,
    hasMainSubject: true,
    tuitionFeeMillion: 60,
    careerProspect: 'Nhà khoa học dữ liệu (Data Scientist), kỹ sư học máy (Machine Learning Engineer), chuyên viên nghiên cứu và ứng dụng AI trong tài chính và y tế.'
  },
  {
    code: 'IT-E6',
    name: 'An toàn Không gian mạng (Cyber Security)',
    group: 'technology',
    thptScore2024: 27.60,
    tsaScore2024: 73.10,
    thptScore2023: 28.05,
    tsaScore2023: 71.50,
    hasMainSubject: true,
    tuitionFeeMillion: 55,
    careerProspect: 'Chuyên gia bảo mật thông tin, kỹ sư phòng thủ mạng, chuyên viên kiểm thử xâm nhập (Penetration Tester) bảo vệ tài nguyên số quốc gia.'
  },
  {
    code: 'IT-E7',
    name: 'Công nghệ Thông tin Global ICT',
    group: 'technology',
    thptScore2024: 27.85,
    tsaScore2024: 74.00,
    thptScore2023: 28.20,
    tsaScore2023: 73.00,
    hasMainSubject: true,
    tuitionFeeMillion: 55,
    careerProspect: 'Kỹ sư phần mềm toàn cầu, quản lý dự án CNTT đa quốc gia, làm việc tại thị trường nói tiếng Anh hoặc Nhật Bản.'
  },
  {
    code: 'EE2',
    name: 'Kỹ thuật Điều khiển và Tự động hóa (Control & Automation Engineering)',
    group: 'technology',
    thptScore2024: 26.95,
    tsaScore2024: 65.00,
    thptScore2023: 27.55,
    tsaScore2023: 63.80,
    hasMainSubject: true,
    tuitionFeeMillion: 32,
    careerProspect: 'Kỹ sư tự động hóa nhà máy thông minh, lập trình hệ thống PLC/SCADA, phát triển hệ thống điều khiển tự động cho ô tô, robot.'
  },
  {
    code: 'MS1',
    name: 'Kỹ thuật Cơ điện tử (Mechatronics Engineering)',
    group: 'technology',
    thptScore2024: 26.75,
    tsaScore2024: 63.50,
    thptScore2023: 27.20,
    tsaScore2023: 62.00,
    hasMainSubject: true,
    tuitionFeeMillion: 32,
    careerProspect: 'Kỹ sư cơ điện tử, thiết kế và chế tạo robot, tự động hóa thiết bị gia dụng và công nghiệp thông minh.'
  },
  {
    code: 'ET1',
    name: 'Kỹ thuật Điện tử - Viễn thông (Electronics & Telecom Engineering)',
    group: 'technology',
    thptScore2024: 26.50,
    tsaScore2024: 61.20,
    thptScore2023: 26.95,
    tsaScore2023: 60.50,
    hasMainSubject: true,
    tuitionFeeMillion: 30,
    careerProspect: 'Kỹ sư viễn thông 5G/6G, thiết kế mạch điện tử thông minh, kỹ sư phát triển mạng kết nối di động và truyền dẫn.'
  },
  {
    code: 'EE1',
    name: 'Kỹ thuật Điện (Electrical Engineering)',
    group: 'technology',
    thptScore2024: 25.80,
    tsaScore2024: 58.50,
    thptScore2023: 26.10,
    tsaScore2023: 57.00,
    hasMainSubject: true,
    tuitionFeeMillion: 28,
    careerProspect: 'Kỹ sư hệ thống điện truyền tải, chuyên viên tư vấn năng lượng tái tạo, quản lý lưới điện thông minh (Smart Grid).'
  }
];

export const IELTS_CONVERSIONS: CertificateConversion[] = [
  { ielts: 5.0, toefl: 45, convertedEnglishScore: 8.5 },
  { ielts: 5.5, toefl: 60, convertedEnglishScore: 9.0 },
  { ielts: 6.0, toefl: 70, convertedEnglishScore: 9.5 },
  { ielts: 6.5, toefl: 80, convertedEnglishScore: 10.0 },
  { ielts: 7.0, toefl: 94, convertedEnglishScore: 10.0 },
  { ielts: 7.5, toefl: 102, convertedEnglishScore: 10.0 },
  { ielts: 8.0, toefl: 110, convertedEnglishScore: 10.0 },
  { ielts: 8.5, toefl: 115, convertedEnglishScore: 10.0 },
  { ielts: 9.0, toefl: 120, convertedEnglishScore: 10.0 }
];

export const TSA_SECTIONS = [
  { id: 'math', name: 'Tư duy Toán học', maxScore: 40, duration: '60 phút', description: 'Trắc nghiệm nhiều lựa chọn, kéo thả, trả lời ngắn.' },
  { id: 'reading', name: 'Tư duy Đọc hiểu', maxScore: 20, duration: '30 phút', description: 'Đọc hiểu các văn bản khoa học, kỹ thuật, văn học.' },
  { id: 'science', name: 'Tư duy Khoa học / Giải quyết vấn đề', maxScore: 40, duration: '60 phút', description: 'Phân tích số liệu khoa học, thí nghiệm vật lý, hóa học, sinh học.' }
];
