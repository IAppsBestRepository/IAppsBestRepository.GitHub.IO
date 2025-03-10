let currentLanguage = 'ru';
let currentTheme = 'dark';
let originalJsonData = null;
let fullJsonData = null;
let modifications = [];
let dictionaryCount = 0;
let arrayCount = 0;
let modifiedPaths = new Map();

const translations = {
  'ru': {
    'menu': 'Меню',
    'home': 'Главная',
    'delegate_input': 'Имя делегата:',
    'delegate_input_placeholder': 'Введите имя делегата',
    'update_repository': 'Обновить репозиторий',
    'app_search': 'Поиск приложений в AppStore',
    'categories': 'Категории',
    'about': 'О сайте',
    'settings': 'Настройки',
    'theme': 'Тема',
    'dark_theme': 'Темная',
    'light_theme': 'Светлая',
    'language': 'Язык',
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
    'converter': 'Конвертер',
    'obj_c_generator': 'Генератор кода OBJ-C',
    'obj_c_generator_title': 'Генератор OBJ-C кода',
    'obj_c_generator_description': 'Создание кода частичной или полной подмены данных для OBJ-C',
    'url_input': 'URL запроса:',
    'url_input_placeholder': 'Введите URL запроса',
    'mechanism_selection': 'Выбор механизма:',
    'mechanism_datatask': '- (id)dataTaskWithRequest',
    'mechanism_private_datatask': '- (id)_dataTaskWithRequest',
    'substitution_type': 'Тип подмены:',
    'partial_substitution': 'Частичная подмена',
    'full_substitution': 'Полная подмена',
    'original_json': 'Оригинальный JSON',
    'json_modifications': 'Модификации JSON',
    'generated_code': 'Сгенерированный код',
    'custom_json': 'Пользовательский JSON',
    'json_placeholder': 'Загрузите JSON файл для отображения структуры данных',
    'modifications_placeholder': 'Выберите ключи в структуре JSON для их модификации',
    'custom_json_placeholder': 'Введите JSON для полной подмены',
    'upload_json_title': 'Загрузить JSON',
    'clear_modifications_title': 'Очистить модификации',
    'copy_code_title': 'Копировать код',
    'code_copied': 'Код скопирован!',
    'insert_json': 'Вставить JSON',
    'insert_json_title': 'Вставить JSON вручную',
    'insert_json_placeholder': 'Вставьте ваш JSON код сюда...',
    'apply': 'Применить',
    'data_type_string': 'Строка',
    'data_type_number': 'Число',
    'data_type_boolean': 'Булево',
    'data_type_object': 'Словарь',
    'data_type_array': 'Массив',
    'data_type_null': 'Null',
    'new_value': 'Новое значение',
    'select_type': 'Выберите тип',
    'add_modification': 'Добавить',
    'remove_modification': 'Удалить',
    'json_parse_error': 'Ошибка разбора JSON. Проверьте формат файла.',
    'modification_added': 'Модификация добавлена!',
    'modification_removed': 'Модификация удалена!',
    'add_new_key': 'Добавить новый ключ',
    'key_name': 'Название ключа',
    'enter_key_name': 'Введите название ключа',
    'value': 'Значение',
    'add_key': 'Добавить ключ',
    'key_name_required': 'Название ключа обязательно',
    'key_added': 'Ключ добавлен!',
    'add_object_key': 'Добавить ключ в объект',
    'add_array_item': 'Добавить элемент в массив'
  },
  'en': {
    'menu': 'Menu',
    'home': 'Home',
    'delegate_input': 'Delegate Name:',
    'delegate_input_placeholder': 'Enter delegate name',
    'update_repository': 'Update Repository',
    'app_search': 'Search apps in AppStore',
    'categories': 'Categories',
    'about': 'About',
    'settings': 'Settings',
    'theme': 'Theme',
    'dark_theme': 'Dark',
    'light_theme': 'Light',
    'language': 'Language',
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
    'converter': 'Converter',
    'obj_c_generator': 'OBJ-C Code Generator',
    'obj_c_generator_title': 'OBJ-C Code Generator',
    'obj_c_generator_description': 'Create partial or full data substitution code for OBJ-C',
    'url_input': 'Request URL:',
    'url_input_placeholder': 'Enter request URL',
    'mechanism_selection': 'Mechanism selection:',
    'mechanism_datatask': '- (id)dataTaskWithRequest',
    'mechanism_private_datatask': '- (id)_dataTaskWithRequest',
    'substitution_type': 'Substitution type:',
    'partial_substitution': 'Partial substitution',
    'full_substitution': 'Full substitution',
    'original_json': 'Original JSON',
    'json_modifications': 'JSON Modifications',
    'generated_code': 'Generated Code',
    'custom_json': 'Custom JSON',
    'json_placeholder': 'Upload a JSON file to display data structure',
    'modifications_placeholder': 'Select keys in the JSON structure for modification',
    'custom_json_placeholder': 'Enter JSON for full substitution',
    'upload_json_title': 'Upload JSON',
    'clear_modifications_title': 'Clear modifications',
    'copy_code_title': 'Copy code',
    'code_copied': 'Code copied!',
    'insert_json': 'Insert JSON',
    'insert_json_title': 'Insert JSON manually',
    'insert_json_placeholder': 'Paste your JSON code here...',
    'apply': 'Apply',
    'data_type_string': 'String',
    'data_type_number': 'Number',
    'data_type_boolean': 'Boolean',
    'data_type_object': 'Object',
    'data_type_array': 'Array',
    'data_type_null': 'Null',
    'new_value': 'New value',
    'select_type': 'Select type',
    'add_modification': 'Add',
    'remove_modification': 'Remove',
    'json_parse_error': 'JSON parsing error. Check file format.',
    'modification_added': 'Modification added!',
    'modification_removed': 'Modification removed!',
    'add_new_key': 'Add new key',
    'key_name': 'Key name',
    'enter_key_name': 'Enter key name',
    'value': 'Value',
    'add_key': 'Add key',
    'key_name_required': 'Key name is required',
    'key_added': 'Key added!',
    'add_object_key': 'Add key to object',
    'add_array_item': 'Add item to array'
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

  const titleElements = document.querySelectorAll('[data-translate-title]');
  titleElements.forEach(element => {
    const key = element.getAttribute('data-translate-title');
    if (translations[lang][key]) {
      element.title = translations[lang][key];
    }
  });

  localStorage.setItem('preferred_language', lang);

  updateInterface();
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

function handleManualJsonModals() {
  // Обработчики для основного JSON (частичная подмена)
  const manualJsonBtn = document.getElementById('manual-json-btn');
  const manualJsonModal = document.getElementById('manual-json-modal');
  const closeManualJson = document.getElementById('close-manual-json');
  const applyManualJson = document.getElementById('apply-manual-json');
  
  if (manualJsonBtn) {
    manualJsonBtn.addEventListener('click', () => {
      manualJsonModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  
  if (closeManualJson) {
    closeManualJson.addEventListener('click', () => {
      manualJsonModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  if (applyManualJson) {
    applyManualJson.addEventListener('click', processManualJson);
  }
  
  if (manualJsonModal) {
    manualJsonModal.addEventListener('click', (e) => {
      if (e.target === manualJsonModal) {
        manualJsonModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  const manualFullJsonBtn = document.getElementById('manual-full-json-btn');
  const manualFullJsonModal = document.getElementById('manual-full-json-modal');
  const closeManualFullJson = document.getElementById('close-manual-full-json');
  const applyManualFullJson = document.getElementById('apply-manual-full-json');
  
  if (manualFullJsonBtn) {
    manualFullJsonBtn.addEventListener('click', () => {
      manualFullJsonModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  
  if (closeManualFullJson) {
    closeManualFullJson.addEventListener('click', () => {
      manualFullJsonModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  if (applyManualFullJson) {
    applyManualFullJson.addEventListener('click', processManualFullJson);
  }
  
  if (manualFullJsonModal) {
    manualFullJsonModal.addEventListener('click', (e) => {
      if (e.target === manualFullJsonModal) {
        manualFullJsonModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
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
  // Функция оставлена пустой для совместимости
}


function loadJSONFile() {
  const fileInput = document.getElementById('json-file-input');
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      try {
        originalJsonData = JSON.parse(e.target.result);
        displayJSONStructure(originalJsonData);
        updateGeneratedCode();
      } catch (error) {
        alert(translations[currentLanguage].json_parse_error);
        console.error('Error parsing JSON:', error);
      }
    };

    reader.readAsText(file);
  }
}

function processManualJson() {
  const jsonText = document.getElementById('manual-json-input').value;
  
  try {
    originalJsonData = JSON.parse(jsonText);
    displayJSONStructure(originalJsonData);
    updateGeneratedCode();
    
    document.getElementById('manual-json-modal').classList.remove('active');
    document.body.style.overflow = '';
  } catch (error) {
    alert(translations[currentLanguage].json_parse_error);
    console.error('Error parsing JSON:', error);
  }
}


function displayJSONStructure(jsonData) {
  const jsonStructureEl = document.getElementById('json-structure');
  jsonStructureEl.innerHTML = '';

  const jsonHTML = renderJSONStructure(jsonData, '');
  jsonStructureEl.innerHTML = jsonHTML;

  
  addJSONToggleHandlers();

  
  addJSONKeyHandlers();

  
  addJSONAddButtonHandlers();
}


function showNotification(message, type = 'success') {
  
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;

  
  document.body.appendChild(notification);

  
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.right = '20px';
  notification.style.padding = '10px 20px';
  notification.style.borderRadius = '5px';
  notification.style.zIndex = '1000';

  if (type === 'success') {
    notification.style.backgroundColor = '#4CAF50';
    notification.style.color = 'white';
  } else if (type === 'error') {
    notification.style.backgroundColor = '#F44336';
    notification.style.color = 'white';
  }

  
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 3000);
}


function openAddKeyModal(path) {
  
  const modalHTML = `
    <div class="modal" id="add-key-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>${translations[currentLanguage].add_new_key || 'Добавить новый ключ'}</h3>
          <button class="close-btn" id="close-modal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="key-name">${translations[currentLanguage].key_name || 'Название ключа'}:</label>
            <input type="text" id="key-name" class="custom-input" placeholder="${translations[currentLanguage].enter_key_name || 'Введите название ключа'}">
          </div>
          <div class="form-group">
            <label for="value-type">${translations[currentLanguage].select_type || 'Выберите тип'}:</label>
            <select id="value-type" class="custom-select">
              <option value="string">${translations[currentLanguage].data_type_string || 'Строка'}</option>
              <option value="number">${translations[currentLanguage].data_type_number || 'Число'}</option>
              <option value="boolean">${translations[currentLanguage].data_type_boolean || 'Булево'}</option>
              <option value="object">${translations[currentLanguage].data_type_object || 'Словарь'}</option>
              <option value="array">${translations[currentLanguage].data_type_array || 'Массив'}</option>
              <option value="null">${translations[currentLanguage].data_type_null || 'Null'}</option>
            </select>
          </div>
          <div class="form-group" id="value-input-container">
            <label for="value-input">${translations[currentLanguage].value || 'Значение'}:</label>
            <input type="text" id="value-input" class="custom-input">
          </div>
          <button id="add-key-btn" class="primary-btn">${translations[currentLanguage].add_key || 'Добавить ключ'}</button>
        </div>
      </div>
    </div>
  `;

  
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer);

  
  const modalStyle = document.createElement('style');
  modalStyle.textContent = `
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .modal-content {
      background-color: var(--card-bg);
      border-radius: var(--border-radius);
      width: 90%;
      max-width: 500px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      border-bottom: 1px solid var(--border-color);
    }
    
    .modal-header h3 {
      margin: 0;
      color: var(--primary-color);
    }
    
    .modal-body {
      padding: 20px;
    }
    
    .custom-input {
      width: 100%;
      padding: 10px;
      border-radius: var(--border-radius);
      border: 1px solid var(--border-color);
      background-color: var(--input-bg);
      color: var(--text-color);
    }
    
    .primary-btn {
      background-color: var(--primary-color);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: var(--transition);
      margin-top: 15px;
    }
    
    .primary-btn:hover {
      background-color: var(--primary-light);
    }
  `;
  document.head.appendChild(modalStyle);

  
  const modal = document.getElementById('add-key-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const valueTypeSelect = document.getElementById('value-type');
  const valueInputContainer = document.getElementById('value-input-container');
  const valueInput = document.getElementById('value-input');
  const addKeyBtn = document.getElementById('add-key-btn');
  const keyNameInput = document.getElementById('key-name');

  
  valueTypeSelect.addEventListener('change', () => {
    updateValueInput(valueTypeSelect.value, valueInputContainer);
  });

  
  closeModalBtn.addEventListener('click', () => {
    document.body.removeChild(modalContainer);
    document.head.removeChild(modalStyle);
  });

  
  addKeyBtn.addEventListener('click', () => {
    const keyName = keyNameInput.value.trim();
    if (!keyName) {
      showNotification(translations[currentLanguage].key_name_required || 'Название ключа обязательно', 'error');
      return;
    }

    const selectedType = valueTypeSelect.value;
    let newValue;

    
    const valueInputElement = document.getElementById('value-input');
    const inputValue = valueInputElement ? valueInputElement.value : '';

    
    if (selectedType === 'string') {
      newValue = inputValue;
    } else if (selectedType === 'number') {
      newValue = parseFloat(inputValue) || 0;
    } else if (selectedType === 'boolean') {
      newValue = inputValue === 'true';
    } else if (selectedType === 'object') {
      try {
        newValue = JSON.parse(inputValue || '{}');
      } catch (e) {
        console.error("Ошибка парсинга объекта:", e);
        newValue = {};
      }
    } else if (selectedType === 'array') {
      try {
        newValue = JSON.parse(inputValue || '[]');
      } catch (e) {
        console.error("Ошибка парсинга массива:", e);
        newValue = [];
      }
    } else if (selectedType === 'null') {
      newValue = null;
    }

    
    const newPath = path ? `${path}.${keyName}` : keyName;

    
    addModification(newPath, newValue, selectedType);

    
    showNotification(translations[currentLanguage].key_added || 'Ключ добавлен!');

    
    document.body.removeChild(modalContainer);
    document.head.removeChild(modalStyle);
  });

  
  updateValueInput('string', valueInputContainer);
}


function renderJSONStructure(data, path) {
  let html = '';

  if (typeof data === 'object' && data !== null) {
    if (Array.isArray(data)) {
      html += `<div class="json-item"><span class="json-toggle" data-path="${path}">${path ? getLastPathSegment(path) : 'Array'}</span> <span class="json-bracket">[</span>`;
      
      html += `<span class="json-add-btn" data-path="${path}" title="${translations[currentLanguage].add_array_item || 'Добавить элемент в массив'}">+</span>`;
      html += `<div class="json-children">`;

      for (let i = 0; i < data.length; i++) {
        const newPath = path ? `${path}[${i}]` : `[${i}]`;
        html += renderJSONStructure(data[i], newPath);
      }

      html += `</div><span class="json-bracket">]</span></div>`;
    } else {
      html += `<div class="json-item"><span class="json-toggle" data-path="${path}">${path ? getLastPathSegment(path) : 'Object'}</span> <span class="json-bracket">{</span>`;
      
      html += `<span class="json-add-btn" data-path="${path}" title="${translations[currentLanguage].add_object_key || 'Добавить ключ в объект'}">+</span>`;
      html += `<div class="json-children">`;

      for (const key in data) {
        const newPath = path ? `${path}.${key}` : key;
        const value = data[key];

        if (typeof value === 'object' && value !== null) {
          html += renderJSONStructure(value, newPath);
        } else {
          html += `<div class="json-item">
            <span class="json-key" data-path="${newPath}" data-type="${getDataType(value)}">${key}:</span> 
            <span class="${getJsonValueClass(value)}">${formatJSONValue(value)}</span>
          </div>`;
        }
      }

      html += `</div><span class="json-bracket">}</span></div>`;
    }
  } else {
    const key = path ? getLastPathSegment(path) : '';
    html += `<div class="json-item">
      <span class="json-key" data-path="${path}" data-type="${getDataType(data)}">${key}:</span> 
      <span class="${getJsonValueClass(data)}">${formatJSONValue(data)}</span>
    </div>`;
  }

  return html;
}


function getJsonValueClass(value) {
  if (typeof value === 'string') return 'json-string';
  if (typeof value === 'number') return 'json-number';
  if (typeof value === 'boolean') return 'json-boolean';
  if (value === null) return 'json-null';
  return '';
}


function formatJSONValue(value) {
  if (typeof value === 'string') return `"${value}"`;
  if (value === null) return 'null';
  return value;
}


function getDataType(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'object') return 'object';
  return typeof value;
}


function getLastPathSegment(path) {
  if (path.includes('.')) {
    return path.split('.').pop();
  }
  if (path.includes('[')) {
    const match = path.match(/\[(\d+)\]$/);
    if (match) return `[${match[1]}]`;
  }
  return path;
}


function addJSONToggleHandlers() {
  const toggleElements = document.querySelectorAll('.json-toggle');

  toggleElements.forEach(toggle => {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      const children = toggle.parentElement.querySelector('.json-children');
      if (children) {
        children.classList.toggle('open');
      }
    });
  });
}


function addJSONKeyHandlers() {
  const keyElements = document.querySelectorAll('.json-key');

  keyElements.forEach(key => {
    key.addEventListener('click', () => {
      const path = key.getAttribute('data-path');
      const type = key.getAttribute('data-type');

      
      openAddModificationModal(path, type);
    });
  });
}


function addJSONAddButtonHandlers() {
  const addButtons = document.querySelectorAll('.json-add-btn');

  addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation(); 
      const path = button.getAttribute('data-path');

      
      openAddKeyModal(path);
    });
  });
}


function openAddModificationModal(path, type) {
  
  let currentValue = '';
  try {
    const pathParts = path.split('.');
    let current = originalJsonData;

    for (const part of pathParts) {
      if (part.includes('[') && part.includes(']')) {
        const arrayName = part.split('[')[0];
        const index = parseInt(part.split('[')[1].replace(']', ''));
        current = current[arrayName][index];
      } else {
        current = current[part];
      }
    }

    if (typeof current === 'string') {
      currentValue = current;
    } else if (current !== null && current !== undefined) {
      currentValue = JSON.stringify(current);
    }
  } catch (e) {
    console.log('Ошибка получения текущего значения:', e);
  }

  
  const modalHTML = `
    <div class="modal" id="add-modification-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>${translations[currentLanguage].new_value}</h3>
          <button class="close-btn" id="close-modal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="value-type">${translations[currentLanguage].select_type}:</label>
            <select id="value-type" class="custom-select">
              <option value="string">${translations[currentLanguage].data_type_string}</option>
              <option value="number">${translations[currentLanguage].data_type_number}</option>
              <option value="boolean">${translations[currentLanguage].data_type_boolean}</option>
              <option value="object">${translations[currentLanguage].data_type_object}</option>
              <option value="array">${translations[currentLanguage].data_type_array}</option>
              <option value="null">${translations[currentLanguage].data_type_null}</option>
            </select>
          </div>
          <div class="form-group" id="value-input-container">
            <label for="value-input">${translations[currentLanguage].new_value}:</label>
            <input type="text" id="value-input" class="custom-input" value="${currentValue}">
          </div>
          <button id="add-modification-btn" class="primary-btn">${translations[currentLanguage].add_modification}</button>
        </div>
      </div>
    </div>
  `;

  
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer);

  
  const modalStyle = document.createElement('style');
  modalStyle.textContent = `
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .modal-content {
      background-color: var(--card-bg);
      border-radius: var(--border-radius);
      width: 90%;
      max-width: 500px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      border-bottom: 1px solid var(--border-color);
    }
    
    .modal-header h3 {
      margin: 0;
      color: var(--primary-color);
    }
    
    .modal-body {
      padding: 20px;
    }
    
    .custom-input {
      width: 100%;
      padding: 10px;
      border-radius: var(--border-radius);
      border: 1px solid var(--border-color);
      background-color: var(--input-bg);
      color: var(--text-color);
    }
    
    .primary-btn {
      background-color: var(--primary-color);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: var(--transition);
      margin-top: 15px;
    }
    
    .primary-btn:hover {
      background-color: var(--primary-light);
    }
  `;
  document.head.appendChild(modalStyle);

  
  const modal = document.getElementById('add-modification-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const valueTypeSelect = document.getElementById('value-type');
  const valueInputContainer = document.getElementById('value-input-container');
  const valueInput = document.getElementById('value-input');
  const addModificationBtn = document.getElementById('add-modification-btn');

  
  valueTypeSelect.value = type;

  
  valueTypeSelect.addEventListener('change', () => {
    updateValueInput(valueTypeSelect.value, valueInputContainer);
  });

  
  closeModalBtn.addEventListener('click', () => {
    document.body.removeChild(modalContainer);
    document.head.removeChild(modalStyle);
  });

  
  addModificationBtn.addEventListener('click', () => {
    const selectedType = valueTypeSelect.value;
    let newValue;

    
    const valueInputElement = document.getElementById('value-input');
    const inputValue = valueInputElement ? valueInputElement.value : '';

    console.log("Тип:", selectedType, "Значение:", inputValue);

    
    if (selectedType === 'string') {
      newValue = inputValue;
    } else if (selectedType === 'number') {
      newValue = parseFloat(inputValue) || 0;
    } else if (selectedType === 'boolean') {
      newValue = inputValue === 'true';
    } else if (selectedType === 'object') {
      try {
        newValue = JSON.parse(inputValue || '{}');
      } catch (e) {
        console.error("Ошибка парсинга объекта:", e);
        newValue = {};
      }
    } else if (selectedType === 'array') {
      try {
        newValue = JSON.parse(inputValue || '[]');
      } catch (e) {
        console.error("Ошибка парсинга массива:", e);
        newValue = [];
      }
    } else if (selectedType === 'null') {
      newValue = null;
    }

    console.log("Итоговое значение для сохранения:", newValue);

    
    addModification(path, newValue, selectedType);

    
    showNotification(translations[currentLanguage].modification_added);

    
    document.body.removeChild(modalContainer);
    document.head.removeChild(modalStyle);
  });

  
  updateValueInput(type, valueInputContainer);
}


function updateValueInput(type, container) {
  
  const currentValue = container.querySelector('#value-input') ? container.querySelector('#value-input').value : '';

  container.innerHTML = '';

  let inputHTML = '';

  if (type === 'string') {
    inputHTML = `
      <label for="value-input">${translations[currentLanguage].new_value}:</label>
      <input type="text" id="value-input" class="custom-input" value="${currentValue}">
    `;
  } else if (type === 'number') {
    inputHTML = `
      <label for="value-input">${translations[currentLanguage].new_value}:</label>
      <input type="number" id="value-input" class="custom-input" value="${!isNaN(parseFloat(currentValue)) ? parseFloat(currentValue) : ''}">
    `;
  } else if (type === 'boolean') {
    inputHTML = `
      <label for="value-input">${translations[currentLanguage].new_value}:</label>
      <select id="value-input" class="custom-select">
        <option value="true" ${currentValue === 'true' ? 'selected' : ''}>true</option>
        <option value="false" ${currentValue === 'false' ? 'selected' : ''}>false</option>
      </select>
    `;
  } else if (type === 'object') {
    let objValue = '{}';
    try {
      if (currentValue) {
        objValue = typeof JSON.parse(currentValue) === 'object' ? currentValue : '{}';
      }
    } catch (e) { }

    inputHTML = `
      <label for="value-input">${translations[currentLanguage].new_value}:</label>
      <textarea id="value-input" class="custom-input" rows="5" placeholder="{}">${objValue}</textarea>
    `;
  } else if (type === 'array') {
    let arrValue = '[]';
    try {
      if (currentValue) {
        arrValue = Array.isArray(JSON.parse(currentValue)) ? currentValue : '[]';
      }
    } catch (e) { }

    inputHTML = `
      <label for="value-input">${translations[currentLanguage].new_value}:</label>
      <textarea id="value-input" class="custom-input" rows="5" placeholder="[]">${arrValue}</textarea>
    `;
  } else if (type === 'null') {
    inputHTML = `
      <p>${translations[currentLanguage].data_type_null}</p>
      <input type="hidden" id="value-input" value="null">
    `;
  }

  container.innerHTML = inputHTML;
}


function addModification(path, value, type) {
  console.log("Добавление модификации:", path, value, type);

  
  modifications.push({
    path: path,
    value: value,
    type: type
  });

  renderModifications();
  updateGeneratedCode();
}


function removeModification(index) {
  modifications.splice(index, 1);
  renderModifications();
  updateGeneratedCode();
}


function renderModifications() {
  const modificationsListEl = document.getElementById('modifications-list');

  if (modifications.length === 0) {
    modificationsListEl.innerHTML = `
      <div class="placeholder" data-translate="modifications_placeholder">
        <i class="fas fa-edit"></i>
        <p>${translations[currentLanguage].modifications_placeholder}</p>
      </div>
    `;
    return;
  }

  let html = '';

  console.log("Текущие модификации:", modifications);

  modifications.forEach((mod, index) => {
    let valueDisplay;

    if (mod.type === 'string') {
      valueDisplay = `"${String(mod.value)}"`;
    } else if (mod.type === 'object' || mod.type === 'array') {
      try {
        const jsonString = JSON.stringify(mod.value);
        valueDisplay = jsonString.length > 20 ?
          jsonString.substring(0, 20) + '...' :
          jsonString;
      } catch (e) {
        console.error("Ошибка отображения объекта/массива:", e);
        valueDisplay = mod.type === 'object' ? "{...}" : "[...]";
      }
    } else if (mod.type === 'null') {
      valueDisplay = "null";
    } else {
      valueDisplay = String(mod.value);
    }

    html += `
      <div class="modification-item">
        <div class="modification-path">${mod.path}</div>
        <div class="modification-value-wrapper">
          <div class="modification-type">${translations[currentLanguage]['data_type_' + mod.type]}</div>
          <div class="modification-value">${valueDisplay}</div>
          <button class="remove-modification" data-index="${index}" title="${translations[currentLanguage].remove_modification}">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    `;
  });

  modificationsListEl.innerHTML = html;

  
  const removeButtons = document.querySelectorAll('.remove-modification');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = parseInt(button.getAttribute('data-index'));
      removeModification(index);
    });
  });
}


function loadFullJSONFile() {
  const fileInput = document.getElementById('full-json-file-input');
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      try {
        fullJsonData = JSON.parse(e.target.result);
        displayFullJSONStructure(fullJsonData);
        updateGeneratedCode();
      } catch (error) {
        alert(translations[currentLanguage].json_parse_error);
        console.error('Error parsing JSON:', error);
      }
    };

    reader.readAsText(file);
  }
}

function processManualFullJson() {
  const jsonText = document.getElementById('manual-full-json-input').value;
  
  try {
    fullJsonData = JSON.parse(jsonText);
    displayFullJSONStructure(fullJsonData);
    updateGeneratedCode();
    
    document.getElementById('manual-full-json-modal').classList.remove('active');
    document.body.style.overflow = '';
  } catch (error) {
    alert(translations[currentLanguage].json_parse_error);
    console.error('Error parsing JSON:', error);
  }
}


function displayFullJSONStructure(jsonData) {
  const jsonStructureEl = document.getElementById('full-json-structure');

  if (!jsonStructureEl) return;

  let displayText = '';
  try {
    displayText = JSON.stringify(jsonData, null, 2);
  } catch (e) {
    console.error('Error stringifying JSON:', e);
    displayText = 'Error displaying JSON';
  }

  jsonStructureEl.innerHTML = `<pre style="color: var(--text-color); padding: 15px; margin: 0; overflow-x: auto; tab-size: 2; font-family: 'Courier New', monospace;">${displayText}</pre>`;
}


function updateGeneratedCode() {
  const generatedCodeEl = document.getElementById('generated-code');
  const urlInput = document.getElementById('url-input').value;
  const substitutionType = document.querySelector('input[name="substitution-type"]:checked').value;
  const mechanismSelect = document.getElementById('mechanism-select').value;
  const delegateInput = document.getElementById('delegate-input') ? document.getElementById('delegate-input').value : '';

  
  const isJsonArray = originalJsonData && Array.isArray(originalJsonData);
  const isFullJsonArray = fullJsonData && Array.isArray(fullJsonData);

  let code = '';

  if (substitutionType === 'partial') {
    
    if (!originalJsonData || modifications.length === 0) {
      if (mechanismSelect === 'dataTaskWithRequest') {
        
        if (isJsonArray) {
          code = `
%hook NSURLSession
- (id)dataTaskWithRequest:(NSURLRequest *)request completionHandler:(void (^)(NSData *data, NSURLResponse *response, NSError *error))completionHandler {
    void (^customCompletion)(NSData *data, NSURLResponse *response, NSError *error) = ^(NSData *data, NSURLResponse *response, NSError *error) {
        if ([request.URL.absoluteString containsString:@"${urlInput}"]) {
            NSMutableArray *originalData = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
            
            NSMutableArray *json = [NSMutableArray array];
            [json addObjectsFromArray:originalData];

            // Здесь будет код модификации
            // Загрузите JSON и добавьте модификации

            NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json options:0 error:nil];
            completionHandler(jsonData, response, error);
            return;
        }
        
        completionHandler(data, response, error);
    };
    
    return %orig(request, customCompletion);
}
%end`;
        } else {
          code = `
%hook NSURLSession
- (id)dataTaskWithRequest:(NSURLRequest *)request completionHandler:(void (^)(NSData *data, NSURLResponse *response, NSError *error))completionHandler {
    void (^customCompletion)(NSData *data, NSURLResponse *response, NSError *error) = ^(NSData *data, NSURLResponse *response, NSError *error) {
        if ([request.URL.absoluteString containsString:@"${urlInput}"]) {
            NSMutableDictionary *originalData = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
            
            NSMutableDictionary *json = [NSMutableDictionary dictionary];
            [json addEntriesFromDictionary:originalData];

            // Здесь будет код модификации
            // Загрузите JSON и добавьте модификации

            NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json options:0 error:nil];
            completionHandler(jsonData, response, error);
            return;
        }
        
        completionHandler(data, response, error);
    };
    
    return %orig(request, customCompletion);
}
%end`;
        }
      } else if (mechanismSelect === '_dataTaskWithRequest') {
        
        if (isJsonArray) {
          code = `
%hook NSURLSession
- (id)_dataTaskWithRequest:(NSURLRequest *)request
                  delegate:(id)delegate
         completionHandler:(void (^)(NSData *data, NSURLResponse *response, NSError *error))completionHandler {
    void (^customCompletion)(NSData *data, NSURLResponse *response, NSError *error) = ^(NSData *data, NSURLResponse *response, NSError *error) {
        if ([request.URL.absoluteString containsString:@"${urlInput}"]) {
            NSMutableArray *originalData = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
            
            NSMutableArray *json = [NSMutableArray array];
            [json addObjectsFromArray:originalData];

            // Здесь будет код модификации
            // Загрузите JSON и добавьте модификации

            NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json options:0 error:nil];
            completionHandler(jsonData, response, error);
            return;
        }
        
        completionHandler(data, response, error);
    };
    
    return %orig(request, delegate, customCompletion);
}
%end`;
        } else {
          code = `
%hook NSURLSession
- (id)_dataTaskWithRequest:(NSURLRequest *)request
                  delegate:(id)delegate
         completionHandler:(void (^)(NSData *data, NSURLResponse *response, NSError *error))completionHandler {
    void (^customCompletion)(NSData *data, NSURLResponse *response, NSError *error) = ^(NSData *data, NSURLResponse *response, NSError *error) {
        if ([request.URL.absoluteString containsString:@"${urlInput}"]) {
            NSMutableDictionary *originalData = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
            
            NSMutableDictionary *json = [NSMutableDictionary dictionary];
            [json addEntriesFromDictionary:originalData];

            // Здесь будет код модификации
            // Загрузите JSON и добавьте модификации

            NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json options:0 error:nil];
            completionHandler(jsonData, response, error);
            return;
        }
        
        completionHandler(data, response, error);
    };
    
    return %orig(request, delegate, customCompletion);
}
%end`;
        }
      } else if (mechanismSelect === 'sessionDelegate') {
        
        if (isJsonArray) {
          code = `
%hook SessionDelegate
-(void)URLSession:(NSURLSession *)session dataTask:(NSURLSessionDataTask *)task didReceiveData:(NSData *)data {
    if ([task.currentRequest.URL.absoluteString containsString:@"${urlInput}"]) {
        NSMutableArray *originalData = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
        
        NSMutableArray *json = [NSMutableArray array];
        [json addObjectsFromArray:originalData];

        // Здесь будет код модификации
        // Загрузите JSON и добавьте модификации

        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json options:0 error:nil];
        data = jsonData;
    }
    %orig(session, task, data);
}
%end

%ctor {
    %init(SessionDelegate = objc_getClass("${delegateInput || 'Введите имя делегата'}"));
}`;
        } else {
          code = `
%hook SessionDelegate
-(void)URLSession:(NSURLSession *)session dataTask:(NSURLSessionDataTask *)task didReceiveData:(NSData *)data {
    if ([task.currentRequest.URL.absoluteString containsString:@"${urlInput}"]) {
        NSMutableDictionary *originalData = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
        
        NSMutableDictionary *json = [NSMutableDictionary dictionary];
        [json addEntriesFromDictionary:originalData];

        // Здесь будет код модификации
        // Загрузите JSON и добавьте модификации

        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json options:0 error:nil];
        data = jsonData;
    }
    %orig(session, task, data);
}
%end

%ctor {
    %init(SessionDelegate = objc_getClass("${delegateInput || 'Введите имя делегата'}"));
}`;
        }
      }
    } else {
      
      dictionaryCount = 0;
      arrayCount = 0;
      modifiedPaths = new Map();

      
      const modificationCode = generateModificationsCode();

      if (mechanismSelect === 'dataTaskWithRequest') {
        if (isJsonArray) {
          code = `
%hook NSURLSession
- (id)dataTaskWithRequest:(NSURLRequest *)request completionHandler:(void (^)(NSData *data, NSURLResponse *response, NSError *error))completionHandler {
    void (^customCompletion)(NSData *data, NSURLResponse *response, NSError *error) = ^(NSData *data, NSURLResponse *response, NSError *error) {
        if ([request.URL.absoluteString containsString:@"${urlInput}"]) {
            NSMutableArray *originalData = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
            
            NSMutableArray *json = [NSMutableArray array];
            [json addObjectsFromArray:originalData];

${modificationCode}

            NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json options:0 error:nil];
            completionHandler(jsonData, response, error);
            return;
        }
        
        completionHandler(data, response, error);
    };
    
    return %orig(request, customCompletion);
}
%end`;
        } else {
          code = `
%hook NSURLSession
- (id)dataTaskWithRequest:(NSURLRequest *)request completionHandler:(void (^)(NSData *data, NSURLResponse *response, NSError *error))completionHandler {
    void (^customCompletion)(NSData *data, NSURLResponse *response, NSError *error) = ^(NSData *data, NSURLResponse *response, NSError *error) {
        if ([request.URL.absoluteString containsString:@"${urlInput}"]) {
            NSMutableDictionary *originalData = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
            
            NSMutableDictionary *json = [NSMutableDictionary dictionary];
            [json addEntriesFromDictionary:originalData];

${modificationCode}

            NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json options:0 error:nil];
            completionHandler(jsonData, response, error);
            return;
        }
        
        completionHandler(data, response, error);
    };
    
    return %orig(request, customCompletion);
}
%end`;
        }
      } else if (mechanismSelect === '_dataTaskWithRequest') {
        if (isJsonArray) {
          code = `
%hook NSURLSession
- (id)_dataTaskWithRequest:(NSURLRequest *)request
                  delegate:(id)delegate
         completionHandler:(void (^)(NSData *data, NSURLResponse *response, NSError *error))completionHandler {
    void (^customCompletion)(NSData *data, NSURLResponse *response, NSError *error) = ^(NSData *data, NSURLResponse *response, NSError *error) {
        if ([request.URL.absoluteString containsString:@"${urlInput}"]) {
            NSMutableArray *originalData = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
            
            NSMutableArray *json = [NSMutableArray array];
            [json addObjectsFromArray:originalData];

${modificationCode}

            NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json options:0 error:nil];
            completionHandler(jsonData, response, error);
            return;
        }
        
        completionHandler(data, response, error);
    };
    
    return %orig(request, delegate, customCompletion);
}
%end`;
        } else {
          code = `
%hook NSURLSession
- (id)_dataTaskWithRequest:(NSURLRequest *)request
                  delegate:(id)delegate
         completionHandler:(void (^)(NSData *data, NSURLResponse *response, NSError *error))completionHandler {
    void (^customCompletion)(NSData *data, NSURLResponse *response, NSError *error) = ^(NSData *data, NSURLResponse *response, NSError *error) {
        if ([request.URL.absoluteString containsString:@"${urlInput}"]) {
            NSMutableDictionary *originalData = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
            
            NSMutableDictionary *json = [NSMutableDictionary dictionary];
            [json addEntriesFromDictionary:originalData];

${modificationCode}

            NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json options:0 error:nil];
            completionHandler(jsonData, response, error);
            return;
        }
        
        completionHandler(data, response, error);
    };
    
    return %orig(request, delegate, customCompletion);
}
%end`;
        }
      } else if (mechanismSelect === 'sessionDelegate') {
        if (isJsonArray) {
          code = `
%hook SessionDelegate
-(void)URLSession:(NSURLSession *)session dataTask:(NSURLSessionDataTask *)task didReceiveData:(NSData *)data {
    if ([task.currentRequest.URL.absoluteString containsString:@"${urlInput}"]) {
        NSMutableArray *originalData = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
        
        NSMutableArray *json = [NSMutableArray array];
        [json addObjectsFromArray:originalData];

${modificationCode}

        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json options:0 error:nil];
        data = jsonData;
    }
    %orig(session, task, data);
}
%end

%ctor {
    %init(SessionDelegate = objc_getClass("${delegateInput || 'Введите имя делегата'}"));
}`;
        } else {
          code = `
%hook SessionDelegate
-(void)URLSession:(NSURLSession *)session dataTask:(NSURLSessionDataTask *)task didReceiveData:(NSData *)data {
    if ([task.currentRequest.URL.absoluteString containsString:@"${urlInput}"]) {
        NSMutableDictionary *originalData = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
        
        NSMutableDictionary *json = [NSMutableDictionary dictionary];
        [json addEntriesFromDictionary:originalData];

${modificationCode}

        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json options:0 error:nil];
        data = jsonData;
    }
    %orig(session, task, data);
}
%end

%ctor {
    %init(SessionDelegate = objc_getClass("${delegateInput || 'Введите имя делегата'}"));
}`;
        }
      }
    }
  } else {
    
    if (!fullJsonData) {
      if (mechanismSelect === 'dataTaskWithRequest') {
        code = `
%hook NSURLSession
- (id)dataTaskWithRequest:(NSURLRequest *)request completionHandler:(void (^)(NSData *data, NSURLResponse *response, NSError *error))completionHandler {
    void (^customCompletion)(NSData *data, NSURLResponse *response, NSError *error) = ^(NSData *data, NSURLResponse *response, NSError *error) {
        if ([request.URL.absoluteString containsString:@"${urlInput}"]) {
            // Загрузите JSON файл и раскомментируйте подходящую строку ниже
            
            // Если загруженный JSON - словарь
            // NSDictionary *override = @{};
            // Если загруженный JSON - массив
            // NSArray *override = @[];
            
            // data = [NSJSONSerialization dataWithJSONObject:override options:0 error:nil];
        }
        
        completionHandler(data, response, error);
    };
    
    return %orig(request, customCompletion);
}
%end`;
      } else if (mechanismSelect === '_dataTaskWithRequest') {
        code = `
%hook NSURLSession
- (id)_dataTaskWithRequest:(NSURLRequest *)request
                  delegate:(id)delegate
         completionHandler:(void (^)(NSData *data, NSURLResponse *response, NSError *error))completionHandler {
    void (^customCompletion)(NSData *data, NSURLResponse *response, NSError *error) = ^(NSData *data, NSURLResponse *response, NSError *error) {
        if ([request.URL.absoluteString containsString:@"${urlInput}"]) {
            // Загрузите JSON файл и раскомментируйте подходящую строку ниже
            
            // Если загруженный JSON - словарь
            // NSDictionary *override = @{};
            // Если загруженный JSON - массив
            // NSArray *override = @[];
            
            // data = [NSJSONSerialization dataWithJSONObject:override options:0 error:nil];
        }
        
        completionHandler(data, response, error);
    };
    
    return %orig(request, delegate, customCompletion);
}
%end`;
      } else if (mechanismSelect === 'sessionDelegate') {
        code = `
%hook SessionDelegate
-(void)URLSession:(NSURLSession *)session dataTask:(NSURLSessionDataTask *)task didReceiveData:(NSData *)data {
    if ([task.currentRequest.URL.absoluteString containsString:@"${urlInput}"]) {
        // Загрузите JSON файл и раскомментируйте подходящую строку ниже
        
        // Если загруженный JSON - словарь
        // NSDictionary *override = @{};
        // Если загруженный JSON - массив
        // NSArray *override = @[];
        
        // data = [NSJSONSerialization dataWithJSONObject:override options:0 error:0];
    }
    %orig(session, task, data);
}
%end

%ctor {
    %init(SessionDelegate = objc_getClass("${delegateInput || 'Введите имя делегата'}"));
}`;
      }
    } else {
      
      let jsonObjCCode = '';
      try {
        
        jsonObjCCode = convertFullJSONToObjC(fullJsonData);
      } catch (e) {
        console.error("Ошибка при преобразовании JSON в OBJ-C:", e);
        jsonObjCCode = isFullJsonArray ? '@[]' : '@{}';
      }

      if (mechanismSelect === 'dataTaskWithRequest') {
        code = `
%hook NSURLSession
- (id)dataTaskWithRequest:(NSURLRequest *)request completionHandler:(void (^)(NSData *data, NSURLResponse *response, NSError *error))completionHandler {
    void (^customCompletion)(NSData *data, NSURLResponse *response, NSError *error) = ^(NSData *data, NSURLResponse *response, NSError *error) {
        if ([request.URL.absoluteString containsString:@"${urlInput}"]) {
            // Полная подмена JSON данных
            ${isFullJsonArray ? 'NSArray' : 'NSDictionary'} *override = ${jsonObjCCode.replace(/\n/g, '\n            ')};
            
            data = [NSJSONSerialization dataWithJSONObject:override options:0 error:nil];
        }
        
        completionHandler(data, response, error);
    };
    
    return %orig(request, customCompletion);
}
%end`;
      } else if (mechanismSelect === '_dataTaskWithRequest') {
        code = `
%hook NSURLSession
- (id)_dataTaskWithRequest:(NSURLRequest *)request
                  delegate:(id)delegate
         completionHandler:(void (^)(NSData *data, NSURLResponse *response, NSError *error))completionHandler {
    void (^customCompletion)(NSData *data, NSURLResponse *response, NSError *error) = ^(NSData *data, NSURLResponse *response, NSError *error) {
        if ([request.URL.absoluteString containsString:@"${urlInput}"]) {
            // Полная подмена JSON данных
            ${isFullJsonArray ? 'NSArray' : 'NSDictionary'} *override = ${jsonObjCCode.replace(/\n/g, '\n            ')};
            
            data = [NSJSONSerialization dataWithJSONObject:override options:0 error:nil];
        }
        
        completionHandler(data, response, error);
    };
    
    return %orig(request, delegate, customCompletion);
}
%end`;
      } else if (mechanismSelect === 'sessionDelegate') {
        code = `
%hook SessionDelegate
-(void)URLSession:(NSURLSession *)session dataTask:(NSURLSessionDataTask *)task didReceiveData:(NSData *)data {
    if ([task.currentRequest.URL.absoluteString containsString:@"${urlInput}"]) {
        // Полная подмена JSON данных
        ${isFullJsonArray ? 'NSArray' : 'NSDictionary'} *override = ${jsonObjCCode.replace(/\n/g, '\n            ')};
        
        data = [NSJSONSerialization dataWithJSONObject:override options:0 error:0];
    }
    %orig(session, task, data);
}
%end

%ctor {
    %init(SessionDelegate = objc_getClass("${delegateInput || 'Введите имя делегата'}"));
}`;
      }
    }
  }

  generatedCodeEl.textContent = code;
}


function convertFullJSONToObjC(jsonData, level = 0) {
  const indentation = "    ".repeat(level);
  const nextIndentation = "    ".repeat(level + 1);

  if (jsonData === null) {
    return '[NSNull null]';
  } else if (typeof jsonData === 'boolean') {
    return jsonData ? '@YES' : '@NO';
  } else if (typeof jsonData === 'number') {
    return `@(${jsonData})`;
  } else if (typeof jsonData === 'string') {
    return `@"${jsonData.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
  } else if (Array.isArray(jsonData)) {
    if (jsonData.length === 0) {
      return '@[]';
    }

    return `@[\n${nextIndentation}${jsonData.map(item => convertFullJSONToObjC(item, level + 1)).join(`,\n${nextIndentation}`)}\n${indentation}]`;
  } else if (typeof jsonData === 'object') {
    const keys = Object.keys(jsonData);
    if (keys.length === 0) {
      return '@{}';
    }

    return `@{\n${nextIndentation}${keys.map(key => `@"${key}": ${convertFullJSONToObjC(jsonData[key], level + 1)}`).join(`,\n${nextIndentation}`)}\n${indentation}}`;
  }

  return '@""';
}


function generateModificationsCode() {
  let code = '';
  
  const isJsonArray = originalJsonData && Array.isArray(originalJsonData);

  modifications.forEach(mod => {
    const modificationCode = generateModificationForPath(mod.path, convertValueToObjC(mod.value, mod.type), isJsonArray);
    code += `
            // Модификация для пути: ${mod.path}
${modificationCode}
`;
  });

  return code;
}


function convertValueToObjC(value, type) {
  console.log("Преобразование в OBJ-C:", value, type);

  
  if (value === undefined || value === null) {
    return '[NSNull null]';
  }

  if (type === 'string') {
    
    const stringValue = String(value);
    return `@"${stringValue.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
  } else if (type === 'number') {
    return `@(${value})`;
  } else if (type === 'boolean') {
    return value ? `@YES` : `@NO`;
  } else if (type === 'null') {
    return '[NSNull null]';
  } else if (type === 'object') {
    if (Array.isArray(value)) {
      
      return `@[${value.map(v => convertValueToObjC(v, typeof v)).join(', ')}]`;
    } else {
      try {
        return `@{${Object.entries(value).map(([k, v]) => `@"${k}": ${convertValueToObjC(v, typeof v)}`).join(', ')}}`;
      } catch (e) {
        console.error("Ошибка при преобразовании объекта:", e);
        return '@{}';
      }
    }
  } else if (type === 'array') {
    try {
      return `@[${value.map(v => convertValueToObjC(v, typeof v)).join(', ')}]`;
    } catch (e) {
      console.error("Ошибка при преобразовании массива:", e);
      return '@[]';
    }
  }

  return '@""';
}


function generateModificationForPath(path, objcValue, isJsonArray) {
  let code = '';
  const segments = parsePathSegments(path);

  if (segments.length === 0) return code;

  
  if (isJsonArray) {
    
    if (segments[0].type === 'index') {
      

      
      if (segments.length === 2 && segments[1].type === 'key') {
        dictionaryCount++;
        const dictName = `ModifiedDictionary_${dictionaryCount}`;
        code += `            NSMutableDictionary *${dictName} = [json[${segments[0].index}] mutableCopy];\n`;
        code += `            ${dictName}[@"${segments[1].name}"] = ${objcValue};\n`;
        code += `            json[${segments[0].index}] = ${dictName};\n`;
        return code;
      }

      
      let dictionaries = [];
      let nestedKeys = [];
      let nestedIndexes = [];

      
      dictionaryCount++;
      let rootDict = `ModifiedDictionary_${dictionaryCount}`;
      code += `            NSMutableDictionary *${rootDict} = [json[${segments[0].index}] mutableCopy];\n`;
      dictionaries.push(rootDict);

      let currentDict = rootDict;

      
      for (let i = 1; i < segments.length; i++) {
        const segment = segments[i];

        if (segment.type === 'key') {
          nestedKeys.push(segment.name);

          
          if (i !== segments.length - 1 && (i + 1 < segments.length && segments[i + 1].type !== 'index')) {
            dictionaryCount++;
            const nextDict = `ModifiedDictionary_${dictionaryCount}`;
            code += `            NSMutableDictionary *${nextDict} = [${currentDict}[@"${segment.name}"] mutableCopy];\n`;
            dictionaries.push(nextDict);
            currentDict = nextDict;
          }
        }
        else if (segment.type === 'index') {
          nestedIndexes.push(segment.index);

          
          if (i !== segments.length - 1) {
            const prevKey = nestedKeys[nestedKeys.length - 1];
            dictionaryCount++;
            const nextDict = `ModifiedDictionary_${dictionaryCount}`;
            code += `            NSMutableDictionary *${nextDict} = [${currentDict}[@"${prevKey}"][${segment.index}] mutableCopy];\n`;
            dictionaries.push(nextDict);
            currentDict = nextDict;
          }
        }
      }

      
      const lastSegment = segments[segments.length - 1];
      if (lastSegment.type === 'key') {
        code += `            ${currentDict}[@"${lastSegment.name}"] = ${objcValue};\n`;
      }
      else if (lastSegment.type === 'index') {
        const prevKey = nestedKeys[nestedKeys.length - 1];
        code += `            ${currentDict}[@"${prevKey}"][${lastSegment.index}] = ${objcValue};\n`;
      }

      
      
      let assignmentPairs = [];
      let keyIndex = 0;
      let indexIndex = 0;

      for (let i = 1; i < segments.length - 1; i++) {
        if (segments[i].type === 'key') {
          
          if (i + 1 < segments.length && segments[i + 1].type === 'index') {
            assignmentPairs.push({
              key: segments[i].name,
              index: segments[i + 1].index
            });
            i++; 
          } else {
            assignmentPairs.push({
              key: segments[i].name
            });
          }
        }
      }

      
      for (let i = dictionaries.length - 1; i > 0; i--) {
        const pair = assignmentPairs.pop();
        if (pair) {
          if (pair.index !== undefined) {
            code += `            ${dictionaries[i - 1]}[@"${pair.key}"][${pair.index}] = ${dictionaries[i]};\n`;
          } else {
            code += `            ${dictionaries[i - 1]}[@"${pair.key}"] = ${dictionaries[i]};\n`;
          }
        }
      }

      
      code += `            json[${segments[0].index}] = ${rootDict};\n`;
      return code;
    }
  }

  
  
  if (segments.length === 1 && segments[0].type === 'key') {
    
    code += `            json[@"${segments[0].name}"] = ${objcValue};\n`;
    return code;
  }

  
  dictionaryCount++;
  let rootDictName = `ModifiedDictionary_${dictionaryCount}`;
  code += `            NSMutableDictionary *${rootDictName} = [json[@"${segments[0].name}"] mutableCopy];\n`;

  
  let dictionaries = {};
  dictionaries[0] = rootDictName;

  
  let currLevel = 0;
  for (let i = 1; i < segments.length; i++) {
    const segment = segments[i];

    if (segment.type === 'key') {
      
      if (i + 1 < segments.length && segments[i + 1].type === 'index') {
        continue; 
      }

      
      if (i === segments.length - 1) {
        code += `            ${dictionaries[currLevel]}[@"${segment.name}"] = ${objcValue};\n`;
      } else {
        
        dictionaryCount++;
        let nextDictName = `ModifiedDictionary_${dictionaryCount}`;
        code += `            NSMutableDictionary *${nextDictName} = [${dictionaries[currLevel]}[@"${segment.name}"] mutableCopy];\n`;
        currLevel++;
        dictionaries[currLevel] = nextDictName;
      }
    } else if (segment.type === 'index') {
      const prevSegment = segments[i - 1];

      
      if (i === segments.length - 1) {
        code += `            ${dictionaries[currLevel]}[@"${prevSegment.name}"][${segment.index}] = ${objcValue};\n`;
      } else {
        
        dictionaryCount++;
        let nextDictName = `ModifiedDictionary_${dictionaryCount}`;
        code += `            NSMutableDictionary *${nextDictName} = [${dictionaries[currLevel]}[@"${prevSegment.name}"][${segment.index}] mutableCopy];\n`;
        currLevel++;
        dictionaries[currLevel] = nextDictName;
      }
    }
  }

  
  for (let i = segments.length - 1; i > 0; i--) {
    const segment = segments[i];

    
    if (i === segments.length - 1) {
      continue;
    }

    
    if (segment.type === 'index') {
      const prevSegment = segments[i - 1];
      const dictLevel = Math.floor((i - 2) / 2); 
      const nextDictLevel = dictLevel + 1;

      if (dictionaries[dictLevel] && dictionaries[nextDictLevel]) {
        code += `            ${dictionaries[dictLevel]}[@"${prevSegment.name}"][${segment.index}] = ${dictionaries[nextDictLevel]};\n`;
      }

      
      i--;
    }
    
    else if (segment.type === 'key' && (i === segments.length - 1 || segments[i + 1].type !== 'index')) {
      const dictLevel = Math.floor((i - 1) / 2); 
      const nextDictLevel = dictLevel + 1;

      if (dictionaries[dictLevel] && dictionaries[nextDictLevel]) {
        code += `            ${dictionaries[dictLevel]}[@"${segment.name}"] = ${dictionaries[nextDictLevel]};\n`;
      }
    }
  }

  
  code += `            json[@"${segments[0].name}"] = ${rootDictName};\n`;

  return code;
}


function generateReverseAssignments(segments) {
  
  return '';
}


function parsePathSegments(path) {
  const segments = [];
  let currentKey = '';
  let inBracket = false;

  for (let i = 0; i < path.length; i++) {
    const char = path[i];

    if (char === '.' && !inBracket) {
      if (currentKey) {
        segments.push({ type: 'key', name: currentKey });
        currentKey = '';
      }
    } else if (char === '[') {
      if (currentKey) {
        segments.push({ type: 'key', name: currentKey });
        currentKey = '';
      }
      inBracket = true;
    } else if (char === ']' && inBracket) {
      segments.push({ type: 'index', index: parseInt(currentKey) });
      currentKey = '';
      inBracket = false;
    } else {
      currentKey += char;
    }
  }

  if (currentKey) {
    segments.push({ type: 'key', name: currentKey });
  }

  return segments;
}


function updateInterface() {
  
  const jsonStructureEl = document.getElementById('json-structure');
  const modificationsListEl = document.getElementById('modifications-list');

  if (!originalJsonData) {
    jsonStructureEl.innerHTML = `
      <div class="placeholder" data-translate="json_placeholder">
        <i class="fas fa-file-upload"></i>
        <p>${translations[currentLanguage].json_placeholder}</p>
      </div>
    `;
  }

  if (modifications.length === 0) {
    modificationsListEl.innerHTML = `
      <div class="placeholder" data-translate="modifications_placeholder">
        <i class="fas fa-edit"></i>
        <p>${translations[currentLanguage].modifications_placeholder}</p>
      </div>
    `;
  }
}


function copyGeneratedCode() {
  const generatedCodeEl = document.getElementById('generated-code');
  const codeText = generatedCodeEl.textContent;
  const copyBtn = document.getElementById('copy-code');
  const originalIcon = copyBtn.innerHTML;

  navigator.clipboard.writeText(codeText)
    .then(() => {
      
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


function clearModifications() {
  modifications = [];
  renderModifications();
  updateGeneratedCode();
}


function toggleSubstitutionType() {
  const substitutionType = document.querySelector('input[name="substitution-type"]:checked').value;
  const partialSection = document.getElementById('partial-substitution-section');
  const fullSection = document.getElementById('full-substitution-section');

  if (substitutionType === 'partial') {
    partialSection.style.display = 'flex';
    fullSection.style.display = 'none';
  } else {
    partialSection.style.display = 'none';
    fullSection.style.display = 'block';
  }

  updateGeneratedCode();
}


document.addEventListener('DOMContentLoaded', () => {
  
  loadUserPreferences();

  
  handleSidebar();

  
  handleSettingsModal();

  
  handleAccessModal();
  
  // Обработчики для модальных окон ручного ввода JSON
  handleManualJsonModals();

  
  const languageToggle = document.getElementById('language-toggle');
  languageToggle.addEventListener('click', () => {
    const newLang = currentLanguage === 'ru' ? 'en' : 'ru';
    setLanguage(newLang);
  });

  
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', toggleTheme);

  
  const jsonFileInput = document.getElementById('json-file-input');
  jsonFileInput.addEventListener('change', loadJSONFile);

  
  const uploadButton = document.querySelector('.json-upload-section .upload-button');
  uploadButton.addEventListener('click', () => {
    jsonFileInput.click();
  });

  
  const fullJsonFileInput = document.getElementById('full-json-file-input');
  if (fullJsonFileInput) {
    fullJsonFileInput.addEventListener('change', loadFullJSONFile);
  }

  
  const fullUploadButton = document.querySelector('#full-substitution-section .upload-button');
  if (fullUploadButton) {
    fullUploadButton.addEventListener('click', () => {
      fullJsonFileInput.click();
    });
  }

  
  const fullJsonStructureEl = document.getElementById('full-json-structure');
  if (fullJsonStructureEl && !fullJsonData) {
    fullJsonStructureEl.innerHTML = `
      <div class="placeholder" data-translate="json_placeholder">
        <i class="fas fa-file-upload"></i>
        <p>${translations[currentLanguage].json_placeholder}</p>
      </div>
    `;
  }

  
  const copyCodeBtn = document.getElementById('copy-code');
  copyCodeBtn.addEventListener('click', copyGeneratedCode);

  
  const clearModificationsBtn = document.getElementById('clear-modifications');
  clearModificationsBtn.addEventListener('click', clearModifications);

  
  const substitutionRadios = document.querySelectorAll('input[name="substitution-type"]');
  substitutionRadios.forEach(radio => {
    radio.addEventListener('change', toggleSubstitutionType);
  });

  
  const urlInput = document.getElementById('url-input');
  const mechanismSelect = document.getElementById('mechanism-select');
  const delegateInputContainer = document.getElementById('delegate-input-container');

  urlInput.addEventListener('input', updateGeneratedCode);
  mechanismSelect.addEventListener('change', function() {
    
    if (this.value === 'sessionDelegate') {
      delegateInputContainer.style.display = 'block';
    } else {
      delegateInputContainer.style.display = 'none';
    }
    updateGeneratedCode();
  });

  
  const delegateInput = document.getElementById('delegate-input');
  delegateInput.addEventListener('input', updateGeneratedCode);

  
  const customJsonTextarea = document.getElementById('custom-json');
  if (customJsonTextarea) {
    customJsonTextarea.addEventListener('input', updateGeneratedCode);
  }

  
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

  
  updateInterface();
  updateGeneratedCode();
});
