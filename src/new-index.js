/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
 * The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well as
 * testing instructions are located at http://amzn.to/1LzFrj6
 *
 * For additional samples, visit the Alexa Skills Kit Getting Started guide at
 * http://amzn.to/1LGWsLG
 */
'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).


var states = {
    STARTMODE: '_STARTMODE',                // Prompt the user to start or restart the game.
    ASKMODE: '_ASKMODE',                    // Alexa is asking user the questions.
    DESCRIPTIONMODE: '_DESCRIPTIONMODE'     // Alexa is describing the final choice and prompting to start again or quit
};

var academicsQuotes = ['Success is not final, failure is not fatal: it is the courage to continue that counts.', 'Failure is simply the opportunity to begin again, this time more intelligently.'];  // Array of items
var relationshipsQuotes = ['relationship quote 1', 'relationship quote 2'];
var financeQuotes = ['finance quote 1', 'finance quote 2'];
var workQuotes = ['work quote 1', 'work quote 2'];
var otherQuotes = ['other quote 1', 'other quote 2'];
// --------------- Handlers -----------------------

// Called when the session starts.
exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(newSessionHandler);
    alexa.execute();
};

var welcomeMessage = "I'm sorry to hear that. You are not alone, and it does get better. Do you want to talk about it?";
var reason = "";
var repeatWelcomeMessage = "I'm sorry I didn't understand that. Say yes so that maybe I can help you.";
var promptToStartMessage = "Are you still here?";
var helpMessage = "I will ask you some questions to identify the cause of your depression. Want to start now?";

// set state to start up and  welcome the user
var newSessionHandler = {
  'LaunchRequest': function () {
  //  this.handler.state = states.STARTMODE;
    this.emit(':ask',welcomeMessage);
  },'AMAZON.HelpIntent': function () {
   // this.handler.state = states.STARTMODE;
    this.emit(':ask', helpMessage, helpMessage);
  },
   'GetHelp': function () {
   // this.handler.state = states.STARTMODE;
    var decision= this.event.request.intent.slots.Answer.value;
       if(decision === 'yes'||decision === 'yeah'){
           this.emit(':tell', 'Ok, I am listening. Tell me a word or sentence that describes how you feel.');
       }else if(decision === 'no'||decision === 'nah'){
           this.emit(':tell', 'That\'s alright, but remember I am here if you need me. Also, you can call 9-1-1')
       }
   },
  'Academics': function () {
   // this.handler.state = states.STARTMODE;
    reason = this.event.request.intent.slots.academics_slot.value;
    welcomeMessage  = "I'm sorry to hear about your issue related to academics. However, I have a few things in mind to make you feel better. The first thing is some words that I think will inspire you.";
    welcomeMessage+=randomPhrase(academicsQuotes);
    this.emit(':ask',welcomeMessage);
   },
  'Relationships': function () {
   // this.handler.state = states.STARTMODE;
    reason = this.event.request.intent.slots.realtionships_slot.value;
    welcomeMessage  = "I'm sorry to hear about your issue related to relationships. However, I have a few things in mind to make you feel better. The first thing is some words that I think will inspire you.";
    welcomeMessage+=randomPhrase(relationshipsQuotes);
    this.emit(':ask',welcomeMessage);
   },
  'Finance': function () {
   // this.handler.state = states.STARTMODE;
    reason = this.event.request.intent.slots.finance_slot.value;
    welcomeMessage  = "I'm sorry to hear about your issue related to finance. However, I have a few things in mind to make you feel better. The first thing is some words that I think will inspire you.";
    welcomeMessage+=randomPhrase(financeQuotes);
    this.emit(':ask',welcomeMessage);
   },
  'Work': function () {
   // this.handler.state = states.STARTMODE;
    reason = this.event.request.intent.slots.work_slot.value;
    welcomeMessage  = "I'm sorry to hear about your issue related to work. However, I have a few things in mind to make you feel better. The first thing is some words that I think will inspire you.";
    welcomeMessage+=randomPhrase(workQuotes);
    this.emit(':ask',welcomeMessage);
   },
  'Other': function () {
   // this.handler.state = states.STARTMODE;
    reason = this.event.request.intent.slots.other_slot.value;
    welcomeMessage  = "I'm sorry to hear that. I do not have specific advice for your situation. However, I have a few things in mind to make you feel better. The first thing is some words that I think will inspire you.";
    welcomeMessage+=randomPhrase(otherQuotes);
    this.emit(':ask',welcomeMessage);
   },
  'Unhandled': function () {
  //  this.handler.state = states.STARTMODE;
    //this.emit(':ask', helpMessage, helpMessage);
    welcomeMessage  = "I'm sorry to hear that. I do not have specific advice for your situation. However, I have a few things in mind to make you feel better. The first thing is some words that I think will inspire you.";
    welcomeMessage+=randomPhrase(otherQuotes);
    this.emit(':ask',welcomeMessage);
    //this.emit(':ask', repeatWelcomeMessage, repeatWelcomeMessage);
   },
};

function randomPhrase(section) {
    // the argument is an array [] of words or phrases
     
    var i = 0;
    
    i = Math.floor(Math.random() *section.length);

    return(section[i]);
}




