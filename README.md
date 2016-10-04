# Pitt CS people GroupMe Bot

This is a library of bots used in GroupMe, written in NodeJS, and hosted on heroku.

Note: the reason there are so many commits is because commits are required to update heroku and Pitt's wifi won't allow local hosting for testing.

Link to Groupme's Bot Api: https://dev.groupme.com/tutorials/bots

Cool Guy
--------

Made by: GroupMe

Prints an emoticon to chat when "/cool guy" is typed


Gif Bot
-------

Made by: [Dom](https://github.com/domtheporcupine)

Implements the Giphy API to post a gif when "/gif <search>" is typed


Def Bot
-------

Made by: [Alex](https://github.com/AKD40)

Implements the Urban Dictionary API to post the definition of a word when "/define <word>" is typed

These bots all respond to one callback server.
index.js recieves the post, which then uses bot.js to decode the request and call one of the three bots to respond. The bots can then be linked up to three different bot accounts or to one using heroku environment variables.
