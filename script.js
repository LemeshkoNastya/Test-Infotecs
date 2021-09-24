// Магические строки
const fileJSON = 'data.json';
const classBodyTable = '.table__body';

// Функции

// Функция считывает данные из JSON файла
// и передает эти данные для заполнения строк таблицы
const setData = (url) => {
    fetch(url) // происходит запрос данных по переданному адресу
        .then((response) => response.json()) // переводим формат JSON в массив
        .then((res) => {
            createRowsTable(res); // вызываем функцию создания строк таблицы
        });
};

// Функция заполняет таблицу данными из файла
const createRowsTable = (data) => {
    // переменная хранит контейнер для строк таблицы
    const bodyTable = document.querySelector(classBodyTable);

    // проходимся по масиву с помощью forEach
    data.forEach((user) => { 
        // создаем переменную, в которую передаем разметку строки с данными пользователя из файла
        let rowTable = `
            <tr>
                <td>${user.name.firstName}</td>
                <td>${user.name.lastName}</td>
                <td>${user.about}</td>
                <td>${user.eyeColor}</td>
            </tr>
        `;
        bodyTable.innerHTML += rowTable; // добавляем в контейнер новую строку
    });
}

// вызываем функцию считывания данных и передаем в нее адрес JSON файла
setData(fileJSON); 