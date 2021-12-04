import { Plugin } from '../plugin.mjs'

export class TimingPlugin extends Plugin {
  constructor(dateGenerator) {
    super();
    this.startTimes = [];
    this.dateGenerator = dateGenerator || (() => new Date());
  }

  onGameStart(prompts) {
    this.startTimes.push(this.dateGenerator());
  }

  onAdvancePrompt(previous, current) {
    this.startTimes.push(this.dateGenerator());
  }

  onGameOver() { }

  getAllTimes() {
    const promptTimings = [];
    for (let i = 0; i < this.startTimes.length - 1; i++) {
      promptTimings.push(this.startTimes[i + 1] - this.startTimes[i])
    }
    return promptTimings;
  }
}