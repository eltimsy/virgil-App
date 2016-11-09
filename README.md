#VIRGIL Client
VIRGIL comes in two parts this is the client side using react-native to be used with android phones.

Link to Server: https://github.com/micahsmith/virgil

##VIRGIL is the Restaurant Guide In Limbo
A mobile app created to provide a convenient way to decide on restaurants with friends.  

How does it work?

An user downloads the app and creates an account.  He can than start interacting with the bot to create a simple survey that includes 5 choices of food categories.  The user than creates a group of friends using his contacts on his phone or by adding non-existent numbers. Next the survey is sent to all the group members via SMS message.  After all the members reply the survey creator is notified and given 2 restaurants based on preferences and location.

##Screenshots
![Alt text](/relative/path/to/screens/login.png?raw=true "Optional Title")

##How to install
You need to have both the Virgil server and Virgil App in order to run this app.  You will also need to install react-native and Android SDK to run and build the App on your android device or emulator.

Instructions:

-fork and clone both repositories from github  
-run npm install for both client and server.  

Server side:  
-create a postgres database and run the virgil_db_schema.sql found in ./db/schema  
-create a .env file and include the following things  

DB_USER=DB_USER  
DB_PASSWORD=DB_PASSWORD  
DB_NAME=DB_NAME  
DB_HOST=DB_HOST  
DB_PORT=DB_PORT  
DB_SSL=true  
DB_MAX=10  
JWT_SECRET=JWT_SECRET  
YELP_CONSUMER_KEY=YELP_CONSUMER_KEY  
YELP_CONSUMER_SECRET=YELP_CONSUMER_SECRET  
YELP_TOKEN=YELP_TOKEN  
YELP_TOKEN_SECRET=YELP_TOKEN_SECRET  
TWILIO_ACCOUNT_SID=TWILIO_ACCOUNT_SID  
TWILIO_AUTH_TOKEN=TWILIO_AUTH_TOKEN  
TWILIO_NUMBER=TWILIO_NUMBER  
GOOGLE_API_KEY=GOOGLE_API_KEY  

-You will need to get your own API keys for Yelp, Twilio and Google  
-in order to access twilio you need to either use ngrok with your server or deploy the server online  

Client side:  
-If a config.json does not exist create one and fill in the fields:  
{  
  "development": {  
    "host": "host_IP"  
  },  
  "test": {  
    "host": "host_IP"  
  },  
  "production": {  
    "host": "host_IP"  
  }  
}  
-run react-native run-android to build the app on your device  

##Using the app
The app begins with a login/signup page and after you login it brings you to a page to interact with a chatbot.  Type a greeting i.e. 'Hello' to begin and it will give you suggestions of what input you can type.  If you need more help you can type help to get more information.

The chat interaction is run on 5 layers broken into:

-greeting (interact with bot)  
-location (input location)  
-choose categories (input food categories and add phone numbers)  
-status (check status of votes coming from sms users)  
-results (get final results of the restaurant picked)  

In each layer you need to put some input in order to move to the next layer.  
