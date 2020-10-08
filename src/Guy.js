const debugFunc = (...args) => console.log(args);

const Guy = {
  // eslint-disable-next-line no-restricted-globals
  submitTaggedReplay: (...args) => ((self && self.test) || debugFunc)(...args),
};

export default Guy;
