const Discord = require("discord.js");
const YTDL = require("ytdl-core");

const TOKEN = "NDA3Nzk0NDY1OTU3MzQ3MzQw.DVJ-PQ.HlipaFMIwBosst7RpvSBtFPek48";
const PREFIX = ","

function play(connection, message) {
	var server = servers[message.guild.id];

	server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

	server.queue.shift();

	server.dispatcher.on("end", function() {
		if (server.queue[0]) play(connection, message);
		else connection.disconnect();
	});
}


var bot = new Discord.Client();

var servers = {};

bot.on("ready", function(){
	console.log("HypeSupport By Snuqy")

	bot.user.setActivity(",help ♠ On "+bot.guilds.size+" servers");

});

bot.on("message", function(message) {
	if (message.author.equals(bot.user)) return;


	if(!message.content.startsWith(PREFIX)) return;

	var args = message.content.substring(PREFIX.length).split(" ");

	switch (args[0].toLowerCase()) {
		case "ping":
			const then = Date.now();
			message.channel.send('Getting your ping...').then(m => {
				m.edit(`It took ${Date.now() - then}ms to send that message\nHype Bot: ${bot.ping}ms`);
			});
			break;
		case "about":
			var embed = new Discord.RichEmbed()
				.setDescription("About HypeSupport")
				.addField("Created By:", "[Owner] Snuqy", true)
				.addField("Current Version:", "0.1", true)
				.addField("Invite Link:", ",invite")
				.addField("This Bot Is Great For:", "Helping Users, Moderatian,\nand Having Fun!!")
				.setColor("#ff5f00")
				.setFooter("Remember to keep in mind that this bot is under heavy dev!")
			message.channel.sendEmbed(embed);
			break;

		case "userinfo":
			var embed = new Discord.RichEmbed()
				.setAuthor(message.author.username)
				.setDescription("This Is The Users Info.")
				.setColor("#ff5f00")
				.addField("Username", `${message.author.username}`)
				.addField("ID", message.author.id)
				.setThumbnail(message.author.avatarURL)
				.setFooter("Remember to keep in mind that this bot is under heavy dev!")
			message.channel.sendEmbed(embed);
			break;

		case "invite":
			message.channel.sendMessage("**The Invite Link Was Sent To Your DM!** :smile:")
			message.author.send("Here Is The Link! https://discordapp.com/api/oauth2/authorize?client_id=407794465957347340&permissions=0&scope=bot");
        	break;

        case "help":
      message.channel.send("**:white_check_mark:** Help Menu Sent To Your DM!")
      var em = new Discord.RichEmbed()
        .setColor("#ff5f00")
        .setAuthor(`Help Menu`, bot.user.avatarURL)
        .addBlankField()
        .addField('Invite Link', 'Do **,invite** for the invite link!')
        .addBlankField()
        .addField('Commands', 'Do ,commands To See Them')
        .addField('Music', 'We have added a music feture so how to use it in ,commands!')
        .setFooter(`Remember to keep in mind that this bot is under heavy dev!`);
      message.author.send(em)
      break;

      case "commands":
      	message.channel.sendMessage("__**Commands**__\n`1.Ping\n2.Help\n3.About\n4.UserInfo\n5.Invite\n6.Play (songlink)\n7.Skip *song*\n8.Stop *music*`")
      		break;

      case "play":
      		if (!args[1]) {
      			message.channel.sendMessage("Please provide a link.");
      			return;
      		}

      		if (!message.member.voiceChannel) {
      			message.channel.sendMessage("You must be in a voice channel");
      			return;
      		}

      		if (!servers[message.guild.id]) servers[message.guild.id] = {
      			queue: []
      		};

      		var server = servers[message.guild.id]

      		server.queue.push(args[1]);

      		if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
      			play(connection, message);
      		});
      	   	break;

      case "skip":
      		var server = servers[message.guild.id];

      		if (server.dispatcher) server.dispatcher.end();
      		break;

      case "stop":
      		var server = servers[message.guild.id];

      		if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
      		break;
		default:
			message.channel.sendMessage("Invalid Command");
	}
});


bot.login("NDA3Nzk0NDY1OTU3MzQ3MzQw.DVJ-PQ.HlipaFMIwBosst7RpvSBtFPek48");
