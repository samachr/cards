import { CardGame } from '../js/card_game.mjs'
import { expect } from 'chai'

describe('CardGame', function() {
    it('create an instance', function() {
        const cardGame = new CardGame();
        expect(cardGame).instanceOf(CardGame)
    });
    it('sets an initial question', function(done) {
        const cardGame = new CardGame([
            ["1 + 1", 2]
        ]);
        done()
    })
});