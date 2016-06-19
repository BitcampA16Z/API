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

var store = new Store('show commits',[GitHub],function(stre){
  console.log(stre.pullResponse());
});
