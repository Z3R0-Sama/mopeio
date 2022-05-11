const player = require("../../client/player");

module.exports = {
    name: "pause",
    description: "pause the current song",
    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
if (!queue || !queue.playing) return interaction.followUp({ content: '❌ | No music is being played!' });
        queue.setPaused(true);

        return interaction.followUp({ content: "⏸ | Paused the current track!" });
    },
};
