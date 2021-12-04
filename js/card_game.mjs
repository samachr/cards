export class CardGame {
  constructor(prompts, plugins) {
      this.prompts = prompts || [];
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
      this.hook('AdvancePrompt', {previous: previous, current: this.currentPrompt()})
      
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
}