var createError = require('http-errors');
var session = require('express-session');
var flash = require('express-flash');
var express = require('express');
var logger = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./database');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:'123@123abc',
    resave:false,
    saveUninitialized: true,
    cookie:{maxAge:60000}
}));
app.use(flash());
app.get('/', function (req, res, next) {
    res.render('index', {title: 'User form'})
});
app.post('/user_form', function (req, res, next) {
    var name = req.body.name
    var autor = req.body.autor
    var qtd_pag = req.body.qtd_pag
    var sql = `INSERT INTO livros (nome, autor, qtd_pag) VALUES ("${name}", "${autor}", "${qtd_pag}")`
    db.query(sql, function (err, result) {
        if(err)throw err
        console.log('Registro atualizado')
        req.flash('success', 'Dado armazenado')
        res.redirect('/')
    })
})
app.use(function (err, req, res, next) {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err: {}
    res.status(err.status || 500)
    res.render('error')
})
app.listen(5555, function(){
    console.log('Servidor rodando em http://localhost:5555')
})
module.exports = app