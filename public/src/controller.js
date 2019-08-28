class chatController{

    constructor(){

        this.submitButtonEl = document.querySelector('[type="submit"]');
        this.submitButtonEvents();
        this.socket = io('http://localhost:3000/'); //Conecta a função io passando a Url em que ele vai requisitar do lado do servidor para conectar
        this.chatDivEl = document.querySelector('.messages');
        this.socketsEvents();
    }
    submitButtonEvents(){

        this.submitButtonEl.addEventListener('click', event=>{
            
            this.sendMessage(event).then( ()=>{

                

            }).catch( ()=>{

                console.log('catch');

            });
            this.submitButtonEl.disable = false;
        });


    }//end submitButtonEvents
    sendMessage(event){

        return new Promise((resolve,reject)=>{

            event.preventDefault();

            this.submitButtonEl.disable = true; //desabilita o botão

            let name = document.querySelector('[name="nickname"]').value;
            let messageEl = document.querySelector('[name="message"]');
            let message = messageEl.value;

            if(name.length > 0 && message.length > 0){

                let obj = {

                    user:name,
                    message:message

                };
                this.renderMessage(obj);
                this.socket.emit('sendMessage', obj);//Chama a função sendMessage la no back-end;

                resolve();
            }else{

                reject();

            }
            
            messageEl.value = '';
        });
    }//end sendMessage
    renderMessage(obj){

        let div = `<div class="message"><strong>${obj.user}<\strong>: ${obj.message}<\div>`;

        this.chatDivEl.innerHTML += div;

    }
    socketsEvents(){

        this.socket.on('recivedMessage', event =>{

            this.renderMessage(event);

        });

        this.socket.on('previousMessenge', messages=>{

            messages.forEach( object => {
                
                this.renderMessage(object);

            });

        });

    }

}