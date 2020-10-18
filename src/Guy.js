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
      teams: ["BobTheZealot", "JimRaynor"],
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

const findReplaysDebugFunc = async (...args) => {
  debugFunc(args);

  if (args.length < 1) {
    return;
  }

  let { includeTags } = args[0];
  if (!includeTags) {
    includeTags = [];
  }

  return {
    replays: [
      {
        replayId: "f91abca15806c6038f9b4af454af40d6dd32",
        replayTimestamp: 1602931843,
        teams: ["BobTheZealot", "JimRaynor"],
        notes: "A truly great game between the two titans of StarCraft",
      },
      {
        replayId: "540a1430ffe4d73f7c2c9d87cd2e4907b419",
        replayTimestamp: 1585730727,
        teams: ["Tassadar", "JimRaynor"],
        notes:
          "An unfortunate disagreement between friends led to this bar fight",
      },
      {
        replayId: "ab6ee43405077302a6a9fc3f1ceaf6aae6fc",
        replayTimestamp: 1322166082,
        teams: ["BobTheZealot", "Tassadar"],
        notes: "An awful match",
      },
      {
        replayId: "48df54843f16afea0b8b92aa167de0e31912",
        replayTimestamp: 1471426714,
        teams: ["Tassadar", "BobTheZealot"],
        notes: "Very BM",
      },
      {
        replayId: "391b6c73cae67daaa1306c5ef5cad275bd29",
        replayTimestamp: 1398404675,
        teams: ["Tassadar", "Artanis"],
        notes:
          "The quick brown fox jumps over the lazy dog. Abcdefghijklm nopqrs t uvwxy z",
      },
      {
        replayId: "03afb9220f1eee91ed3cdcf862446bfb1002",
        replayTimestamp: 1435622178,
        teams: ["Artanis", "BobTheZealot"],
        notes: "",
      },
    ],

    tagFrequencyTable: EXAMPLE_TAGS.filter(
      (tag) => !includeTags.includes(tag)
    ).map((tag) => ({
      tag: tag,
      frequency: 1,
    })),
  };
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

  findReplays: (...args) =>
    ((self && self.findReplays) || findReplaysDebugFunc)(...args),

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
