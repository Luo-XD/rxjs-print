// 导航按钮点击
export function tabClick(event: any) {
  const { tab } = event.target.dataset;
  for (let dom of document.getElementsByClassName('ckpt-tab-item')) {
    dom.classList.remove('active');
  }
  event.srcElement.classList.add('active');
}
