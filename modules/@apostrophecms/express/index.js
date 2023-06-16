module.exports = {
  options: {
    session: {
      // Set a real secret!
      secret: process.env.APP_SESSION_SECRET || 'dev'
    }
  }
};
