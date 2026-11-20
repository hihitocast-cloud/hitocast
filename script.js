
(function(){
  /* Story library: topic pill filter (homepage only) */
  var grid = document.getElementById('storyGrid');
  if (grid) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.card'));
    var pills = Array.prototype.slice.call(document.querySelectorAll('.pill'));
    function setFilter(name){
      pills.forEach(function(p){ p.setAttribute('aria-pressed', p.getAttribute('data-filter') === name ? 'true' : 'false'); });
      cards.forEach(function(card){
        var cats = (card.getAttribute('data-cats') || '').split(' ');
        card.style.display = (name === 'all' || cats.indexOf(name) !== -1) ? '' : 'none';
      });
    }
    pills.forEach(function(p){
      p.addEventListener('click', function(){ setFilter(p.getAttribute('data-filter')); });
    });
    var startTopic = new URLSearchParams(window.location.search).get('topic');
    if (startTopic && pills.some(function(p){ return p.getAttribute('data-filter') === startTopic; })) setFilter(startTopic);
  }

  /* Theme toggle — session only, no storage */
  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    var root = document.documentElement;
    toggle.addEventListener('click', function(){
      var dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var current = root.getAttribute('data-theme');
      var isDark = current ? current === 'dark' : dark;
      root.setAttribute('data-theme', isDark ? 'light' : 'dark');
    });
  }
})();
