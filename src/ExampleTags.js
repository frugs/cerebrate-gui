const PLAYER_AND_OPPONENT_TAG_NAMES = [
  "macro",
  "all_in",
  "1_base_all_in",
  "2_base_all_in",
  "3_base_all_in",
  "mech",
  "bio",
  "stargate",
  "twilight",
  "dt",
  "swarm_host",
  "battlecruiser",
  "nydus",
  "cannon_rush",
  "proxy_barracks",
  "proxy_hatch",
];

const GAME_TAG_NAMES = ["macro", "basetrade"];

const EXAMPLE_TAGS = [
  ...PLAYER_AND_OPPONENT_TAG_NAMES.map((tagName) => `player:${tagName}`),
  ...PLAYER_AND_OPPONENT_TAG_NAMES.map((tagName) => `opponent:${tagName}`),
  ...GAME_TAG_NAMES.map((tagName) => `game:${tagName}`),
];

export const concatExampleTags = (tags) => {
  const tagsSet = new Set(tags);
  return tags.concat(
    EXAMPLE_TAGS.filter((exampleTag) => !tagsSet.has(exampleTag))
  );
};
