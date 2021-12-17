import { Plugin } from '../plugin.mjs'

export class BasicUiPlugin extends Plugin {
  constructor() {
    super();
  }

  onGameStart(prompts) {
    document.querySelector('.prompt').innerHTML = prompts[0][0]
  }

  onAdvancePrompt(previous, current, annotations) {
    const newDiv = document.createElement("div");
    const newContent = document.createTextNode(previous + ' ' + annotations.responseTime / 1000);
    newDiv.appendChild(newContent);
    document.querySelector('.previous').appendChild(newDiv);

    document.querySelector('.prompt').innerHTML = current
  }

  onGameOver() {
    document.querySelector('.prompt').innerHTML = 'Game Over'
  }
}