"use strict";

var chatList = document.querySelector('.chat-list');
var newChatForm = document.querySelector('.new-chat');
var updateNameForm = document.querySelector('.new-name');
var updateMssg = document.querySelector('.update-mssg');
var rooms = document.querySelector('.chat-rooms'); //add new Chat

newChatForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var message = newChatForm.message.value.trim();
  chatroom.addChat(message).then(function () {
    return newChatForm.reset();
  })["catch"](function (err) {
    return console.log(err);
  });
});
updateNameForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var name = updateNameForm.name.value.trim();
  chatroom.updateName(name);
  updateNameForm.reset(); //show then hide updatemsssg

  updateMssg.innerText = "Your name was updated to ".concat(name);
  setTimeout(function () {
    return updateMssg.innerText = '';
  }, 3000);
}); //update chat room

rooms.addEventListener('click', function (e) {
  var lastBtn = e.target;
  buttons = Array.from(rooms.querySelectorAll('.btn'));
  buttons.forEach(function (button) {
    button.classList.remove('active');

    if (button === e.target) {
      button.classList.add('active');
    }
  });
  e.target.classList.add('active');

  if (e.target.tagName === 'BUTTON') {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(function (chat) {
      return chatUI.render(chat);
    });
  }
}); //check localStorage for a name

var username = localStorage.username ? localStorage.username : 'anon'; //class instances

var chatUI = new ChatUI(chatList);
var chatroom = new Chatroom('general', username); //get the chats and render

chatroom.getChats(function (data) {
  return chatUI.render(data);
});
