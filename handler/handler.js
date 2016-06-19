
export class Handler {
  constructor(obj){
    this.req = obj;
    this.template = this.template();
  }

  exports(){
    return this.res(this.req);
  }
}
