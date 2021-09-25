// Магические строки
const fileJSON = 'data.json';
const classBodyTable = '.table__body';
const classButtonSort = '.button__sort';
const classRowTable = 'table__row';
const classCellTable = 'table__cell';
const classAboutCell = 'table__about';
const classForm = '.edit-form';
const classButtonCloseForm = '.edit-form__close';
const classTextAreaForm = '.edit-form__text';
const classButtonForm = '.edit-form__button';
const displayBlock = 'block';
const displayNone = 'none';

// Переменные
const bodyTable = document.querySelector(classBodyTable);
const buttonsSort = document.querySelectorAll(classButtonSort);
const form = document.querySelector(classForm);
const closeForm = document.querySelector(classButtonCloseForm);
const textForm = document.querySelector(classTextAreaForm);
const buttonForm = document.querySelector(classButtonForm);

let sortTable = [false, false, false, false];

// Функции

// Функция считывает данные из JSON файла
// и передает эти данные для заполнения строк таблицы
const setData = (url) => {
    fetch(url) // происходит запрос данных по переданному адресу
        .then((response) => response.json()) // переводим формат JSON в массив
        .then((res) => {
            createRowsTable(res); // вызываем функцию создания строк таблицы
            editCells(); // вызываем функцию редактирования ячеек
        });
};

// Функция заполняет таблицу данными из файла
const createRowsTable = (data) => {
    // переменная хранит контейнер для строк таблицы
    const bodyTable = document.querySelector(classBodyTable);

    // проходимся по масиву с помощью forEach
    data.forEach((user) => { 
        // создаем переменную, в которую передаем разметку строки с данными пользователя из файла
        const rowTable = `
            <tr class=${classRowTable}>
                <td class=${classCellTable}>${user.name.firstName}</td>
                <td class=${classCellTable}>${user.name.lastName}</td>
                <td class=${classCellTable}>${user.about}</td>
                <td class=${classCellTable}>${user.eyeColor}</td>
            </tr>
        `;
        bodyTable.innerHTML += rowTable; // добавляем в контейнер новую строку
    });

    addClassAbout(); // вызываем функцию для добавления класса колонке about
}

// Функция добавляет класс 'table__about' колонке about
const addClassAbout = () => {
    const rows = document.querySelectorAll('.' + classRowTable); // переменная хранит все строки таблицы
    rows.forEach(row => {
        const cellsRow = row.querySelectorAll('.' + classCellTable); // переменная хранит все колонки текущей строки
        cellsRow[2].classList.add(classAboutCell); // добавляем класс третьей колонке (about) текущей строки
    });
}

// Функция сортирует колонку таблицы
const sortRowsTable = (indexButtonSort) => {
    const rows = document.querySelectorAll('.' + classRowTable); // переменная хранит все строки таблицы
    const arrayRows = Array.from(rows); // преобразовываем переменную из объекта в массив

    // Вызываем стандартный метод сортировки для массива
    arrayRows.sort((firstRow, secondRow) => {
        const contentFirstCell = firstRow.querySelectorAll('.' + classCellTable)[indexButtonSort].innerHTML; // записываем значение одной ячейки
        const contentSecondCell = secondRow.querySelectorAll('.' + classCellTable)[indexButtonSort].innerHTML; // записываем значение второй ячейки

        // сравниваем значения записанных ячеек
        if (contentFirstCell > contentSecondCell) {
            return 1;
        } else if (contentFirstCell < contentSecondCell) {
            return -1;
        } else {
            return 0;
        }
    });

    return arrayRows; // возвращаем отсортированный массив
}

// Функция сортирует колонку в обратном порядке
const reverseSortRowsTable = (index) => {
    const sortRows = sortRowsTable(index); // переменная хранит отсортированный массив
    const reverseSortRows =  sortRows.reverse(); // формируем массив в обратном порядке

    return reverseSortRows; // возвращаем отсортированный массив в обратном порядке
}

// Функция добавляет класс 'table__row' к строкам таблицы
// и обновляет данные в ней
const updateBodyTable = (rows) => {
    bodyTable.innerHTML = []; // делаем контейнер пустым

    rows.forEach(row => {
        // переменная хранит строку с классом 'table__row'
        const newRowTable = `
            <tr class=${classRowTable}>
                ${row.innerHTML}
            </tr>
        `;

        bodyTable.innerHTML += newRowTable; // добавляем в контейнер новую строку
    });
}

// Функция редактирования ячеек таблицы
const editCells = () => {
    const cellsTable = document.querySelectorAll('.' + classCellTable);// контейнер хранит все ячейки таблицы
    let indexCell;

    // проходимся по массиву ячеек с помощью forEach
    cellsTable.forEach((cell,index) => {
        // обрабатываем событие клика на ячейку
        cell.addEventListener('click', () => {
            form.style.display = displayBlock; // форму редактирования делаем видимой
            textForm.innerHTML = cell.innerHTML; // записываем в форму для редактирования содержание ячейки
            textForm.value = cell.innerHTML; // записываем в значение textarea содержание ячейки
            indexCell = index; // записываем индекс последней кликнутой ячейки
        });
    });

    // обрабатываем событие клика на кнопку "Заменить"
    buttonForm.addEventListener('click', () => {
        cellsTable[indexCell].innerHTML = textForm.value; // меняем значение в ячейке на новое
        form.style.display = displayNone; // форму редактирования делаем невидимой
    });

    // обрабатываем событие клика на кнопку крестик
    closeForm.addEventListener('click', () => {
        form.style.display = displayNone; // форму редактирования делаем невидимой
    });
}

// вызываем функцию считывания данных и передаем в нее адрес JSON файла
setData(fileJSON); 

// События

// проходимся по массиву кнопок сортировки с помощью forEach
buttonsSort.forEach((button, index) => {
    // обрабатываем событие клика кнопки сортировки 
    button.addEventListener('click', () => {
        let rowstable;

        // проверка на то, отсортирована ли колонка
        if (!sortTable[index]) {
            // в переменной будет храниться отсортированный массив строк таблицы
            rowstable = sortRowsTable(index);
        } else {
            // в переменной будет храниться отсортированный массив строк таблицы в обратном порядке
            rowstable = reverseSortRowsTable(index); 
        }

        // вызываем функцию обновления контейнера строк таблицы
        updateBodyTable(rowstable);

        // меняем состояние сортировки колонки
        sortTable[index] = !sortTable[index];
    });
});