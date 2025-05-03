let currentLanguage = 'ru';
let currentTheme = 'dark';

const translations = {
  'ru': {
    'menu': 'Меню',
    'home': 'Главная',
    'update_repository': 'Обновить репозиторий',
    'app_search': 'Поиск приложений в AppStore',
    'categories': 'Категории',
    'about': 'О сайте',
    'settings': 'Настройки',
    'theme': 'Тема',
    'dark_theme': 'Темная',
    'light_theme': 'Светлая',
    'language': 'Язык',
    'search_placeholder': 'Поиск приложений...',
    'search_app_placeholder': 'Введите название приложения или BundleID',
    'search_button': 'Искать',
    'app_search_title': 'Поиск приложений в AppStore',
    'contacts': 'Контакты',
    'help': 'Помощь',
    'rights': 'Все права защищены',
    'app_not_found_by_bundleid': 'Приложение с таким BundleID не найдено.',
    'app_not_found_by_name': 'Приложение с таким названием не найдено.',
    'subscriptions_button': 'Подписки',
    'subscriptions_title': 'Подписки приложения',
    'loading': 'Загрузка...',
    'close': 'Закрыть',
    'no_subscriptions': 'Подписки не найдены',
    'subscriptions_found': 'Найдено подписок',
    'copy_to_clipboard': 'Скопировано в буфер обмена',
    'error_loading': 'Ошибка загрузки данных',
    'no_working_proxy': 'Не удалось подключиться ни к одному прокси-серверу',
    'try_check_directly': 'Не удалось получить подписки через прокси. Попробуйте открыть приложение в App Store',
    'open_in_appstore': 'Открыть в App Store'
  },
  'en': {
    'menu': 'Menu',
    'home': 'Home',
    'update_repository': 'Update Repository',
    'app_search': 'Search apps in AppStore',
    'categories': 'Categories',
    'about': 'About',
    'settings': 'Settings',
    'theme': 'Theme',
    'dark_theme': 'Dark',
    'light_theme': 'Light',
    'language': 'Language',
    'search_placeholder': 'Search apps...',
    'search_app_placeholder': 'Enter app name or BundleID',
    'search_button': 'Search',
    'app_search_title': 'Search apps in AppStore',
    'contacts': 'Contacts',
    'help': 'Help',
    'rights': 'All rights reserved',
    'app_not_found_by_bundleid': 'No application found with this BundleID.',
    'app_not_found_by_name': 'No application found with this name.',
    'subscriptions_button': 'Subscriptions',
    'subscriptions_title': 'App Subscriptions',
    'loading': 'Loading...',
    'close': 'Close',
    'no_subscriptions': 'No subscriptions found',
    'subscriptions_found': 'Subscriptions found',
    'copy_to_clipboard': 'Copied to clipboard',
    'error_loading': 'Error loading data',
    'no_working_proxy': 'Could not connect to any proxy server',
    'try_check_directly': 'Could not retrieve subscriptions via proxy. Try opening the app in App Store',
    'open_in_appstore': 'Open in App Store'
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

  
  const countrySelect = document.getElementById('country');
  if (countrySelect) {
    if (lang === 'en') {
      countrySelect.innerHTML = `
        <option value="us">🇺🇸 USA</option>
        <option value="ru">🇷🇺 Russia</option>
        <option value="gb">🇬🇧 United Kingdom</option>
        <option value="de">🇩🇪 Germany</option>
        <option value="fr">🇫🇷 France</option>
        <option value="jp">🇯🇵 Japan</option>
        <option value="cn">🇨🇳 China</option>
        <option value="kr">🇰🇷 South Korea</option>
        <option value="it">🇮🇹 Italy</option>
        <option value="es">🇪🇸 Spain</option>
        <option value="ca">🇨🇦 Canada</option>
        <option value="au">🇦🇺 Australia</option>
        <option value="br">🇧🇷 Brazil</option>
        <option value="mx">🇲🇽 Mexico</option>
        <option value="in">🇮🇳 India</option>
      `;
    } else {
      countrySelect.innerHTML = `
        <option value="us">🇺🇸 США</option>
        <option value="ru">🇷🇺 Россия</option>
        <option value="gb">🇬🇧 Великобритания</option>
        <option value="de">🇩🇪 Германия</option>
        <option value="fr">🇫🇷 Франция</option>
        <option value="jp">🇯🇵 Япония</option>
        <option value="cn">🇨🇳 Китай</option>
        <option value="kr">🇰🇷 Южная Корея</option>
        <option value="it">🇮🇹 Италия</option>
        <option value="es">🇪🇸 Испания</option>
        <option value="ca">🇨🇦 Канада</option>
        <option value="au">🇦🇺 Австралия</option>
        <option value="br">🇧🇷 Бразилия</option>
        <option value="mx">🇲🇽 Мексика</option>
        <option value="in">🇮🇳 Индия</option>
      `;
    }
    
    // Обновляем флаг страны после изменения языка
    updateCountryFlag();
  }

  
  localStorage.setItem('preferred_language', lang);
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
  } else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    themeText.setAttribute('data-translate', 'light_theme');
    themeText.textContent = translations[currentLanguage].light_theme;
    currentTheme = 'light';
  }

  
  localStorage.setItem('preferred_theme', currentTheme);
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


