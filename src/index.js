import Artyom from "artyom.js";
const Galadriel = new Artyom();

var ai = new Vue({
    el:'#ai',
    data:{
        message: 'Hello'
    }
});

function say(phrase){
    Galadriel.say(phrase);
    ai.message = phrase;
}

say("Hello, I am Galadriel");