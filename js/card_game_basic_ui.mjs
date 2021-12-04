import { CardGame } from './card_game.mjs'

export class CardGameBasicUI {
    constructor(prompts, displayCallback, advanceDelay) {
        this.game = new CardGame(prompts || [['no prompt entered', 1]])
        this.advanceDelay = advanceDelay || 0;
        this.displayCallback = displayCallback || (() => {});
        this.displayCallback(this.game.currentPrompt())
    }

    attemptResponse(response) {
        if (this.game.attemptResponse(response)) {
            this.advancePrompt();
        } else {
            this.displayCallback("incorrect")
            setTimeout(() => {
                this.displayCallback(this.game.currentPrompt());
            }, this.advanceDelay);
        }
    }

    advancePrompt() {
        if (this.game.isOver()) {
            this.displayCallback("Winner!")
        } else {
            this.displayCallback(this.game.currentPrompt())
        }
    }

    static TimesTables(displayCallback, advanceDelay) {
        let prompts = [...Array(100).keys()].map(number => [
            `${Math.ceil(number / 10)} * ${number % 10}`,
            Math.ceil(number / 10) * (number % 10)]
        )

        // Durstenfeld shuffle thanks to https://stackoverflow.com/a/12646864
        for (let i = prompts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [prompts[i], prompts[j]] = [prompts[j], prompts[i]];
        }

        return new CardGameBasicUI(prompts, displayCallback, advanceDelay)
    }

    static Addition(displayCallback, advanceDelay) {
        let prompts = [...Array(100).keys()].map(number => [
            `${Math.ceil(number / 10)} + ${number % 10}`,
            Math.ceil(number / 10) + (number % 10)]
        )

        // Durstenfeld shuffle thanks to https://stackoverflow.com/a/12646864
        for (let i = prompts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [prompts[i], prompts[j]] = [prompts[j], prompts[i]];
        }

        return new CardGameBasicUI(prompts, displayCallback, advanceDelay)
    }
}