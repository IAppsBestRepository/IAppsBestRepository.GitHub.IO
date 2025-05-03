let appsData = [];
let currentPage = 1;
let itemsPerPage = 20;
let filteredApps = [];
let currentLanguage = 'ru';
let currentTheme = 'dark';
let sliderApps = []; // Array to hold the 5 newest apps for the slider
let currentSlide = 0;
let totalSlides = 6; // 1 for update date + 5 for apps


const translations = {
  'ru': {
    'menu': 'Меню',
    'home': 'Главная',
    'update_repository': 'Обновить репозиторий',
    'app_search': 'Поиск приложений в AppStore',
    'categories': 'Категории',
    'about': 'О сайте',
    'settings': 'Настройки',
    'obj_c_generator': 'Генератор кода OBJ-C',
    'converter': 'Конвертер',
    'theme': 'Тема',
    'dark_theme': 'Темная',
    'light_theme': 'Светлая',
    'language': 'Язык',
    'search_placeholder': 'Поиск приложений...',
    'found_apps': 'Найдено приложений',
    'sort_by': 'Сортировка:',
    'sort_default': 'По умолчанию',
    'sort_newest': 'Сначала новые',
    'sort_oldest': 'Сначала старые',
    'apps_per_page': 'Приложений на странице:',
    'contacts': 'Контакты',
    'help': 'Помощь',
    'rights': 'Все права защищены',
    'no_results': 'По вашему запросу ничего не найдено',
    'load_error': 'Не удалось загрузить данные приложений. Пожалуйста, попробуйте позже.',
    'updated': 'Обновлено',
    'back_to_catalog': 'Вернуться в каталог',
    'release_notes': 'Информация о релизе',
    'screenshots': 'Скриншоты',
    'buy_access': 'Купить доступ',
    'buy_access_title': 'Платный доступ к каталогу',
    'access_description': 'Получите полный доступ к каталогу приложений с расширенным функционалом и дополнительными возможностями.',
    'quarterly_plan': 'Трехмесячный план',
    'half-yearly_plan': 'Шестимесячный план',
    'yearly_plan': 'Годовой план',
    'quarterly_price': '399 ₽',
    'half-yearly_price': '599 ₽',
    'yearly_price': '899 ₽',
    'best_value': 'Выгодно',
    'access_feature1': 'Доступ ко всем приложениям',
    'access_feature2': 'Приоритетная поддержка',
    'access_feature3': 'Без рекламы',
    'access_feature4': 'Ранний доступ к новинкам',
    'access_feature5': 'Скидка 15%',
    'access_feature6': 'Скидка 35%',
    'purchase_access': 'Приобрести доступ',
    'catalog_last_update': 'Последнее обновление каталога',
    'newest_apps': 'Новые приложения',
    'see_details': 'Подробнее',
    'ios_version': 'iOS',
    'app_size': 'Размер'
  },
  'en': {
    'menu': 'Menu',
    'home': 'Home',
    'favorites': 'Favorites',
    'app_search': 'Search apps in AppStore',
    'categories': 'Categories',
    'about': 'About',
    'settings': 'Settings',
    'obj_c_generator': 'OBJ-C Code Generator',
    'converter': 'Converter',
    'theme': 'Theme',
    'dark_theme': 'Dark',
    'light_theme': 'Light',
    'language': 'Language',
    'search_placeholder': 'Search apps...',
    'found_apps': 'Apps found',
    'sort_by': 'Sort by:',
    'sort_default': 'Default',
    'sort_newest': 'Newest first',
    'sort_oldest': 'Oldest first',
    'apps_per_page': 'Apps per page:',
    'contacts': 'Contacts',
    'help': 'Help',
    'rights': 'All rights reserved',
    'no_results': 'No results found for your search',
    'load_error': 'Failed to load application data. Please try again later.',
    'updated': 'Updated',
    'back_to_catalog': 'Back to catalog',
    'release_notes': 'Release Notes',
    'screenshots': 'Screenshots',
    'buy_access': 'Buy Access',
    'update_repository': 'Update Repository',
    'buy_access_title': 'Premium Catalog Access',
    'access_description': 'Get full access to the application catalog with advanced features and additional capabilities.',
    'quarterly_plan': 'Quarterly Plan',
    'half-yearly_plan': 'Half-Yearly Plan',
    'yearly_plan': 'Yearly Plan',
    'quarterly_price': '$5',
    'half-yearly_price': '$10',
    'yearly_price': '$15',
    'best_value': 'Best Value',
    'access_feature1': 'Access to all applications',
    'access_feature2': 'Priority support',
    'access_feature3': 'Ad-free experience',
    'access_feature4': 'Early access to new releases',
    'access_feature5': '15% discount',
    'access_feature6': '35% discount',
    'purchase_access': 'Purchase Access',
    'catalog_last_update': 'Catalog Last Update',
    'newest_apps': 'New Releases',
    'see_details': 'See Details',
    'ios_version': 'iOS',
    'app_size': 'Size'
  }
};


