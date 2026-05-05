// ============================================================
// SALE MASTER AI — Toàn bộ dữ liệu đào tạo
// ============================================================

export interface ChecklistItem {
  id: string;
  label: string;
}

export interface Scenario {
  title: string;
  customerSays: string;
  saleResponse: string;
  purpose: string;
}

export interface FAQ {
  question: string;
  answer: string;
  note: string;
}

export interface Rejection {
  type: string;
  handling: string;
  samplePhrase: string;
}

export interface SaleStep {
  step: string;
  goal: string;
  samplePhrases: string[];
}

export interface SaleTool {
  name: string;
  purpose: string;
  usedAt: string;
}

export interface CaseStudy {
  name: string;
  startingPoint: string;
  problem: string;
  result: string;
  useFor: string;
  leadIn: string;
}

export interface CustomerGroup {
  name: string;
  signs: string;
  status: string;
  steps: { step: string; detail: string }[];
  quickRule: string;
}

export interface NurtureStage {
  stage: string;
  sendWhat: string;
  purpose: string;
  extra?: string;
}

export interface IncomePhase {
  phase: string;
  period: string;
  baseSalary: string;
  commission: string;
  kpiMin: string;
  kpiTarget: string;
  commissionPerDeal: string;
  estimatedIncome: string;
  focus: string;
  bonus?: string;
}

export interface ProductTier {
  tier: string;
  label: string;
  items: { name: string; link?: string }[];
}

export interface Mission {
  id: string;
  number: string;
  title: string;
  description: string;
  emoji: string;
  checklist: ChecklistItem[];
  // Content types
  scenarios?: Scenario[];
  faqs?: FAQ[];
  rejections?: Rejection[];
  saleSteps?: SaleStep[];
  leadSources?: string[];
  downsaleStrategy?: string[];
  saleTools?: SaleTool[];
  incomePhases?: IncomePhase[];
  workRules?: { rule: string; detail: string }[];
  caseStudies?: CaseStudy[];
  caseQuickRef?: { customerType: string; caseName: string }[];
  customerGroups?: CustomerGroup[];
  nurtureStages?: NurtureStage[];
  nurtureRules?: string[];
  dailyChecklist?: { time: string; items: string[] }[];
  productTiers?: ProductTier[];
  communityLinks?: { name: string; url: string }[];
  richContent?: string;
}

export interface Roadmap {
  id: string;
  number: number;
  title: string;
  emoji: string;
  description: string;
  detailedDescription: string;
  missions: Mission[];
}

// ============================================================
// LỘ TRÌNH 1: THU NHẬP & HOA HỒNG
// ============================================================

