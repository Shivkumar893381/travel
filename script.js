
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileCloseBtn = document.querySelector('.mobile-nav-close');
  mobileMenuBtn.addEventListener('click', () => {
    const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', String(!expanded));
    if (!expanded) {
      mobileNav.classList.add('show');
      mobileNav.setAttribute('aria-hidden', 'false');
      // Focus first link
      const firstLink = mobileNav.querySelector('a');
      if (firstLink) firstLink.tabIndex = 0;
      firstLink?.focus();
    } else {
      mobileNav.classList.remove('show');
      mobileNav.setAttribute('aria-hidden', 'true');
    }
  });
  mobileCloseBtn.addEventListener('click', () => {
    mobileNav.classList.remove('show');
    mobileNav.setAttribute('aria-hidden', 'true');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.focus();
  });
  mobileNav.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      mobileNav.classList.remove('show');
      mobileNav.setAttribute('aria-hidden', 'true');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileMenuBtn.focus();
    }
  });

  // Articles data for searching - note URLs are anchors to article IDs on page
  const articles = [
    {id: 'article-1', title: 'Global Summit 2025 Charts a Path to Climate Resilience', keywords: ['global','summit','climate','resilience','leaders','countries','action'], section: 'world-news'},
    {id: 'article-2', title: 'Historic Peace Treaty Signed in Middle East', keywords: ['peace','treaty','middle east','diplomatic','stability','conflict'], section: 'world-news'},
    {id: 'article-3', title: 'AI Revolutionizes Healthcare Diagnostics', keywords: ['ai','artificial intelligence','healthcare','diagnostics','diseases','tools'], section: 'technology-news'},
    {id: 'article-4', title: 'Launch of New Space Telescope Reveals Cosmic Wonders', keywords: ['space','telescope','astronomers','cosmic','images','orbit'], section: 'technology-news'},
    {id: 'article-5', title: 'Modern Art Exhibition Opens in Berlin', keywords: ['art','exhibition','berlin','artists','works','culture'], section: 'culture-news'},
    {id: 'article-6', title: 'International Film Festival Shines Light on Emerging Directors', keywords: ['film','festival','emerging','directors','cinema','screenings','workshops'], section: 'culture-news'},
    {id: 'article-7', title: 'Championship Finals: Thrilling Victory Ends Season', keywords: ['championship','finals','victory','match','fans','sports'], section: 'sports-news'},
    {id: 'article-8', title: 'Olympics 2025: A Celebration of Athletic Excellence', keywords: ['olympics','athletic','excellence','competition','athletes'], section: 'sports-news'}
  ];

  // Function to handle search and redirect
  function handleSearch(query) {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) {
      alert('Please enter a search term.');
      return;
    }
    // Find matching articles by title or keywords
    const match = articles.find(article => {
      if (article.title.toLowerCase().includes(cleanQuery)) return true;
      return article.keywords.some(k => k.includes(cleanQuery));
    });
    if (match) {
      // Scroll to article on page or simulate navigation to article
      const target = document.getElementById(match.id);
      if (target) {
        target.scrollIntoView({behavior: 'smooth', block: 'center'});
        target.focus({preventScroll:true});
      } else {
        // fallback: redirect to article link (placeholder)
        window.location.href = `#${match.id}`;
      }
    } else {
      alert('No articles found matching your search.');
    }
  }

  // Add event listener for Enter keypress inside search input
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(searchInput.value);
    }
  });
