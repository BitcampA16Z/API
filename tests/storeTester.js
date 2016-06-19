const Store = require('../handler')
const Handler = require('../handler/handler')

class GitHub extends Handler {
  constructor(text){
    super(text);
  }

  template(){
    return [
      'show commit history',
      'show commits'
    ]
  }

  res(text){
    return `This is github and you said ${text}`
  }

}

class Wow extends Handler {
  constructor(text){
    super(text);
  }

  template(){
    return [
      'play music',
      'play some music'
    ]
  }

  res(text){
    return `This is music and you said ${text}`
  }

}


var store = new Store('show commits',[GitHub,Wow],function(stre){
  console.log(stre.pullResponse());
});
