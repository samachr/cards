import { Plugin } from '../plugin.mjs'

export class MultiplicationGamePlugin extends Plugin {
  constructor() {
    super();
  }

  initPrompts() {
    return this.generateAllPrompts();
  }

  onGameStart(prompts) {}
  onAdvancePrompt(previous, current) {}
  onGameOver() {}

  generateAllPrompts() {
    let prompts = [...Array(100).keys()].map(number => [
      `${Math.ceil(number / 10)} * ${number % 10}`,
      Math.ceil(number / 10) * (number % 10)]
    )

    // Durstenfeld shuffle thanks to https://stackoverflow.com/a/12646864
    for (let i = prompts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [prompts[i], prompts[j]] = [prompts[j], prompts[i]];
    }

    return prompts
  }
}