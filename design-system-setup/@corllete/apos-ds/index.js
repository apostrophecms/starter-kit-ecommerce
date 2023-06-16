module.exports = {
  init(self) {
    // Custom filters, used in the design system only
    self.apos.template.addFilter({
      jsonPretty(obj) {
        return JSON.stringify(obj, null, 2);
      }
    });
  }
};
