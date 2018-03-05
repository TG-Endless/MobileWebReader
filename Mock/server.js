/*
开放端口80；
定义模板引擎为jade，且jade存放路径为jade，如上述代码的res.render(index)，则在jade文件夹之下由index.jade文件，
否则系统将跑出异常。express默认使用jade模板，可以配置让其支持使用ejs或html模板。
定义静态文件的路径为static，如static下存在文件index3.html，
则通过http://localhost:18080/index3.html可以访问到该文件。
通过app.get()定义了两个url解析规则，index.html、index2.html。
*/

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var ejs = require('ejs');  //引入的ejs插件, 支持HTML

var app = express();

// all environments
app.set('port', 80);
//app.set('views', path.join(__dirname, 'jade'));
//app.set('view engine', 'jade');
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.use(favicon(path.join(__dirname, 'static/favicon.ico')));
app.use(methodOverride());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'static')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.get("/index.html", function(req, res){
    res.render("index");
});
app.get("/index2.html", function(req, res){
    res.send("Hello index2");
    res.end();
});


app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});