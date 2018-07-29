import Artyom from "artyom.js";
import { VueTyper } from 'vue-typer';

const Galadriel = new Artyom();

var ai = new Vue({
    el:'#ai',
    data:{
        message: ['Hellooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'],
        show:true
    },
    components: {
        // ES6; property shorthand + Vue should automatically dasherize the key for us
        VueTyper
    }
});


function say(phrase,lastphrase=""){
    if (lastphrase==="")
        ai.message=lastphrase;
    console.log(phrase);
    Galadriel.say(phrase,{ 
        onEnd:()=>{
            Galadriel.ArtyomWebkitSpeechRecognition.abort();
        }
    });
    ai.message+= phrase;
}

function displayData(data, i){
    if ( i < data.definitions.length){
        if (i==-1){
            Galadriel.say(data.word.charAt(0).toUpperCase()+data.word.slice(1),{
                onStart: () => {
                    console.log("Reading ...");
                },
                onEnd: () => {
                    console.log("Finish");
                    Galadriel.ArtyomWebkitSpeechRecognition.abort();
                    setTimeout(displayData,1000,data,i+1);
                }
            });
            ai.message= data.word.charAt(0).toUpperCase()+data.word.slice(1);
        }
        else{
            var sentence = (i+1)+". "+data.definitions[i].definition.charAt(0).toUpperCase()+data.definitions[i].definition.slice(1);
            Galadriel.say(sentence,{
                onStart: () => {
                    console.log("Reading ...");
                },
                onEnd: () => {
                    console.log("Finish");
                    Galadriel.ArtyomWebkitSpeechRecognition.abort();
                    setTimeout(displayData,1000,data,i+1);
                }
            });
            ai.message= sentence;
        }
        
    }
}

function findDef(keyWord){
    return new Promise((resolve, reject) => {
        var returnMessage="";
        $.get( "/search", { name: keyWord })
        .done(function( data ){
            console.log(data);
            if (data==="Bad response from server!"){
                reject("Sorry, we cannot find this words");
            }
            else{
                resolve(data);
            }       
        });
    });  
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
            say("Searching for the word..");
            findDef(wildcard).then((data)=>{
                displayData(data,0);
            });
        }
    },
    {
        indexes: ['Shut down','Bye','Goodbye','Go away'],
        action: (i,wildcard) => {
            say("Goodbye, master");
            Galadriel.fatality().then(() => {
                console.log("Galadriel succesfully stopped");
            }).catch((error)=>{say(error)});
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
