import { RxHttpMentoh } from '..';

// 课程相关接口
export class CourseApi {
  private axios = new RxHttpMentoh();
  /**课程筛选项*/
  public getCourseFilterOptions() {
    return this.axios.Get<{}, SelectOptionsPretty>(
      '/api/export/courseFilterOptions'
    );
  }

  /**详情筛选*/
  public getScreenSingle(params?: GetScreenSingleParams) {
    return this.axios.Get<GetScreenSingleParams, SinglePretty>(
      '/api/export/courseDetailsData',
      {
        params: params,
      }
    );
  }

  /**模板信息*/
  public getExportInfo() {
    return this.axios.Get('/api/export/info');
  }

  /**排期筛选*/
  public getScreenCourse(params?: GetScreenSingleParams) {
    return this.axios.Get<GetScreenSingleParams, CoursePretty>(
      '/api/export/courseData',
      {
        params: params,
      }
    );
  }
}