function handleSidebar() {
  const menuBtn = document.getElementById('menu-btn');
  const closeSidebarBtn = document.getElementById('close-sidebar');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  
  menuBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    console.log("Открытие сайдбара");
  });

  
  closeSidebarBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    console.log("Закрытие сайдбара");
  });

  
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}


function handleSettingsModal() {
  const settingsToggle = document.getElementById('settings-toggle');
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
}

// New function to handle subscription modal
function handleSubscriptionsModal() {
  const closeSubscriptionBtn = document.getElementById('close-subscriptions');
  const subscriptionsModal = document.getElementById('subscriptions-modal');
  
  if (closeSubscriptionBtn) {
    closeSubscriptionBtn.addEventListener('click', () => {
      subscriptionsModal.classList.remove('active');
      document.body.style.overflow = '';
      document.getElementById('overlay').classList.remove('active');
    });
  }
  
  if (subscriptionsModal) {
    subscriptionsModal.addEventListener('click', (e) => {
      if (e.target === subscriptionsModal) {
        subscriptionsModal.classList.remove('active');
        document.body.style.overflow = '';
        document.getElementById('overlay').classList.remove('active');
      }
    });
  }
}

// Массив прокси-серверов CORS для использования в приложении
const corsProxies = [
  'https://corsproxy.io/?',
  'https://cors-anywhere.herokuapp.com/',
  'https://api.allorigins.win/raw?url=',
  'https://thingproxy.freeboard.io/fetch/',
  'https://cors-proxy.taskcluster.net/',
  'https://yacdn.org/proxy/',
  'https://cors.bridged.cc/',
  'https://api.codetabs.com/v1/proxy/?quest=',
  'https://crossorigin.me/',
  'https://cors-proxy.htmldriven.com/?url=',
  'https://cors.eu.org/',
  'https://worker-proxy.rayyan-tools.workers.dev/?url=',
  'https://proxy.cors.sh/',
  'https://cors-proxy.fringe.zone/',
  'https://cors.zendev.se/',
  'https://cors.site/',
  'https://api.scraperapi.com/?api_key=free_api_key&url=',
  'https://cors-proxy.devdal.workers.dev/?',
  'https://app.cors.bridged.cc/',
  'https://cors-fetch.vercel.app/?url='
];

