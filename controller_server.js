const grpc = require('grpc');
const calculatorProto = grpc.load('calculator.proto');
const controllerServer = new grpc.Server();

controllerServer.addService(calculatorProto.SumService.service, {
  Sum: (call, callback) => {
    const { num1, num2 } = call.request;
    
    // Envie a solicitação para o servidor de soma
    const sumServiceClient = new calculatorProto.SumService('127.0.0.1:50051', grpc.credentials.createInsecure());

    sumServiceClient.Sum({ num1, num2 }, (err, response) => {
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
