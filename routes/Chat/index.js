module.exports = {
  path: 'chat',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/ChatApp.jsx'))
    })
  }
}
