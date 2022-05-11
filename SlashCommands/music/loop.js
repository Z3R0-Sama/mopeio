const player = require("../../client/player");
const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: "loop",
    description: "loop the track or queue",
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'mode',
            type: 'INTEGER',
            description: 'Loop type',
            required: true,
            choices: [
                {
                    name: 'Off',
                    value: QueueRepeatMode.OFF
                },
                {
                    name: 'Track',
                    value: QueueRepeatMode.TRACK
                },
                {
                    name: 'Queue',
                    value: QueueRepeatMode.QUEUE
                },
                {
                    name: 'Autoplay',
                    value: QueueRepeatMode.AUTOPLAY
                }
            ]
        }
    ],
    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: '❌ | No music is being played!' });
        const loopMode = interaction.options.getInteger("mode")
        const success = queue.setRepeatMode(loopMode);
        const mode = loopMode === QueueRepeatMode.TRACK ? '🔂' : loopMode === QueueRepeatMode.QUEUE ? '🔁' : '▶';
        const tex = loopMode === QueueRepeatMode.TRACK ? 'Looping the track!' : loopMode === QueueRepeatMode.QUEUE ? 'Looping the queue!' : loopMode === QueueRepeatMode.AUTOPLAY ? 'Turned on Autoplay!' : 'Turned off loop!';
        return interaction.followUp({ content: success ? `${mode} | ${tex}` : '❌ | Could not update loop mode!' });
  
    },
};
