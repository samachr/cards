import { CardGame } from '../js/card_game.mjs'
import { Plugin } from '../js/plugin.mjs'
import { expect } from 'chai'

describe('CardGame', function() {
    it('create an instance', function() {
        const cardGame = new CardGame();
        expect(cardGame).instanceOf(CardGame)
    });

    it('shows total prompts', function() {
        const cardGame = new CardGame([[1,1],[2,2]]);
        expect(cardGame.totalPrompts()).to.equal(2)
    });

    it('sets an initial prompt', function() {
        const cardGame = new CardGame([
                ["1 + 1", 2]
            ]
        )
        expect(cardGame.currentPrompt()).to.equal('1 + 1')
        expect(cardGame.currentCorrectResponse()).to.equal(2)
    })

    it('updates to next question after response', function() {
        const cardGame = new CardGame([
                ["1 + 1", 2],
                ["2 + 2", 4]
            ]
        );

        expect(cardGame.currentPrompt()).to.equal('1 + 1')
        expect(cardGame.currentCorrectResponse()).to.equal(2)

        expect(cardGame.attemptResponse(2)).to.be.true

        expect(cardGame.currentPrompt()).to.equal('2 + 2')
        expect(cardGame.currentCorrectResponse()).to.equal(4)
    })

    it('does not advance to the next question on incorrect response', function() {
        const cardGame = new CardGame([
                ["1 + 1", 2],
                ["2 + 2", 4]
            ]
        );

        expect(cardGame.currentPrompt()).to.equal('1 + 1')
        expect(cardGame.currentCorrectResponse()).to.equal(2)

        expect(cardGame.attemptResponse(0)).to.be.false

        expect(cardGame.currentPrompt()).to.equal('1 + 1')
        expect(cardGame.currentCorrectResponse()).to.equal(2)
    })

    it('plays a whole game', function() {
        const cardGame = new CardGame([
                ["1 + 1", 2],
                ["2 + 2", 4]
            ]
        );

        expect(cardGame.isOver()).to.be.false
        expect(cardGame.attemptResponse(2)).to.be.true
        expect(cardGame.isOver()).to.be.false
        expect(cardGame.attemptResponse(4)).to.be.true
        expect(cardGame.isOver()).to.be.true
    })

    it('plays a whole game with incorrect attempts', function() {
        const cardGame = new CardGame([
                ["1 + 1", 2],
                ["2 + 2", 4]
            ]
        );

        expect(cardGame.isOver()).to.be.false
        expect(cardGame.attemptResponse(2)).to.be.true
        expect(cardGame.isOver()).to.be.false
        expect(cardGame.attemptResponse(0)).to.be.false
        expect(cardGame.isOver()).to.be.false
        expect(cardGame.attemptResponse(4)).to.be.true
        expect(cardGame.isOver()).to.be.true
    })

    it('runs plugin hooks', function() {
        let gameStarted = 0;
        let promptAdvanced = 0;
        let gameOver = 0;
        class TestPlugin extends Plugin {
          onGameStart(prompts) {
            gameStarted++;
            expect(prompts).to.eql([
                ["1 + 1", 2],
                ["2 + 2", 4]
            ])
          }
          onAdvancePrompt(previous, current) { 
            promptAdvanced++;
            if (promptAdvanced == 1) {
              expect(previous).to.equal("1 + 1")
              expect(current).to.equal("2 + 2")
            } else if (promptAdvanced == 2) {
              expect(previous).to.equal("2 + 2")
              expect(current).to.equal("")
            }
          }
          onGameOver() { gameOver++ }
        }
        const cardGame = new CardGame([
                ["1 + 1", 2],
                ["2 + 2", 4]
            ],
            [new TestPlugin()]
        );
        expect(gameStarted).to.equal(1)
        cardGame.attemptResponse(2)
        expect(promptAdvanced).to.equal(1)
        cardGame.attemptResponse(4)
        expect(promptAdvanced).to.equal(2)
        expect(gameOver).to.equal(1)
    })
});