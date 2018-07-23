import Artyom from "artyom.js";
const Galadriel = new Artyom();

var ai = new Vue({
    el:'#ai',
    data:{
        message: 'Hello'
    }
});

function say(phrase){
    console.log(phrase);
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
        indexes: ['Galadriel','Are you there'],
        action: (i) => {
            say("I am here, master");        
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

Galadriel.initialize({
    lang: "en-GB", // GreatBritain english
    continuous: true, // Listen forever
    soundex: true,// Use the soundex algorithm to increase accuracy
    debug: true, // Show messages in the console
    executionKeyword: "and do it now",
    listen: true, // Start to listen commands !
}).then(() => {
    console.log("Artyom has been succesfully initialized");
}).catch((err) => {
    console.error("Artyom couldn't be initialized: ", err);
});