const roadmap1: Roadmap = {
  id: "income",
  number: 1,
  title: "Thu nhập & Hoa hồng",
  emoji: "💰",
  description: "Hiểu rõ cơ cấu thu nhập, hoa hồng và KPI theo từng giai đoạn phát triển",
  detailedDescription: "Bên trong Level 1 bạn sẽ học: Cơ cấu lương cơ bản & hoa hồng theo từng giai đoạn (Học việc → Phát triển → Chiến binh), KPI tối thiểu và mục tiêu hàng tháng, bonus vượt target, và quy tắc làm việc của Phong Menly.",
  missions: [
    {
      id: "income-phase1",
      number: "1.1",
      title: "Giai đoạn Học việc (Tháng 1-3)",
      description: "Nắm vững cơ cấu lương, hoa hồng và KPI trong 3 tháng đầu tiên. Đây là giai đoạn bạn học quy trình, build danh sách lead và shadow Phong chốt đơn.",
      emoji: "🌱",
      incomePhases: [
        {
          phase: "Học việc",
          period: "Tháng 1-3",
          baseSalary: "8.000.000 VND (đảm bảo, không phụ thuộc KPI)",
          commission: "5% / đơn chốt được",
          kpiMin: "20 đơn / tháng",
          kpiTarget: "30 đơn / tháng",
          commissionPerDeal: "67.500 VND (5% x 1.350.000)",
          estimatedIncome: "~9.350.000 VND (nếu đạt 20 đơn: lương 8tr + hoa hồng 1.35tr)",
          focus: "Học quy trình, build danh sách lead, shadow Phong chốt đơn",
        },
      ],
      checklist: [
        { id: "inc1-1", label: "Đã hiểu mức lương cơ bản 8 triệu/tháng" },
        { id: "inc1-2", label: "Đã hiểu cách tính hoa hồng 5%/đơn = 67.500 VND" },
        { id: "inc1-3", label: "Đã hiểu KPI tối thiểu 20 đơn và mục tiêu 30 đơn/tháng" },
        { id: "inc1-4", label: "Đã hiểu trọng tâm: học quy trình + build lead + shadow Phong" },
      ],
    },
    {
      id: "income-phase2",
      number: "1.2",
      title: "Giai đoạn Phát triển (Tháng 4-6)",
      description: "Giai đoạn tăng tốc — lương tăng, hoa hồng tăng lên 10%, và bạn bắt đầu tự vận hành pipeline sale.",
      emoji: "🚀",
      incomePhases: [
        {
          phase: "Phát triển",
          period: "Tháng 4-6",
          baseSalary: "10.000.000 - 12.000.000 VND",
          commission: "10% / đơn chốt được",
          kpiMin: "36 đơn / tháng",
          kpiTarget: "46 đơn / tháng",
          commissionPerDeal: "135.000 VND (10% x 1.350.000)",
          estimatedIncome: "~14.860.000 - 16.860.000 VND (nếu đạt 36 đơn: lương 10-12tr + hoa hồng 4.86tr)",
          focus: "Tự vận hành pipeline, giảm hỏi Phong, bắt đầu upsell",
        },
      ],
      checklist: [
        { id: "inc2-1", label: "Đã hiểu mức lương tăng lên 10-12 triệu/tháng" },
        { id: "inc2-2", label: "Đã hiểu hoa hồng tăng lên 10%/đơn = 135.000 VND" },
        { id: "inc2-3", label: "Đã hiểu KPI tối thiểu 36 đơn và mục tiêu 46 đơn/tháng" },
        { id: "inc2-4", label: "Đã hiểu trọng tâm: tự vận hành + bắt đầu upsell" },
      ],
    },
    {
      id: "income-phase3",
      number: "1.3",
      title: "Giai đoạn Chiến binh (Tháng 7-12)",
      description: "Giai đoạn đỉnh cao — hoa hồng 15%, bonus vượt KPI, tự tạo lead và đào tạo người mới.",
      emoji: "⚔️",
      incomePhases: [
        {
          phase: "Chiến binh",
          period: "Tháng 7-12",
          baseSalary: "13.000.000 - 15.000.000 VND",
          commission: "15% / đơn chốt được",
          kpiMin: "50 đơn / tháng (điều kiện nhận 15% hoa hồng)",
          kpiTarget: "60 đơn / tháng",
          commissionPerDeal: "202.500 VND (15% x 1.350.000)",
          estimatedIncome: "~23.125.000 - 25.125.000 VND (nếu đạt 50 đơn: lương 13-15tr + hoa hồng 10.125tr)",
          focus: "Tự tạo lead, upsell lên premium, đào tạo người mới",
          bonus: "+1.000.000 VND mỗi 10 đơn vượt target",
        },
      ],
      checklist: [
        { id: "inc3-1", label: "Đã hiểu mức lương đỉnh cao 13-15 triệu/tháng" },
        { id: "inc3-2", label: "Đã hiểu hoa hồng 15%/đơn = 202.500 VND + bonus vượt KPI" },
        { id: "inc3-3", label: "Đã hiểu KPI tối thiểu 50 đơn và mục tiêu 60 đơn/tháng" },
        { id: "inc3-4", label: "Đã hiểu trọng tâm: tự tạo lead + upsell premium + đào tạo người mới" },
      ],
    },
    {
      id: "income-rules",
      number: "1.4",
      title: "Quy tắc làm việc Phong Menly",
      description: "Hai quy tắc quan trọng mà mọi VinSale cần ghi nhớ về KPI và thử việc.",
      emoji: "📋",
      workRules: [
        {
          rule: "Quy tắc 1 — KPI tối thiểu",
          detail: "Dưới 70% KPI trong 2 tháng liên tiếp thì review lại hợp đồng",
        },
        {
          rule: "Quy tắc 2 — Thử việc 30 ngày",
          detail: "Tháng đầu nhận 8.000.000 VND thử việc, từ tháng 2 mới áp dụng full cơ cấu",
        },
      ],
      checklist: [
        { id: "rules-1", label: "Đã hiểu quy tắc KPI: dưới 70% trong 2 tháng = review hợp đồng" },
        { id: "rules-2", label: "Đã hiểu quy tắc thử việc: tháng đầu 8tr, từ tháng 2 áp dụng full" },
      ],
    },
  ],
};

// ============================================================
// LỘ TRÌNH 2: KỊCH BẢN BÁN HÀNG & XỬ LÝ TÌNH HUỐNG
// ============================================================

