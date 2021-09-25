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
const displayInlineBlock = 'inline-block';
const classButtonPrev = '.button__prev';
const classButtonNext = '.button__next';
const classButtonsDisplay = '.button__display';
const classRotateButtonDisplay = 'button__display_rotate';
const classTitleTable = 'th .title';
const opacityNull = '0';
const opacityDefault = '1';

// Магические числа
const numberStartPage = 1;
const countData = 5;
const numberFinishPage = 10;

// Переменные
const bodyTable = document.querySelector(classBodyTable);
const buttonsSort = document.querySelectorAll(classButtonSort);
const form = document.querySelector(classForm);
const closeForm = document.querySelector(classButtonCloseForm);
const textForm = document.querySelector(classTextAreaForm);
const buttonForm = document.querySelector(classButtonForm);
const buttonPrev = document.querySelector(classButtonPrev);
const buttonNext = document.querySelector(classButtonNext);
const buttonsDisplay = document.querySelectorAll(classButtonsDisplay);
const titleColumns = document.querySelectorAll(classTitleTable);

let sortTable = [false, false, false, false];
let numberPage = numberStartPage;
let displayColumn = [true, true, true, true];

// Функции

// Функция считывает данные из JSON файла
// и передает эти данные для заполнения строк таблицы
const setData = (url) => {
    fetch(url) // происходит запрос данных по переданному адресу
        .then((response) => response.json()) // переводим формат JSON в массив
        .then((res) => {
            // createRowsTable(res); // вызываем функцию создания строк таблицы
            bodyTable.innerHTML = "";
            // вызываем функцию создания строк таблицы и передаем в нее массив данных текущей страницы
            createRowsTable(displayData(res)); 
            editCells(); // вызываем функцию редактирования ячеек
        });
};

// Функция передает массив данных текущей страницы
const displayData = (data) => {
    // переменная хранит индекс первого пользователя текущей страницы
    let numberFirstObjects = (numberPage - numberStartPage) * countData;
    let arrayData = [];

    for(let i = numberFirstObjects; i < numberFirstObjects + countData; i++) {
        arrayData.push(data[i]); // добавляем данные о пользователе в массив
    }

    return arrayData; // возвращаем массив данных для отображения их в таблицу
}

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

// Функция скрытия колонки
const hideColumn = (index) => {
    titleColumns[index].style.display = displayNone; // добавление класса для скрытия названия колонки
    buttonsSort[index].style.display = displayNone; // добавление класса для скрытия кнопки сортировки
    displayColumn[index] = false; // меняем состояние колонки

    // переменная хранит все строки 
    const rows = document.querySelectorAll('.' + classRowTable);

    // проходимся по массиву строк с помощью forEach
    rows.forEach(row => {
        let cellColumn = row.querySelectorAll('.' + classCellTable)[index]; // переменная хранит ячейку колонки
        cellColumn.style.opacity = opacityNull; // добавляем стиль для этой ячейки
    })

}

// Функция показа колонки
const showColumn = (index) => {
    titleColumns[index].style.display = displayInlineBlock; // добавление класса для показа названия колонки
    buttonsSort[index].style.display = displayInlineBlock; // добавление класса для показа кнопки сортировки
    displayColumn[index] = true; // меняем состояние колонки

    // переменная хранит все строки 
    const rows = document.querySelectorAll('.' + classRowTable);

    // проходимся по массиву строк с помощью forEach
    rows.forEach(row => {
        let cellColumn = row.querySelectorAll('.' + classCellTable)[index]; // переменная хранит ячейку колонки
        cellColumn.style.opacity = opacityDefault; // добавляем стиль для этой ячейки
    })
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

// обрабатываем событие клика кнопки на предыдущую страницу
buttonPrev.addEventListener('click', () => {
    if (numberPage > numberStartPage) {
        numberPage -= 1;
        setData(fileJSON);
    }
});

// обрабатываем событие клика кнопки на следующую страницу
buttonNext.addEventListener('click', () => {
    if (numberPage < numberFinishPage) {
        numberPage += 1;
        setData(fileJSON);
    }
});

// проходимся по массиву кнопок скрытия/показа колонок с помощью forEach
buttonsDisplay.forEach((button, index) => {
    // обрабатываем событие клика кнопки скрытия/показа колонок
    button.addEventListener('click', () => {
        // добавление класса разворота иконки в зависимости от состояния
        if (button.classList.contains(classRotateButtonDisplay)) {
            button.classList.remove(classRotateButtonDisplay);
        } else {
            button.classList.add(classRotateButtonDisplay);
        }

        // скрытие/показ колонки в зависимости от состояния
        if (displayColumn[index]) {
            hideColumn(index);
        } else {
            showColumn(index);
        } 
    });
});