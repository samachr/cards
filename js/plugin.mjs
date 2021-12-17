export class Plugin {
  constructor() {}

  initPromptsInternal() {
    return this.initPrompts() || []
  }

  onGameStartInternal(data) {
    this.onGameStart(data.prompts);
  }

  onAdvancePromptInternal(data) {
    this.onAdvancePrompt(data.previous, data.current, data.annotations);
  }

  onGameOverInternal() {
    this.onGameOver();
  }

  onGameStart(prompts) {}
  onAdvancePrompt(previous, current, annotations) {}
  onGameOver() {}
  initPrompts() {}
}