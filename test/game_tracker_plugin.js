import { GameTrackerPlugin } from '../js/plugins/game_tracker_plugin.mjs'
import { expect } from 'chai'

describe('GameTrackerPlugin', function() {
  it('tracks timings', function() {
    const mockDate = () => {
      let call = 0;
      return () => call * call++;
    }

    const plugin = new GameTrackerPlugin(mockDate());

    plugin.onGameStart()
    plugin.onAdvancePrompt()
    plugin.onAdvancePrompt()
    plugin.onAdvancePrompt()
    plugin.onGameOver()

    const timings = plugin.getAllTimes()

    expect(timings.length).to.equal(3)
    expect(timings[0]).to.equal(1)
    expect(timings[1]).to.equal(3)
    expect(timings[2]).to.equal(5)
  });
});