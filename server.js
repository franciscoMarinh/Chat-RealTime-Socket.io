const express = require('express');
const path = require('path');
const consign = require('consign');
const app = express();
const server = require('http').createServer(app); //Define protocolo HTTP
const io = require('socket.io')(server); // "require('socket.io')" chama uma função que ja passa por parametro o procotolo http
//Protocolo http e webSocket configurados

app.use(express.static(path.join(__dirname, 'public'))); //express static pra fornecer os arquivos css e etc para a index
app.set('views', path.join(__dirname , "public"));
app.engine('html', require('ejs').renderFile); //engine 'html' para usar a index.html como padrão e não a .ejs
app.set('view engine','html'); //Define Html como a view padrão

consign().include('routes').into(app,io);

server.listen(3000); //Inicializa com a variavel server
