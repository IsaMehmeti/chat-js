const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const updateNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

//add new Chat
newChatForm.addEventListener('submit', e =>{
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});

updateNameForm.addEventListener('submit', e =>{
    e.preventDefault();
    const name = updateNameForm.name.value.trim();   
    chatroom.updateName(name)
    updateNameForm.reset();
    
    //show then hide updatemsssg
    updateMssg.innerText = `Your name was updated to ${name}` 
    setTimeout(() => updateMssg.innerText = '', 3000)
});

//update chat room
rooms.addEventListener('click', e => {
    const lastBtn = e.target;
    buttons = Array.from(rooms.querySelectorAll('.btn'));
    buttons.forEach( button => {
        button.classList.remove('active');
        if(button === e.target){
            button.classList.add('active');
        }
    })

    e.target.classList.add('active')
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
        
    }
    
})

//check localStorage for a name
 const username = localStorage.username ? localStorage.username : 'anon';

//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username)

//get the chats and render
chatroom.getChats(data => chatUI.render(data));

