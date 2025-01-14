function getBundleId(searchvalue) {
    var country = document.getElementById("country").value;
    var isBundleId = searchvalue.includes(".");

    if (isBundleId) {
        $.getJSON(
            `https://itunes.apple.com/lookup?bundleId=${searchvalue}&country=${country}&callback=?`,
            function(json) {
                $("#results").html("");
                if (json.resultCount > 0) {
                    json.results.forEach((app) => {
                        displayApp(app);
                    });
                    $("#results-table").fadeIn();
                } else {
                    $("#results").html("<p>Приложение с таким BundleID не найдено.</p>");
                }
            }
        );
    } else {
        $.getJSON(
            `https://itunes.apple.com/search?limit=20&media=software&term=${searchvalue}&country=${country}&callback=?`,
            function(json) {
                $("#results").html("");
                if (json.resultCount > 0) {
                    json.results.forEach((app) => {
                        displayApp(app);
                    });
                    $("#results-table").fadeIn();
                } else {
                    $("#results").html("<p>Приложение с таким названием не найдено.</p>");
                }
            }
        );
    }
}

function displayApp(app) {
    var appName = app.trackName;
    var appId = app.trackId;
    var artworkUrl = app.artworkUrl100.replace("100x100bb", "350x350");
    var artistName = app.artistName;
    var bundleId = app.bundleId;
    var minimumIos = app.minimumOsVersion || "N/A";
    var lastVersion = app.version || "N/A";
    var lastUpdate = app.currentVersionReleaseDate ?
        new Date(app.currentVersionReleaseDate).toLocaleDateString() :
        "N/A";

    var result = `
        <tr>
            <td>
                <img src="${artworkUrl}" alt="${appName}" onclick="copyToClipboard('${artworkUrl}')" style="cursor: pointer;">
            </td>
            <td>
                <h3>${appName}</h3>
                <p><strong>BundleID:</strong> <span id="bundle_${appId}" class="bundleid" onclick="copyToClipboard('${bundleId}')">${bundleId}</span></p>
                <p><strong>Artist:</strong> ${artistName}</p>
                <p><strong>Min iOS:</strong> ${minimumIos}</p>
                <p><strong>Last Version:</strong> ${lastVersion}</p>
                <p><strong>Last Update:</strong> ${lastUpdate}</p>
            </td>
        </tr>`;
    $("#results").append(result);
}

$("#searchform").submit(function(event) {
    event.preventDefault();
    var searchfield = $("#search");
    getBundleId(searchfield.val());
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard: " + text);
    });
}