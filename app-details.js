let currentLanguage = 'ru';
let currentTheme = 'dark';

const translations = {
  'ru': {
    'menu': 'Меню',
    'home': 'Главная',
    'favorites': 'Избранное',
    'categories': 'Категории',
    'about': 'О сайте',
    'settings': 'Настройки',
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
    'app_description': 'Описание приложения',
    'screenshots': 'Скриншоты',
    'current_version': 'Актуальная версия',
    'file_size': 'Размер файла',
    'min_ios_version': 'Минимальная версия',
    'last_update': 'Последнее обновление',
    'description_modify': 'Описание модификации',
    'developer': 'Разработчик',
    'category': 'Категория',
    'no_release_notes': 'Информация о релизе недоступна',
    'no_description': 'Описание отсутствует',
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
    'buy_access': 'Купить доступ',
    'theme': 'Тема',
    'dark_theme': 'Темная',
    'light_theme': 'Светлая',
    'language': 'Язык',
    'update_repository': 'Обновить репозиторий'
  },
  'en': {
    'menu': 'Menu',
    'home': 'Home',
    'favorites': 'Favorites',
    'categories': 'Categories',
    'about': 'About',
    'settings': 'Settings',
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
    'app_description': 'App Description',
    'screenshots': 'Screenshots',
    'current_version': 'Current version',
    'file_size': 'File size',
    'min_ios_version': 'Minimum iOS version',
    'last_update': 'Last update',
    'description_modify': 'Description Modification',
    'developer': 'Developer',
    'category': 'Category',
    'no_release_notes': 'Release notes are not available',
    'no_description': 'Description is not available',
    'theme': 'Theme',
    'dark_theme': 'Dark',
    'light_theme': 'Light',
    'language': 'Language',
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
    'buy_access': 'Buy Access',
    'update_repository': 'Update Repository'
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

  
  updateAppDetailsTranslations();

  
  updateAccessModalPricing();

  
  const buyAccessBtn = document.getElementById('buy-access-btn');
  if (buyAccessBtn) {
    const buyAccessSpan = buyAccessBtn.querySelector('span');
    if (buyAccessSpan) {
      buyAccessSpan.textContent = translations[lang]['buy_access'];
    }
  }
}



function updateAppDetailsTranslations() {
  const appVersion = sessionStorage.getItem('app_version');
  const appDescription = sessionStorage.getItem('app_description');
  const appUpdateTime = sessionStorage.getItem('app_update_time');

  if (appVersion && appDescription && appUpdateTime) {
    const [currentVersion, fileSize, IOSVersion] = appVersion.split(' | ');
    const minIOSVersion = IOSVersion.replace(/iOS\s*/i, '');

    const date = new Date(appUpdateTime);
    const dateOptions = currentLanguage === 'ru'
      ? { day: '2-digit', month: 'short', year: 'numeric' }
      : { day: 'numeric', month: 'short', year: 'numeric' };

    const appUpdateTimeFormatted = date.toLocaleDateString(
      currentLanguage === 'ru' ? 'ru-RU' : 'en-US',
      dateOptions
    );

    document.getElementById("current-version").textContent = `${translations[currentLanguage].current_version}: ${currentVersion}`;
    document.getElementById("file-size").textContent = `${translations[currentLanguage].file_size}: ${fileSize}`;
    document.getElementById("min-ios-version").textContent = `${translations[currentLanguage].min_ios_version}: ${minIOSVersion}`;
    document.getElementById("update-time").textContent = `${translations[currentLanguage].last_update}: ${appUpdateTimeFormatted}`;
    document.getElementById("description-modify").innerHTML = appDescription.replace(/\n/g, '<br>');
  }
}


function toggleTheme() {
  const body = document.body;
  const themeIcon = document.querySelector('#theme-toggle i');

  if (body.classList.contains('light-theme')) {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    currentTheme = 'dark';
  } else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    currentTheme = 'light';
  }

  
  localStorage.setItem('preferred_theme', currentTheme);
}


