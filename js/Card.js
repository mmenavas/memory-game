/**
 *
 * Author: Maximo Mena
 * GitHub: mmenavas
 * Twitter: @menamaximo
 * Project: Memory Workout
 * Description: A JS, HTML and CSS based memory game.
 * The goal is to match pairs of cards in the least
 * number of matching attempts.
 */

/**
 * @namespace Card object
 */
MemoryGame.Card = function(value) {
  this.value = value;
  this.isFaceUp = false;
  this.reset = function() {
    this.isFaceUp = false;
  }
  this.flip = function() {
    this.isFaceUp = !this.isFaceUp;
  }
};
