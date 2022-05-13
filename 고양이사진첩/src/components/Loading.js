export default function Loading(isLoading) {
  if (isLoading) {
    if (document.querySelector('.Loading')) {
      return;
    }
    const div = document.createElement('div');
    div.className = 'Modal Loading';
    div.innerHTML = `
      <div class="content">
          <img src="./assets/nyan-cat.gif">
      </div>
      `;
    document.body.appendChild(div);
  } else {
    const node = document.querySelector('.Loading');
    if (node) {
      document.body.removeChild(node);
    }
  }
}
