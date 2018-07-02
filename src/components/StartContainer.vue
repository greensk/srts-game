<template>
  <start-layout>
    <start-name
      v-if="!playerName"
      @set-name="setPlayerName"
    ></start-name>
    <start-game
      v-else
      :own-game="ownGame"
      :games="games"
      @create="createGame"
    ></start-game>
  </start-layout>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import StartName from './StartName.vue'
import StartGame from './StartGame.vue'
import StartLayout from './StartLayout.vue'

export default {
  name: 'StartContainer',

  components: {
    StartName,
    StartGame,
    StartLayout
  },

  props: {
  },

  computed: {
    ...mapState({
      playerName: state => state.playerName,
      ownGame: state => state.ownGame,
      games: state => state.games
    }),
    ...mapGetters([
    ])
  },

  methods: {
    ...mapActions([
      'setPlayerName',
      'createGame'
    ])
  }
}
</script>
