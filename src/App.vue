<script setup lang="ts">
import TicTacToe from './components/tic-tac-toe/TicTacToe.vue';
import {ref} from 'vue';

const board = ref(); // Refers to the tic-tac-toe component in the index.html with the property ref="board"
const winner = ref<string | undefined>(undefined);
const nowPlaying = ref<string | undefined>(undefined);

const gameOver = (player: string) => {
  winner.value = player;
}

const whosTurn = (player: string) => {
  nowPlaying.value = player;
}

const reset = () => {
  winner.value = undefined;
  nowPlaying.value = undefined;
  console.log(board.value);
  board.value!.init();
}

</script>

<template>
  <div v-if="!winner">
    <p v-if="nowPlaying === 'aiPlayer'">AI's turn</p>
    <p v-if="nowPlaying === 'huPlayer'">Human's turn</p>
  </div>
  <div v-else>
    <p v-if="winner === 'draw'" style="color: red"><b>It was a draw!</b></p>
    <p v-if="winner === 'aiPlayer'">AI won!</p>
    <p v-if="winner === 'huPlayer'">Human won!</p>
  </div>
  <tic-tac-toe
      ref="board"
      difficulty="Hard"
      @game-over="gameOver"
      @whos-turn="whosTurn">
  </tic-tac-toe>
  <p v-if="winner" @click="reset">Click to restart</p>
</template>

<style>
#app {
  font-family: Arial;
}
</style>
