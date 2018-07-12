var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var synth = window.speechSynthesis;
var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
msg.voice = voices[10]; // Note: some voices don't support altering params
msg.voiceURI = 'native';
msg.text = "Sorry, I did not catch that!";
msg.lang = 'en-US';

msg.onend = function(e) {
    console.log('Finished in ' + event.elapsedTime + ' seconds.');
};

var talk = new Vue({
    el:'#app',
    methods:{
        startTalking: function(){
            synth.speak(msg);
            console.log();
        }
    }
});