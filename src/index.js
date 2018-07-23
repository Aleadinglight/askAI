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

Galadriel.addCommands([
    {
        indexes: ['Hello','Hi','is someone there'],
        action: (i) => {
            say("Hello, I am Galadriel");        
        }
    },
    {
        indexes: ['Define *'],
        smart:true,
        action: (i,wildcard) => {
            say("You've said : "+ wildcard);
        }
    },
    {
        indexes: ['Stop','Bye','Goodbye','Go away'],
        action: (i,wildcard) => {
            artyom.fatality().then(() => {
                console.log("Galadriel succesfully stopped");
            });
        }
    },
]);

