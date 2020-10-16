/* eslint-disable no-restricted-globals */

const EXAMPLE_TAGS = [
  "player:terran",
  "player:protoss",
  "player:zerg",
  "player:macro",
  "player:all_in",
  "player:2_base_all_in",
  "player:mech",
  "player:bio",
  "player:stargate",
  "player:twilight",
  "player:dt",
  "player:mass_pheonix",
  "player:mass_void_ray",
  "player:air_toss",
  "player:cannon_rush",
  "player:proxy_barracks",
  "player:proxy_hatch",
  "player:winner",
  "player:loser",

  "opponent:terran",
  "opponent:protoss",
  "opponent:zerg",
  "opponent:macro",
  "opponent:all_in",
  "opponent:2_base_all_in",
  "opponent:mech",
  "opponent:bio",
  "opponent:stargate",
  "opponent:twilight",
  "opponent:dt",
  "opponent:mass_pheonix",
  "opponent:mass_void_ray",
  "opponent:air_toss",
  "opponent:cannon_rush",
  "opponent:proxy_barracks",
  "opponent:proxy_hatch",
  "opponent:winner",
  "opponent:loser",

  "game:zvp",
  "game:zvt",
  "game:zvz",
  "game:tvz",
  "game:tvp",
  "game:tvt",
  "game:pvt",
  "game:pvz",
  "game:pvp",
  "game:short",
  "game:long",
  "game:basetrade",
];

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

const selectMostRecentReplayDebugFunc = async (...args) => {
  debugFunc(args);

  await sleep(200);

  Guy.onReplayLoadedListeners.forEach((listener) =>
    listener.onReplayLoaded({
      replayId: "SOME HASH VALUE",
      replayTimestamp: Math.floor(Date.now() / 1000),
      teams: ["Tassadar", "Artanis"],
      playerTeam: null,
      opponentTeam: null,
      replayFileName: null,
      selectedTags: ["game:fake_tag_2"],
      notes: "This is the most recently played replay",
      force: true,
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

const fetchTagFrequencyTableDebugFunc = async (...args) => {
  debugFunc(args);

  if (args.length < 1) {
    return null;
  }

  const filterTags = args[0];

  return EXAMPLE_TAGS.filter((tag) => !filterTags.includes(tag)).map((tag) => ({
    tag: tag,
    frequency: 1,
  }));
};

const Guy = {
  selectReplay: (...args) =>
    ((self && self.selectReplay) || selectReplayDebugFunc)(...args),

  selectMostRecentReplay: (...args) =>
    ((self && self.selectMostRecentReplay) || selectMostRecentReplayDebugFunc)(
      ...args
    ),

  selectPlayerOpponent: (...args) =>
    ((self && self.selectPlayerOpponent) || selectPlayerOpponentDebugFunc)(
      ...args
    ),

  updateReplayInfo: (...args) =>
    ((self && self.updateReplayInfo) || updateReplayInfoDebugFunc)(...args),

  fetchTagFrequencyTable: (...args) =>
    ((self && self.fetchTagFrequencyTable) || fetchTagFrequencyTableDebugFunc)(
      ...args
    ),

  onReplayLoadedListeners: [],
  onReplayUpdatedListeners: [],
};

window.replayLoaded = async (payload) => {
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
