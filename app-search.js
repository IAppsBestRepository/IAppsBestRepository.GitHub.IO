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
    'buy_access': 'Купить доступ',
    'buy_access_title': 'Платный доступ к каталогу',
    'access_description': 'Получите полный доступ к каталогу приложений с расширенным функционалом и дополнительными возможностями.',
    'monthly_plan': 'Месячный план',
    'quarterly_plan': 'Трехмесячный план',
    'yearly_plan': 'Годовой план',
    'monthly_price': '399 ₽',
    'quarterly_price': '999 ₽',
    'yearly_price': '2999 ₽',
    'best_value': 'Выгодно',
    'access_feature1': 'Доступ ко всем приложениям',
    'access_feature2': 'Приоритетная поддержка',
    'access_feature3': 'Без рекламы',
    'access_feature4': 'Ранний доступ к новинкам',
    'access_feature5': 'Скидка 15%',
    'access_feature6': 'Скидка 35%',
    'purchase_access': 'Приобрести доступ',
    'app_not_found_by_bundleid': 'Приложение с таким BundleID не найдено.',
    'app_not_found_by_name': 'Приложение с таким названием не найдено.'
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
    'buy_access': 'Buy Access',
    'buy_access_title': 'Premium Catalog Access',
    'access_description': 'Get full access to the application catalog with advanced features and additional capabilities.',
    'monthly_plan': 'Monthly Plan',
    'quarterly_plan': 'Quarterly Plan',
    'yearly_plan': 'Yearly Plan',
    'monthly_price': '$5',
    'quarterly_price': '$12',
    'yearly_price': '$35',
    'best_value': 'Best Value',
    'access_feature1': 'Access to all applications',
    'access_feature2': 'Priority support',
    'access_feature3': 'Ad-free experience',
    'access_feature4': 'Early access to new releases',
    'access_feature5': '15% discount',
    'access_feature6': '35% discount',
    'purchase_access': 'Purchase Access',
    'app_not_found_by_bundleid': 'No application found with this BundleID.',
    'app_not_found_by_name': 'No application found with this name.'
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


function getBundleId(searchvalue) {
  var country = document.getElementById("country").value;
  var isBundleId = searchvalue.includes(".");

  if (isBundleId) {
    $.getJSON(
      `https://itunes.apple.com/lookup?bundleId=${searchvalue}&country=${country}&callback=?`,
      function(json) {
        $("#results").html("");
        if (json.resultCount > 0) {
          json.results.forEach((app) => {
            displayApp(app);
          });
          $("#results-table").fadeIn();
        } else {
          $("#results").html(`<p>${translations[currentLanguage].app_not_found_by_bundleid}</p>`);
        }
      }
    );
  } else {
    $.getJSON(
      `https://itunes.apple.com/search?limit=20&media=software&term=${searchvalue}&country=${country}&callback=?`,
      function(json) {
        $("#results").html("");
        if (json.resultCount > 0) {
          json.results.forEach((app) => {
            displayApp(app);
          });
          $("#results-table").fadeIn();
        } else {
          $("#results").html(`<p>${translations[currentLanguage].app_not_found_by_name}</p>`);
        }
      }
    );
  }
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

  var result = `
    <tr>
      <td>
        <div class="app-icon-wrapper">
          <img src="${artworkUrl}" alt="${appName}" onclick="copyToClipboard('${artworkUrl}')" title="Нажмите, чтобы скопировать URL">
        </div>
      </td>
      <td class="app-info-cell">
        <h3 class="app-title">${appName}</h3>
        <p style="line-height: 1.5;"><strong>BundleID:</strong>&nbsp;&nbsp;<span id="bundle_${appId}" class="bundleid" onclick="copyToClipboard('${bundleId}')">${bundleId}</span></p>
        <p><strong>Artist:</strong>&nbsp;&nbsp;${artistName}</p>
        <p><strong>Min iOS:</strong>&nbsp;&nbsp;${minimumIos}</p>
        <p><strong>Last Version:</strong>&nbsp;&nbsp;${lastVersion}</p>
        <p><strong>Last Update:</strong>&nbsp;&nbsp;${lastUpdate}</p>
      </td>
    </tr>`;
  $("#results").append(result);
}


function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard: " + text);
  });
}


document.addEventListener('DOMContentLoaded', () => {
  
  loadUserPreferences();

  
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
});


window.copyToClipboard = copyToClipboard;
