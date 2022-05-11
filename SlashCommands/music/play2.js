const { createAudioPlayer, createAudioResource , StreamType, demuxProbe, joinVoiceChannel, NoSubscriberBehavior, AudioPlayerStatus, VoiceConnectionStatus, getVoiceConnection } = require('@discordjs/voice')
const play = require('play-dl')

module.exports = {
    name: "play2",
    description: "Play a song from a title or link.",
    options: [
        {
            name: "song",
            description: "Song name or link.",
            type: "STRING",
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const args = interaction.options.getString("song");
		if(!interaction.member.voice?.channel) return message.channel.send('Connect to a Voice Channel')
        const connection = joinVoiceChannel({
            channelId : interaction.member.voice.channel.id,
            guildId : interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        })
		
		//let args = message.content.split('play')[1]
        let yt_info = await play.search(args, { limit : 1 })
		let stream = await play.stream(yt_info[0].url)
        let resource = createAudioResource(stream.stream, {
            inputType : stream.type
        })
        let player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play
            }
        })
        player.play(resource)

        connection.subscribe(player)
    },
};
