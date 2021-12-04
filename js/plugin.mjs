export class Plugin {
  constructor() {}

  onGameStartInternal(data) {
    this.onGameStart(data.prompts);
  }

  onAdvancePromptInternal(data) {
    this.onAdvancePrompt(data.previous, data.current);
  }

  onGameOverInternal() {
    this.onGameOver();
  }

  onGameStart(prompts) {}
  onAdvancePrompt(previous, current) {}
  onGameOver() {}
}