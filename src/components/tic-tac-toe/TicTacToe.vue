<script setup lang="ts">

import {ComputerMove, GameStep} from "./engine";
import {Symbols} from './engine/Symbols';
import {Board} from './engine/Board';
import {Difficulty} from './engine/Difficulty';
import {onMounted} from 'vue';
import {clearBoard, clickedPos, drawBoard, occupied} from '../board-utils';

const props = defineProps<{ difficulty: Difficulty }>();

const emit = defineEmits<{
  (e: 'gameOver', player: string): void
  (e: 'whosTurn', player: string): void
}>();

const huPlayer = 'X';
const aiPlayer = 'O';

const symbols: Symbols = {
  huPlayer,
  aiPlayer
}

let aiPlaying = Math.random() < 0.5;

const difficulty = props.difficulty;
let board: Board;

const init = () => {
  board = clearBoard();

  if (aiPlaying) {
    emit('whosTurn', 'aiPlayer');
    setTimeout(() => {
      const pos = ComputerMove(board, symbols, difficulty);
      board[pos!] = aiPlayer;
      drawBoard(board);
      aiPlaying = false;
      emit('whosTurn', 'huPlayer');
    }, 1000);
  } else {
    emit('whosTurn', 'huPlayer');
  }
}

const clicked = (event: any) => {
  if (aiPlaying) {
    return;
  } else {
    aiPlaying = true;
  }

  const pos = clickedPos(event);

  if (!occupied(board, pos)) {
    board[pos] = huPlayer;
    drawBoard(board);

    const game = GameStep(board, symbols, difficulty);
    board = game.board!;

    if (game.winner) {
      drawBoard(board);
      emit('gameOver', game.winner);
    } else {
      emit('whosTurn', 'aiPlayer');
      setTimeout(() => {
        drawBoard(board);
        aiPlaying = false;
        emit('whosTurn', 'huPlayer');
      }, 1000);
    }
  }
}

onMounted(() => {
  init();
});

defineExpose({ // Need this to be able to call init() from parent component
  init
});

</script>

<template>
  <table>
    <tbody @click="clicked">
    <tr>
      <td pos="0" id="pos0"></td>
      <td pos="1" id="pos1"></td>
      <td pos="2" id="pos2"></td>
    </tr>
    <tr>
      <td pos="3" id="pos3"></td>
      <td pos="4" id="pos4"></td>
      <td pos="5" id="pos5"></td>
    </tr>
    <tr>
      <td pos="6" id="pos6"></td>
      <td pos="7" id="pos7"></td>
      <td pos="8" id="pos8"></td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
td {
  border: 1px solid black;
  height: 50px;
  width: 50px;
  text-align: center;
}
</style>
