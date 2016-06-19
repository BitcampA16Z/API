const EventEmitter = require('events');

module.exports.Store = class Store extends EventEmitter {
  constructor(handlers){
    super();
    this.on('data',(data) => {
      for(var i of handlers){
        i.emit('data',data);
      }
    });
  }

}

module.exports.Handler = class Handler extends EventEmitter {
  constructor(){
    super();
    this.template = this.template();
    this.on('data',this.dataHandler);
  }

  dataHandler(data){
    console.log(this.templateParser(data));
  }

  templateParser(data){
    data = data.split(" ");
    for(var i of this.template){
      i = i.split(" ");
      for(var x in i){
        if(i[x]!=data[x])
          break;
        if(x == i.length-1)
          return true;
      }

    }
    return false;
  }

  template(){
    return [
      'show commits',
      'please show me commits'
    ]
  }
}
