const grpc = require('grpc');
const calculatorProto = grpc.load('calculator.proto');
const controllerServer = new grpc.Server();

controllerServer.addService(calculatorProto.CalculatorService.service, {
  Sum: (call, callback) => {
    const { num1, num2 } = call.request;
    
    // Envie a solicitação para o servidor de soma
    const sumServiceClient = new calculatorProto.CalculatorService('127.0.0.1:50051', grpc.credentials.createInsecure());

    sumServiceClient.Sum({ num1, num2 }, (err, response) => {
      if (!err) {
        callback(null, response);
      } else {
        console.error(err);
        callback(err);
      }
    });
  },
  Subtract: (call, callback) => {
    const { num1, num2 } = call.request;
    
    // Envie a solicitação para o servidor de subtração
    const subtractServiceClient = new calculatorProto.CalculatorService('127.0.0.1:50053', grpc.credentials.createInsecure());

    subtractServiceClient.Subtract({ num1, num2 }, (err, response) => {
      if (!err) {
        callback(null, response);
      } else {
        console.error(err);
        callback(err);
      }
    });
  },
  Divide: (call, callback) => {
    const { num1, num2 } = call.request;
    
    // Envie a solicitação para o servidor de divisão
    const divideServiceClient = new calculatorProto.CalculatorService('127.0.0.1:50054', grpc.credentials.createInsecure());

    divideServiceClient.Divide({ num1, num2 }, (err, response) => {
      if (!err) {
        callback(null, response);
      } else {
        console.error(err);
        callback(err);
      }
    });
  },
  Multiply: (call, callback) => {
    const { num1, num2 } = call.request;
    
    // Envie a solicitação para o servidor de multiplicação
    const multiplyServiceClient = new calculatorProto.CalculatorService('127.0.0.1:50055', grpc.credentials.createInsecure());

    multiplyServiceClient.Multiply({ num1, num2 }, (err, response) => {
      if (!err) {
        callback(null, response);
      } else {
        console.error(err);
        callback(err);
      }
    });
  },
});

controllerServer.bind('127.0.0.1:50052', grpc.ServerCredentials.createInsecure());
console.log('Controller Server running at http://127.0.0.1:50052');
controllerServer.start();
