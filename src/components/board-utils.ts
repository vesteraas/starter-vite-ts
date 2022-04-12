import {Board} from './tic-tac-toe/engine/Board';

export const clickedPos = (event: any) => parseInt(event.target.getAttribute('pos'));

export const occupied = (board: Board, pos: number) => board[pos] == 'X' || board[pos] == 'O';

const setCell = (index: number, text: string) => {
    const element = document.getElementById('pos' + index);

    if (element) {
        element.innerText = text;
    }
}

export const clearBoard = () => {
    const board = [];

    for (let n = 0; n < 9; n++) {
        board.push(n);
        setCell(n, '');
    }

    return board;
}

export const drawBoard = (board: Board) => {
    for (let n = 0; n < 9; n++) {
        if (board[n] === 'X') {
            setCell(n, 'X');
        } else if (board[n] === 'O') {
            setCell(n, 'O');
        }
    }
}
