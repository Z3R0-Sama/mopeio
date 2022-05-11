const player = require("../../client/player");

module.exports = {
    name: "back",
    description: "Play previous track.",
    type: 'CHAT_INPUT',

    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: '❌ | No music is being played!' });
        
        await queue.back();
        
        interaction.followUp({ content: '⏮ | Playing previous track.' });

    },
};
