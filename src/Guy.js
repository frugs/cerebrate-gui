/* eslint-disable no-restricted-globals */

const debugFunc = (...args) => console.log(args);

const sleep = async (ms) =>
  await new Promise((resolve) => setTimeout(resolve, ms));

const selectReplayDebugFunc = async (...args) => {
  debugFunc(args);

  if (args.length < 1) {
    return;
  }

  await sleep(200);

  const { replayId } = args[0];

  Guy.onReplayLoadedListeners.forEach((listener) =>
    listener.onReplayLoaded({
      replayId: replayId,
      replayTimestamp: 1575909015,
      teams: ["BobTheZealot", "Jim Raynor"],
      playerTeam: null,
      opponentTeam: null,
      replayFileName: null,
      selectedTags: ["game:fake_tag"],
      notes: "Some fake notes",
      force: false,
    })
  );
};

const selectPlayerOpponentDebugFunc = async (...args) => {
  debugFunc(args);

  if (args.length < 1) {
    return;
  }

  await sleep(200);

  const { replayId, playerTeam, opponentTeam } = args[0];

  Guy.onReplayLoadedListeners.forEach((listener) =>
    listener.onReplayLoaded({
      replayId: replayId,
      replayTimestamp: 1575909015,
      teams: ["BobTheZealot", "Jim Raynor"],
      playerTeam: playerTeam,
      opponentTeam: opponentTeam,
      replayFileName: null,
      selectedTags: ["game:fake_tag"],
      notes: "Some fake notes",
      force: false,
    })
  );
};

const updateReplayInfoDebugFunc = async (...args) => {
  debugFunc(args);

  if (args.length < 1) {
    return;
  }

  const { replayId } = args[0];

  await sleep(500);

  Guy.onReplayUpdatedListeners.forEach((listener) =>
    listener.onReplayUpdated({
      success: true,
      replayId: replayId,
    })
  );
};

const Guy = {
  selectReplay: (...args) =>
    ((self && self.selectReplay) || selectReplayDebugFunc)(...args),

  selectPlayerOpponent: (...args) =>
    ((self && self.selectPlayerOpponent) || selectPlayerOpponentDebugFunc)(
      ...args
    ),

  updateReplayInfo: (...args) =>
    ((self && self.updateReplayInfo) || updateReplayInfoDebugFunc)(...args),

  onReplayLoadedListeners: [],
  onReplayUpdatedListeners: [],
};

window.replayLoaded = async (payload) => {
  await sleep(200);
  Guy.onReplayLoadedListeners.forEach((listener) =>
    listener.onReplayLoaded(payload)
  );
};

// eslint-disable-next-line no-restricted-globals
window.replayUpdated = async (payload) => {
  await sleep(500);
  Guy.onReplayUpdatedListeners.forEach((listener) =>
    listener.onReplayUpdated(payload)
  );
};

export default Guy;
