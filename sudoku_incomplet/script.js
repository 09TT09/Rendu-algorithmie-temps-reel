let sudokuArray = [
    [1, 0,   0, 0],
    [0, 4,   2, 1],

    [2, 0,   0, 4],
    [0, 0,   0, 0],
];

let sudokuArrayPossibilities = [
    [null, null,   null, null],
    [null, null,   null, null],

    [null, null,   null, null],
    [null, null,   null, null],
];

let lc = sudokuArray.length // ligne et colonnes dans le tableau sudokuArray
let squareSide = Math.sqrt(lc) // côté des carré, aire du carré = (Math.sqrt(lc) * Math.sqrt(lc))

createTable()
function createTable() {
    document.getElementById("body").insertAdjacentHTML('beforeend', `
        <table>
            <tbody id="tbody"></tbody>
        </table>
    `)

    for (let i = 0; i < lc; i++) {
        document.getElementById("tbody").insertAdjacentHTML('beforeend', `<tr id="ligne-${i}"></tr>`)
        for (let y = 0; y < lc; y++) {
            document.getElementById(`ligne-${i}`).insertAdjacentHTML('beforeend', `
            <td id="${i},${y}" class="${sudokuArray[i][y] === 0 ? "cell_background_0" : "cell_background_not_0"}">
                ${ sudokuArray[i][y] === 0 ? "" : `${sudokuArray[i][y]}` }
            </td>`)
        }
    }
}

LinesColumnsCheck()
function LinesColumnsCheck() {
    for (let i = 0; i < lc; i++){ // lignes
        for (let y = 0; y < lc; y++){ // colonnes
            CellsCheck(i, y);
        }
    }
    console.log(sudokuArrayPossibilities);
}


function CellsCheck(i, y) {
    if (sudokuArray[i][y] === 0) { // si cellule vide
        let cellKnown = [];
        for (let x = 0; x < lc; x++) { // check possibilités ligne/colonne
            let cellLine = sudokuArray[i][x];
            let cellColumn = sudokuArray[x][y];

            // carré...
            

            // ligne
            if (!cellKnown.includes(cellLine) && cellLine !== 0) {
                cellKnown.push(cellLine);
            }

            // colonne
            if (!cellKnown.includes(cellColumn) && cellColumn !== 0) {
                cellKnown.push(cellColumn);
            }
        }
        sudokuArrayPossibilities[i][y] = cellKnown;
    }
}

function solve() {
    //
}