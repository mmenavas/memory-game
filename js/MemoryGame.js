/**
 * Author: Maximo Mena
 * GitHub: mmenavas
 * Twitter: @menamaximo
 * Project: Memory Workout
 * Description: This is a memory game written in pure JavaScript.
 * The goal is to match pairs of cards in the least
 * number of matching attempts.
 */

/**
 * @TODO
 * - Implement support for multiple players.
 */

/**
 * @namespace The main application object
 */
var MemoryGame = {

  settings: {
    rows: 2,
    columns: 3
  },

  // Properties that indicate state
  cards: [], // Array of MemoryGame.Card objects
  attempts: 0, // How many pairs of cards were flipped before completing game
  isGameOver: false,

  /**
   * Modify default settings to start a new game.
   * Both parameters need integers greater than one, and
   * at least one them  needs to be an even number.
   *
   * @param {number} columns
   * @param {number} rows
   * @return {array} shuffled cards
   */
  initialize : function(rows, columns) {
    var validOptions = true;

    // Validate arguments
    if (!(typeof columns === 'number' && (columns % 1) === 0 && columns > 1) ||
        !(typeof rows === 'number' && (rows % 1) === 0) && rows > 1) {
      validOptions = false;
      throw {
        name: "invalidInteger",
        message: "Both rows and columns need to be integers greater than 1."
      };
    }

    if ((columns * rows) % 2 !== 0) {
      validOptions = false;
      throw {
        name: "oddNumber",
        message: "Either rows or columns needs to be an even number."
      };
    }

    if (validOptions) {
      this.settings.rows = rows;
      this.settings.columns = columns;
      this.attempts = 0;
      this.isGameOver = false;
      this.createCards().shuffleCards();
    }

    return this.cards;
  },

  /**
   * Create an array of sorted cards
   * @return Reference to self object
   */
  createCards: function() {
    var cards = [];
    var count = 0;
    var maxValue = (this.settings.columns * this.settings.rows) / 2;
    while (count < maxValue) {
      cards[2 * count] = new this.Card(count + 1);
      cards[2 * count + 1] = new this.Card(count + 1);
      count++;
    }

    this.cards = cards;

    return this;
  },

  /**
   * Rearrange elements in cards array
   * @return Reference to self object
   */
  shuffleCards: function() {
    var cards = this.cards;
    var shuffledCards = [];
    var randomIndex = 0;

    // Shuffle cards
    while (shuffledCards.length < cards.length) {

      // Random value between 0 and cards.length - 1
      randomIndex  = Math.floor(Math.random() * cards.length);

      // If element isn't false, add element to shuffled deck
      if(cards[randomIndex]) {

        // Add new element to shuffle deck
        shuffledCards.push(cards[randomIndex]);

        // Set element to false to avoid being reused
        cards[randomIndex] = false;
      }

    }

    this.cards = shuffledCards;

    return this;
  },

  /**
   * A player gets to flip two cards. This function returns information
   * about what happens when a card is selected
   *
   * @param {number} Index of card selected by player
   * @return {object} {code: number, message: string, args: array or number}
   */
  play: (function() {
    var cardSelection = [];
    var faceUpCards = 0;

    return function(index) {
      var status = {};

      if (!this.cards[index].isFaceUp) {
        this.cards[index].flip();
        cardSelection.push(index);
        if (cardSelection.length == 2) {
          this.attempts++;
          if (this.cards[cardSelection[0]].value !=
              this.cards[cardSelection[1]].value) {
            // No match
            this.cards[cardSelection[0]].reset();
            this.cards[cardSelection[1]].reset();
            status.code = 3,
            status.message = 'No Match. Flipping cards back.';
            status.args = cardSelection;
          }
          else {
            faceUpCards += 2;
            if (faceUpCards == this.cards.length) {
              // Game over
              this.isGameOver = true;
              faceUpCards = 0;
              status.code = 4,
              status.message = 'GAME OVER! Attempts: ' + this.attempts;
              status.args = this.attempts;
            }
            else {
              status.code = 2,
              status.message = 'Match.';
            }
          }
          cardSelection = [];
        }
        else {
          status.code = 1,
          status.message = 'Flip first card.';
        }
      }
      else {
        status.code = 0,
        status = 'Card is already facing up.';
      }

      return status;

    };
  })()

};

