const prompt = require('prompt');
const request = require('request');

prompt.start();

function promp(){
prompt.get(['message'], function (err, result) {
  request.post('http://localhost:3000/',{form:
    {
      message:result.message
    }
  },(e,r,b) => {
    console.log(b)
    promp()
  });
});
}

promp()
