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