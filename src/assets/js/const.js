let SERVER_URL = '';
let AID = '';
let SECRET = '';
switch (process.env.VUE_APP_ENV) {
  case 'development':
    AID = 'cd0eb5fe824fcd022f10e32dc4be84d30f1544a7';
    SECRET = 'dfb35126be854167';
    SERVER_URL = '/lg-api';
    break;
  case 'testing':
    AID = 'cd0eb5fe824fcd022f10e32dc4be84d30f1544a7';
    SECRET = 'dfb35126be854167';
    SERVER_URL = 'https://test-microservice.log56.com/luge/gateway.do';
    break;
  case 'prepublish':
    AID = 'f5ff411a44be8ff63fad32e4340ef38be94fa37b';
    SECRET = 'f028f4f6115a4ad8';
    SERVER_URL = 'https://pre-inner-ms.log56.com/luge/gateway.do';
    break;
  case 'production':
    AID = 'b793e65179ed9da6b4d3575ea697221ac72c8ea3';
    SECRET = '09e78e4236534ef4';
    SERVER_URL = 'https://syf.log56.com/luge/gateway.do';
    break;
  case 'libBuilding':
    AID = 'cd0eb5fe824fcd022f10e32dc4be84d30f1544a7';
    SECRET = 'dfb35126be854167';
    SERVER_URL = 'https://test-microservice.log56.com/luge/gateway.do';
    break;
  default:
    AID = 'b793e65179ed9da6b4d3575ea697221ac72c8ea3';
    SECRET = '09e78e4236534ef4';
    SERVER_URL = 'https://syf.log56.com/luge/gateway.do';
    break;
}

export { AID, SECRET, SERVER_URL };
