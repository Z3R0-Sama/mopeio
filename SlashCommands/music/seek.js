const player = require("../../client/player");

module.exports = {
    name: "seek",
    description: "Seek to a certain time.",
    options: [{
        name: 'time',
        description: 'The time to seek to (in seconds)',
        type: 'INTEGER',
        required: true,
    }],

    run: async (client, interaction) => {
        const opt = interaction.options.getInteger("time");
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue?.playing) return interaction.followUp({ content: '❌ | No music is being played!' });

        const time = opt * 1000;
        await queue.seek(time);

        interaction.followUp({
            content: `⏩ | Seeked to ${time / 1000} seconds | Might take a few seconds to start playing.`
        });
    },
};