const roadmap2: Roadmap = {
  id: "scripts",
  number: 2,
  title: "Kịch bản bán hàng & Xử lý tình huống",
  emoji: "🎯",
  description: "Nắm vững kịch bản hội thoại, FAQ và cách xử lý từ chối từ khách hàng",
  detailedDescription: "Bên trong Level 2 bạn sẽ học: 6 kịch bản hội thoại thực tế với khách hàng, 7 câu hỏi thường gặp (FAQ) và câu trả lời chuẩn, 5 loại từ chối phổ biến và cách xử lý chuyên nghiệp — phong cách chuyên gia giáo dục, không ép mua.",
  missions: [
    {
      id: "scenarios",
      number: "2.1",
      title: "Kịch bản hội thoại thực tế",
      description: "Phong cách bán hàng cốt lõi: Chuyên gia giáo dục khách hàng. Không chiều khách, không ép mua — dẫn dắt khách tự nhận ra vấn đề và tự muốn mua.",
      emoji: "💬",
      scenarios: [
        {
          title: "Tình huống 1 — Khách hỏi còn slot không",
          customerSays: "Mình còn slot này không thầy? Mình muốn tham gia.",
          saleResponse: "Tạo khan hiếm ngay — \"Còn đúng 1 người cuối đấy, anh gửi thông tin để em đăng ký ngay nhé\"",
          purpose: "Thúc đẩy hành động ngay, không để khách chần chừ",
        },
        {
          title: "Tình huống 2 — Khách hỏi điều kiện học",
          customerSays: "Anh cho em thông tin điều kiện học chương trình đó ntn vậy?",
          saleResponse: "Kiểm tra sự nghiêm túc trước — \"Anh đã xem video của Phong chưa, biết Phong chuyên lĩnh vực gì chưa?\"",
          purpose: "Lọc khách thật sự muốn học, không giải thích dài cho người chưa sẵn sàng",
        },
        {
          title: "Tình huống 3 — Khách muốn làm quá nhiều thứ cùng lúc",
          customerSays: "Nhiều AI quá, không biết bắt đầu từ đâu",
          saleResponse: "Cảnh báo — \"Sẽ nguy hiểm cho nguồn lực của anh/chị giai đoạn đầu nếu lan man. Không lan man, không tham gia lung tung, chỉ tập trung vào một thứ duy nhất.\"",
          purpose: "Định hướng lại, xây dựng niềm tin bằng góc nhìn chuyên gia",
        },
        {
          title: "Tình huống 4 — Khách muốn nhân bản giọng/mặt",
          customerSays: "Nhân bản chính chị đi em",
          saleResponse: "Khẳng định cá nhân hóa — \"Mặt chị, giọng chị, biểu cảm, thần thái... y chị luôn nha\"",
          purpose: "Tạo hứng khởi, khách cảm thấy sản phẩm làm riêng cho họ",
        },
        {
          title: "Tình huống 5 — Khách hỏi nên dùng thiết bị gì",
          customerSays: "Nên dùng máy tính hay điện thoại để thuận tiện nhất?",
          saleResponse: "Định hướng vào chuyên môn của khách trước, thiết bị là vấn đề nhỏ",
          purpose: "Giữ khách tập trung vào giá trị, không vướng vào rào cản nhỏ",
        },
        {
          title: "Tình huống 6 — Khách hỏi học để kiếm tiền không",
          customerSays: "Học để kiếm được tiền thì mới thôi đó ak?",
          saleResponse: "Cam kết — \"Học đến khi nào có kết quả thì mới thôi\"",
          purpose: "Chuyển từ nghi ngờ sang tin tưởng bằng cam kết rõ ràng",
        },
      ],
      checklist: [
        { id: "sc-1", label: "Đã đọc và hiểu 6 tình huống hội thoại thực tế" },
        { id: "sc-2", label: "Đã nắm nguyên tắc: Không chiều khách, không ép mua — dẫn dắt" },
        { id: "sc-3", label: "Đã hiểu cách tạo khan hiếm khi khách hỏi slot" },
        { id: "sc-4", label: "Đã hiểu cách kiểm tra sự nghiêm túc của khách" },
        { id: "sc-5", label: "Đã biết cách định hướng khách khi bị rối" },
      ],
    },
    {
      id: "faq",
      number: "2.2",
      title: "FAQ & Câu trả lời chuẩn",
      description: "7 câu hỏi khách hàng thường gặp nhất và câu trả lời chuẩn đã được kiểm chứng hiệu quả.",
      emoji: "❓",
      faqs: [
        {
          question: "Còn slot tham gia không?",
          answer: "\"Còn đúng 1 người cuối — anh/chị muốn giữ chỗ không để em đăng ký ngay?\"",
          note: "Luôn tạo khan hiếm",
        },
        {
          question: "Điều kiện tham gia là gì?",
          answer: "Hỏi ngược lại — \"Anh/chị đã xem qua nội dung của Phong chưa?\" — lọc khách nghiêm túc trước",
          note: "Không giải thích dài khi chưa biết khách có phù hợp",
        },
        {
          question: "Không có máy tính thì học được không?",
          answer: "\"Đừng bận tâm chuyện đó — chúng ta dùng quy trình để thắng, không phải thiết bị\"",
          note: "Xử lý rào cản thiết bị nhanh gọn",
        },
        {
          question: "Mình lớn tuổi, học có được không?",
          answer: "\"Hệ thống build kể cả người bắt đầu từ số 0 được — năng lực mỗi người mỗi khác\"",
          note: "Xử lý lo ngại tuổi tác",
        },
        {
          question: "Giá bao nhiêu?",
          answer: "\"1.350.000đ — hoặc chính sách 50/50: gửi trước 50$, khi thu nhập x10 mới gửi 50$ còn lại\"",
          note: "Luôn đưa ra cả 2 lựa chọn để khách tự chọn",
        },
        {
          question: "Học bao lâu mới có kết quả?",
          answer: "\"Phong cam kết đồng hành học đến khi nào có kết quả thì mới thôi\"",
          note: "Không hứa timeline cụ thể, nhấn mạnh cam kết đồng hành",
        },
        {
          question: "Có quá nhiều công cụ AI, không biết bắt đầu từ đâu",
          answer: "\"Đó là lý do cần hệ thống — anh/chị đang bỏ qua mỏ vàng từ chính chuyên môn của mình\"",
          note: "Reframe vấn đề thành lý do cần tham gia",
        },
      ],
      checklist: [
        { id: "faq-1", label: "Đã thuộc câu trả lời cho 7 câu hỏi thường gặp" },
        { id: "faq-2", label: "Đã hiểu nguyên tắc tạo khan hiếm khi trả lời" },
        { id: "faq-3", label: "Đã biết cách đưa 2 lựa chọn giá cho khách" },
        { id: "faq-4", label: "Đã biết cách reframe vấn đề thành lý do tham gia" },
      ],
    },
    {
      id: "rejections",
      number: "2.3",
      title: "Xử lý từ chối",
      description: "5 loại từ chối phổ biến nhất và cách xử lý chuyên nghiệp, không tranh luận mà chuyển hướng.",
      emoji: "🛡️",
      rejections: [
        {
          type: "Không có máy tính",
          handling: "Không tranh luận về thiết bị",
          samplePhrase: "\"Đừng bận tâm — chúng ta dùng quy trình để thắng\"",
        },
        {
          type: "Lớn tuổi, sợ không theo kịp",
          handling: "Khẳng định hệ thống dành cho người từ số 0",
          samplePhrase: "\"Hệ thống em build kể cả người bắt đầu từ 0 được\"",
        },
        {
          type: "Nóng lòng muốn kết quả ngay",
          handling: "Làm chậm lại, giữ bình tĩnh cho khách",
          samplePhrase: "\"Nóng lên thì đầu không đủ tỉnh táo đâu. Từ từ đi chị\"",
        },
        {
          type: "Bị rối vì quá nhiều công cụ",
          handling: "Reframe thành điểm mạnh — họ đã tìm ra vấn đề",
          samplePhrase: "\"Vui vì anh/chị đã tìm ra — chạy theo giới trẻ thì không phải cách của mình\"",
        },
        {
          type: "Để sau, chưa muốn quyết định ngay",
          handling: "Phá vỡ tư duy trì hoãn",
          samplePhrase: "\"Nếu chị có cái không được mà không làm gì thì nó vẫn thế thôi\"",
        },
      ],
      checklist: [
        { id: "rej-1", label: "Đã hiểu cách xử lý 5 loại từ chối phổ biến" },
        { id: "rej-2", label: "Đã nắm nguyên tắc: không tranh luận, chuyển hướng" },
        { id: "rej-3", label: "Đã thuộc câu nói mẫu cho mỗi tình huống từ chối" },
      ],
    },
  ],
};

