const player = require("../../client/player");

module.exports = {
    name: "jump",
    description: "Jump to a specific track in the queue.",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "track",
            description: "track number to jump to",
            type: "INTEGER",
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const opt = interaction.options.getInteger("track");
        const queue = player.getQueue(interaction.guildId);

        if (!queue || !queue?.playing) return interaction.followUp({ content: '❌ | No music is being played!' });
        const trackIndex = opt;
        const trackName = queue.tracks[trackIndex].title;
        queue.jump(trackIndex);

        return interaction.followUp({ content: `⏭ | #${trackIndex} | **${trackName}** has started playing!` });


       
    },
};
