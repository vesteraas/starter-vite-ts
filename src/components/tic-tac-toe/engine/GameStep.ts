import AIHelpers from './AIHelpers';
import ComputerMove from './ComputerMove';
import {Difficulty} from './Difficulty';
import {GameState} from './GameState';
import {Board} from './Board';
import {Symbols} from './Symbols';

export default function GameStep(board: Board, symbols: Symbols, difficulty: Difficulty) {

    // ===============================================
    // Definitions

    const gameState: GameState = {
        winner: null,
        board: null
    };

    function computeAIAfterBoard() {

        const bestMove = ComputerMove(board, symbols, difficulty);

        //Old version resetted the board if there was an end game result (bestMove===undefined)
        //if ( bestMove === undefined ) {   return (new Array(9)).fill(0).map( (e,i) => i);   }
        const newBoard = Array.from(board);
        if ( bestMove !== undefined ) {
            newBoard[bestMove] = symbols.aiPlayer;
        }

        return newBoard;
    }

    // ===============================================
    // Process board

    //Check if player won or no moves left
    if ( AIHelpers.isGameFinished(board, symbols) ) {
        const winner = ( () => {
            const humanWon = AIHelpers.playerWon(board, symbols.huPlayer );
            const computerWon = AIHelpers.playerWon(board, symbols.aiPlayer );
            if ( humanWon ) {
                return "huPlayer";
            }
            else if ( computerWon ) {
                return "aiPlayer";
            }
            else {
                return "draw";
            }
        } )();

        //Old version resetted the board if there was an end game result (bestMove===undefined)
        // const newBoard = (new Array(9)).fill(0).map( (e,i) => i);

        gameState.board = board;
        gameState.winner = winner;
    }
    //Else move computer
    else {
        const boardAIAfter = computeAIAfterBoard();
        if ( AIHelpers.isGameFinished(boardAIAfter, symbols) ) {
            const winner = AIHelpers.playerWon(boardAIAfter, symbols.aiPlayer ) ? "aiPlayer" : "draw";

            gameState.board = boardAIAfter;
            gameState.winner = winner;
        }
        else {
            gameState.board = boardAIAfter;
        }
    }
    return gameState;

}