function setLanguage(lang) {
  currentLanguage = lang;
  document.getElementById('language-toggle').textContent = lang.toUpperCase();

  
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  
  const placeholders = document.querySelectorAll('[data-translate-placeholder]');
  placeholders.forEach(element => {
    const key = element.getAttribute('data-translate-placeholder');
    if (translations[lang][key]) {
      element.placeholder = translations[lang][key];
    }
  });

  
  localStorage.setItem('preferred_language', lang);
  
  // Update slider language
  updateSliderLanguage();
  
  // Обновляем отображение карточек приложений
  updateResultsCount();
  renderApps();
}


function toggleTheme() {
  const body = document.body;
  const themeIcon = document.querySelector('#theme-toggle i');
  const themeText = document.querySelector('#theme-toggle span');

  if (body.classList.contains('light-theme')) {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    themeText.setAttribute('data-translate', 'dark_theme');
    themeText.textContent = translations[currentLanguage].dark_theme;
    currentTheme = 'dark';

    
    updateSelectArrowColor('dark');
  } else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    themeText.setAttribute('data-translate', 'light_theme');
    themeText.textContent = translations[currentLanguage].light_theme;
    currentTheme = 'light';

    
    updateSelectArrowColor('light');
  }

  
  localStorage.setItem('preferred_theme', currentTheme);
}


function updateSelectArrowColor(theme) {
  const selects = document.querySelectorAll('.custom-select');
  const color = theme === 'dark' ? '%237986CB' : '%235C6BC0';

  selects.forEach(select => {
    select.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='${color}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`;
  });
}


