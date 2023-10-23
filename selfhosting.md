# Self hosting the bot
In order to self host the bot you need to follow the following steps after you have cloned the repo 
## config.json
You want to copy `template.config.json` onto `config.json` and modify each field accordingly. I have put in information about each field in their values section.
## .env
You want to copy `template.env` onto `.env` and modify the token there. Not needed if you are using a hosting which has support for environment variables. If you are going with a `.env` file then you need to make sure to keep the github repo private.
## Hosting
I suggest you to use replit or render paired with uptimerobot to host it for free but you can also self host it at your expense or use a different hosting service. It is recommended to use a hosting service which has environment variables so that you don't have to use a `.env` file. You can also use your own computer to host the bot but it is not recommended as the bot will shutdown when you turn off your computer.
## Installing dependencies
You need to install the dependencies by running `npm install` in the terminal. If you are using replit then you can just press the run button and it will automatically install the dependencies for you, so will render every time you push a new commit.
## Starting the bot
To start the bot you need to run `node .` or `node index.js` in the terminal. If you are using replit then you can just press the run button. If you are using render.com then it will automatically start the bot for you every time you push a new commit.
## Commands (Replace `!` with you prefix if it was changed)
### !help
This will show you all the commands of the bot and can be used by anyone in the server. You can also use `!help <command name>` to get more information about a specific command
### !debugpanel
This will open a debug panel which will allow you to run some preset developer command on the bot if it is not working properly. It can also be used to get some information about the bot.
### !verifypanel
This will make a portal with a button which will allow users to verify themselves in the server
### !tktpanel
This will make a ticket portal
### !rrp
This will start a button self roles (reaction roles) input portal
### !rr <portal title> <role id> <role id> <role id> .... (upto 25 roles)
This will launch a button self role panel with the roles you have mentioned. Clicking on the button will give the user the role, clicking on the button again will remove the role from the user.
### !ping
This will send an embed to showcase the network latency of the bot
### !roulette <mute duration> <mentioned member> <mentioned member> <mentioned member> .... (infinitely many members)
This is a fun command which will mute a random member for the duration you have mentioned. Duration can be in seconds, minutes, hours, days, weeks, months, years (eg: 1s, 1m, 1h, 1d, 1w, 1mo, 1y). 
### !steal <emoji> <name>
This will allow you to steal emojis from different servers (better discord links work as well)
### !eval \`\`\`js \<code\> \`\`\`
This will allow you to complile any nodejs code direct from the bot (message variables will work as well)