import Artyom from "artyom.js";
import { VueTyper } from 'vue-typer';

const Galadriel = new Artyom();

var ai = new Vue({
    el:'#ai',
    data:{
        message: 'Hello',
        show:true
    },
    components: {
        // ES6; property shorthand + Vue should automatically dasherize the key for us
        VueTyper
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
        indexes: ['What is *'],
        smart:true,
        action: (i,wildcard) => {
            say("You've said : "+ wildcard);
        }
    },
    {
        indexes: ['Stop','Bye','Goodbye','Go away'],
        action: (i,wildcard) => {
            Galadriel.fatality().then(() => {
                console.log("Galadriel succesfully stopped");
            });
        }
    },
]);

Galadriel.ArtyomVoicesIdentifiers["en-GB"] = ["Google UK English Female", "Google UK English Male", "en-GB", "en_GB"];

Galadriel.initialize({
    lang: "en-GB", // GreatBritain english
    continuous: true, // Listen forever
    soundex: true,// Use the soundex algorithm to increase accuracy
    debug: true, // Show messages in the console
    executionKeyword: "and do it now",
    listen: true, // Start to listen commands !
}).then(() => {
    console.log("Galadriel has been succesfully initialized");
}).catch((err) => {
    console.error("Galadriel couldn't be initialized: ", err);
});
