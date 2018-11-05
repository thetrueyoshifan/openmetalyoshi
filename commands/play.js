const ytdl = require('ytdl-core');
const discord = require("discord.js");
const youtube_api = require("simple-youtube-api");

const config = require("../config.json");

const YouTube = new youtube_api(config.ytapikey)

exports.run = (client, message, args) => {{
  console.log(message.author.tag+" in "+message.guild+" issued command y!play with URL "+args);
  let channel = message.member.voiceChannel;
  if(!channel) return message.reply("you need to be in a voice channel!");
  message.delete();
  message.member.voiceChannel.leave()
  channel.join()
      .then(connection => {
        YouTube.searchVideos(args.join(" "), 1).then(results => {
          var url = "https://youtube.com/watch?v=" + results[0].id
                const streamOptions = { seek: 0, volume: 0.25 };
                const stream = ytdl(url, { filter : 'audioonly', quality: 'highest'});
                const dispatcher = connection.playFile("radio.m3u");

                ytdl.getInfo(url, function(err, info) {
                  message.channel.send({embed: new discord.RichEmbed()
                    .setTitle(":musical_note: Now Playing:").setThumbnail(`null`).setDescription(`**${info.title}**\n\n**Uploaded by** [${info.author.name}](${info.author.channel_url})\n\n**Description** ${(info.description).substring(0, 400)}`)})
                })
        })
      }).catch(console.error);
}}