// ============================================================
// LỘ TRÌNH 3: QUY TRÌNH SALE CHUYÊN NGHIỆP
// ============================================================

const roadmap3: Roadmap = {
  id: "process",
  number: 3,
  title: "Quy trình Sale chuyên nghiệp",
  emoji: "📈",
  description: "Nắm vững quy trình từ lead đến chốt, công cụ hàng ngày và cách phân loại khách",
  detailedDescription: "Bên trong Level 3 bạn sẽ học: Quy trình sale 7 bước từ thu lead đến chốt đơn, các công cụ làm việc hàng ngày (Zalo, CRM, Sheet...), cách phân loại 3 nhóm khách hàng (Lạnh, Ấm, Cũ) và chiến lược downsale.",
  missions: [
    {
      id: "sale-process",
      number: "3.1",
      title: "Quy trình Sale từng bước",
      description: "Quy trình bán hàng hoàn chỉnh từ khi tiếp cận lead đến khi chốt sale và chăm sóc sau bán.",
      emoji: "🔄",
      leadSources: [
        "Facebook: Nhắn tin inbox, Ads, Post & Tag trong Group",
        "Zalo: Danh sách có sẵn, Zalo bình chọn",
        "Email: Email marketing",
      ],
      saleSteps: [
        {
          step: "Bước 0 & 3 — Làm thân & Kéo gần khoảng cách",
          goal: "Biến người lạ thành bạn bè, tạo thiện cảm ngay lập tức",
          samplePhrases: [
            "\"Chắc anh theo dõi em lâu rồi phải không?\"",
            "\"Ô sao anh biết được em chuyên trong lĩnh vực này hay thế\"",
            "\"Hello anh, anh biết em à?\"",
            "\"Coi như chị có duyên với em?\"",
          ],
        },
        {
          step: "Bước 1 — Thu lead & Xác thực lead",
          goal: "Kiểm tra khách đã biết Phong chưa, có đúng đối tượng không",
          samplePhrases: [
            "\"Anh đã xem video của em hay biết em là chuyên gia về lĩnh vực gì chưa?\"",
            "\"Anh có từng xem video trên kênh YouTube của em chưa?\"",
            "\"Anh xem thích gì mà anh lại muốn làm việc với em thế?\"",
          ],
        },
        {
          step: "Bước 2 — Hẹn gặp & Tiếp cận thông tin thụ động",
          goal: "Đưa khách vào phễu nội dung để họ tự thuyết phục bản thân",
          samplePhrases: [
            "\"Ai giới thiệu cho anh biết em chuyên về mảng này?\"",
            "\"Đây là kênh em, anh có follow kênh này chưa?\"",
            "\"Anh đã thấy những dự án nào em làm mà anh thấy hợp với cách làm đó chưa?\"",
          ],
        },
        {
          step: "Bước 4 — Xác định nhu cầu thực tế",
          goal: "Đào sâu để biết chính xác vấn đề khách cần giải quyết",
          samplePhrases: [
            "\"Anh muốn ứng dụng AI vào việc bán hàng hay làm affiliate vậy anh?\"",
            "\"Anh muốn em giúp gì cho anh không?\"",
            "\"Cụ thể là sao anh nói rõ em biết được không?\"",
          ],
        },
        {
          step: "Bước 5 — Đặt câu hỏi ngược & Xử lý từ chối trước",
          goal: "Khiến khách tự cam kết, đưa ra phương án tài chính an toàn",
          samplePhrases: [
            "\"Nếu như tham gia thì mỗi ngày anh dành được bao nhiêu cho mảng này?\"",
            "\"Sau này có kết quả anh có sẵn sàng chia sẻ và giới thiệu cho người khác biết em không?\"",
            "\"Em ưu tiên anh chỉ cần gửi 1 nửa, khi nào thu nhập x10 anh mới cần gửi em phần còn lại cho yên tâm\"",
          ],
        },
        {
          step: "Bước 6 — Gửi thông tin đăng ký (Landing Page)",
          goal: "Chốt hạ bằng tài liệu lộ trình làm việc chi tiết",
          samplePhrases: [
            "\"Thế bây giờ em gửi anh thông tin chính xác những gì anh em chúng ta sẽ làm việc với nhau nhé\"",
          ],
        },
        {
          step: "Bước cuối — Follow up & Chăm sóc sau đăng ký",
          goal: "Đảm bảo khách được onboard đầy đủ",
          samplePhrases: [
            "Hướng dẫn đăng nhập Whop và kích hoạt quyền lợi",
            "Gửi thông tin lịch buổi huấn luyện Zoom hàng tuần (tối thứ 4)",
            "Gửi link app thực hành nhiệm vụ tân thủ",
            "Kết bạn và đưa vào nhóm Zalo cộng đồng",
            "Xin lời giới thiệu từ khách hàng mới",
          ],
        },
      ],
      downsaleStrategy: [
        "YouTube: Điều hướng xem kênh tự học miễn phí",
        "Gói video 10$ + tặng 1 buổi Zoom: Cho khách trải nghiệm nhẹ trước",
      ],
      checklist: [
        { id: "proc-1", label: "Đã hiểu 3 nguồn lead chính (Facebook, Zalo, Email)" },
        { id: "proc-2", label: "Đã nắm vững 7 bước quy trình sale" },
        { id: "proc-3", label: "Đã thuộc câu mẫu cho mỗi bước" },
        { id: "proc-4", label: "Đã hiểu chiến thuật downsale khi khách chưa sẵn sàng" },
        { id: "proc-5", label: "Đã hiểu quy trình chăm sóc sau đăng ký" },
      ],
    },
    {
      id: "tools",
      number: "3.2",
      title: "Công cụ Sale hàng ngày",
      description: "Danh sách đầy đủ các công cụ Sale sử dụng mỗi ngày, mục đích và thời điểm sử dụng trong quy trình.",
      emoji: "🛠️",
      saleTools: [
        { name: "Facebook Inbox", purpose: "Tiếp cận lead, nhắn tin cá nhân", usedAt: "Bước 0 đến Bước 5" },
        { name: "Facebook Ads", purpose: "Tạo lead mới", usedAt: "Đầu phễu" },
        { name: "Facebook Group", purpose: "Post, tag để thu hút lead", usedAt: "Đầu phễu" },
        { name: "Zalo", purpose: "Danh sách lead có sẵn + nhóm cộng đồng sau mua", usedAt: "Toàn bộ quy trình" },
        { name: "Email", purpose: "Nurture lead lạnh", usedAt: "Đầu phễu" },
        { name: "YouTube", purpose: "Điều hướng khách tự học, downsale", usedAt: "Bước 2 & downsale" },
        { name: "Landing page", purpose: "Gửi thông tin đăng ký chính thức", usedAt: "Bước 6" },
        { name: "Whop", purpose: "Cộng đồng + Huấn luyện + Dự án Affiliate", usedAt: "Sau chốt" },
        { name: "Zoom", purpose: "Buổi huấn luyện hàng tuần tối thứ 4", usedAt: "Sau chốt" },
        { name: "Lovable App", purpose: "Nhiệm vụ tân thủ, lộ trình thực hành", usedAt: "Sau chốt" },
      ],
      checklist: [
        { id: "tools-1", label: "Đã biết 10 công cụ sale sử dụng hàng ngày" },
        { id: "tools-2", label: "Đã hiểu mục đích và thời điểm sử dụng từng công cụ" },
        { id: "tools-3", label: "Đã biết link Whop cộng đồng" },
      ],
    },
    {
      id: "customer-groups",
      number: "3.3",
      title: "Phân loại 3 nhóm khách hàng",
      description: "Cách nhận biết và phản ứng linh hoạt với 3 nhóm khách: Lạnh, Ấm và Cũ.",
      emoji: "👥",
      customerGroups: [
        {
          name: "Nhóm 1 — Khách lạnh (Cold Lead)",
          signs: "Vừa thấy bài đăng, nhắn tin lần đầu, chưa biết Phong là ai, chưa xem video",
          status: "Chưa có niềm tin, chưa có nhu cầu rõ ràng",
          steps: [
            { step: "Bước 1", detail: "Làm thân, kéo gần khoảng cách — \"Chắc anh/chị theo dõi Phong lâu rồi phải không?\"" },
            { step: "Bước 2", detail: "Kiểm tra họ biết gì về Phong — \"Anh/chị đã xem video của Phong chưa, biết Phong chuyên về lĩnh vực gì chưa?\"" },
            { step: "Bước 3", detail: "Nếu chưa biết gì → Gửi YouTube trước — \"Để em gửi anh/chị xem qua kênh này trước nhé, rồi mình nói chuyện tiếp\"" },
            { step: "Bước 4", detail: "Nếu đã biết → Hỏi nhu cầu thực tế — \"Anh/chị muốn ứng dụng AI vào bán hàng hay làm affiliate?\"" },
            { step: "Bước 5", detail: "Chưa chốt được → Downsale — \"Anh/chị thử gói 10$ trải nghiệm 1 buổi Zoom với Phong trước nhé\"" },
          ],
          quickRule: "Đừng bán — hãy làm thân và gửi YouTube trước",
        },
        {
          name: "Nhóm 2 — Khách ấm (Warm Lead)",
          signs: "Đã theo dõi một thời gian, đã hỏi giá, đã xem video, đang cân nhắc đăng ký",
          status: "Có niềm tin, đang so sánh và chờ lý do để quyết định",
          steps: [
            { step: "Bước 1", detail: "Xác nhận họ đã biết đủ chưa — \"Anh/chị đã xem lộ trình mình làm việc với nhau chưa?\"" },
            { step: "Bước 2", detail: "Kể đúng case study phù hợp — Tra bảng Bài 7, chọn đúng người giống khách" },
            { step: "Bước 3", detail: "Đưa ra chính sách 50/50 — \"Em ưu tiên anh/chị chỉ cần gửi trước 50$, khi thu nhập x10 mới cần gửi phần còn lại\"" },
            { step: "Bước 4", detail: "Tạo khan hiếm — \"Còn đúng 1 slot — anh/chị muốn giữ chỗ không để em đăng ký ngay?\"" },
            { step: "Bước 5", detail: "Gửi QR chốt ngay — Gửi mã QR + \"Anh/chị đăng ký 1.350.000đ ở đây nhé\"" },
          ],
          quickRule: "Kể đúng case study + chính sách 50/50 + chốt ngay",
        },
        {
          name: "Nhóm 3 — Khách cũ (Existing Member)",
          signs: "Đã từng mua, đang trong cộng đồng Zalo/Whop, cần nâng cấp hoặc đăng ký dịch vụ mới",
          status: "Niềm tin cao, cần được nhắc nhở và hướng dẫn thêm",
          steps: [
            { step: "Bước 1", detail: "Hỏi thăm kết quả — \"Dạo này anh/chị đang làm tới bước nào rồi ạ?\"" },
            { step: "Bước 2", detail: "Giới thiệu gói mới / công cụ affiliate mới — \"Bên em vừa có thêm chương trình mới — em nghĩ hợp với anh/chị lắm\"" },
            { step: "Bước 3", detail: "Nhắc gia hạn trước khi hết hạn — \"Tài khoản anh/chị sắp hết hạn — em hỗ trợ gia hạn luôn nhé\"" },
            { step: "Bước 4", detail: "Xin lời giới thiệu — \"Anh/chị có ai muốn làm theo hướng này không, em có thể hỗ trợ họ như đã hỗ trợ anh/chị\"" },
            { step: "Bước 5", detail: "Đưa vào cộng đồng sâu hơn — Mời lên Whop, tham gia dự án affiliate chung" },
          ],
          quickRule: "Hỏi thăm kết quả + giới thiệu gói mới + xin referral",
        },
      ],
      checklist: [
        { id: "cg-1", label: "Đã hiểu cách nhận biết khách lạnh, ấm, cũ" },
        { id: "cg-2", label: "Đã nắm 5 bước phản ứng cho mỗi nhóm khách" },
        { id: "cg-3", label: "Đã thuộc quy tắc ghi nhớ 1 dòng cho mỗi nhóm" },
        { id: "cg-4", label: "Đã biết khi nào dùng downsale cho khách lạnh" },
      ],
    },
  ],
};

