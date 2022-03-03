import { fromEvent, Observable } from 'rxjs';
import { map, retry, tap } from 'rxjs/operators';
import { filterInit } from './components/filter';
import { tabClick } from './components/tabs';
import { RxRequest } from './plugins/request';
import './style.scss';

// Open the console in the bottom right to see results.
function pageData() {
  let tabIndex = 0;
  const apis = new RxRequest();
  const completen_obervable = Observable.create((observable) => {
    if (document.readyState == 'complete') {
      observable.next();
    } else {
      observable.error();
    }
  });
  // 初始化
  function init() {
    completen_obervable.pipe(retry(5)).subscribe(() => {
      tabsInit();
      apis.courseApi
        .getCourseFilterOptions()
        .pipe(
          map((data_init: SelectOptionsPretty) => {
            // 参数的处理,生成对应的渲染对象
            const {
              course_details_status,
              semester_id,
              curriculum_id,
              type,
              store_id,
              status,
              is_cancels,
              online_class,
              teacher_id,
              week,
            } = data_init;
            const list: any = [
              {
                title: '学期',
                key: 'semester_id',
                value: semester_id,
              },
              {
                title: '上架',
                key: 'status',
                value: status,
              },
              {
                title: '周几',
                key: 'week',
                value: week,
              },
              {
                title: '课程',
                key: 'curriculum_id',
                value: curriculum_id,
              },
              {
                title: '状态',
                key: 'is_cancels',
                value: is_cancels,
              },
              {
                title: '详情状态',
                key: 'course_details_status',
                value: course_details_status,
              },
              {
                title: '类型',
                key: 'type',
                value: type,
              },
              {
                title: '教师',
                key: 'teacher_id',
                value: teacher_id,
              },
              {
                title: '门店',
                key: 'store_id',
                value: store_id,
              },
              {
                title: '线上',
                key: 'online_class',
                value: online_class,
              },
            ];

            filterInit(document.getElementById('filter'), list);
            return data_init;
          })
        )
        .subscribe();
    });
  }
  // tab按钮事件初始化
  async function tabsInit() {
    fromEvent(document.getElementsByClassName('ckpt-tab-item'), 'click')
      .pipe(
        tap((event) => {
          tabClick(event);
        })
      )
      .subscribe();
  }
  return {
    pageInit: init,
  };
}
const ck_page = pageData();
ck_page.pageInit();