async function loadAppDetails() {
  const appBundle = sessionStorage.getItem('app_bundle');

  if (appBundle) {
    try {
      const fetchAppData = async (country) => {
        const response = await fetch(`https://itunes.apple.com/lookup?bundleId=${appBundle}&country=${country}`);
        if (!response.ok) throw new Error('Ошибка сети');
        const data = await response.json();
        return data;
      };

      let data = await fetchAppData('ru');

      if (data.resultCount === 0) {
        console.warn('Приложение не найдено в регионе RU, выполняется повторный поиск в регионе US.');
        data = await fetchAppData('us');
      }

      if (data.resultCount > 0) {
        const app = data.results[0];
        displayAppDetails(app);
      } else {
        alert('Приложение не найдено ни в регионе RU, ни в регионе US.');
        window.location.href = 'index.html';
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Не удалось загрузить данные. Проверьте подключение к интернету.');
      window.location.href = 'index.html';
    }
  } else {
    
    window.location.href = 'index.html';
  }
}


function displayAppDetails(app) {
  const appVersion = sessionStorage.getItem('app_version');
  const appDescription = sessionStorage.getItem('app_description');
  const appUpdateTime = sessionStorage.getItem('app_update_time');

  if (appVersion && appDescription && appUpdateTime) {
    const [currentVersion, fileSize, IOSVersion] = appVersion.split(' | ');
    const minIOSVersion = IOSVersion.replace(/iOS\s*/i, '');

    const date = new Date(appUpdateTime);
    const dateOptions = currentLanguage === 'ru'
      ? { day: '2-digit', month: 'short', year: 'numeric' }
      : { day: 'numeric', month: 'short', year: 'numeric' };

    const appUpdateTimeFormatted = date.toLocaleDateString(
      currentLanguage === 'ru' ? 'ru-RU' : 'en-US',
      dateOptions
    );

    
    const isMobile = window.innerWidth < 840;

    document.getElementById("current-version").textContent = `${translations[currentLanguage].current_version}: ${currentVersion}`;
    document.getElementById("file-size").textContent = `${translations[currentLanguage].file_size}: ${fileSize}`;
    document.getElementById("min-ios-version").textContent = `${translations[currentLanguage].min_ios_version}: ${minIOSVersion}`;
    document.getElementById("update-time").textContent = `${translations[currentLanguage].last_update}: ${appUpdateTimeFormatted}`;
    document.getElementById("description-modify").innerHTML = appDescription.replace(/\n/g, '<br>');


    
    const descriptionElement = document.getElementById("app-description-modifications");
    if (app.description && app.description.trim() !== '') {
      
      const shortDescription = app.description.slice(0, 150) + (app.description.length > 150 ? '...' : '');
      descriptionElement.innerHTML = shortDescription.replace(/\n/g, '<br>');
    } else {
      descriptionElement.innerHTML = translations[currentLanguage].no_description;
    }

    
    const releaseNotesElement = document.getElementById("release-notes-modifications");
    if (app.releaseNotes && app.releaseNotes.trim() !== '') {
      const shortReleaseNotes = app.releaseNotes.slice(0, 150) + (app.releaseNotes.length > 150 ? '...' : '');
      releaseNotesElement.innerHTML = shortReleaseNotes.replace(/\n/g, '<br>');
    } else {
      releaseNotesElement.innerHTML = translations[currentLanguage].no_release_notes;
    }
  }

  const tasks = [
    new Promise(resolve => {
      const img = document.getElementById("app-icon");
      img.src = app.artworkUrl512 || app.artworkUrl100;
      img.onload = resolve;
    }),

    new Promise(resolve => {
      document.getElementById("app-name").textContent = app.trackName;
      document.getElementById("app-category").textContent = `${translations[currentLanguage].category}: ${app.primaryGenreName}`;
      document.getElementById("app-developer").textContent = `${translations[currentLanguage].developer}: ${app.sellerName}`;
      resolve();
    }),

    new Promise(resolve => {
      const screenshotsContainer = document.getElementById("screenshots-container");
      screenshotsContainer.innerHTML = '';

      
      const screenshots = app.screenshotUrls || [];

      if (screenshots.length === 0) {
        screenshotsContainer.innerHTML = `<p>${currentLanguage === 'ru' ? 'Скриншоты недоступны' : 'Screenshots unavailable'}</p>`;
      } else {
        screenshots.forEach(screenshot => {
          const img = document.createElement("img");
          img.src = screenshot;
          img.loading = "lazy";
          img.alt = currentLanguage === 'ru' ? "Скриншот приложения" : "App screenshot";
          screenshotsContainer.appendChild(img);
        });
      }

      resolve();
    })
  ];

  Promise.all(tasks).then(() => {
    console.log('Все данные загружены!');
  });
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

  
  const settingsToggleSidebar = document.getElementById('settings-toggle-sidebar');
  if (settingsToggleSidebar) {
    settingsToggleSidebar.addEventListener('click', (e) => {
      e.preventDefault();
      const settingsModal = document.getElementById('settings-modal');
      if (settingsModal) {
        settingsModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        
        if (sidebar) {
          sidebar.classList.remove('active');
        }
        if (overlay) {
          overlay.classList.remove('active');
        }

        
        const closeSettingsBtn = document.getElementById('close-settings');
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
  }
}


document.addEventListener('DOMContentLoaded', () => {
  
  loadUserPreferences();

  
  loadAppDetails();

  
  const backButton = document.getElementById('back-button');
  backButton.addEventListener('click', () => {
    
    if (!sessionStorage.getItem('currentPage')) {
      sessionStorage.setItem('currentPage', '1');
    }
    window.location.href = 'index.html';
  });

  
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', toggleTheme);

  
  const languageToggle = document.getElementById('language-toggle');
  languageToggle.addEventListener('click', () => {
    const newLang = currentLanguage === 'ru' ? 'en' : 'ru';
    setLanguage(newLang);
    updateAccessModalPricing(); 
  });

  
  handleSidebar();
});


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
      updateAccessModalPricing(); 
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


function updateAccessModalPricing() {
  
  const priceElements = document.querySelectorAll('.pricing-item .price');

  if (priceElements && priceElements.length >= 3) {
    
    const translations_key = currentLanguage === 'ru' ? 'monthly_price' : 'monthly_price';
    const translations_key2 = currentLanguage === 'ru' ? 'quarterly_price' : 'quarterly_price';
    const translations_key3 = currentLanguage === 'ru' ? 'yearly_price' : 'yearly_price';

    
    priceElements[0].setAttribute('data-translate', translations_key);
    priceElements[1].setAttribute('data-translate', translations_key2);
    priceElements[2].setAttribute('data-translate', translations_key3);

    
    priceElements[0].textContent = translations[currentLanguage][translations_key];
    priceElements[1].textContent = translations[currentLanguage][translations_key2];
    priceElements[2].textContent = translations[currentLanguage][translations_key3];
  }
}



document.addEventListener('DOMContentLoaded', () => {
  handleAccessModal();
});
