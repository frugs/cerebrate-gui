export const DateUtils = {
  formatDate: (timestamp) => {
    let date = new Date(timestamp * 1000);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  },

  toTimestamp: (date) => Math.floor(date.getTime() / 1000),
};
