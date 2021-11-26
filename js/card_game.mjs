export class CardGame{
    constructor(prompts, displayCallback) {
        this.prompts = prompts;
        this.displayCallback = displayCallback;
        this.currentQuestion = 0;
        this.displayCallback(prompts[this.currentQuestion])
    }

    attemptAnswer(response) {
    }
}