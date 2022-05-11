const player = require("../../client/player");

module.exports = {
    name: "reverse",
    description: "Toggle the reverse filer.",
    type: 'CHAT_INPUT',

    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: '❌ | No music is being played!' });
        
        await queue.setFilters({
            reverse: !queue.getFiltersEnabled().includes('reverse'),
            normalizer2: !queue.getFiltersEnabled().includes('reverse')
        });

        setTimeout(() => {
            return interaction.followUp({ content: `🎵 | Reverse filter ${queue.getFiltersEnabled().includes('reverse') ? 'Enabled' : 'Disabled'}!` });
        }, queue.options.bufferingTimeout);

        

    },
};
