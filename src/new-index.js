// alexa-cookbook sample code

// There are three sections, Text Strings, Skill Code, and Helper Function(s).
// You can copy and paste the entire file contents as the code for a new Lambda function,
//  or copy & paste section #3, the helper function, to the bottom of your existing Lambda code.


// 1. Text strings =====================================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function

var config = {};
config.IOT_BROKER_ENDPOINT      = "a4xbd0ynwllyo.iot.us-east-1.amazonaws.com";  // also called the REST API endpoint
config.IOT_BROKER_REGION        = "us-east-1";  // eu-west-1 corresponds to the Ireland Region.  Use us-east-1 for the N. Virginia region
config.IOT_THING_NAME           = "baymax";

var SkillMessagesUS = {
    'welcome'       :'welcome.  you can say things like, go to london or go to berlin',
    'cityresponse'  :'you asked for',
    'help'          :'you can say things like, go to london or go to berlin',
    'cancel'        :'goodbye',
    'stop'          :'goodbye'
};

var SkillMessagesDE = {
    'welcome'       :'hallo.  sagen so was, reisen nach london oder reisen nach berlin',
    'cityresponse'  :'sie haben gefragt',
    'help'          :'sagen so was, reisen nach london oder reisen nach berlin',
    'cancel'        :'auf wiedersehen',
    'stop'          :'auf wiedersehen'
};

// 2. Skill Code =======================================================================================================


var Alexa = require('alexa-sdk');
var SkillMessages = {};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

    // alexa.appId = 'amzn1.echo-sdk-ams.app.1234';
    // alexa.dynamoDBTableName = 'YourTableName'; // creates new table for session.attributes

    var locale = event.request.locale;
    console.log('locale is set to ' + locale);

    switch(locale) {
        case 'de-DE':
            SkillMessages = SkillMessagesDE;
            break;
        default:
            SkillMessages = SkillMessagesUS;
            break;
    }

    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('MyIntent');
    },

    'MyIntent': function () {
        this.emit(':ask', SkillMessages.welcome, 'try again');

    },

    'CityIntent': function () {

        var myCity = this.event.request.intent.slots.city.value;


        if (myCity === null) { // no slot
            say = SkillMessages.help;
        } else {

            say =  SkillMessages.cityresponse + ' ' + myCity;
        }

        newState = {'city':myCity};

        updateShadow(newState, status => {

            this.emit(':ask', say, say);

        });

    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', SkillMessages.help, SkillMessages.help);

    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', SkillMessages.stop, SkillMessages.stop);

    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', SkillMessages.cancel, SkillMessages.cancel);

    },

};

//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================


function updateShadow(desiredState, callback) {
    console.log("In update shadow method");
    // update AWS IOT thing shadow
    var AWS = require('aws-sdk');
    AWS.config.region = config.IOT_BROKER_REGION;

    //Prepare the parameters of the update call

    var paramsUpdate = {
        "thingName" : config.IOT_THING_NAME,
        "payload" : JSON.stringify(
            { "state":
                { "desired": desiredState             // {"pump":1}
                }
            }
        )
    };
    console.log("ParamsUpdate values: "+JSON.stringify(paramsUpdate));
    var iotData = new AWS.IotData({endpoint: config.IOT_BROKER_ENDPOINT});

    iotData.updateThingShadow(paramsUpdate, function(err, data)  {
         console.log("Update thing shadow data");
        if (err){
            console.log("Error: "+err);
            
            callback("not ok");
        }
        else {
            console.log("updated thing shadow " + config.IOT_THING_NAME + ' to state ' + paramsUpdate.payload);
            callback("ok");
        }

    });




}
