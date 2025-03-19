let currentLanguage = 'ru';
let currentTheme = 'dark';
var jsonData;
var originalJsonData;

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
    'contacts': 'Контакты',
    'help': 'Помощь',
    'rights': 'Все права защищены',
    'update_repository_title': 'Обновление репозитория',
    'upload_json': 'Загрузить JSON',
    'update_images': 'Обновить изображения',
    'generate_announcement': 'Создать анонс',
    'app_edit_form': 'Форма редактирования приложения',
    'app_name': 'Название приложения',
    'app_bundle': 'Bundle ID',
    'app_version': 'Версия',
    'app_size': 'Размер (MB)',
    'app_min_ios': 'Минимальная версия iOS',
    'app_image': 'URL изображения',
    'app_package': 'URL пакета',
    'app_type': 'Тип (платный/бесплатный)',
    'app_category': 'Категория',
    'app_description': 'Описание',
    'apply_changes': 'Применить изменения',
    'export_options': 'Экспорт',
    'download_with_bundle': 'Скачать JSON с Bundle',
    'download_without_bundle': 'Скачать JSON без Bundle',
    'download_parse': 'Скачать Parse JSON'
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
    'contacts': 'Contacts',
    'help': 'Help',
    'rights': 'All rights reserved',
    'update_repository_title': 'Update Repository',
    'upload_json': 'Upload JSON',
    'update_images': 'Update Images',
    'generate_announcement': 'Generate Announcement',
    'app_edit_form': 'App Edit Form',
    'app_name': 'App Name',
    'app_bundle': 'Bundle ID',
    'app_version': 'Version',
    'app_size': 'Size (MB)',
    'app_min_ios': 'Minimum iOS Version',
    'app_image': 'Image URL',
    'app_package': 'Package URL',
    'app_type': 'Type (Paid/Free)',
    'app_category': 'Category',
    'app_description': 'Description',
    'apply_changes': 'Apply Changes',
    'export_options': 'Export Options',
    'download_with_bundle': 'Download JSON with Bundle',
    'download_without_bundle': 'Download JSON without Bundle',
    'download_parse': 'Download Parse JSON'
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
  });

  closeSidebarBtn.addEventListener('click', () => {
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
}

function loadJSON() {
    var input = document.getElementById('jsonFileInput');
    var file = input.files[0];
    var reader = new FileReader();

    reader.onload = function() {
        jsonData = JSON.parse(reader.result);
        originalJsonData = JSON.parse(JSON.stringify(jsonData));
        displayJSON();
    };

    reader.readAsText(file);
}

async function updateAppImages() {
    if (!jsonData || !jsonData.appRepositories) {
        alert('Сначала загрузите .JSON файл!');
        return;
    }

    const apps = jsonData.appRepositories;

    for (let app of apps) {
        const searchValue = app.appBundle;
        let appImageUrl = null;

        try {
            const usResponse = await fetch(`https://itunes.apple.com/lookup?bundleId=${searchValue}&country=us`);
            const usData = await usResponse.json();
            if (usData.resultCount > 0) {
                appImageUrl = usData.results[0].artworkUrl512 || usData.results[0].artworkUrl100;
            }
        } catch (error) {
            console.log(`Ошибка при поиске ${searchValue} в регионе us:`, error);
        }

        if (!appImageUrl) {
            try {
                const ruResponse = await fetch(`https://itunes.apple.com/lookup?bundleId=${searchValue}&country=ru`);
                const ruData = await ruResponse.json();
                if (ruData.resultCount > 0) {
                    appImageUrl = ruData.results[0].artworkUrl512 || ruData.results[0].artworkUrl100;
                }
            } catch (error) {
                console.log(`Ошибка при поиске ${searchValue} в регионе ru:`, error);
            }
        }

        if (appImageUrl) {
            app.appImage = appImageUrl;
            console.log(`Обновлена картинка для ${app.appName}: ${appImageUrl}`);
        } else {
            console.log(`Картинка для ${app.appName} не найдена в iTunes`);
        }
    }

    displayJSON();
    alert('Обновление картинок завершено!');
}

function generateAnnouncement() {
    if (!jsonData || !originalJsonData) {
        alert('Сначала загрузите JSON файл!');
        return;
    }

    const currentApps = jsonData.appRepositories;
    const originalApps = originalJsonData.appRepositories;

    const newApps = [];
    const updatedApps = [];

    currentApps.forEach(currentApp => {
        const originalApp = originalApps.find(a => a.appName.toLowerCase() === currentApp.appName.toLowerCase());
        if (!originalApp) {
            newApps.push(currentApp.appName);
        } else {
            const keys = Object.keys(currentApp).filter(key => key !== 'appUpdateTime');
            let isUpdated = keys.some(key => currentApp[key] !== originalApp[key]);
            if (isUpdated) updatedApps.push(currentApp.appName);
        }
    });

    if (newApps.length === 0 && updatedApps.length === 0) {
        alert('Нет изменений для анонса!');
        return;
    }

    let announcementText = '';

    announcementText += '🇷🇺 Обновление репозитория\n\n';
    if (newApps.length > 0) {
        announcementText += `Добавлены новые приложения:\n${newApps.join(', ')}\n\n`;
    }
    if (updatedApps.length > 0) {
        announcementText += `Обновлены приложения:\n${updatedApps.join(', ')}\n\n`;
    }

    announcementText += '🇺🇸 Update repository\n\n';
    if (newApps.length > 0) {
        announcementText += `New applications added:\n${newApps.join(', ')}\n\n`;
    }
    if (updatedApps.length > 0) {
        announcementText += `Updated applications:\n${updatedApps.join(', ')}\n\n`;
    }

    announcementText = announcementText.replace(/\n{3,}/g, '\n\n').trim();

    navigator.clipboard.writeText(announcementText)
        .then(() => alert('Анонс скопирован в буфер!'))
        .catch(() => alert('Ошибка копирования'));
}

function displayJSON() {
    if (jsonData) {
        var jsonDataDisplay = document.getElementById('jsonDataDisplay');
        jsonDataDisplay.innerHTML = '';

        var formattedJSON = JSON.stringify(jsonData, null, 4);

        var preElement = document.createElement('pre');
        preElement.classList.add('json-display');

        preElement.innerHTML = syntaxHighlight(formattedJSON);

        jsonDataDisplay.appendChild(preElement);
        jsonDataDisplay.style.display = "block";
    }
}

function showMatches() {
    var input = document.getElementById('appName').value;
    var matchesList = document.getElementById('matchesList');
    matchesList.innerHTML = '';

    if (!jsonData || !jsonData.appRepositories || input.length < 2) return;

    var matches = jsonData.appRepositories.filter(item => item.appName.toLowerCase().startsWith(input.toLowerCase()));

    matches.slice(0, 5).forEach(match => {
        var div = document.createElement('div');
        div.classList.add('autocomplete-item');
        div.textContent = match.appName;
        div.onclick = function() {
            document.getElementById('appName').value = match.appName;
            document.getElementById('appDescription').value = match.appDescription || '';
            document.getElementById('appImage').value = match.appImage || '';
            document.getElementById('appBundle').value = match.appBundle || '';
            
                        if (match.appVersion) {
                const versionParts = match.appVersion.split('|');
                if (versionParts.length >= 3) {
                    document.getElementById('appVersion').value = versionParts[0].trim();
                    document.getElementById('appSize').value = versionParts[1].replace('MB', '').trim();
                    document.getElementById('appVersionIOS').value = versionParts[2].replace('IOS', '').trim();
                }
            }
            
            if (match.appPackage) {
                document.getElementById('appPackage').value = match.appPackage;
            }
            
            matchesList.innerHTML = '';
        };
        matchesList.appendChild(div);
    });

    var inputField = document.getElementById('appName');
    matchesList.style.width = inputField.offsetWidth + 'px';
}

document.addEventListener('click', function(event) {
    var matchesList = document.getElementById('matchesList');
    var inputField = document.getElementById('appName');
    if (matchesList && inputField && !matchesList.contains(event.target) && !inputField.contains(event.target)) {
        matchesList.innerHTML = '';
    }
});

function syntaxHighlight(json) {
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
        var cls = 'json-key';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'json-key';
            } else {
                cls = 'json-string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'json-boolean';
        } else if (/null/.test(match)) {
            cls = 'json-null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function appUpdateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timezoneOffset = now.getTimezoneOffset();
    const timezoneHours = Math.floor(-timezoneOffset / 60);
    const timezoneMinutes = -timezoneOffset - timezoneHours * 60;
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+${String(timezoneHours).padStart(2, '0')}${String(timezoneMinutes).padStart(2, '0')}`;
}

function applyChanges() {
    const currentTime = appUpdateTime();
    var appType = JSON.parse(document.getElementById('appType').value);
    var appCategory = document.getElementById('appCategory').value;
    var appName = document.getElementById('appName').value;
    var appBundle = document.getElementById('appBundle').value;
    var appVersion = document.getElementById('appVersion').value;
    var appSize = document.getElementById('appSize').value;
    var appVersionIOS = document.getElementById('appVersionIOS').value;
    var appImage = document.getElementById('appImage').value;
    var appPackage = document.getElementById('appPackage').value;
    var appDescription = document.getElementById('appDescription').value;

    if (!appName || !appBundle || !appVersion || !appImage || !appPackage || !appDescription || !appSize || !appVersionIOS) {
        alert('Заполните все поля формы!');
        return;
    };

    if (!jsonData) {
        jsonData = { "appRepositories": [] };
    } else if (!jsonData.appRepositories) {
        jsonData.appRepositories = [];
    }

    var existingAppIndex = jsonData.appRepositories.findIndex(function(app) {
        return app.appName.toLowerCase() === appName.toLowerCase();
    });

    if (existingAppIndex !== -1) {
        jsonData.appRepositories[existingAppIndex] = {
            "lock": appType,
            "appType": "SELF_SIGN",
            "appCateIndex": appCategory,
            "appUpdateTime": currentTime,
            "appName": appName,
            "appBundle": appBundle,
            "appVersion": `${appVersion} | ${appSize} MB | IOS ${appVersionIOS}`,
            "appImage": appImage,
            "appPackage": appPackage,
            "appDescription": appDescription
        };
        alert('Данные успешно изменены!');
    } else {
        var newApp = {
            "lock": appType,
            "appType": "SELF_SIGN",
            "appCateIndex": appCategory,
            "appUpdateTime": currentTime,
            "appName": appName,
            "appBundle": appBundle,
            "appVersion": `${appVersion} | ${appSize} MB | IOS ${appVersionIOS}`,
            "appImage": appImage,
            "appPackage": appPackage,
            "appDescription": appDescription
        };
        jsonData.appRepositories.push(newApp);
        alert('Приложение успешно добавлено!');
    }

    displayJSON();
}

function installJSONWithBundle() {
    if (!jsonData) {
        alert('Сначала загрузите .JSON и примените изменения!');
        return;
    }

    var jsonString = JSON.stringify(jsonData, null, 4);

    var blob = new Blob([jsonString], {
        type: 'application/json'
    });

    var url = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.href = url;
    a.download = 'Repo_WithBundle.json';
    a.click();
}

function installJSONWithoutBundle() {
    if (!jsonData || !jsonData.appRepositories) {
        alert('Сначала загрузите .JSON и примените изменения!');
        return;
    }

    const modifiedData = {
        ...jsonData
    };

    modifiedData.appRepositories = jsonData.appRepositories.map(({
        appBundle,
        ...rest
    }) => rest);

    const jsonString = JSON.stringify(modifiedData, null, 4);

    const blob = new Blob([jsonString], {
        type: 'application/json'
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'Repo_WithoutBundle.json';
    a.click();
}

function parseJSON() {
    if (!jsonData || !jsonData.appRepositories) {
        alert('Сначала загрузите .JSON и примените изменения!');
        return;
    }

    const filteredData = jsonData.appRepositories.map(app => ({
        appName: app.appName,
        appBundle: app.appBundle,
        appImage: app.appImage,
        appVersion: app.appVersion,
        appDescription: app.appDescription,
        appUpdateTime: app.appUpdateTime
    }));

    const jsonString = JSON.stringify(filteredData, null, 4);

    const blob = new Blob([jsonString], {
        type: 'application/json'
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'Repo_Parse.json';
    a.click();
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