async function loadAppsData() {
  try {
    const response = await fetch('attached_assets/Repo_Parse.json');
    if (!response.ok) {
      throw new Error('Не удалось загрузить данные');
    }

    appsData = await response.json();
    filteredApps = [...appsData];
    
    // Get 5 newest apps for the slider
    sliderApps = [...appsData].sort((a, b) => new Date(b.appUpdateTime) - new Date(a.appUpdateTime)).slice(0, 5);
    
    // Initialize the slider
    initializeSlider();

    
    const savedPage = sessionStorage.getItem('currentPage');
    if (savedPage) {
      currentPage = parseInt(savedPage);
      
      sessionStorage.removeItem('currentPage');
    }

    
    const savedItemsPerPage = sessionStorage.getItem('itemsPerPage');
    if (savedItemsPerPage) {
      itemsPerPage = parseInt(savedItemsPerPage);
      
      sessionStorage.removeItem('itemsPerPage');
    }

    
    const cardsPerPageSelect = document.getElementById('cards-per-page');
    if (cardsPerPageSelect) {
      cardsPerPageSelect.value = itemsPerPage.toString();
    }

    
    const savedSortOrder = sessionStorage.getItem('sortOrder');
    const sortOrderSelect = document.getElementById('sort-order');

    if (savedSortOrder && sortOrderSelect) {
      sortOrderSelect.value = savedSortOrder;
      
      sessionStorage.removeItem('sortOrder');
    }

    
    const sortOrder = document.getElementById('sort-order').value;
    sortApps(sortOrder, false); 

    updateResultsCount();
    renderApps();
    renderPagination();
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    document.getElementById('app-cards').innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <p>${translations[currentLanguage].load_error}</p>
      </div>
    `;
  }
}


function sortApps(sortOrder, resetPage = true) {
  if (sortOrder === 'newest') {
    filteredApps.sort((a, b) => new Date(b.appUpdateTime) - new Date(a.appUpdateTime));
  } else if (sortOrder === 'oldest') {
    filteredApps.sort((a, b) => new Date(a.appUpdateTime) - new Date(b.appUpdateTime));
  } else if (sortOrder === 'default') {
    
    const currentQuery = document.getElementById('search-input').value.toLowerCase().trim();
    if (currentQuery) {
      filteredApps = appsData.filter(app =>
        app.appName.toLowerCase().includes(currentQuery)
      );
    } else {
      filteredApps = [...appsData];
    }
  }

  if (resetPage) {
    currentPage = 1;
  }

  renderApps();
  renderPagination();
}


function renderApps() {
  const appCardsContainer = document.getElementById('app-cards');
  appCardsContainer.innerHTML = '';

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredApps.length);

  if (filteredApps.length === 0) {
    appCardsContainer.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <p>${translations[currentLanguage].no_results}</p>
      </div>
    `;
    return;
  }

  for (let i = startIndex; i < endIndex; i++) {
    const app = filteredApps[i];
    
    // Форматируем дату обновления
    const updateDate = new Date(app.appUpdateTime);
    const formattedDate = updateDate.toLocaleDateString(currentLanguage === 'ru' ? 'ru-RU' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    // Создаем элемент карточки
    const appCard = document.createElement('div');
    appCard.className = 'app-card';
    appCard.setAttribute('data-bundle', app.appBundle);
    
    // Создаем краткое описание (ограничиваем длину)
    const shortDescription = app.appDescription.length > 150 
      ? app.appDescription.substring(0, 150) + '...'
      : app.appDescription;
    
    // Заполняем карточку по новому формату
    appCard.innerHTML = `
      <div class="app-header">
        <div class="app-img">
          <img src="${app.appImage}" alt="${app.appName}" loading="lazy">
        </div>
        <div class="app-title-container">
          <h3 class="app-name">${app.appName}</h3>
          <p class="app-version">v${app.appVersion}</p>
        </div>
      </div>
      <div class="app-body">
        <div class="app-description">${shortDescription.replace(/\n/g, '<br>')}</div>
        <div class="app-update-info">
          <span class="app-update-label">${translations[currentLanguage].updated}</span>
          <span class="app-update-date">${formattedDate}</span>
        </div>
      </div>
    `;

    // Добавляем обработчик клика для перехода на страницу деталей
    appCard.addEventListener('click', () => {
      sessionStorage.setItem('app_bundle', app.appBundle);
      sessionStorage.setItem('app_version', app.appVersion);
      sessionStorage.setItem('app_description', app.appDescription);
      sessionStorage.setItem('app_update_time', app.appUpdateTime);
      sessionStorage.setItem('currentPage', currentPage);
      sessionStorage.setItem('selected_card_bundle', app.appBundle); 
      sessionStorage.setItem('itemsPerPage', itemsPerPage); 

      // Сохраняем выбранную сортировку
      const sortOrder = document.getElementById('sort-order').value;
      sessionStorage.setItem('sortOrder', sortOrder);

      window.location.href = 'app-details.html';
    });

    appCardsContainer.appendChild(appCard);
  }

  // Выделение выбранной карточки при возврате на страницу
  const selectedCardBundle = sessionStorage.getItem('selected_card_bundle');

  if (selectedCardBundle) {
    setTimeout(() => {
      const selectedCard = document.querySelector(`.app-card[data-bundle="${selectedCardBundle}"]`);
      if (selectedCard) {
        selectedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        selectedCard.classList.add('highlight-card');
        setTimeout(() => {
          selectedCard.classList.remove('highlight-card');
        }, 2000);
        
        sessionStorage.removeItem('selected_card_bundle');
      } else {
        window.scrollTo({
          top: document.querySelector('main').offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }, 100); 
  } else {
    window.scrollTo({
      top: document.querySelector('main').offsetTop - 80,
      behavior: 'smooth'
    });
  }
}


function renderPagination() {
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = '';

  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);

  if (totalPages <= 1) {
    return;
  }

  
  const prevButton = document.createElement('button');
  prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderApps();
      renderPagination();
    }
  });
  paginationContainer.appendChild(prevButton);

  
  const maxVisiblePages = 3; 
  
  if (totalPages <= maxVisiblePages + 1) {
    
    for (let i = 1; i <= totalPages; i++) {
      addPageButton(i, paginationContainer);
    }
  } else {
    
    
    
    let startPage = currentPage;
    let endPage = Math.min(currentPage + 2, totalPages);
    
    
    for (let i = startPage; i <= endPage; i++) {
      addPageButton(i, paginationContainer);
    }
    
    
    if (endPage < totalPages) {
      addEllipsis(paginationContainer);
      
      addPageButton(totalPages, paginationContainer);
    }
  }

  
  const nextButton = document.createElement('button');
  nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderApps();
      renderPagination();
    }
  });
  paginationContainer.appendChild(nextButton);
  
  
  function addPageButton(pageNumber, container) {
    const pageButton = document.createElement('button');
    pageButton.textContent = pageNumber;
    if (pageNumber === currentPage) {
      pageButton.classList.add('active');
    }
    pageButton.addEventListener('click', () => {
      currentPage = pageNumber;
      renderApps();
      renderPagination();
    });
    container.appendChild(pageButton);
  }
  
  
  function addEllipsis(container) {
    const ellipsisButton = document.createElement('button');
    ellipsisButton.textContent = '...';
    ellipsisButton.disabled = true;
    container.appendChild(ellipsisButton);
  }
}


