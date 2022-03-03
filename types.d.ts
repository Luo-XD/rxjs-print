// 课表筛选请求对象
declare type GetScreenSingleParams = {
  start_time?: string;
  end_time?: string;
  week?: Array<number>;
  curriculum_id?: Array<number>;
  store_id?: Array<number>;
  date?: Array<string>;
  semester_id?: number;
  status?: Array<1 | 0>;
};

// 筛选项结果
declare type SinglePretty = {
  id: number;
  week: number;
  course: { id: string; alias: string };
  curriculum: { id: number; color: string; bgcolor: string };
  time: string;
  end_time: string;
  teacher: { name: string; id: number };
  store: { id: number; name: string };
};

// 课程对象
declare type CoursePretty = {
  alias: string;
  week: number;
  main_teacher: { id: number; name: string; status: 1 };
  time: string;
  end_time: string;
  curriculum: { id: number; color: string; bgcolor: string };
  store: { id: number; name: string };
  id: string;
};

// 检索项目字段
declare type SelectOptionsPretty = {
  // 详情状态
  course_details_status: { [key: number]: string };
  // 课程
  curriculum_id: { [key: number]: string };
  // 上架
  is_cancels: Array<string>;
  // 线上
  online_class: { [key: number]: string };
  // 学期
  semester_id: Array<{ id: number; semester: string }>;
  // 课程状态
  status: { [key: number]: string };
  teacher_id: { [key: number]: string };
  type: { [key: number]: string };
  store_id: { [key: number]: string };
  week: Array<string>;
};
