const player = require("../../client/player");

module.exports = {
    name: "haas",
    description: "Toggle the haas filer.",
    type: 'CHAT_INPUT',

    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: '❌ | No music is being played!' });
        
        await queue.setFilters({
            haas: !queue.getFiltersEnabled().includes('haas'),
            normalizer2: !queue.getFiltersEnabled().includes('haas')
        });

        setTimeout(() => {
            return interaction.followUp({ content: `🎵 | Haas ${queue.getFiltersEnabled().includes('haas') ? 'Enabled' : 'Disabled'}!` });
        }, queue.options.bufferingTimeout);

        

    },
};
