export function correctMarginMain() {
  const headerHeight = document.querySelector('header').offsetHeight;
  document.querySelector('main').style.marginTop = headerHeight + 'px';
}