function getBundleId(searchvalue) {
  var country = document.getElementById("country").value;
  var isBundleId = searchvalue.includes(".");

  // Показываем загрузку
  $("#results").html(`<div class="loading-results"><i class="fas fa-spinner fa-spin"></i> <span data-translate="loading">${translations[currentLanguage].loading}</span></div>`);
  $("#results-table").hide();

  // Функция для поиска через прокси
  function searchViaProxy(proxyIndex = 0) {
    if (proxyIndex >= corsProxies.length) {
      // Если все прокси испробованы, используем fallback на JSONP
      fallbackToJSONP();
      return;
    }
    
    const currentProxy = corsProxies[proxyIndex];
    let apiUrl;
    
    if (isBundleId) {
      apiUrl = `https://itunes.apple.com/lookup?bundleId=${searchvalue}&country=${country}`;
    } else {
      apiUrl = `https://itunes.apple.com/search?limit=20&media=software&term=${searchvalue}&country=${country}`;
    }
    
    fetch(currentProxy + encodeURIComponent(apiUrl))
      .then(response => {
        if (!response.ok) {
          throw new Error(`Proxy returned status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        try {
          const json = JSON.parse(data);
          displayResults(json, proxyIndex);
        } catch (e) {
          // Если не удалось разобрать JSON, пробуем следующий прокси
          console.log(`Error parsing JSON from proxy ${proxyIndex + 1}:`, e);
          searchViaProxy(proxyIndex + 1);
        }
      })
      .catch(error => {
        console.log(`Proxy ${proxyIndex + 1} failed for search:`, error);
        searchViaProxy(proxyIndex + 1);
      });
  }

  // Функция для отображения результатов поиска
  function displayResults(json, proxyIndex) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    
    if (json.resultCount > 0) {
      // Создаем грид для карточек приложений
      const appGrid = createAppGrid();
      
      // Добавляем каждое приложение
      json.results.forEach((app) => {
        displayApp(app);
      });
      
      // Информация о прокси
      const proxyInfo = document.createElement('div');
      proxyInfo.className = 'proxy-info-search';
      proxyInfo.innerHTML = `<small>Proxy: ${proxyIndex + 1}/${corsProxies.length}</small>`;
      resultsDiv.appendChild(proxyInfo);
    } else {
      const noResults = document.createElement('p');
      
      if (isBundleId) {
        noResults.className = 'no-results';
        noResults.textContent = translations[currentLanguage].app_not_found_by_bundleid;
      } else {
        noResults.className = 'no-results';
        noResults.textContent = translations[currentLanguage].app_not_found_by_name;
      }
      
      resultsDiv.appendChild(noResults);
    }
  }
  
  // Fallback на JSONP в случае если все прокси не сработали
  function fallbackToJSONP() {
  if (isBundleId) {
    $.getJSON(
      `https://itunes.apple.com/lookup?bundleId=${searchvalue}&country=${country}&callback=?`,
      function(json) {
        if (json.resultCount > 0) {
            displayResults(json, -1); // -1 означает, что мы используем JSONP, а не прокси
        } else {
            $("#results").html(`<p class="no-results">${translations[currentLanguage].app_not_found_by_bundleid}</p>`);
          }
        }
      ).fail(function() {
        $("#results").html(`<p class="error-results">${translations[currentLanguage].error_loading}</p>`);
      });
  } else {
    $.getJSON(
      `https://itunes.apple.com/search?limit=20&media=software&term=${searchvalue}&country=${country}&callback=?`,
      function(json) {
        if (json.resultCount > 0) {
            displayResults(json, -1); // -1 означает, что мы используем JSONP, а не прокси
        } else {
            $("#results").html(`<p class="no-results">${translations[currentLanguage].app_not_found_by_name}</p>`);
          }
        }
      ).fail(function() {
        $("#results").html(`<p class="error-results">${translations[currentLanguage].error_loading}</p>`);
      });
      }
  }
  
  // Начинаем поиск через прокси
  searchViaProxy();
}


function displayApp(app) {
  var appName = app.trackName;
  var appId = app.trackId;
  var artworkUrl = app.artworkUrl100.replace("100x100bb", "120x120");
  var artistName = app.artistName;
  var bundleId = app.bundleId;
  var minimumIos = app.minimumOsVersion || "N/A";
  var lastVersion = app.version || "N/A";
  var lastUpdate = app.currentVersionReleaseDate ?
    new Date(app.currentVersionReleaseDate).toLocaleDateString() :
    "N/A";
  var trackViewUrl = app.trackViewUrl;

  // Создаем элемент карточки приложения
  const appCard = document.createElement('div');
  appCard.className = 'app-card';
  
  // Заголовок карточки с иконкой и названием
  appCard.innerHTML = `
    <div class="app-header">
      <img src="${artworkUrl}" alt="${appName}" class="app-icon" onclick="copyToClipboard('${artworkUrl}')" title="${translations[currentLanguage].copy_to_clipboard}">
      <div class="app-title-container">
        <h3 class="app-title">${appName}</h3>
        <p class="app-developer">${artistName}</p>
      </div>
    </div>
    <div class="app-body">
      <div class="app-details">
        <div class="app-detail-item">
          <div class="app-detail-label">BundleID:</div>
          <div class="app-detail-value">
            <span id="bundle_${appId}" class="bundleid" onclick="copyToClipboard('${bundleId}')">${bundleId}</span>
          </div>
        </div>
        <div class="app-detail-item">
          <div class="app-detail-label">Min iOS:</div>
          <div class="app-detail-value">${minimumIos}</div>
        </div>
        <div class="app-detail-item">
          <div class="app-detail-label">Last Version:</div>
          <div class="app-detail-value">${lastVersion}</div>
        </div>
        <div class="app-detail-item">
          <div class="app-detail-label">Last Update:</div>
          <div class="app-detail-value">${lastUpdate}</div>
        </div>
      </div>
    </div>
    <div class="app-footer">
      <button class="subscription-btn" onclick="fetchSubscriptions('${bundleId}', '${trackViewUrl}', '${appName}')">
        <i class="fas fa-list"></i> <span data-translate="subscriptions_button">${translations[currentLanguage].subscriptions_button}</span>
      </button>
    </div>
  `;
  
  // Добавляем карточку в грид
  const appGrid = document.querySelector('.app-grid') || createAppGrid();
  appGrid.appendChild(appCard);
}

// Функция для создания грида приложений, если его еще нет
function createAppGrid() {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // Очищаем div
  
  const appGrid = document.createElement('div');
  appGrid.className = 'app-grid';
  resultsDiv.appendChild(appGrid);
  
  return appGrid;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification(translations[currentLanguage].copy_to_clipboard + ": " + text);
  });
}

