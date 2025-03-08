
// Функция загрузки JSON-файла
function loadJSON() {
    var file = document.getElementById('jsonFileInput');
    var reader = new FileReader();
    reader.onload = function() {
        var json = JSON.parse(reader.result);
        var objCData = JSONToObjC(json);
        document.getElementById('objCData').textContent = objCData;
    };
    reader.readAsText(file.files[0]);
}

// Функция преобразования JSON в Objective-C код
function JSONToObjC(value, level = 0) {
    var indentation = "    ".repeat(level);
    var nextIndentation = "    ".repeat(level + 1);

    var objCData = document.getElementById('objCData');
    objCData.style.display = "block"

    if (value === true) {
        return '@YES';
    } else if (value === false) {
        return '@NO';
    } else if (value === null) {
        return 'NSNull.null';
    } else if (typeof value === 'string') {
        return `@\"${value}\"`;
    } else if (typeof value === 'number') {
        return `@${value}`;
    } else if (Array.isArray(value)) {
        return `@[\n${value.map(v => `${nextIndentation}${JSONToObjC(v, level + 1)}`).join(',\n')}\n${indentation}]`;
    } else if (typeof value === 'object' && value !== null) {
        var keys = Object.keys(value);
        return `@{\n${keys.map(key => `${nextIndentation}@\"${key}\": ${JSONToObjC(value[key], level + 1)}`).join(',\n')}\n${indentation}}`;
    }
    return '';
}

// Функция копирования Objective-C кода
function copyObjCCode() {
    const objCCode = document.getElementById('objCData').textContent;
    navigator.clipboard.writeText(objCCode)
        .then(() => {
            const copyBtn = document.getElementById('copyObjcBtn');
            const originalIcon = copyBtn.innerHTML;
            
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            copyBtn.classList.add('copied');
            
            setTimeout(() => {
                copyBtn.innerHTML = originalIcon;
                copyBtn.classList.remove('copied');
            }, 2000);
        })
        .catch(err => {
            console.error('Не удалось скопировать текст: ', err);
            alert('Не удалось скопировать текст. Пожалуйста, выделите его вручную и скопируйте.');
        });
}

// Словарь для многоязычности
const translations = {
  'ru': {
    'menu': 'Меню',
    'home': 'Главная',
    'update_repository': 'Обновить репозиторий',
    'app_search': 'Поиск приложений в AppStore',
    'converter': 'Конвертер',
    'converter_title': 'Конвертер JSON в Objective-C',
    'upload_json': 'Загрузить JSON',
    'objc_result': 'Результат в Objective-C',
    'settings': 'Настройки',
    'theme': 'Тема',
    'dark_theme': 'Темная',
    'light_theme': 'Светлая',
    'language': 'Язык',
    'contacts': 'Контакты',
    'help': 'Помощь',
    'rights': 'Все права защищены'
  },
  'en': {
    'menu': 'Menu',
    'home': 'Home',
    'update_repository': 'Update Repository',
    'app_search': 'Search Apps in AppStore',
    'converter': 'Converter',
    'converter_title': 'JSON to Objective-C Converter',
    'upload_json': 'Upload JSON',
    'objc_result': 'Objective-C Result',
    'settings': 'Settings',
    'theme': 'Theme',
    'dark_theme': 'Dark',
    'light_theme': 'Light',
    'language': 'Language',
    'contacts': 'Contacts',
    'help': 'Help',
    'rights': 'All rights reserved'
  }
};

let currentLanguage = 'ru';

// Функция для переключения языка
function setLanguage(lang) {
  currentLanguage = lang;
  document.getElementById('language-toggle').textContent = lang.toUpperCase();

  // Обновляем все элементы с атрибутом data-translate
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  // Сохраняем предпочтение пользователя
  localStorage.setItem('preferred_language', lang);
}

// Функция для обработки темы и настроек сайта
document.addEventListener('DOMContentLoaded', function() {
    // Загрузка предпочтительного языка
    const savedLanguage = localStorage.getItem('preferred_language');
    if (savedLanguage) {
        setLanguage(savedLanguage);
    }

    // Обработчик кнопки меню
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    menuBtn.addEventListener('click', function() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    });
    
    // Закрытие сайдбара при клике на крестик
    const closeSidebarBtn = document.getElementById('close-sidebar');
    
    closeSidebarBtn.addEventListener('click', function() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    // Закрытие сайдбара при клике на оверлей
    overlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        
        const settingsModal = document.getElementById('settings-modal');
        if (settingsModal) {
            settingsModal.classList.remove('active');
        }
        
        const accessModal = document.getElementById('access-modal');
        if (accessModal) {
            accessModal.classList.remove('active');
        }
    });
    
    // Обработчик кнопки настроек в сайдбаре
    const settingsToggleSidebar = document.getElementById('settings-toggle-sidebar');
    const settingsModal = document.getElementById('settings-modal');
    
    if (settingsToggleSidebar && settingsModal) {
        settingsToggleSidebar.addEventListener('click', function() {
            settingsModal.classList.add('active');
            overlay.classList.add('active');
            sidebar.classList.remove('active');
        });
    }
    
    // Закрытие модального окна настроек
    const closeSettingsBtn = document.getElementById('close-settings');
    
    if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener('click', function() {
            settingsModal.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
    
    // Переключение темы
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            
            if (document.body.classList.contains('light-theme')) {
                themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i> <span data-translate="light_theme">Светлая</span>';
                document.querySelector('#theme-toggle span').textContent = translations[currentLanguage].light_theme;
            } else {
                themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i> <span data-translate="dark_theme">Темная</span>';
                document.querySelector('#theme-toggle span').textContent = translations[currentLanguage].dark_theme;
            }
        });
    }
    
    // Обработчик переключения языка
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            const newLang = currentLanguage === 'ru' ? 'en' : 'ru';
            setLanguage(newLang);
        });
    }
});
