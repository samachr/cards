import { CardGameBasicUI } from '../js/card_game_basic_ui.mjs'
import { expect } from 'chai'

function expectDisplayOf() {
    let current = 0;
    const expected = arguments;
    return (prompt) => {
        current++;
        if (current === expected.length - 1) {
            expected[current]()
        }
    }
}

describe('CardGameBasicUI', function() {
    it('create an instance', function() {
        const cardGame = new CardGameBasicUI();
        expect(cardGame).instanceOf(CardGameBasicUI)
    });

    it('sets an initial question', function(done) {
        const cardGame = new CardGameBasicUI([
                ["1 + 1", 2]
            ],
            expectDisplayOf("1 + 1", done)
        )
    })

    it('updates to next question after response', function(done) {
        const cardGame = new CardGameBasicUI([
                ["1 + 1", 2],
                ["2 + 2", 4]
            ],
            expectDisplayOf("1 + 1", "2 + 2", done)
        );

        cardGame.attemptResponse(2)
    })

    it('does not advance to the next question on incorrect response', function(done) {
        const cardGame = new CardGameBasicUI([
                ["1 + 1", 2],
                ["2 + 2", 4]
            ],
            expectDisplayOf("1 + 1", "incorrect", "1 + 1", done)
        );

        cardGame.attemptResponse(0)
    })

    it('plays a whole game', function(done) {
        const cardGame = new CardGameBasicUI([
                ["1 + 1", 2],
                ["2 + 2", 4]
            ],
            expectDisplayOf("1 + 1", "2 + 2", "Winner!", done)
        );

        cardGame.attemptResponse(2)
        cardGame.attemptResponse(4)
    })

    it('plays a whole game with incorrect attempts', function(done) {
        const cardGame = new CardGameBasicUI([
                ["1 + 1", 2],
                ["2 + 2", 4]
            ],
            expectDisplayOf("1 + 1", "incorrect", "1 + 1", "2 + 2", "Winner!", done)
        );

        cardGame.attemptResponse(2)
        cardGame.attemptResponse(0)
        cardGame.attemptResponse(4)
    })
});