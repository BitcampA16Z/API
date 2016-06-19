class Store {
  constructor(text, handlers,cb){
    this.text = text;
    this.handlers = [];
    for(var i in handlers){
      this.handlers.append(new handlers[i](text))
    }
    this.mainHandler = this.find();
    if(cb){
      cb(this);
    }
  }

  pullResponse(){
    return this.mainHandler.exports();
  }

  find(){
    var min = abs(handlers[0].exports().compareTo(this.text));
    var index = 0;
    for(var i in this.handlers){
      for(var f in this.handlers[i].template){
        const temp = this.handlers[i].template[f];
        if(temp.compareTo(this.text) < min){
          min = temp;
          index = i;
        }
      }
    }
    return this.handlers[i];
  }

}

var abs = Math.abs;