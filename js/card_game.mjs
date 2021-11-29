export class CardGame{
    constructor(prompts, displayCallback, advanceDelay) {
        this.advanceDelay = advanceDelay || 0;
        this.prompts = prompts || [];
        this.displayCallback = displayCallback || (() => {});
        this.currentPromptIndex = 0;
        if (this.prompts.length > 0) {
            this.displayCallback(this.currentPrompt())
        }
    }

    attemptResponse(response) {
        if (response == this.currentCorrectResponse()) {
            this.advancePrompt();
            return true;
        } else {
            this.displayCallback("incorrect")
            setTimeout(() => {
                this.displayCallback(this.currentPrompt());
            }, this.advanceDelay);
            return false;
        }
    }

    currentPrompt() {
        return this.prompts[this.currentPromptIndex][0]
    }

    currentCorrectResponse() {
        return this.prompts[this.currentPromptIndex][1]
    }

    advancePrompt() {
        if (this.currentPromptIndex < this.prompts.length - 1) {
            this.currentPromptIndex++;
            this.displayCallback(this.currentPrompt())
        } else {
            this.displayCallback("Winner!")
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

        return new CardGame(prompts, displayCallback, advanceDelay)
    }
}