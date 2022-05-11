const player = require("../../client/player");

module.exports = {
    name: "subboost",
    description: "Toggle the subboost filer.",
    type: 'CHAT_INPUT',

    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: '❌ | No music is being played!' });
        
        await queue.setFilters({
            subboost: !queue.getFiltersEnabled().includes('subboost'),
            normalizer2: !queue.getFiltersEnabled().includes('subboost')
        });

        setTimeout(() => {
            return interaction.followUp({ content: `🎵 | Subboost ${queue.getFiltersEnabled().includes('subboost') ? 'Enabled' : 'Disabled'}!` });
        }, queue.options.bufferingTimeout);

        

    },
};
