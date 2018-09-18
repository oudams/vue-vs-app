// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    gameOver: false,
    playerScore: 0,
    monsterScore: 0,
    winner: "",
    turns: []
  },
  methods: {
    startGame: function(){
      this.gameOver = false;
      this.gameIsRunning = true;
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.turns = [];
    },
    attack: function(){
      this.playerAttack();
      this.monsterAttack();
    },
    playerAttack: function(){
      var damage = this.gotDamage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({isPlayer: true, text: "Player attacked " + damage })
      this.gameProcessing();
    },
    monsterAttack: function(){
      var damage = this.gotDamage(5, 12);
      this.playerHealth -= damage;
      this.turns.unshift({isPlayer: false, text: "Monster attacked " + damage })
      this.gameProcessing();
    },
    specialAttack: function(){
      this.playerAttack()
      this.playerAttack()
      this.playerAttack()
    },
    heal: function(){
      this.playerHealth += 10;
      if (this.playerHealth > 100){
        this.playerHealth = 100;
      }
    },
    giveUp: function(){
      this.winner = "Monster!!";
      this.gameOver = true;
      this.gameIsRunning = false;
   },
    gotDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    gameProcessing: function() {
      if (this.playerHealth <= 0 || this.monsterHealth < 0) {
        this.gameIsRunning = false;
        this.gameOver = true;
        this.winner = this.playerHealth <= this.monsterHealth ? "Monster!!" : "Player!!";
        return true;
      }
    }
  }
})
