const Store = require('../handler').Store;
const Handler = require('../handler').Handler;


class GitHub extends Handler {
  constructor(){
    super('github');
  }

  template(){
    return [
      'show github commits',
      'show history',
      'please show me commits'
    ]
  }
}

//the default handler always goes last
var stor = new Store([new Handler('default'),new GitHub()]);
stor.emit('data','please show me songs')
