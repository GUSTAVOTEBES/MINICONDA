requireAuth();
const paperId = Number(document.body.dataset.paperId);
const paper = paperDetails.find(item => item.id === paperId);
const titleEl = document.getElementById('paper-title');
const categoryEl = document.getElementById('paper-category');
const videoEl = document.getElementById('paper-video');
const previousEl = document.getElementById('paper-previous');
const nextEl = document.getElementById('paper-next');
const doneEl = document.getElementById('paper-done');
if (!paper) {
  titleEl.textContent = 'Paper not found';
} else {
  document.title = paper.title + ' | UN AMS Study Hub';
  titleEl.textContent = paper.title;
  categoryEl.textContent = paper.category;
  const completed = JSON.parse(localStorage.getItem('un_papers_completed') || '[]');
  const setDoneLabel = () => { doneEl.textContent = completed.includes(paperId) ? 'Completed ✓' : 'Mark as completed'; };
  setDoneLabel();
  doneEl.addEventListener('click', () => {
    const i = completed.indexOf(paperId);
    if (i < 0) completed.push(paperId); else completed.splice(i, 1);
    localStorage.setItem('un_papers_completed', JSON.stringify(completed));
    setDoneLabel();
  });
  const currentIndex = paperDetails.findIndex(item => item.id === paperId);
  if (currentIndex > 0) previousEl.href = 'paper-' + paperDetails[currentIndex - 1].id + '.html'; else previousEl.classList.add('disabled');
  if (currentIndex < paperDetails.length - 1) nextEl.href = 'paper-' + paperDetails[currentIndex + 1].id + '.html'; else nextEl.classList.add('disabled');
  const videoId = paperVideoIds[paperId];
  if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId;
    iframe.title = 'YouTube video for ' + paper.title;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    iframe.className = 'w-100 h-100 border-0 rounded';
    videoEl.replaceChildren(iframe);
  }
}
