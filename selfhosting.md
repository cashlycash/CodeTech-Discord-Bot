# Self hosting the bot
In order to self host the bot you need to follow the following steps after you have cloned the repo and installed all dependencies using `npm i` or `npm install`
## config.json
You want to copy `template.config.json` onto `config.json` and modify each field accordingly. I have put in information about each field in their values section.
## .env
You want to copy `template.env` onto `.env` and modify the token there. Not needed if you are using a hosting which has environment variables. If you are going with a `.env` file then you need to make sure to keep the github repo private.
## Hosting
I say use replit, heroku (about to die), or any host which allows nodejs web applications. I personally use render.com for it
## Private Commands (Only admins)
### !verifypanel
This will make a verification portal
### !tktpanel
This will make a ticket portal
### !rr
This will make button self roles (reaction roles)
### !ping
This will tell the ping of the bot
### !brr <time> <mentions>
This is a command which when used, should be used along some player mentions and a time for example `!brr 2m @Sypher @Bablucopter @Aryan`. This command will choose one random user mention and timeout it for whatever time you have mentioned like as in example I did "2m" which means "2 minutes".
### !steal \<emoji\> \<name\>
This will allow you to steal emojis from different servers (better discord links work as well)
### !eval \`\`\`js \<code\> \`\`\`
This will allow you to complile any nodejs code direct from the bot (message variables will work as well)