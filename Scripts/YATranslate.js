/*!***************************************************
 * yatranslate.js v1.0.0
 * https://Get-Web.Site/
 * author: Vitalii P.
 *****************************************************/

const yatranslate = {
    /* Оригинальный язык */
    lang: "ru", // Язык по умолчанию
    /* Язык, на который переводим при первом посещении */
    // langFirstVisit: 'en',
};

document.addEventListener('DOMContentLoaded', function () {
    yaTranslateInit();
});

function yaTranslateInit() {
    // Проверяем, если язык для первого посещения задан и в localStorage нет данных
    if (yatranslate.langFirstVisit && !localStorage.getItem('yt-widget')) {
        yaTranslateSetLang(yatranslate.langFirstVisit); // Устанавливаем язык для первого посещения
    }

    // Подключаем виджет Yandex Translate
    let script = document.createElement('script');
    script.src = `https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=${yatranslate.lang}&widgetTheme=light&autoMode=false`;
    script.onload = function () {
        // Когда виджет загрузился, активируем перевод
        let code = yaTranslateGetCode();
        if (window.yaTranslateWidget) {
            window.yaTranslateWidget.translate(code); // Переводим страницу
        }
    };
    document.head.appendChild(script);

    // Обновляем UI для текущего языка
    let code = yaTranslateGetCode();
    yaTranslateHtmlHandler(code);

    // Обработчик кликов по флагам
    yaTranslateEventHandler('click', '[data-ya-lang]', function (el) {
        let lang = el.getAttribute('data-ya-lang');
        yaTranslateSetLang(lang); // Устанавливаем выбранный язык

        // Проверяем, загружен ли виджет, и переводим
        if (window.yaTranslateWidget) {
            window.yaTranslateWidget.translate(lang); // Переводим страницу
        } else {
            window.location.reload(); // Перезагружаем страницу, если виджет не загружен
        }
    });
}

function yaTranslateSetLang(lang) {
    // Сохраняем выбранный язык в localStorage
    localStorage.setItem('yt-widget', JSON.stringify({ "lang": lang, "active": true }));
}

function yaTranslateGetCode() {
    // Извлекаем язык из localStorage, если он там есть, иначе используем язык по умолчанию
    return localStorage["yt-widget"] ? JSON.parse(localStorage["yt-widget"]).lang : yatranslate.lang;
}

function yaTranslateHtmlHandler(code) {
    // Обновляем отображение выбранного языка в интерфейсе
    let activeElement = document.querySelector('[data-lang-active]');
    if (activeElement) {
        activeElement.innerHTML = `<img class="lang__img lang__img_select" src="/Images/Language/lang__${code}.png" alt="${code}">`;
    }
}

function yaTranslateEventHandler(event, selector, handler) {
    // Обработчик событий для флагов
    document.addEventListener(event, function (e) {
        let el = e.target.closest(selector);
        if (el) handler(el);
    });
}
