import { App } from "@/lib/types.ts";

const appList: App[] = [
  {
    no: 1,
    category: "campus",
    name_en: "UHS Online Booking",
    "name_zh-CN": "香港中文大学保健处网上预约系统",
    "name_zh-HK": "香港中文大學保健處\n網上預約服務",
    url: "https://www.uhs.cuhk.edu.hk/booking/booking/fast.aspx",
    description_en:
      "Book a doctor's appointment through the UHS online service",
    "description_zh-CN": "通过 UHS 在线服务预约医生",
    "description_zh-HK": "通過 UHS 線上服務預約醫生",
  },
  {
    no: 2,
    category: "study",
    name_en: "Chinese University Student Information System (CUHK CUSIS)",
    "name_zh-CN": "中大学生信息系统(CUSIS)功能",
    "name_zh-HK": "中大學生信息系統 (CUSIS)功能",
    url: "https://cusis.cuhk.edu.hk/psp/CSPRD/?cmd=login&languageCd=ENG&",
    description_en: "Select courses and check subject grades through CUSIS",
    "description_zh-CN": "通过 CUSIS 选课和查看科目成绩",
    "description_zh-HK": "通過 CUSIS 選課和查看科目成績",
  },
  {
    no: 3,
    category: "study",
    name_en: "CUHK Library Room Booking System",
    "name_zh-CN": "中大图书馆研读室预约系统",
    "name_zh-HK": "中大圖書館研讀室預約系統",
    url: "https://rbs.lib.cuhk.edu.hk/Booking/Secure/FacilityStatus.aspx",
    description_en:
      "Reserve group study rooms through the CUHK Library Room Booking System",
    "description_zh-CN": "通过中大图书馆预约系统预订小组研讨室",
    "description_zh-HK": "通過中大圖書館預約系統預訂小組研討室",
  },
  {
    no: 4,
    category: "study",
    name_en: "The Chinese University of Hong Kong Library",
    "name_zh-CN": "香港中文大学图书馆",
    "name_zh-HK": "香港中文大學圖書館",
    url: "https://www.lib.cuhk.edu.hk/en/",
    description_en:
      "Search for textbooks and past exam papers available to staff and students",
    "description_zh-CN": "搜索可供教职员和学生使用的教材和过往试卷",
    "description_zh-HK": "搜尋可供教職員和學生使用的教材和過往試卷",
  },
  {
    no: 5,
    category: "job",
    name_en: "Co-op@CUHK",
    "name_zh-CN": "Co-op@CUHK",
    "name_zh-HK": "Co-op@CUHK",
    url: "https://coop.cuhk.edu.hk/about-coop/",
    description_en:
      "Co-op@CUHK offers CUHK students paid, academically accredited work experience to enhance skills and networks",
    "description_zh-CN":
      "Co-op@CUHK 为中大学生提供带薪的工作机会，以提升技能和建立人脉",
    "description_zh-HK":
      "Co-op@CUHK 為中大學生提供帶薪的工作機會，以提升技能和建立人脈",
  },
  {
    no: 6,
    category: "job",
    name_en: "Jijis",
    "name_zh-CN": "Jijis",
    "name_zh-HK": "Jijis",
    url: "https://www.jijis.org.hk/",
    description_en:
      'A "one-stop online job information system for employers and university students.',
    "description_zh-CN": "一个为雇主和大学生提供的「一站式在线职位信息系统」",
    "description_zh-HK": "一個為僱主和大學生提供的「一站式線上職位資訊系統」",
  },
  {
    no: 7,
    category: "campus",
    name_en: "Online Facilities Booking System for PEU Venue",
    "name_zh-CN": "体育部网上订场系统",
    "name_zh-HK": "體育部網上訂場系統",
    url: "https://booking.peu.cuhk.edu.hk/peu_booking/Client/ClientHome/Index",
    description_en:
      "Reserve campus sports facilities through the online booking system of the Sports Department",
    "description_zh-CN": "通过体育部的在线预订系统预订校园体育设施",
    "description_zh-HK": "通過體育部的線上預訂系統預訂校園體育設施",
  },
  {
    no: 8,
    category: "study",
    name_en: "Julac Card Application",
    "name_zh-CN": "Julac Card 申请",
    "name_zh-HK": "Julac Card 申請",
    url: "https://www.lib.cuhk.edu.hk/en/use/other-libraries/julac/å",
    description_en: "Apply for a JULAC Card to access other UGC Libraries",
    "description_zh-CN": "申请 JULAC 卡以访问其他 UGC 图书馆",
    "description_zh-HK": "申請 JULAC 卡以訪問其他 UGC 圖書館",
  },
  {
    no: 9,
    category: "study",
    name_en: "VeriGuide",
    "name_zh-CN": "VeriGuide",
    "name_zh-HK": "维诚",
    url: "https://academic2.veriguide.org/portalcuhk/",
    description_en: "Submit assignments and similarities detectio",
    "description_zh-CN": "提交作业并检测相似度",
    "description_zh-HK": "提交作業並檢測相似度",
  },
  {
    no: 10,
    category: "campus",
    name_en: "CU Link Self-Service System",
    "name_zh-CN": "中大通自助服务系统",
    "name_zh-HK": "中大通自助服務系統",
    url: "https://cloud.itsc.cuhk.edu.hk/CULINK-SelfService/Enquiry.aspx",
    description_en: "Check CU Link Card default PIN",
    "description_zh-CN": "查询 CU Link 卡的预设 PIN 码",
    "description_zh-HK": "查詢 CU Link 卡的預設 PIN 碼",
  },
  {
    no: 11,
    category: "job",
    name_en: "Career Planning and Development Centre (CPDC)",
    "name_zh-CN": "Career Planning and Development Centre (CPDC)",
    "name_zh-HK": "Career Planning and Development Centre (CPDC)",
    url: "https://cpdc.osa.cuhk.edu.hk/en",
    description_en: "Support students' career planning and job hunting",
    "description_zh-CN": "支持学生的职业规划和求职",
    "description_zh-HK": "支援學生的職業規劃和求職",
  },
  {
    no: 12,
    category: "campus",
    name_en: "Registration and Examinations Section, Registry",
    "name_zh-CN": "教务处注册及考试组",
    "name_zh-HK": "教務處註冊及考試組",
    url: "https://www.res.cuhk.edu.hk/en-gb/",
    description_en:
      "Manage student records for undergraduate programs, assisting current students with course registrations, major changes, and related academic matters",
    "description_zh-CN":
      "管理本科生的学籍记录，协助在校生进行个人变更、课程注册、专业变更及相关学术事宜",
    "description_zh-HK":
      "管理本科生的學籍記錄，協助在校生進行個人變更、課程註冊、專業變更及相關學術事宜",
  },
  {
    no: 13,
    category: "campus",
    name_en:
      "The Chinese University of Hong Kong\nUniversity Almanac for the Academic Year 2024-2025\nFull-time Undergraduate Programmes",
    "name_zh-CN": "香港中文大学二零二四至二五年度校历全日制本科课程",
    "name_zh-HK": "香港中文大學\n二零二四至二五年度校曆\n全日制本科課程",
    url: "https://www.res.cuhk.edu.hk/images/content/general_information/UG_Almanac/Calendar-for-Academic-Year--2024-25_Chi_20240612.pdf",
    description_en: "Check the CUHK 2024-2025 Calendar",
    "description_zh-CN": "查看中大 2024-2025 校历",
    "description_zh-HK": "查看中大 2024-2025 校曆",
  },
  {
    no: 14,
    category: "campus",
    name_en: "Triple Uni",
    "name_zh-CN": "Triple Uni",
    "name_zh-HK": "Triple Uni",
    url: "https://login.tripleuni.com/TripleUni",
    description_en:
      "A social platform that connects the communities of HKU Pootal, Ma Liu Shui Beeper at CUHK, and Stardust at HKUST",
    "description_zh-CN":
      "连接港大 Pootal、中大 Ma Liu Shui Beeper 和科大 Stardust 社交的平台",
    "description_zh-HK":
      "連接港大 Pootal、中大 Ma Liu Shui Beeper 和科大 Stardust 社交的平台",
  },
  {
    no: 15,
    category: "campus",
    name_en: "Goop CUHK Talk",
    "name_zh-CN": "Goop CUHK Talk",
    "name_zh-HK": "Goop CUHK Talk",
    url: "https://goop.ai/to?ref=comm.s&i=/invite/dembeat\n",
    description_en:
      "A student community platform for the Chinese University of Hong Kong",
    "description_zh-CN": "香港中文大学的学生社群平台",
    "description_zh-HK": "香港中文大學的學生社群平台",
  },
  {
    no: 16,
    category: "campus",
    name_en: "Wellness and\nConselling Centre",
    "name_zh-CN": "中大心理健康及辅导中心",
    "name_zh-HK": "中大心理健康及辅导中心",
    url: "https://wacc.osa.cuhk.edu.hk/tc/",
    description_en:
      "Provide mental health counseling services for CUHK students",
    "description_zh-CN": "为中大学生提供心理健康辅导服务",
    "description_zh-HK": "為中大學生提供心理健康輔導服務",
  },
  {
    no: 17,
    category: "campus",
    name_en: "CUHK Campus Map",
    "name_zh-CN": "香港中文大学地图",
    "name_zh-HK": "香港中文大學地圖",
    url: "https://www.cuhk.edu.hk/chinese/campus/cuhk-campus-map.html",
    description_en: "Check the CUHK Campus Map",
    "description_zh-CN": "查看中大校园地图",
    "description_zh-HK": "查看中大校園地圖",
  },
  {
    no: 18,
    category: "campus",
    name_en: "CUHK Buildings/Halls Abbreviations\n\n",
    "name_zh-CN": "香港中文大学建筑物缩写",
    "name_zh-HK": "香港中文大學樓宇縮寫",
    url: "http://www.res.cuhk.edu.hk/zh-tw/teaching-timetable-classroom-booking/teaching-timetable/full-time-undergraduate-teaching-timetable/useful-information/buildings-halls",
    description_en: "Check CUHK Building/Hall Abbreviations",
    "description_zh-CN": "查询中大建筑/宿舍缩写",
    "description_zh-HK": "查詢中大建築/宿舍縮寫",
  },
  {
    no: 19,
    category: "campus",
    name_en: "Online Facilities Booking System",
    "name_zh-CN": "香港中文大学设施预约系统",
    "name_zh-HK": "香港中文大學設施預約系統",
    url: "https://www6.cuhk.edu.hk/frs/OSALogin.aspx",
    description_en:
      "Reserve facilities at Pommerenke Student Centre and Yasumoto International Academic Park",
    "description_zh-CN": "预订庞万伦学生中心和康本国际学术园的设施",
    "description_zh-HK": "預訂庞萬倫學生中心和 康本國際學術園的設施",
  },
  {
    no: 20,
    category: "study",
    name_en: "Blackboard",
    "name_zh-CN": "Blackboard网上教学系统",
    "name_zh-HK": "Blackboard 網上教學系統",
    url: "https://blackboard.cuhk.edu.hk/",
    description_en: "Learning Management System of CUHK",
    "description_zh-CN": "香港中文大学学习管理系统",
    "description_zh-HK": "香港中文大學學習管理系統",
  },
  {
    no: 21,
    category: "study",
    name_en: "piazza",
    "name_zh-CN": "piazza论坛",
    "name_zh-HK": "piazza論壇",
    url: "https://piazza.com/",
    description_en: "Discuss course-related questions with TAs and classmates",
    "description_zh-CN": "与助教和同学讨论课程相关问题",
    "description_zh-HK": "與助教和同學討論課程相關問題",
  },
  {
    no: 22,
    category: "campus",
    name_en: "CU Bus - For CUHK Shuttle Bus",
    "name_zh-CN": "CU Bus - For CUHK Shuttle Bus",
    "name_zh-HK": "CU Bus - For CUHK Shuttle Bus",
    url: "https://apps.apple.com/hk/app/cu-bus-for-cuhk-shuttle-bus/id1434225006?l=en-GB",
    description_en: "Check bus routes and estimated arrival times at CUHK",
    "description_zh-CN": "查询中大校园巴士路线和预计到达时间",
    "description_zh-HK": "查詢中大校園巴士路線和預計到達時間",
  },
];

function getAppList(lang?: string): App[] {
  console.log("lang", lang);
  if (!lang) {
    lang = "en";
  }
  return appList.map((app) => ({
    ...app,
    name: app[`name_${lang}` as `name_${"en" | "zh-CN" | "zh-HK"}`],
    description:
      app[`description_${lang}` as `description_${"en" | "zh-CN" | "zh-HK"}`],
  }));
}

export default getAppList;
