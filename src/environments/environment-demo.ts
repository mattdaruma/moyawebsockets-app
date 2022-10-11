export const environment = {
  production: false,
  cognito: {
    UserPoolId: 'USER POOL ID FOR COGNITO USER POOL [region]_[garble]',
    ClientId: 'CLIENTID FOR COGNITO USER POOL [garble]',
    DeviceName: 'MoYaWebAngular' //device name for cognito sessions
  },
  apiGateway: {
    domain: 'DOMAIN OF THE API GATEWAY [api id].execute-api.[region].amazonaws.com',
    stage: 'STAGE NAME OF THE API GATEWAY (dev, prod...)' 
  }
}