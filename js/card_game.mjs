import { Plugin } from "./plugin.mjs";

export class CardGame {
  constructor(plugins) {
      this.prompts = (plugins || []).map(
        plugin => plugin.initPromptsInternal()
      ).reduce((previous, current) => {
        return previous.concat(current)
      }, []);
      this.promptAnnotations = this.prompts.reduce((obj, x) => {
        obj[x[0]] = {};
        return obj;        
      }, {});

      this.currentPromptIndex = 0;
      this.plugins = plugins || [];
      this.hook('GameStart', { prompts: this.prompts })
  }

  attemptResponse(response) {
      if (this.isOver()) {
        return false;
      }

      if (response == this.currentCorrectResponse()) {
          this.advancePrompt();
          return true;
      } else {
          this.annotatePrompt('failedAttempts', 1)
          return false;
      }
  }

  currentPrompt() {
      if (this.isOver()) {
        return '';
      }
      return this.prompts[this.currentPromptIndex][0];
  }

  currentCorrectResponse() {
      if (this.isOver()) {
        return '';
      }
      return this.prompts[this.currentPromptIndex][1];
  }

  advancePrompt() {
      const previous = this.currentPrompt();
      this.currentPromptIndex++;
      this.hook('AdvancePrompt', {previous: previous, current: this.currentPrompt(), annotations: this.promptAnnotations[previous]})
      
      if (this.isOver()) {
        this.hook('GameOver')
      }
  }

  totalPrompts() {
      return this.prompts.length
  }

  isOver() {
      return this.currentPromptIndex == this.prompts.length
  }

  hook(name, data) {
    this.plugins.forEach(plugin => {
      plugin['on' + name + 'Internal'](data || {})
    });
  }

  annotatePrompt(annotation, value) {
    if (this.promptAnnotations[this.currentPrompt()][annotation]) {
      this.promptAnnotations[this.currentPrompt()][annotation] += value
    } else {
      this.promptAnnotations[this.currentPrompt()][annotation] = value
    }
  }

  static fromPrompts(prompts, plugins) {

    class AnonymousPromptPlugin extends Plugin {
      initPrompts() {
        return prompts;
      }
    }

    return new CardGame([new AnonymousPromptPlugin()].concat(plugins || []))
}
}