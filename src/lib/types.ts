interface Timeslot {
  timeslot_type: string;
  timeslot_venue: string;
  timeslot_weekday: string;
  timeslot_display: string;
  timeslot_start_time: number;
  timeslot_end_time: number;
  timeslot_date_list: string[];
}

interface Subclass {
  course_code: string;
  subclass_enrollment_status: string;
  subclass_id: number;
  subclass_number: number;
  subclass_section: string;
  subclass_term: string;
  subclass_type: string;
  subclass_year: string;
  subclass_instructor_list: {
    instructor_name: string;
    instructor_id: number;
  }[];
  timeslot_list: Timeslot[];
}

interface Review {
  review_id: number;
  course_code?: string;
  course_title?: string;
  review_course_content: string;
  review_instructor_content: string;
  review_workload_level: 1 | 2 | 3 | 4 | 5;
  review_recommend_level: 1 | 2 | 3 | 4 | 5;
  review_grade: string;
  review_create_time: number;
  review_year: string;
  review_term: string;
  review_instructor: string;
}

interface CourseDetails {
  [key: string]: any;
  course_code: string;
  course_title: string;
  course_type: string;
  course_department?: string;
  course_faculty?: string;
  course_career: string;
  course_unit: string;
  course_grading_basis: string;
  course_add_consent: string | null;
  course_drop_consent: string | null;
  course_requirement: string;
  course_description: string;
  course_review_count: number;
  course_is_enrolled: boolean;
  course_workload_level: number;
  course_workload_level_list: (1 | 2 | 3 | 4 | 5)[];
  course_recommend_level: number;
  course_recommend_level_list: (1 | 2 | 3 | 4 | 5)[];
  subclass_list: Subclass[];
  review_list: Review[];
  must_reads?: string;
  recommended_books?: string;
}

interface CourseDetailApiResponse {
  code: number;
  course_detail: CourseDetails;
}

interface CalendarListApiResponse {
  calendar_display: string;
  calendar_end_time: number;
  calendar_start_time: number;
  calendar_term: string;
  calendar_type: string;
  calendar_venue: string;
  calendar_weekday: string;
  calendar_year: string;
  course_detail: CourseDetails;
  subclass_detail: Subclass;
}

interface App {
  no?: number;
  name?: string;
  name_en: string;
  "name_zh-CN": string;
  "name_zh-HK": string;
  description?: string;
  description_en: string;
  "description_zh-CN": string;
  "description_zh-HK": string;
  icon?: string;
  url: string;
  category?: "campus" | "study" | "job";
}

export type {
  App,
  Review,
  CourseDetails,
  CourseDetailApiResponse,
  CalendarListApiResponse,
};
