'use strict';

const EventEmitter = require('events');

module.exports.Store = class Store extends EventEmitter {
  constructor(handlers){
    super();
    this.on('data',(data,cb) => {
      for(var i of handlers){
        i.cb = cb;
        i.emit('data',data);
      }
    });
  }

}

module.exports.Handler = class Handler extends EventEmitter {
  constructor(intent){
    super();
    this.intent = intent;
    this.params = {};
    this.template = this.template();
    this.on('data',this.dataHandler);
    this.on('success',this.successFunction);
    this.on('error',this.failureFunction);
  }

  dataHandler(data){
    this.templateParser(data);
  }

  successFunction(successObject){
    this.respond(successObject,this.cb);
  }

  failureFunction(failureObject){
    this.cb(failureObject)
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
        if(i[x].includes('}}')){
          var varname = i[x].match("\{{([^}]*)\}}");
          var left = i[x-1];
          var right = i[x+1];
          var sliced = data.slice(data.indexOf(left)+1,data.indexOf(right)-1)
          this.params[varname[1]] = sliced.join(" ");
        }
        else if(i[x]!=data[x])
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
