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
      replayFileName: null,
      selectedTags: ["game:fake_tag"],
      notes: "Some fake notes",
      force: false,
    })
  );
};

const submitTaggedReplayDebugFunc = async (...args) => {
  debugFunc(args);

  if (args.length < 1) {
    return;
  }

  const { replayId } = args[0];

  await sleep(500);

  Guy.onReplayUpdatedListeners.forEach((listener) =>
      listener.onReplayUpdated({ success: true, replayId: replayId })
  );
};

const Guy = {
  selectReplay: (...args) =>
    // eslint-disable-next-line no-restricted-globals
    ((self && self.selectReplay) || selectReplayDebugFunc)(...args),
  submitTaggedReplay: (...args) =>
    // eslint-disable-next-line no-restricted-globals
    ((self && self.submitTaggedReplay) || submitTaggedReplayDebugFunc)(...args),

  onReplayLoadedListeners: [],
  onReplayUpdatedListeners: [],
};

// eslint-disable-next-line no-restricted-globals
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
