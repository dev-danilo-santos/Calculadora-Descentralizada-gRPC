const grpc = require('grpc');
const calculatorProto = grpc.load('calculator.proto');
const server = new grpc.Server();

server.addService(calculatorProto.CalculatorService.service, {
  Divide: (call, callback) => {
    const { num1, num2 } = call.request;
    if (num2 === 0) {
      callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: 'Cannot divide by zero',
      });
      return;
    }
    const result = num1 / num2;
    callback(null, { result });
  },
});

server.bind('127.0.0.1:50054', grpc.ServerCredentials.createInsecure());
console.log('Divide Server running at http://127.0.0.1:50054');
server.start();
