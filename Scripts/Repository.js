var jsonData;
var originalJsonData;

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

    let announcementText = '🇷🇺 Обновление репозитория\n\n';
    
    if (newApps.length > 0) {
        announcementText += 'Добавлены новые приложения:\n';
        newApps.forEach(app => announcementText += `- ${app}\n`);
        announcementText += '\n';
    }
    
    if (updatedApps.length > 0) {
        announcementText += 'Обновлены приложения:\n';
        updatedApps.forEach(app => announcementText += `- ${app}\n`);
    }

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

    if (input.length < 2) return;

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
    if (!matchesList.contains(event.target) && !inputField.contains(event.target)) {
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
        alert('.JSON отсутствует или пуст!');
        return;
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
