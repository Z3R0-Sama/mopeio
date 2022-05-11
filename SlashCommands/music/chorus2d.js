const player = require("../../client/player");

module.exports = {
    name: "chorus2d",
    description: "Toggle the chorus2d filer.",
    type: 'CHAT_INPUT',

    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: '❌ | No music is being played!' });
        
        await queue.setFilters({
            chorus2d: !queue.getFiltersEnabled().includes('chorus2d'),
            normalizer2: !queue.getFiltersEnabled().includes('chorus2d')
        });

        setTimeout(() => {
            return interaction.followUp({ content: `🎵 | Chorus2D ${queue.getFiltersEnabled().includes('chorus2d') ? 'Enabled' : 'Disabled'}!` });
        }, queue.options.bufferingTimeout);

        

    },
};
