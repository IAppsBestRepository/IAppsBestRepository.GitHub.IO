var jsonData;

function getProductID() {
    var bearerKey = document.getElementById('bearerKey').value;
    if (!bearerKey) {
        alert('Введите ключ Bearer.');
        return;
    }
    fetchProductID(bearerKey);
}

function fetchProductID(bearerKey) {
    var headers = new Headers();
    headers.append('Authorization', bearerKey);
    headers.append('Connection', 'keep-alive');
    headers.append('User-Agent', 'EntitlementAndProductIDGrabber/1 CFNetwork/1490.0.4 Darwin/23.2.0');
    headers.append('Accept', '*/*');
    headers.append('Host', 'api.revenuecat.com');
    headers.append('X-version', '4.26.0');
    headers.append('X-client-version', '2.1.1');
    headers.append('X-Apple-Device-Identifier', '70B24288-83C4-4035-B001-573285B21AE2');
    headers.append('X-Storekit2-enabled', 'false');
    headers.append('X-Is-Sandbox', 'false');
    headers.append('X-Platform-Flavot', 'native');
    headers.append('X-Client-Build-Version', '1');
    headers.append('X-Platform-Version', 'Version 17.2 (Build 21C62)');
    headers.append('X-Client-Bundle-ID', 'com.Dev.BearerID');
    headers.append('X-Platform', 'iOS');
    headers.append('X-Observer-Mode-Enabled', 'false');
    fetch('https://api.revenuecat.com/v1/product_entitlement_mapping', {
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
        alert('Сначала загрузите .Entitlements и примените изменения!');
        return;
    }
    var jsonString = JSON.stringify(jsonData, null, 4);
    var blob = new Blob([jsonString], {
        type: 'application/json'
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'RevenueCat.json';
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