// Helper function for notifications
function showNotification(message, duration = 2000) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, duration);
}

// Function to fetch subscriptions using multiple CORS proxies
function fetchSubscriptions(bundleId, trackViewUrl, appName) {
  const subscriptionsModal = document.getElementById('subscriptions-modal');
  const subscriptionsContent = document.getElementById('subscriptions-content');
  const subscriptionsList = document.getElementById('subscriptions-list');
  const subscriptionsTitle = document.querySelector('.subscriptions-modal-header h3');
  
  subscriptionsTitle.textContent = `${translations[currentLanguage].subscriptions_title}: ${appName}`;
  subscriptionsList.innerHTML = `<div class="loading"><i class="fas fa-spinner fa-spin"></i> <span data-translate="loading">${translations[currentLanguage].loading}</span></div>`;
  
  subscriptionsModal.classList.add('active');
  document.getElementById('overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  
  let proxyIndex = 0;
  
  function tryNextProxy() {
    if (proxyIndex >= corsProxies.length) {
      // All proxies failed
      subscriptionsList.innerHTML = `<div class="error"><span data-translate="error_loading">${translations[currentLanguage].error_loading}</span>: <span data-translate="no_working_proxy">${translations[currentLanguage].no_working_proxy}</span></div>`;
      return;
    }
    
    const currentProxy = corsProxies[proxyIndex];
    
    fetch(currentProxy + encodeURIComponent(trackViewUrl))
      .then(response => {
        if (!response.ok) {
          // If forbidden or other error, try next proxy
          if (response.status === 403 || response.status >= 400) {
            throw new Error(`Proxy returned status: ${response.status}`);
          }
        }
        return response.text();
      })
      .then(data => {
        // Different RegEx patterns for different potential response formats
        let matches = [];
        const regexPatterns = [
          /&offerName=(.*?)&/g,           // Standard format
          /\\u0026offerName=(.*?)\\u0026/g, // Escaped format
          /offerName=(.*?)(?:&|$)/g,      // URL parameter format
          /"offerName":"(.*?)"/g,         // JSON format
          /offerName%3D(.*?)%26/g,        // URL encoded format
        ];
        
        // Try each regex pattern
        for (const pattern of regexPatterns) {
          const foundMatches = [...data.matchAll(pattern)];
          if (foundMatches.length > 0) {
            matches = foundMatches;
            break;
          }
        }
        
        if (matches.length > 0) {
          const subscriptions = matches.map(match => decodeURIComponent(match[1]));
          const uniqueSubscriptions = [...new Set(subscriptions)]; // Remove duplicates
          
          subscriptionsList.innerHTML = '';
          
          uniqueSubscriptions.forEach((sub, index) => {
            const item = document.createElement('div');
            item.className = 'subscription-item';
            item.innerHTML = `
              <span class="subscription-number">${index + 1}.</span>
              <span class="subscription-name">${sub}</span>
              <button class="copy-btn" onclick="copyToClipboard('${sub}')">
                <i class="fas fa-copy"></i>
              </button>
            `;
            subscriptionsList.appendChild(item);
          });
          
          // Add counter at the top
          const counter = document.createElement('div');
          counter.className = 'subscriptions-counter';
          counter.innerHTML = `<span>${translations[currentLanguage].subscriptions_found}: ${uniqueSubscriptions.length}</span>`;
          subscriptionsList.prepend(counter);
          
          // Add proxy info
          const proxyInfo = document.createElement('div');
          proxyInfo.className = 'proxy-info';
          proxyInfo.innerHTML = `<small>Proxy: ${proxyIndex + 1}/${corsProxies.length}</small>`;
          subscriptionsList.append(proxyInfo);
        } else {
          // Try alternative method - direct App Store API if no matches found
          fetchSubscriptionsViaAPI(bundleId);
        }
      })
      .catch(error => {
        console.log(`Proxy ${proxyIndex + 1} failed:`, error);
        // Try next proxy
        proxyIndex++;
        tryNextProxy();
      });
  }
  
  // Fallback method using iTunes API
  function fetchSubscriptionsViaAPI(bundleId) {
    const country = document.getElementById("country").value;
    $.getJSON(
      `https://itunes.apple.com/lookup?bundleId=${bundleId}&country=${country}&callback=?`,
      function(json) {
        if (json.resultCount > 0) {
          const app = json.results[0];
          // Check if there's in-app purchases data
          if (app.ipadScreenshotUrls && app.ipadScreenshotUrls.length > 0) {
            subscriptionsList.innerHTML = `<div class="info-message"><span data-translate="try_check_directly">${translations[currentLanguage].try_check_directly}</span></div>`;
            
            // Add a button to open App Store directly
            const openStoreBtn = document.createElement('a');
            openStoreBtn.href = app.trackViewUrl;
            openStoreBtn.target = "_blank";
            openStoreBtn.className = "open-store-btn";
            openStoreBtn.innerHTML = `<i class="fas fa-external-link-alt"></i> <span data-translate="open_in_appstore">${translations[currentLanguage].open_in_appstore}</span>`;
            subscriptionsList.appendChild(openStoreBtn);
          } else {
            subscriptionsList.innerHTML = `<div class="no-data"><span data-translate="no_subscriptions">${translations[currentLanguage].no_subscriptions}</span></div>`;
          }
        } else {
          subscriptionsList.innerHTML = `<div class="no-data"><span data-translate="no_subscriptions">${translations[currentLanguage].no_subscriptions}</span></div>`;
        }
      }
    ).fail(function() {
      subscriptionsList.innerHTML = `<div class="error"><span data-translate="error_loading">${translations[currentLanguage].error_loading}</span></div>`;
    });
  }
  
  // Start the proxy attempt chain
  tryNextProxy();
}

// Добавляем функцию для отображения флага выбранной страны
function updateCountryFlag() {
  const countrySelect = document.getElementById('country');
  const searchWrapper = document.querySelector('.search-wrapper');
  const selectedOption = countrySelect.options[countrySelect.selectedIndex];
  
  // Проверяем, существует ли элемент с флагом
  let flagElement = document.querySelector('.country-flag');
  
  // Если элемента нет, создаем его
  if (!flagElement) {
    flagElement = document.createElement('span');
    flagElement.className = 'country-flag';
    searchWrapper.appendChild(flagElement);
  }
  
  // Получаем текст опции, который содержит эмодзи флага
  const optionText = selectedOption.text;
  const flagEmoji = optionText.split(' ')[0]; // Первая часть текста - это эмодзи флага
  
  // Устанавливаем флаг
  flagElement.textContent = flagEmoji;
}

document.addEventListener('DOMContentLoaded', () => {
  
  loadUserPreferences();

  
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', toggleTheme);

  
  const languageToggle = document.getElementById('language-toggle');
  languageToggle.addEventListener('click', () => {
    const newLang = currentLanguage === 'ru' ? 'en' : 'ru';
    setLanguage(newLang);
    
    // Обновляем текст на динамически созданных элементах
    updateDynamicTranslations();
  });

  
  handleSidebar();

  
  handleSettingsModal();
  
  
  handleAccessModal();
  
  
  handleSubscriptionsModal();

  
  $("#searchform").submit(function(event) {
    event.preventDefault();
    var searchfield = $("#search");
    getBundleId(searchfield.val());
  });

  
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
        overlay.classList.add('active');

        
        if (sidebar) {
          sidebar.classList.remove('active');
        }
      }
    });
  }

  // Вызываем функцию при загрузке страницы
  updateCountryFlag();
  
  // Добавляем слушатель событий на изменение страны
  const countrySelect = document.getElementById('country');
  countrySelect.addEventListener('change', updateCountryFlag);
});

