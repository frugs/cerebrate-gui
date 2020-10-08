const debugFunc = (...args) => console.log(args);

const Guy = {
  // eslint-disable-next-line no-restricted-globals
  submitTaggedReplay: (...args) => ((self && self.submitTaggedReplay) || debugFunc)(...args),
};

export default Guy;
