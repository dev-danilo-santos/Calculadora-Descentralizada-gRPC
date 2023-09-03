const grpc = require('grpc');
const calculatorProto = grpc.load('calculator.proto');

const client = new calculatorProto.CalculatorService('127.0.0.1:50052', grpc.credentials.createInsecure());

const num1 = 10;
const num2 = 5;

client.Sum({ num1, num2 }, (err, response) => {
  if (!err) {
    console.log(`Resultado: ${response.result}`);
  } else {
    console.error(err);
  }
});

client.Subtract({num1,num2}, (err, response) => {
    if(!err) {
        console.log(`Resultado: ${response.result}`);

    }
    else {
        console.error(err)
    }
});


