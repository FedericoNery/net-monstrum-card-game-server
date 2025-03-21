
class Deck {
    constructor(cards) {
      this.cards = cards;
    }

    extractCard() {
      if(this.cards.length > 0){
        return this.cards.shift()
      }
    }

    extractCardsByQuantity(quantity){
      let extractedCards = []
      for (let index = 0; index < quantity; index++) {
        extractedCards.push(this.extractCard())
      }
      return extractedCards
    }

    shuffle = () => {
      var j, x, i;
      for (i = this.cards.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          x = this.cards[i];
          this.cards[i] = this.cards[j];
          this.cards[j] = x;
      }
  }
  getLength(){
    return this.cards.length
  }
}


export default Deck