
(function(){
  var grid = document.getElementById('storyGrid');
  var cards = Array.prototype.slice.call(grid.querySelectorAll('.card'));
  var pills = Array.prototype.slice.call(document.querySelectorAll('.pill'));
  var searchInput = document.getElementById('searchInput');
  var sortSelect = document.getElementById('sortSelect');
  var resultCount = document.getElementById('resultCount');
  var emptyState = document.getElementById('emptyState');
  var activeFilter = 'all';

  function apply(){
    var q = (searchInput.value || '').trim().toLowerCase();
    var visible = [];
    cards.forEach(function(card){
      var cats = (card.getAttribute('data-cats') || '').split(' ');
      var matchCat = activeFilter === 'all' || cats.indexOf(activeFilter) !== -1;
      var hay = (card.querySelector('h3').textContent + ' ' + card.querySelector('p').textContent + ' ' + (card.getAttribute('data-search') || '')).toLowerCase();
      var matchQ = !q || hay.indexOf(q) !== -1;
      var show = matchCat && matchQ;
      card.style.display = show ? '' : 'none';
      if (show) visible.push(card);
    });

    var mode = sortSelect.value;
    var sorted = visible.slice().sort(function(a, b){
      if (mode === 'longest') return (+b.getAttribute('data-mins')) - (+a.getAttribute('data-mins'));
      if (mode === 'title') return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
      return b.getAttribute('data-date').localeCompare(a.getAttribute('data-date'));
    });
    sorted.forEach(function(card){ grid.appendChild(card); });

    resultCount.textContent = visible.length === cards.length
      ? 'Showing all ' + cards.length + ' stories'
      : 'Showing ' + visible.length + ' of ' + cards.length + ' stories';
    emptyState.classList.toggle('show', visible.length === 0);
  }

  function setFilter(name){
    activeFilter = name;
    pills.forEach(function(p){ p.setAttribute('aria-pressed', p.getAttribute('data-filter') === name ? 'true' : 'false'); });
    apply();
  }

  pills.forEach(function(p){
    p.addEventListener('click', function(){ setFilter(p.getAttribute('data-filter')); });
  });
  searchInput.addEventListener('input', apply);
  sortSelect.addEventListener('change', apply);
  document.getElementById('resetFilters').addEventListener('click', function(){
    searchInput.value = ''; sortSelect.value = 'newest'; setFilter('all');
  });


  /* Theme toggle — session only, no storage */
  var root = document.documentElement;
  document.getElementById('themeToggle').addEventListener('click', function(){
    var dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var current = root.getAttribute('data-theme');
    var isDark = current ? current === 'dark' : dark;
    root.setAttribute('data-theme', isDark ? 'light' : 'dark');
  });

  apply();
})();
