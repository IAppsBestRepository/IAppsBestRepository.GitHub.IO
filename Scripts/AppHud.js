var jsonData;

function getProductID() {
    var apiKey = document.getElementById('apiKey').value;
    if (!apiKey) {
        alert('Введите ключ Api.');
        return;
    }

    fetchProductID(apiKey);
}

function fetchProductID(apiKey) {
    if (!apiKey.startsWith('app_')) {
        apiKey = `app_${apiKey}`;
    }
    var headers = new Headers();
    headers.append('User-Agent', 'ProductIDGrabber/1 CFNetwork/1490.0.4 Darwin/23.2.0');
    headers.append('Accept', '*/*');
    headers.append('accept-language', 'ru');
    headers.append('accept-encoding', 'gzip, deflate, br');

    fetch(`https://api.apphud.com/v2/products?api_key=${apiKey}`, {
            method: 'GET',
            headers: headers
        })

        .then(response => response.json())
        .then(data => {
            jsonData = data;
            var jsonDataDisplay = document.getElementById('jsonDataDisplay');
            jsonDataDisplay.textContent = JSON.stringify(data, null, 4);
            jsonDataDisplay.style.display = "block";

            syntaxHighlight(jsonDataDisplay);
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

function installJSON() {
    if (!jsonData) {
        alert('Сначала загрузите .ProductID и примените изменения!');
        return;
    }

    var jsonString = JSON.stringify(jsonData, null, 4);

    var blob = new Blob([jsonString], {
        type: 'application/json'
    });

    var url = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.href = url;
    a.download = 'AppHud.json';
    a.click();
}

function syntaxHighlight(element) {
    var json = element.textContent;

    var highlightedJson = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
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

    element.innerHTML = highlightedJson;
}