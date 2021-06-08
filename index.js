import { Universe, Cell }  from "wasm-game-of-life";
import { memory } from "wasm-game-of-life/wasm_game_of_life_bg";

const CELL_SIZE = 3;
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

const universe_red = Universe.new(1);
//const universe_green = Universe.new(2);
//const universe_blue = Universe.new(3)
const width = universe_red.width();
const height = universe_red.height();


const canvas = document.getElementById("game-of-life-canvas");
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const ctx = canvas.getContext('2d');

const renderLoop = () => {
    universe_red.tick();
    //universe_green.tick();
    //universe_blue.tick();
    //drawGrid();
    drawCells();

    requestAnimationFrame(renderLoop);
}

const drawGrid = () => {
    ctx.beginPath();
    ctx.strookeStyle = GRID_COLOR;

    for (let i = 0; i <= width; i++) {
        ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
        ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
    }

    for (let j = 0; j <= height; j++) {
        ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
        ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
    }

    ctx.stroke();
};

const getIndex = (row, column) => {
    return row * width + column;
}

const drawCells = () => {
    const cellsPtr_red = universe_red.cells();
    const cellsPtr_green = universe_red.cells_green();
    const cellsPtr_blue = universe_red.cells_blue();
    const cells_red = new Uint8Array(memory.buffer, cellsPtr_red, width * height);
    const cells_green = new Uint8Array(memory.buffer, cellsPtr_green, width * height);
    const cells_blue = new Uint8Array(memory.buffer, cellsPtr_blue, width * height);
    //const cellsPtr_green = universe_green.cells();
    //const cells_green = new BigUint64Array(memory.buffer, cellsPtr_green, width * height);
    //const cellsPtr_blue = universe_blue.cells();
    //const cells_blue = new BigUint64Array(memory.buffer, cellsPtr_blue, width * height);
    ctx.beginPath();

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const idx = getIndex(row, col);

            /*
            let int_red = Math.floor((cells_red[idx] + cells_blue[idx])/3);
            let int_yellow = Math.floor((cells_green[idx] + cells_blue[idx])/3);
            let int_blue = Math.floor((cells_green[idx] + cells_red[idx])/3);
            */
            let colorPart_red = cells_red[idx].toString(16).padStart(2, "0");
            let colorPart_green = cells_green[idx].toString(16).padStart(2, "0");
            let colorPart_blue = cells_blue[idx].toString(16).padStart(2, "0");

            ctx.fillStyle = "#" + colorPart_red + colorPart_green + colorPart_blue;

            //ctx.fillStyle = cells[idx] == Cell.Dead ? DEAD_COLOR : ALIVE_COLOR;

            ctx.fillRect(
                col * (CELL_SIZE),
                row * (CELL_SIZE),
                CELL_SIZE,
                CELL_SIZE
            );
        }
    }
}

requestAnimationFrame(renderLoop);
