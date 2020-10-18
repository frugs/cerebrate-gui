export const AsyncUtils = {
  sleep: async (ms) => await new Promise((resolve) => setTimeout(resolve, ms)),
};
