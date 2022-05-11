const player = require("../../client/player");

module.exports = {
    name: "clear",
    description: "Clear the queue.",
    type: 'CHAT_INPUT',

    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: '❌ | No music is being played!' });
        
        await queue.clear();
        
        interaction.followUp({ content: '🧹 | Queue cleared.' });

    },
};
