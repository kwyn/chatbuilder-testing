var logger = require('koa-logger');
var serve = require('koa-static');
var parse = require('co-busboy');
var koa = require('koa');
var fs = require('fs');
var app = koa();
var route = require('koa-route');

app.use(logger());

app.use(serve(__dirname + '/public'));

app.use(route.get('/', function *() {
    this.body = 'Chatbuilder API on Koa';
}));

app.use(route.post('/', upload));

app.on('error', function(err, ctx){
  log.error('server error', err, ctx);
});

app.listen(3000);
console.log('Koa server listening on port 3000');

function *upload(next){
  // ignore non-POSTs
  if ('POST' != this.method) return yield next;

  // multipart upload
  var parts = parse(this);
  var part;

  while (part = yield parts) {
    var stream = fs.createWriteStream('/' + Math.random());
    part.pipe(stream);
    console.log('uploading %s -> %s', part.filename, stream.path);
  }
  // yield next;
  // testChatbuilder();
}