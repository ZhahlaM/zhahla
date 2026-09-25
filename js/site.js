(function () {
  var frames = Array.prototype.slice.call(document.querySelectorAll('.frame'));
  var dlg = document.getElementById('lightbox');
  var img = document.getElementById('lb-img');
  var title = document.getElementById('lb-title');
  var meta = document.getElementById('lb-meta');
  var current = 0;

  function show(i) {
    current = (i + frames.length) % frames.length;
    var f = frames[current];
    var src = f.querySelector('img');
    img.src = src.getAttribute('src');
    img.alt = src.alt;
    title.textContent = f.querySelector('.title').textContent;
    meta.textContent = f.querySelector('figcaption .label').textContent;
  }
  frames.forEach(function (f, i) {
    f.querySelector('button').addEventListener('click', function () {
      show(i);
      if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    });
  });
  document.getElementById('lb-prev').addEventListener('click', function () { show(current - 1); });
  document.getElementById('lb-next').addEventListener('click', function () { show(current + 1); });
  document.getElementById('lb-close').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target.classList.contains('lb-inner')) dlg.close(); });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  var copyBtn = document.getElementById('copy-email');
  if (copyBtn) copyBtn.addEventListener('click', function () {
    var text = document.getElementById('email').textContent;
    function done() { copyBtn.textContent = 'Copied'; setTimeout(function () { copyBtn.textContent = 'Copy email'; }, 1800); }
    function fallback() {
      var r = document.createRange(); r.selectNodeContents(document.getElementById('email'));
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      copyBtn.textContent = 'Selected, press Ctrl+C';
    }
    try { navigator.clipboard.writeText(text).then(done, fallback); } catch (e) { fallback(); }
  });
})();