function updateResultsCount() {
  const resultsCountElement = document.getElementById('results-count');
  resultsCountElement.innerHTML = `${translations[currentLanguage].found_apps}: <span>${filteredApps.length}</span>`;
}


function searchApps(query, resetPage = true) {
  if (!query.trim()) {
    filteredApps = [...appsData];
  } else {
    query = query.toLowerCase().trim();
    filteredApps = appsData.filter(app =>
      app.appName.toLowerCase().includes(query)
    );
  }

  
  const sortOrder = document.getElementById('sort-order').value;
  sortApps(sortOrder, resetPage);

  if (resetPage) {
    currentPage = 1;
  }

  updateResultsCount();
  renderApps();
  renderPagination();
}


function handleSidebar() {
  const menuBtn = document.getElementById('menu-btn');
  const closeSidebarBtn = document.getElementById('close-sidebar');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  
  menuBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  
  closeSidebarBtn.addEventListener('click', () => {
    console.log('Закрытие сайдбара');
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}


function handleSettingsModal() {
  const closeSettingsBtn = document.getElementById('close-settings');
  const settingsModal = document.getElementById('settings-modal');

  
  if (closeSettingsBtn) {
    closeSettingsBtn.addEventListener('click', () => {
      settingsModal.classList.remove('active');
      document.body.style.overflow = '';
      document.getElementById('overlay').classList.remove('active');
    });
  }

  
  if (settingsModal) {
    settingsModal.addEventListener('click', (e) => {
      if (e.target === settingsModal) {
        settingsModal.classList.remove('active');
        document.body.style.overflow = '';
        document.getElementById('overlay').classList.remove('active');
      }
    });
  }
}


function handleAccessModal() {
  const buyAccessBtn = document.getElementById('buy-access-btn');
  const closeAccessBtn = document.getElementById('close-access');
  const accessModal = document.getElementById('access-modal');
  const purchaseBtn = document.querySelector('.purchase-access-btn');

  
  if (buyAccessBtn) {
    buyAccessBtn.addEventListener('click', (e) => {
      e.preventDefault();
      accessModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      document.getElementById('overlay').classList.add('active');
    });
  }

  
  if (closeAccessBtn) {
    closeAccessBtn.addEventListener('click', () => {
      accessModal.classList.remove('active');
      document.body.style.overflow = '';
      document.getElementById('overlay').classList.remove('active');
    });
  }

  
  if (accessModal) {
    accessModal.addEventListener('click', (e) => {
      if (e.target === accessModal) {
        accessModal.classList.remove('active');
        document.body.style.overflow = '';
        document.getElementById('overlay').classList.remove('active');
      }
    });
  }

  
  if (purchaseBtn) {
    purchaseBtn.addEventListener('click', () => {
      
      window.location.href = 'https://bit.ly/3Xvdyab';
    });
  }
}


function loadUserPreferences() {
  
  const savedLanguage = localStorage.getItem('preferred_language');
  if (savedLanguage) {
    setLanguage(savedLanguage);
  }

  
  const savedTheme = localStorage.getItem('preferred_theme');
  if (savedTheme) {
    if (savedTheme === 'light' && currentTheme === 'dark') {
      toggleTheme();
    } else if (savedTheme === 'dark' && currentTheme === 'light') {
      toggleTheme();
    }
  } else {
    
    updateSelectArrowColor(currentTheme);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  
  loadUserPreferences();

  
  loadAppsData();

  
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');

  searchBtn.addEventListener('click', () => {
    searchApps(searchInput.value);
  });

  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      searchApps(searchInput.value);
    }
  });

  
  const cardsPerPageSelect = document.getElementById('cards-per-page');
  cardsPerPageSelect.addEventListener('change', () => {
    itemsPerPage = parseInt(cardsPerPageSelect.value);
    currentPage = 1;
    renderApps();
    renderPagination();
  });

  
  const sortOrderSelect = document.getElementById('sort-order');
  sortOrderSelect.addEventListener('change', () => {
    sortApps(sortOrderSelect.value);
  });

  
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', toggleTheme);

  
  const languageToggle = document.getElementById('language-toggle');
  languageToggle.addEventListener('click', () => {
    const newLang = currentLanguage === 'ru' ? 'en' : 'ru';
    setLanguage(newLang);
  });

  
  handleSidebar();

  
  handleSettingsModal();

  
  handleAccessModal();

  
  const settingsToggleSidebar = document.getElementById('settings-toggle-sidebar');
  if (settingsToggleSidebar) {
    settingsToggleSidebar.addEventListener('click', (e) => {
      e.preventDefault();
      const settingsModal = document.getElementById('settings-modal');
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('overlay');

      if (settingsModal) {
        settingsModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        
        if (sidebar) {
          sidebar.classList.remove('active');
        }
      }
    });
  }

  // Add event listener for window resize to adjust slider height if needed
  window.addEventListener('resize', () => {
    // You can add responsive adjustments for slider here if needed
  });
});