// ============================================================
// LỘ TRÌNH 4: CASE STUDY & NURTURE
// ============================================================

const roadmap4: Roadmap = {
  id: "casestudy",
  number: 4,
  title: "Case Study & Nurture",
  emoji: "📚",
  description: "Học từ case study thực tế, nắm quy trình nurture và checklist làm việc hàng ngày",
  detailedDescription: "Bên trong Level 4 bạn sẽ học: 8 case study thực tế từ học viên, quy trình nurture khách hàng qua 5 giai đoạn, checklist làm việc hàng ngày (sáng — trong ngày — tối), và toàn bộ hệ sinh thái sản phẩm KOL AI System.",
  missions: [
    {
      id: "case-studies",
      number: "4.1",
      title: "8 Case Study thực tế",
      description: "8 câu chuyện thật từ học viên — mỗi case study là một vũ khí để bạn kể đúng cho đúng khách hàng.",
      emoji: "📖",
      caseStudies: [
        {
          name: "Chị Madam Lan",
          startingPoint: "Chủ doanh nghiệp bận rộn",
          problem: "Mệt mỏi vì áp lực vận hành, chi phí thuê nhân sự, áp lực khách hàng",
          result: "Làm Affiliate AI chỉ với 1 chiếc máy tính, tạo thu nhập ở bất kỳ đâu, tìm lại niềm vui",
          useFor: "Chủ doanh nghiệp bận rộn, mệt mỏi với vận hành",
          leadIn: "\"Có một chị cũng là chủ doanh nghiệp, bận y như anh/chị...\"",
        },
        {
          name: "Anh Dương",
          startingPoint: "Nhà đầu tư, kinh doanh, yêu thích công nghệ",
          problem: "Có vốn, có kinh nghiệm nhưng thiếu kỹ năng công nghệ thực chiến",
          result: "Xây hệ thống bán hàng tự động, sở hữu nhân vật ảo quảng bá 24/7, thu nhập 2.000$/tháng",
          useFor: "Nhà đầu tư, người có vốn muốn thêm kênh công nghệ",
          leadIn: "\"Anh Dương cũng xuất phát từ đầu tư, giờ có thêm hệ thống tự động kiếm $2.000/tháng...\"",
        },
        {
          name: "Chị Trần Phương",
          startingPoint: "Kế toán, áp lực công việc văn phòng",
          problem: "Không biết bắt đầu từ đâu, không rõ mình làm lĩnh vực gì",
          result: "Chọn Affiliate AI, trở thành đại sứ thương hiệu, có cộng đồng lớn, thu nhập 2.000-5.000$/tháng, tự do bên con cái",
          useFor: "Dân văn phòng, áp lực, muốn thêm thu nhập",
          leadIn: "\"Chị ấy làm kế toán, cũng không biết bắt đầu từ đâu — giờ 5.000$/tháng...\"",
        },
        {
          name: "Anh Hùng",
          startingPoint: "Chuyên gia lập trình, hệ thống tự động",
          problem: "Giỏi kỹ thuật nhưng thiếu hoàn toàn kỹ năng bán hàng và marketing",
          result: "Xây hệ thống bán hàng tự động, có cộng đồng ủng hộ, dùng sức ảnh hưởng hợp tác doanh nghiệp",
          useFor: "Dân kỹ thuật, lập trình, thiếu kỹ năng bán hàng",
          leadIn: "\"Anh Hùng giỏi công nghệ hơn nhiều người nhưng vẫn thiếu đúng 1 thứ...\"",
        },
        {
          name: "Chị Diễm",
          startingPoint: "Chủ SPA, mô hình offline khó khăn",
          problem: "Áp lực mặt bằng, nhân công, ngành SPA ngày càng cạnh tranh",
          result: "Chuyển online, Affiliate AI, thu nhập ổn định không cần mặt bằng, kiếm tiền từ content",
          useFor: "Kinh doanh offline khó khăn, muốn chuyển online",
          leadIn: "\"Chị Diễm làm SPA, ngành khó không kém — giờ không cần mặt bằng vẫn có thu nhập...\"",
        },
        {
          name: "Chị Cẩm Trinh & Chị Loan",
          startingPoint: "Đào tạo AI cho người mới",
          problem: "Bế tắc với mô hình đào tạo thuần túy, không mở rộng được thu nhập",
          result: "Tích hợp Affiliate AI vào hệ thống, học viên cùng kiếm tiền với chị, tăng uy tín cộng đồng",
          useFor: "Người đang đào tạo, muốn thêm nguồn thu từ cộng đồng",
          leadIn: "\"Hai chị đào tạo AI mà bế tắc — tìm ra Affiliate AI, giờ học viên kiếm tiền cùng chị...\"",
        },
        {
          name: "Bạn Phường LAB",
          startingPoint: "Công nhân, muốn khởi nghiệp",
          problem: "Thử đào tạo và bán tool AI nhưng không có sức bền",
          result: "Làm KOL AI, đại sứ thương hiệu, có hội viên, thu nhập thụ động, công việc hoàn toàn mới",
          useFor: "Người lao động, muốn đổi nghề, bắt đầu từ số 0",
          leadIn: "\"Bạn này xuất phát từ công nhân — giờ có thu nhập thụ động hoàn toàn từ AI...\"",
        },
        {
          name: "Anh Hữu & Vợ",
          startingPoint: "Chủ quán cà phê + vợ bán mỹ phẩm",
          problem: "Tốn kém chi phí sản xuất nội dung, marketing không hiệu quả",
          result: "Tự làm AI marketing, xây nhân vật AI quảng bá thương hiệu 24/7, không phụ thuộc người mẫu",
          useFor: "Chủ kinh doanh nhỏ, tốn chi phí content và quảng cáo",
          leadIn: "\"Anh này bán cà phê và mỹ phẩm — giờ nhân vật AI quảng bá thương hiệu 24/7 không cần trả lương...\"",
        },
      ],
      caseQuickRef: [
        { customerType: "Chủ doanh nghiệp bận rộn, mệt vì vận hành", caseName: "Chị Madam Lan" },
        { customerType: "Nhà đầu tư, có vốn, muốn thêm kênh công nghệ", caseName: "Anh Dương" },
        { customerType: "Dân văn phòng, áp lực, muốn thêm thu nhập", caseName: "Chị Trần Phương" },
        { customerType: "Dân kỹ thuật, lập trình, thiếu kỹ năng bán hàng", caseName: "Anh Hùng" },
        { customerType: "Kinh doanh offline khó khăn, muốn chuyển online", caseName: "Chị Diễm" },
        { customerType: "Đang đào tạo, muốn thêm nguồn thu từ cộng đồng", caseName: "Chị Cẩm Trinh & Chị Loan" },
        { customerType: "Người lao động, muốn đổi nghề, bắt đầu từ 0", caseName: "Bạn Phường LAB" },
        { customerType: "Chủ kinh doanh nhỏ, tốn chi phí content/quảng cáo", caseName: "Anh Hữu & Vợ" },
      ],
      checklist: [
        { id: "cs-1", label: "Đã đọc và hiểu đầy đủ 8 case study" },
        { id: "cs-2", label: "Đã thuộc bảng tra nhanh: loại khách → dùng case nào" },
        { id: "cs-3", label: "Đã biết câu dẫn vào chuyện cho mỗi case" },
        { id: "cs-4", label: "Đã hiểu cách chọn case study phù hợp với từng khách" },
      ],
    },
    {
      id: "nurture",
      number: "4.2",
      title: "Nội dung Nurture & Quy tắc",
      description: "Cách nuôi dưỡng khách hàng qua từng giai đoạn, từ khách mới đến khách im lặng.",
      emoji: "🌿",
      nurtureStages: [
        {
          stage: "Khách mới hỏi, chưa biết Phong là ai",
          sendWhat: "Link YouTube channel",
          purpose: "Cho khách tự xem, tự thuyết phục",
          extra: "Thêm link video cụ thể hay nhất",
        },
        {
          stage: "Khách quan tâm nhưng chưa quyết định",
          sendWhat: "Case study khách hàng (8 case ở Bài 7)",
          purpose: "Khách tự thấy mình trong câu chuyện người khác",
          extra: "Thêm link bài viết Facebook",
        },
        {
          stage: "Khách phân vân về giá",
          sendWhat: "Downsale — gói video 10$ + 1 buổi Zoom",
          purpose: "Cho trải nghiệm nhẹ trước, giảm rào cản tài chính",
        },
        {
          stage: "Khách cần xem lộ trình trước khi mua",
          sendWhat: "Landing page thông tin lộ trình",
          purpose: "Cho thấy hệ thống rõ ràng và chuyên nghiệp",
        },
        {
          stage: "Khách im lặng, chưa phản hồi",
          sendWhat: "Nhắn follow up kèm nội dung mới",
          purpose: "Giữ kết nối, không bị quên",
          extra: "Thêm template tin nhắn follow up",
        },
      ],
      nurtureRules: [
        "Không bán ngay lần đầu tiếp cận — chỉ tạo kết nối và hỏi thăm",
        "Gửi giá trị trước khi gửi offer — YouTube, case study, tài liệu miễn phí",
        "Follow up tối đa 3 lần nếu không phản hồi: Lần 1 ngay sau khi nói chuyện, Lần 2 sau 3 ngày, Lần 3 sau 7 ngày",
        "Downsale thay vì để khách đi — mời gói 10$ nếu chưa sẵn sàng mua core",
        "Dùng đúng case study cho đúng người — tra bảng Bài 7",
      ],
      checklist: [
        { id: "nur-1", label: "Đã hiểu 5 giai đoạn nurture và gửi gì cho mỗi giai đoạn" },
        { id: "nur-2", label: "Đã thuộc 5 quy tắc nurture cho sale" },
        { id: "nur-3", label: "Đã hiểu quy tắc follow up 3 lần" },
        { id: "nur-4", label: "Đã biết khi nào dùng downsale" },
      ],
    },
    {
      id: "daily-checklist",
      number: "4.3",
      title: "Checklist Sale hàng ngày",
      description: "Danh sách việc cần làm mỗi ngày — sáng, trong ngày và tối — để đảm bảo hiệu suất cao nhất.",
      emoji: "✅",
      dailyChecklist: [
        {
          time: "🌅 Sáng",
          items: [
            "Kiểm tra inbox Facebook, Zalo — phân loại khách theo 3 nhóm",
            "Xác định khách nào đang ở bước nào trong quy trình",
            "Lên danh sách cần liên hệ trong ngày",
          ],
        },
        {
          time: "☀️ Trong ngày",
          items: [
            "Tiếp cận lead mới — áp dụng Bước 0 (làm thân trước)",
            "Follow up khách ấm — kể đúng case study + đưa ra 50/50",
            "Chăm sóc khách cũ — hỏi thăm kết quả + giới thiệu gói mới",
          ],
        },
        {
          time: "🌙 Tối",
          items: [
            "Báo cáo số đơn trong ngày",
            "Ghi lại câu hỏi / tình huống mới chưa xử lý được để hỏi Phong",
          ],
        },
      ],
      checklist: [
        { id: "dc-1", label: "Đã hiểu 3 việc cần làm buổi sáng" },
        { id: "dc-2", label: "Đã hiểu 3 việc cần làm trong ngày" },
        { id: "dc-3", label: "Đã hiểu 2 việc cần làm buổi tối" },
      ],
    },
    {
      id: "ecosystem",
      number: "4.4",
      title: "Hệ sinh thái sản phẩm",
      description: "Toàn bộ phễu sản phẩm từ FREE đến PREMIUM và các kênh cộng đồng của KOL AI System.",
      emoji: "🌐",
      productTiers: [
        {
          tier: "FREE",
          label: "Thu hút lead",
          items: [
            { name: "Ebook: Các công cụ AI giúp kiếm tiền nhanh" },
            { name: "Video hướng dẫn trên YouTube", link: "https://www.youtube.com/@Phongmenlyaigoglobalus" },
            { name: "Bộ Prompt mẫu (viết content, video, affiliate)" },
            { name: "Webinar / video hướng dẫn miễn phí" },
          ],
        },
        {
          tier: "ENTRY",
          label: "Chuyển người xem thành khách hàng",
          items: [
            { name: "Workshop: 100.000 VND", link: "https://workshopaiagnet.lovable.app" },
            { name: "Member VIP KOL AI System: 50$", link: "https://memberkolaisystem.lovable.app" },
            { name: "Quà tặng bản tin 1 năm (miễn phí)", link: "https://quatangkolai.lovable.app" },
          ],
        },
        {
          tier: "CORE",
          label: "Nguồn doanh thu chính",
          items: [
            { name: "Khóa huấn luyện Building KOL AI System", link: "https://buildingkolaisystem.lovable.app" },
            { name: "AI Tool AI Influencer: 25$/tháng" },
            { name: "Tư vấn 1:1: 100$/giờ" },
            { name: "Nhiệm vụ tân thủ thành viên mới", link: "https://thanthukolaisystem.lovable.app" },
          ],
        },
        {
          tier: "PREMIUM",
          label: "Scale nhanh",
          items: [
            { name: "Xây dựng hệ thống AI tự động" },
            { name: "Setup funnel kiếm tiền với AI Agent" },
            { name: "Tư vấn và vận hành hệ thống" },
          ],
        },
      ],
      communityLinks: [
        { name: "Whop", url: "https://whop.com/kolaigoglobal?a=phongtyphu" },
        { name: "Facebook", url: "https://www.facebook.com/phong.menly.2024/" },
        { name: "TikTok", url: "https://www.tiktok.com/@phongmenlyai" },
        { name: "YouTube", url: "https://www.youtube.com/@Phongmenlyaigoglobalus" },
        { name: "Website", url: "https://kolaisystem2026.lovable.app/" },
      ],
      checklist: [
        { id: "eco-1", label: "Đã hiểu phễu sản phẩm: FREE → ENTRY → CORE → PREMIUM" },
        { id: "eco-2", label: "Đã biết giá và link của từng sản phẩm" },
        { id: "eco-3", label: "Đã biết các kênh cộng đồng (Whop, Facebook, TikTok, YouTube)" },
        { id: "eco-4", label: "Đã hiểu cách dùng phễu để tư vấn khách hàng" },
      ],
    },
  ],
};

// ============================================================
// EXPORT
// ============================================================

export const roadmaps: Roadmap[] = [roadmap1, roadmap2, roadmap3, roadmap4];