(() => {
  const key = (n) => `pirandello:${n}:${location.pathname}`;
  const body = document.body;
  const twoBtn = document.getElementById('togglePages');
  if (twoBtn) {
    const saved = localStorage.getItem('pirandello:two-page') === '1';
    body.classList.toggle('two-page', saved);
    twoBtn.setAttribute('aria-pressed', saved ? 'true' : 'false');
    twoBtn.textContent = saved ? '1 pagina' : '2 pagine';
    twoBtn.addEventListener('click', () => {
      const on = !body.classList.contains('two-page');
      body.classList.toggle('two-page', on);
      localStorage.setItem('pirandello:two-page', on ? '1' : '0');
      twoBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
      twoBtn.textContent = on ? '1 pagina' : '2 pagine';
    });
  }

  const fontOut = document.getElementById('fontValue');
  const applyFont = (size) => {
    document.documentElement.style.setProperty('--lesson-font-size', `${size}px`);
    if (fontOut) fontOut.textContent = `${size}px`;
  };
  let font = parseInt(localStorage.getItem('pirandello:font-size') || '18', 10);
  applyFont(font);
  document.getElementById('fontMinus')?.addEventListener('click', () => { font = Math.max(14, font - 1); localStorage.setItem('pirandello:font-size', font); applyFont(font); });
  document.getElementById('fontPlus')?.addEventListener('click', () => { font = Math.min(28, font + 1); localStorage.setItem('pirandello:font-size', font); applyFont(font); });

  const notesPanel = document.getElementById('notesPanel');
  const notesText = document.getElementById('notesText');
  const notesBtn = document.getElementById('toggleNotes');
  if (notesPanel && notesText) {
    notesText.value = localStorage.getItem(key('notes')) || '';
    notesText.addEventListener('input', () => localStorage.setItem(key('notes'), notesText.value));
    notesBtn?.addEventListener('click', () => notesPanel.classList.toggle('open'));
    document.getElementById('closeNotes')?.addEventListener('click', () => notesPanel.classList.remove('open'));
    document.getElementById('clearNotes')?.addEventListener('click', () => { notesText.value = ''; localStorage.setItem(key('notes'), ''); });
    document.getElementById('exportNotes')?.addEventListener('click', () => {
      const blob = new Blob([notesText.value], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = (document.title || 'notes') + '.txt'; a.click();
      URL.revokeObjectURL(a.href);
    });
  }

  const viewer = document.getElementById('imageViewer');
  const viewerImg = document.getElementById('viewerImg');
  let scale = 1;
  const setScale = () => viewerImg && (viewerImg.style.transform = `scale(${scale})`);
  document.querySelectorAll('.lesson-area img').forEach((img) => {
    img.addEventListener('click', () => {
      if (!viewer || !viewerImg) return;
      viewer.classList.add('open');
      viewerImg.src = img.src;
      viewerImg.alt = img.alt || 'Immagine';
      scale = 1; setScale();
    });
  });
  document.getElementById('zoomIn')?.addEventListener('click', () => { scale = Math.min(4, scale + 0.2); setScale(); });
  document.getElementById('zoomOut')?.addEventListener('click', () => { scale = Math.max(0.4, scale - 0.2); setScale(); });
  document.getElementById('zoomReset')?.addEventListener('click', () => { scale = 1; setScale(); });
  document.getElementById('closeViewer')?.addEventListener('click', () => viewer?.classList.remove('open'));
})();