// Функция для обновления переводов на динамически добавленных элементах
function updateDynamicTranslations() {
  // Обновляем все элементы с data-translate атрибутами
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[currentLanguage][key]) {
      element.textContent = translations[currentLanguage][key];
    }
  });
  
  // Если есть активные результаты поиска, обновляем кнопки подписок
  const subscriptionButtons = document.querySelectorAll('.subscription-btn span');
  subscriptionButtons.forEach(button => {
    button.textContent = translations[currentLanguage].subscriptions_button;
  });
  
  // Обновляем тексты в модальном окне подписок, если оно открыто
  const subscriptionsModal = document.getElementById('subscriptions-modal');
  if (subscriptionsModal && subscriptionsModal.classList.contains('active')) {
    const title = document.querySelector('.subscriptions-modal-header h3');
    if (title && title.textContent.includes(':')) {
      const appName = title.textContent.split(':')[1].trim();
      title.textContent = `${translations[currentLanguage].subscriptions_title}: ${appName}`;
    }
    
    const counter = document.querySelector('.subscriptions-counter span');
    if (counter) {
      const count = counter.textContent.split(':')[1].trim();
      counter.textContent = `${translations[currentLanguage].subscriptions_found}: ${count}`;
    }
  }
}

window.copyToClipboard = copyToClipboard;
window.fetchSubscriptions = fetchSubscriptions;
