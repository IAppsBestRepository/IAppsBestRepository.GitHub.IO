document.addEventListener("DOMContentLoaded", async () => {

    const appBundle = sessionStorage.getItem('app_bundle');

    if (appBundle) {
        try {
            const fetchAppData = async (country) => {
                const response = await fetch(`https://itunes.apple.com/lookup?bundleId=${appBundle}&country=${country}`);
                if (!response.ok) throw new Error('Ошибка сети');
                const data = await response.json();
                return data;
            };

            let data = await fetchAppData('ru');

            if (data.resultCount === 0) {
                console.warn('Приложение не найдено в регионе RU, выполняется повторный поиск в регионе US.');
                data = await fetchAppData('us');
            }

            if (data.resultCount > 0) {
                const app = data.results[0];
                displayAppDetails(app);
            } else {
                alert('Приложение не найдено ни в регионе RU, ни в регионе US.');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Не удалось загрузить данные. Проверьте подключение к интернету.');
        }
    }
});

function displayAppDetails(app) {

    const appVersion = sessionStorage.getItem('app_version');
    const appDescription = sessionStorage.getItem('app_description');
    const appUpdateTime = sessionStorage.getItem('app_update_time');

    if (appVersion && appDescription && appUpdateTime) {
        const [currentVersion, fileSize, IOSVersion] = appVersion.split(' | ');

        const minIOSVersion = IOSVersion.replace(/iOS\s*/i, '');

        const date = new Date(appUpdateTime);

        const appUpdateTimeFormatted = date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });

        document.getElementById("current-version").textContent = `Актуальная версия: ${currentVersion}`;
        document.getElementById("file-size").textContent = `Размер файла: ${fileSize}`;
        document.getElementById("min-ios-version").textContent = `Минимальная версия: ${minIOSVersion}`;
        document.getElementById("update-time").textContent = `Последнее обновление: ${appUpdateTimeFormatted}`;
        document.getElementById("app-description-modifications").innerHTML = appDescription.replace(/\n/g, '<br>');
    }

    const tasks = [
        new Promise(resolve => {
            const img = document.getElementById("app-icon");
            img.src = app.artworkUrl512;
            img.onload = resolve;
        }),

        new Promise(resolve => {
            document.getElementById("app-name").textContent = app.trackName;
            document.getElementById("app-category").textContent = app.primaryGenreName;
            document.getElementById("app-developer").textContent = app.sellerName;

            const shortDescription = app.description.split(' ').slice(0, 30).join(' ') + '...';
            document.getElementById("app-description-text").textContent = shortDescription;

            document.getElementById("release-notes").textContent = app.releaseNotes || "Информация о релизе недоступна.";

            resolve();
        }),
        new Promise(resolve => {
            const screenshotsContainer = document.getElementById("screenshots-container");
            app.screenshotUrls.forEach(screenshot => {
                const img = document.createElement("img");
                img.src = screenshot;
                img.loading = "lazy";
                screenshotsContainer.appendChild(img);
            });
            resolve();
        })
    ];

    Promise.all(tasks).then(() => {
        console.log('Все данные загружены!');
    });
}