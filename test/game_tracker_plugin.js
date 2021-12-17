import { TimingPlugin } from '../js/plugins/timing_plugin.mjs'
import { expect } from 'chai'

describe('TimingPlugin', function() {
  it('tracks timings', function() {
    const mockDate = () => {
      let call = 0;
      return () => call * call++;
    }

    const plugin = new TimingPlugin(mockDate());

    const annotations = {
      1: {},
      2: {},
      3: {}
    }

    plugin.onGameStart()
    plugin.onAdvancePrompt(1, 2, annotations[1])
    expect(annotations[1].responseTime).to.equal(1)
    plugin.onAdvancePrompt(2, 3, annotations[2])
    expect(annotations[2].responseTime).to.equal(3)
    plugin.onAdvancePrompt(3, '', annotations[3])
    expect(annotations[3].responseTime).to.equal(5)
    plugin.onGameOver()

    const timings = plugin.getAllTimes()

    expect(timings.length).to.equal(3)
    expect(timings[0]).to.equal(1)
    expect(timings[1]).to.equal(3)
    expect(timings[2]).to.equal(5)
  });
});