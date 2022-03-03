import { from } from 'rxjs';
import { retry, tap } from 'rxjs/operators';

type InitParams = Array<{
  title: string;
  key: string;
  value: { [key: number]: string };
}>;

/**
 * @param dom 渲染父标签
 * @param list 渲染列表
 */
export function filterInit(dom: any, list: Array<InitParams>) {
  from(
    list.concat([
      { title: '开始', key: 'start_time', value: '' },
      { title: '结束', key: 'end_time', value: '' },
    ])
  )
    .pipe(
      // 渲染筛选项目输入框
      tap((option: any) => {
        const item_div = document.createElement('div');
        const item_label = document.createElement('label');
        const item_input = document.createElement('input');
        item_div.classList.add('ckpt-form-item');
        item_label.classList.add('ckpt-label');
        item_label.setAttribute('for', option.key);
        item_label.innerText = `${option.title} :`;
        item_input.classList.add('ckpt-input');
        item_input.setAttribute('id', option.key);
        item_input.setAttribute('placeholder', '选择');
        item_div.append(item_label);
        item_div.append(item_input);
        dom.append(item_div);
        return option;
      })
    )
    .subscribe();
}
