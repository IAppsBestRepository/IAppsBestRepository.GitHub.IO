/*!***************************************************
 * yatranslate.js v1.0.0
 * https://Get-Web.Site/
 * author: Vitalii P.
 *****************************************************/

const yatranslate = {
    /* Original language */
    lang: "ru",
    /* The language we translate into on the first visit */
    // langFirstVisit: 'en',
};

document.addEventListener('DOMContentLoaded', function () {
    yaTranslateInit();
});

function yaTranslateInit() {
    if (yatranslate.langFirstVisit && !localStorage.getItem('yt-widget')) {
        yaTranslateSetLang(yatranslate.langFirstVisit);
    }

    // Подключаем виджет Yandex Translate
    let script = document.createElement('script');
    script.src = `https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=${yatranslate.lang}&widgetTheme=light&autoMode=false`;
    script.onload = function () {
        // Ждем загрузки виджета, затем активируем перевод
        let code = yaTranslateGetCode();
        if (window.yaTranslateWidget) {
            window.yaTranslateWidget.translate(code);
        }
    };
    document.head.appendChild(script);

    // Обновляем UI
    let code = yaTranslateGetCode();
    yaTranslateHtmlHandler(code);

    // Обработчик кликов по флагам
    yaTranslateEventHandler('click', '[data-ya-lang]', function (el) {
        let lang = el.getAttribute('data-ya-lang');
        yaTranslateSetLang(lang);

        // Проверяем, загружен ли виджет, и переводим
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
