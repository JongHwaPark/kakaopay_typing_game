const storeInitData = {
  index:0,
  words:[],
  title:"",
  time:0,
  grade:0,
  average:0
};


class store{
  constructor(){
    for(const key in storeInitData){
      this[key] = storeInitData[key];
    }
  }

  reset(){
    for(const key in storeInitData){
      this[key] = storeInitData[key];
    }
  }
}

export default new store();
