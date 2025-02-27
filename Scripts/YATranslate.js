const yatranslate = {
    lang: "ru", // Исходный язык
};

document.addEventListener('DOMContentLoaded', function () {
    yaTranslateInit();
});

function yaTranslateInit() {
    // Получаем язык из localStorage
    let code = yaTranslateGetCode();

    // Проверяем, если язык в localStorage существует
    if (yatranslate.langFirstVisit && !localStorage.getItem('yt-widget')) {
        yaTranslateSetLang(yatranslate.langFirstVisit);
    }

    // Если на странице есть виджет, то подключаем его
    if (document.getElementById('ytWidget')) {
        // Подключаем виджет Yandex Translate
        let script = document.createElement('script');
        script.src = `https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=${code}&widgetTheme=light&autoMode=false`;
        script.onload = function () {
            if (window.yaTranslateWidget) {
                // Применяем выбранный язык
                window.yaTranslateWidget.translate(code);
            }
        };
        document.head.appendChild(script);
    }

    // Обновляем UI с текущим языком
    yaTranslateHtmlHandler(code);

    // Обработчик кликов по флагам
    yaTranslateEventHandler('click', '[data-ya-lang]', function (el) {
        let lang = el.getAttribute('data-ya-lang');
        yaTranslateSetLang(lang);

        // Перезагружаем страницу для применения нового языка
        if (window.yaTranslateWidget) {
            window.yaTranslateWidget.translate(lang);
        } else {
            window.location.reload();
        }
    });
}

function yaTranslateSetLang(lang) {
    localStorage.setItem('yt-widget', JSON.stringify({ "lang": lang, "active": true }));
}

function yaTranslateGetCode() {
    // Получаем язык из localStorage
    return localStorage["yt-widget"] ? JSON.parse(localStorage["yt-widget"]).lang : yatranslate.lang;
}

function yaTranslateHtmlHandler(code) {
    let activeElement = document.querySelector('[data-lang-active]');
    if (activeElement) {
        activeElement.innerHTML = `<img class="lang__img lang__img_select" src="/Images/Language/lang__${code}.png" alt="${code}">`;
    }
}

function yaTranslateEventHandler(event, selector, handler) {
    document.addEventListener(event, function (e) {
        let el = e.target.closest(selector);
        if (el) handler(el);
    });
}
