import chai from 'chai';

// Add Chai plugins here.
import spies from 'chai-spies';

chai.use(spies);

const should = chai.should();
const expect = chai.expect;

// A very simple single module mock processing.
// `aposModule` is the original module object (e.g. `import('modules/theme/index.js')`).
// `self` is an optional mock to be merged with the module.
function processSelf(aposModule, self = {}) {
  const _self = {
    apos: {},
    modules: [],
    ...aposModule,
    ...self,
    ...(aposModule.methods?.(aposModule) || {}),
    ...(self?.methods?.(aposModule) || {})
  };
  const methods = aposModule.methods?.(_self) || {};
  for (const [ name, fn ] of Object.entries(methods)) {
    _self[name] = fn;
  }
  _self.helpers = aposModule.helpers?.(_self) || {};

  return _self;
}

export default {
  should,
  expect,
  chai,
  processSelf
};
