import { Intent } from "@blueprintjs/core";

const TAG_PREFIXES = ["player", "opponent", "game"];

const PREFIX_DELEMITER = ":";

const TAG_INTENTS = [Intent.SUCCESS, Intent.DANGER, Intent.PRIMARY];

const TagUtils = {
  extractPrefix(tag) {
    for (const prefix of TAG_PREFIXES) {
      if (tag.indexOf(prefix) === 0) {
        return prefix;
      }
    }

    return null;
  },

  removePrefix(tag) {
    for (const prefix of TAG_PREFIXES) {
      if (tag.indexOf(prefix) !== 0) {
        continue;
      }

      return tag.slice(prefix.length + PREFIX_DELEMITER.length);
    }
  },

  getTagIntent(tag) {
    for (let i = 0; i < TAG_PREFIXES.length && TAG_INTENTS.length; i++) {
      if (tag.indexOf(TAG_PREFIXES[i]) === 0) {
        return TAG_INTENTS[i];
      }
    }

    return null;
  },
};

export default TagUtils;
