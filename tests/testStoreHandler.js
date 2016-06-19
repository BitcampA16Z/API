const Store = require('../handler').Store;
const Handler = require('../handler').Handler;


class GitHub extends Handler {
  constructor(){
    super('github');
  }

  respond(suc){
    return [this.params,suc]
  }

  template(){
    return [
      'show github commits from {{repo}} on branch {{branch}}',
      'show history',
      'please show me commits'
    ]
  }
}

//the default handler always goes last
var stor = new Store([new Handler('default'),new GitHub()]);
stor.emit('data','show github commits from wow on branch wowzer',(success)=>{
  console.log(success,"this is the store success object")
})
