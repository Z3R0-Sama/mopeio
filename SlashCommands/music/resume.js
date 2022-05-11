const player = require("../../client/player");

module.exports = {
    name: "resume",
    description: "resume the current song",
    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
if (!queue || !queue.playing) return interaction.followUp({ content: '❌ | No music is being played!' });
        queue.setPaused(false);

        return interaction.followUp({ content: "▶ | Resumed the current track!" });
    },
};
