# Self hosting the bot
In order to self host the bot you need to follow the following steps after you have cloned the repo and installed all dependencies using `npm i` or `npm install`
## config.json
You want to copy `template.config.json` onto `config.json` and modify each field accordingly. I have put in information about each field in their values section.
## .env
You want to copy `template.env` onto `.env` and modify the token there. Not needed if you are using a hosting which has environment variables. If you are going with a `.env` file then you need to make sure to keep the github repo private.
## Hosting
I say use replit, heroku (about to die), or any host which allows nodejs web applications. I personally use render.com for it
## Private Commands (Only admins)
### !debugpanel
This will open a debug panel which will allow you to fix the bot if it is not working properly
### !verifypanel
This will make a verification portal
### !tktpanel
This will make a ticket portal
### !rrp
This will start a button self roles (reaction roles) input portal
### !rr <portal title> <role id> <role id> <role id> .... (upto 25 roles)
This will start a button self roles (reaction roles) input portal
### !ping
This will tell the network latency of the bot
### !roulette <mute duration> <mentioned member> <mentioned member> <mentioned member> .... (infinitely many members)
This is a command which when used, should be used along some player mentions and a time for example `!brr 2m @Sypher @Bablucopter @Aryan`. This command will choose one random user mention and timeout it for whatever time you have mentioned like as in example I did "2m" which means "2 minutes".
### !steal <emoji> <name>
This will allow you to steal emojis from different servers (better discord links work as well)
### !eval \`\`\`js \<code\> \`\`\`
This will allow you to complile any nodejs code direct from the bot (message variables will work as well)