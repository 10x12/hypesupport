const Discord = require("discord.js");
const TOKEN = "NDA3Nzk0NDY1OTU3MzQ3MzQw.DVJ-PQ.HlipaFMIwBosst7RpvSBtFPek48";
const PREFIX = ","


var bot = new Discord.Client();

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
			message.channel.sendMessage("Pong!");
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
        .setFooter(`Remember to keep in mind that this bot is under heavy dev!`);
      message.author.send(em)
      break;
      case "commands":
      	message.channel.sendMessage("__**Commands**__\n`1.Ping\n2.Help\n3.About\n4.UserInfo\n5.Invite`")
      		break;
		default:
			message.channel.sendMessage("Invalid Command");
	}
});


bot.login("NDA3Nzk0NDY1OTU3MzQ3MzQw.DVJ-PQ.HlipaFMIwBosst7RpvSBtFPek48");
