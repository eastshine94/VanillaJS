const IMG_URL =
  'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public';

export default function ImageViewer(path) {
  if (document.querySelector('.ImageViewer')) {
    return;
  }

  const div = document.createElement('div');
  div.className = 'Modal ImageViewer';
  div.innerHTML = `
    <div class="content">
        <img src=${IMG_URL}${path}>
    </div>
    `;

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      document.body.removeChild(div);
      document.removeEventListener('keydown', handleKeyDown);
    }
  };

  div.addEventListener('click', event => {
    document.body.removeChild(div);
  });

  document.addEventListener('keydown', handleKeyDown);
  document.body.appendChild(div);

  document.querySelector('.content').addEventListener('click', event => {
    event.stopPropagation();
  });
}
