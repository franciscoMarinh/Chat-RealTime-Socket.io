const nedb = require('nedb');

var db = new nedb({
    filename:"chatMessages.db",
    autoload:true
});

module.exports = (app,io)=>{

    var messages = [];

    app.use('/', (req,res)=>{ //Renderizar a index.html quando solicitado a rota padrão "/"

    res.render('index.html');

    });

    io.on('connection', socket => {

        console.log(`Socket conectado: ${socket.id}`);
        
        db.find({}, (err,data)=>{

            if(err){
                console.log(err);
            }else{
                socket.emit('previousMessenge', data);
            }
        
        });
        
        socket.on('sendMessage', data => {
            
            db.insert(data, err=>{

                if(err){
                    console.log(err);
                }

            });

            messages.push(data);
            socket.broadcast.emit('recivedMessage', data);
    
        });
    
    });

};