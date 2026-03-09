const fs = require('fs');
const path = require('path');
const https = require('https');

// URL экспорта Google Таблицы в формате CSV (передается через секреты объекта GitHub Actions)
const CSV_URL = process.env.GOOGLE_SHEET_CSV_URL;
const OUTPUT_PATH = path.join(__dirname, '../apps/frontend/lib/data/wine.json');

if (!CSV_URL) {
    console.error('Ошибка: Переменная окружения GOOGLE_SHEET_CSV_URL не установлена.');
    process.exit(1);
}

function fetchCsv(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', (err) => reject(err));
    });
}

function csvToJson(csv) {
    const lines = csv.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length === 0) return [];

    const headers = lines[0].split(',').map(h => h.trim());
    const result = [];

    // Поля, которые должны быть массивами
    const arrayFields = ['recommended_dishes', 'tags'];

    for (let i = 1; i < lines.length; i++) {
        const currentLine = parseCsvLine(lines[i]);
        if (currentLine.length !== headers.length) continue;

        const obj = {};
        headers.forEach((header, index) => {
            let value = currentLine[index];

            if (arrayFields.includes(header)) {
                // Разбиваем строку по точке с запятой, если поле должно быть массивом
                obj[header] = value ? value.split(';').map(item => item.trim()) : [];
            } else if (!isNaN(value) && value !== '' && value !== null) {
                // Числа
                obj[header] = Number(value);
            } else if (value && value.toLowerCase() === 'true') {
                // Булевы
                obj[header] = true;
            } else if (value && value.toLowerCase() === 'false') {
                // Булевы
                obj[header] = false;
            } else {
                // Строки
                obj[header] = value;
            }
        });
        result.push(obj);
    }
    return result;
}

/**
 * Простой парсер CSV строки, учитывающий кавычки
 */
function parseCsvLine(line) {
    const result = [];
    let curVal = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(curVal.trim());
            curVal = '';
        } else {
            curVal += char;
        }
    }
    result.push(curVal.trim());
    return result;
}

async function main() {
    try {
        console.log('Начинаю загрузку данных из Google Sheets...');
        const csvData = await fetchCsv(CSV_URL);
        const jsonData = csvToJson(csvData);

        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(jsonData, null, 4));
        console.log(`Успешно! Файл обновлен: ${OUTPUT_PATH}`);
        console.log(`Записей обработано: ${jsonData.length}`);
    } catch (error) {
        console.error('Произошла ошибка при синхронизации:', error);
        process.exit(1);
    }
}

main();
