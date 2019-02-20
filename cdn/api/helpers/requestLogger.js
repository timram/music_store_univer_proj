const morgan = require('morgan');

function removeFields(data) {
  const fields = ['password', 'nonce', 'image'];
  Object.keys(data).forEach((field) => {
    if (fields.indexOf(field) >= 0) {
      data[field] = '****';
    }
  });

  return data;
}

morgan.token('body', (req) => {
  if (req.body) {
    const d = removeFields(req.body);
    return JSON.stringify(d);
  }

  return null;
});

morgan.token('accountID', req => req.accountID || '-');


const logFormat = '{'
+ '"type": "requestLog",'
+ '"date": ":date[iso]",'
+ '"ip": ":remote-addr",'
+ '"url" :":url",'
+ '"method": ":method",'
+ '"body": ":body",'
+ '"accountID": ":accountID",'
+ '"status": ":status",'
+ '"contentLength": ":res[content-length]",'
+ '"referer": ":referrer",'
+ '"userAgent": ":user-agent",'
+ '"responseTime": ":response-time ms"'
+ '}';

module.exports = morgan(logFormat, {
  stream: {
    write(log) {
      console.log(log);
    }
  },
  skip(req) {
    return req.baseUrl === '/ping' || req.baseUrl === '/favicon.ico';
  }
});
