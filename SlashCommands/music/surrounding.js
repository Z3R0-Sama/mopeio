const player = require("../../client/player");

module.exports = {
    name: "surrounding",
    description: "Toggle the surrounding filer.",
    type: 'CHAT_INPUT',

    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: '❌ | No music is being played!' });
        
        await queue.setFilters({
            surrounding: !queue.getFiltersEnabled().includes('surrounding'),
            normalizer2: !queue.getFiltersEnabled().includes('surrounding')
        });

        setTimeout(() => {
            return interaction.followUp({ content: `🎵 | Surrounding ${queue.getFiltersEnabled().includes('surrounding') ? 'Enabled' : 'Disabled'}!` });
        }, queue.options.bufferingTimeout);

        

    },
};
