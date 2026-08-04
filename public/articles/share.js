/* Humanometer — article share buttons. No dependencies; reads the page's own
   OG metadata so the same markup works unchanged on every article.
   The shared graphic + title + description come from each page's OG tags. */
(function () {
  function meta(p) { var m = document.querySelector('meta[property="' + p + '"]'); return m ? m.content : ''; }
  var url = meta('og:url') || location.href.split('#')[0];
  var title = meta('og:title') || document.title;
  var desc = meta('og:description') || '';
  var e = encodeURIComponent;
  var targets = {
    x: 'https://twitter.com/intent/tweet?text=' + e(title) + '&url=' + e(url),
    linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=' + e(url),
    facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + e(url)
  };
  function pop(u) { window.open(u, '_blank', 'noopener,noreferrer,width=600,height=640'); }
  function flash(msg) {
    var s = document.querySelector('.share-copied');
    if (!s) return;
    s.textContent = msg;
    clearTimeout(flash._t);
    flash._t = setTimeout(function () { s.textContent = ''; }, 1800);
  }
  function copy() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () { flash('Link copied ✓'); }, legacy);
    } else { legacy(); }
    function legacy() {
      var t = document.createElement('textarea');
      t.value = url; t.setAttribute('readonly', '');
      t.style.position = 'absolute'; t.style.left = '-9999px';
      document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); flash('Link copied ✓'); }
      catch (err) { flash('Press Ctrl+C to copy'); }
      document.body.removeChild(t);
    }
  }
  document.querySelectorAll('[data-share]').forEach(function (btn) {
    var kind = btn.getAttribute('data-share');
    btn.addEventListener('click', function (ev) {
      ev.preventDefault();
      if (kind === 'copy') return copy();
      if (kind === 'native') { if (navigator.share) navigator.share({ title: title, text: desc, url: url }).catch(function () {}); return; }
      if (targets[kind]) pop(targets[kind]);
    });
  });
  var nb = document.querySelector('[data-share="native"]');
  if (nb && navigator.share) nb.style.display = '';
})();
