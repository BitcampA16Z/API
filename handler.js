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
  constructor(intent){
    super();
    this.intent = intent;
    this.template = this.template();
    this.on('data',this.dataHandler);
    this.on('success',this.successFunction);
    this.on('error',this.failureFunction);
  }

  dataHandler(data){
    this.templateParser(data);
  }

  successFunction(successObject){
    console.log(successObject)
  }

  failureFunction(failureObject){
    console.log(failureObject)
  }

  emitSuccess(){
    this.emit('success',{
      state:'success',
      intent:this.intent
    });
  }

  emitFailure(){
    this.emit('error',{
      state:'error',
      intent:this.intent
    })
  }

  templateParser(data){
    data = data.split(" ");
    for(var i of this.template){
      i = i.split(" ");
      for(var x in i){
        if(i[x]!=data[x])
          break;
        if(x == i.length-1){
          this.emitSuccess();
          return;
        }
      }

    }
    this.emitFailure();
  }

  template(){
    return [
      'template plz',
      'template',
    ]
  }
}
