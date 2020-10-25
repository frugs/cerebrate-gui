/* eslint-disable no-restricted-globals */

import { AsyncUtils } from "./AsyncUtils";
import { concatExampleTags } from "./ExampleTags";

const DEBUG_TAGS = concatExampleTags([
  "player:win",
  "player:loss",
  "player:terran",
  "player:protoss",
  "player:zerg",
  "player:ai",

  "opponent:win",
  "opponent:loss",
  "opponent:terran",
  "opponent:protoss",
  "opponent:zerg",
  "opponent:ai",

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
  "game:1v1",
  "game:2v2",
  "game:3v3",
  "game:4v4",
  "game:ffa",
]);

const debugFunc = (...args) => console.log(args);

const selectReplayDebugFunc = async (...args) => {
  debugFunc(args);

  if (args.length < 1) {
    return;
  }

  await AsyncUtils.sleep(200);

  const { replayId, force } = args[0];

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
      force: force,
    })
  );
};

const selectMostRecentReplayDebugFunc = async (...args) => {
  debugFunc(args);

  await AsyncUtils.sleep(200);

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

  await AsyncUtils.sleep(200);

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

  await AsyncUtils.sleep(500);

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

  const payload = args[0];
  const includeTags = payload.includeTags || [];
  const excludeTags = payload.excludeTags || [];

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

    tagFrequencyTable: DEBUG_TAGS.filter(
      (tag) => !includeTags.includes(tag) && !excludeTags.includes(tag)
    ).map((tag) => ({
      tag: tag,
      frequency: 1,
    })),
  };
};

const exportReplaysToDirDebugFunc = async (...args) => {
  debugFunc(args);

  if (args.length < 1) {
    return;
  }

  return "path/to/directory";
};

const exportReplaysToSc2ReplayStatsDebugFunc = async (...args) => {
  debugFunc(args);

  if (args.length < 1) {
    return;
  }

  const { replayIds } = args[0];

  return replayIds.map((replayId) => ({
    replayId: replayId,
    exportUrl:
      "https://sc2replaystats.com/replay/" +
      Math.floor(Math.random() * 10000000),
  }));
};

const getScelightPathDebugFunc = async (...args) => {
  debugFunc(args);

  return null;
};

const selectScelightPathDebugFunc = async (...args) => {
  debugFunc(args);

  return "path/to/scelight";
};

export const Guy = {
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

  forgetReplays: (...args) =>
    ((self && self.forgetReplays) || debugFunc)(...args),

  exportReplaysToTempDir: (...args) =>
    ((self && self.exportReplaysToTempDir) || exportReplaysToDirDebugFunc)(
      ...args
    ),

  exportReplaysToTargetDir: (...args) =>
    ((self && self.exportReplaysToTargetDir) || exportReplaysToDirDebugFunc)(
      ...args
    ),

  exportReplaysToScelight: (...args) =>
    ((self && self.exportReplaysToScelight) || debugFunc)(...args),

  exportReplaysToSc2ReplayStats: (...args) =>
    (
      (self && self.exportReplaysToSc2ReplayStats) ||
      exportReplaysToSc2ReplayStatsDebugFunc
    )(...args),

  openDirInFileManager: (...args) =>
    ((self && self.openDirInFileManager) || debugFunc)(...args),

  getScelightPath: (...args) =>
    ((self && self.getScelightPath) || getScelightPathDebugFunc)(...args),

  selectScelightPath: (...args) =>
    ((self && self.selectScelightPath) || selectScelightPathDebugFunc)(...args),

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
  await AsyncUtils.sleep(500);
  Guy.onReplayUpdatedListeners.forEach((listener) =>
    listener.onReplayUpdated(payload)
  );
};
