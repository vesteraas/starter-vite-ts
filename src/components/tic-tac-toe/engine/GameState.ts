import {Board} from './Board';

export type GameState = {
    winner: string | null,
    board: Board | null
}