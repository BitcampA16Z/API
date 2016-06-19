const Store = require('../handler').Store;
const Handler = require('../handler').Handler;

var stor = new Store([new Handler(),]);
stor.emit('data','please show me commits')
