const Discord = require('discord.js');
const client = new Discord.Client();

const STORYCH = ''; //ID of the one word story channel
const TOP = ''; //ID of first word

const ILLEGAL = []; //array of banned words

client.once('ready', () => {
    console.log('Ready!');
});

client.login(''); //insert your key between quotes


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);  //log message just to verify that Discord isn't down
    client.user.setActivity('giving headpats', { type: 'PLAYING' });  //headpats cuz why not uwu
  });

function cont(container, outlcl) {
    if (container[0][0] == TOP)  //check if there's more words
    {
        var comp = "";
        for (let i = 0; i < container.length; i++) {
            if (comp.length + container[i][1].content.length >= 2000)  //split messages because 2000 character limit
            {
                outlcl.channel.send(comp);
                comp = '';
            }
            if (!container[i][1].author.bot)
            {
                comp = comp + container[i][1].content + " "; //space
            }
            if (i == container.length-1)
            {
                outlcl.channel.send(comp); //finish
            }
        }
    }
    else
    {
        outlcl.guild.channels.cache.get(STORYCH).messages.fetch( { before: container[0][0], limit: 100 }).then(words => { //grab the next 100 messages
            for (var e of words)
            {
                var m = e[1].content.toLowerCase().trim();
                if (ILLEGAL.indexOf(m) == -1 && ILLEGAL.indexOf(m.substring(0, m.length-1)) == -1 && ILLEGAL.indexOf(m.substring(1, m.length) == -1)) {
                    container.unshift(e); //plop into the array
                }
            }
            cont(container, outlcl);
        });
    }
}
client.on('message', msg => {
    if (msg.toString() == "!compile" && msg.channel.id == '') //compiles first 100 messages.  Put bot commands channel id between quotes to restrict bot to the channel
    {
        msg.channel.send("working...");
        out = [];
        msg.guild.channels.cache.get(STORYCH).messages.fetch( { limit: 100 }).then(words => { //grab 100 messages at a time
            for (var e of words)
            {
                var m = e[1].content.toLowerCase().trim();
                if (ILLEGAL.indexOf(m) == -1 && ILLEGAL.indexOf(m.substring(0, m.length-1)) == -1 && ILLEGAL.indexOf(m.substring(1, m.length) == -1)) {
                    out.unshift(e); //plop into the array
                }
            }
            cont(out, msg);
        });
    }
    /*else if (msg.toString() == "!continue")
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
            if (!out[i][1].author.bot)
            {
                comp = comp + out[i][1].content + " "; //space
            }
            if (i == out.length-1)
            {
                msg.channel.send(comp); //finish
            }
        }
    }*/
});
