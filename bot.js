const Discord = require('discord.js'); //v11.5 needed
const client = new Discord.Client();

const STORYCH = ''; //ID of the one word story channel
const TOP = ''; //ID of first word

client.once('ready', () => {
    console.log('Ready!');
});

client.login(''); //insert your key between quotes


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });


client.on('message', msg => {
    if (msg.toString() == "!compile") //compiles first 100 messages
    {
        out = [];
        msg.guild.channels.get(STORYCH).fetchMessages( { limit: 100 }).then(words => { //grab 100 messages at a time
            for (var e of words)
            {
                out.unshift(e); //plop into the array
            }
        });
        msg.channel.send('type `!continue` to continue');
    }
    else if (msg.toString() == "!continue")
    {
        if (out[0][0] == TOP)  //check if there's more words
        {
            msg.channel.send('finished! type `!post` to read');
        }
        else
        {
            msg.guild.channels.get(STORYCH).fetchMessages( { before: out[0][0], limit: 100 }).then(words => { //grab the next 100 messages
                for (var e of words)
                {
                    out.unshift(e); //plop into the array
                }
            });
            msg.channel.send('type `!continue` to continue');
        }
    }
    else if (msg.toString() == "!post") //outputs compiled array
    {
        var comp = "";
        for (let i = 0; i < out.length; i++) {
            if (comp.length + out[i][1].content.length >= 2000)  //split messages because 2000 character limit
            {
                msg.channel.send(comp);
                comp = '';
            }
            comp = comp + out[i][1].content + " "; //space
            if (i == out.length-1)
            {
                msg.channel.send(comp); //finish
            }
        }
    }
});