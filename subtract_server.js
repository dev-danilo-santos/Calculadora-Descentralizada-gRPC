const grpc = require('grpc');
const calculatorProto = grpc.load('calculator.proto');
const server = new grpc.Server();

server.addService(calculatorProto.CalculatorService.service, {
  Subtract: (call, callback) => {
    const { num1, num2 } = call.request;
    const result = num1 - num2;
    callback(null, { result });
  },
});

server.bind('127.0.0.1:50053', grpc.ServerCredentials.createInsecure());
console.log('Subtract Server running at http://127.0.0.1:50053');
server.start();