// Initialize slider function
function initializeSlider() {
  const sliderContainer = document.getElementById('app-slider');
  if (!sliderContainer) return;
  
  // Clear existing content
  sliderContainer.innerHTML = '';
  
  // Create slides container
  const slidesContainer = document.createElement('div');
  slidesContainer.className = 'slider-slides';
  
  // Get the most recent update date from the newest app
  const latestUpdateDate = new Date(sliderApps[0].appUpdateTime);
  const formattedDate = latestUpdateDate.toLocaleDateString(currentLanguage === 'ru' ? 'ru-RU' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  // Create update date slide
  const updateSlide = document.createElement('div');
  updateSlide.className = 'slider-slide update-date-slide';
  updateSlide.classList.add('active'); // First slide is active
  updateSlide.innerHTML = `
    <i class="fas fa-sync-alt"></i>
    <h3 data-translate="catalog_last_update">${translations[currentLanguage].catalog_last_update}</h3>
    <p>${formattedDate}</p>
  `;
  slidesContainer.appendChild(updateSlide);
  
  // Create app slides
  sliderApps.forEach(app => {
    const appSlide = document.createElement('div');
    appSlide.className = 'slider-slide app-slide';
    appSlide.setAttribute('data-bundle', app.appBundle);
    
    appSlide.innerHTML = `
      <img src="${app.appImage}" alt="${app.appName}">
      <h4>${app.appName}</h4>
    `;
    
    // Add click event to navigate to app details
    appSlide.addEventListener('click', () => {
      sessionStorage.setItem('app_bundle', app.appBundle);
      sessionStorage.setItem('app_version', app.appVersion);
      sessionStorage.setItem('app_description', app.appDescription);
      sessionStorage.setItem('app_update_time', app.appUpdateTime);
      window.location.href = 'app-details.html';
    });
    
    slidesContainer.appendChild(appSlide);
  });
  
  sliderContainer.appendChild(slidesContainer);
  
  // Create controls
  const controlsDiv = document.createElement('div');
  controlsDiv.className = 'slider-controls';
  
  // Dots container
  const dotsDiv = document.createElement('div');
  dotsDiv.className = 'slider-dots';
  
  // Create dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.className = 'slider-dot';
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('data-index', i);
    
    dot.addEventListener('click', () => {
      goToSlide(i);
    });
    
    dotsDiv.appendChild(dot);
  }
  
  // Add controls to slider
  controlsDiv.appendChild(dotsDiv);
  sliderContainer.appendChild(controlsDiv);
  
  // Start auto-rotation
  startAutoRotation();
}

// Function to go to a specific slide
function goToSlide(index) {
  const slides = document.querySelectorAll('.slider-slide');
  const dots = document.querySelectorAll('.slider-dot');
  
  if (index < 0) {
    index = slides.length - 1;
  } else if (index >= slides.length) {
    index = 0;
  }
  
  // Remove active class from all slides and dots
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Add active class to current slide and dot
  slides[index].classList.add('active');
  dots[index].classList.add('active');
  
  currentSlide = index;
  
  // Reset auto-rotation timer
  restartAutoRotation();
}

// Auto-rotation variables
let sliderInterval;
const autoRotationDelay = 3000; // 3 seconds

// Start auto-rotation
function startAutoRotation() {
  clearInterval(sliderInterval);
  sliderInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
  }, autoRotationDelay);
}

// Restart auto-rotation
function restartAutoRotation() {
  clearInterval(sliderInterval);
  startAutoRotation();
}

// Function to update slider text when language changes
function updateSliderLanguage() {
  const updateSlideTitle = document.querySelector('.update-date-slide h3');
  if (updateSlideTitle) {
    updateSlideTitle.textContent = translations[currentLanguage].catalog_last_update;
  }
}
