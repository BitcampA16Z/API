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

class Default extends Handler {
  constructor(){
    super('fallback');
  }
  //this may seem weird but im creating a default handler so that if all else fails, this failureFunction would dispatch an error api message to the siri app
  //which would allow the user to try again
  failureFunction(){
    console.log("I don't know")
  }

  template(){
    return [];
  }
}
//the default handler always goes last
var stor = new Store([new Handler('default'),new GitHub(),new Default()]);
stor.emit('data','please show me songs')
