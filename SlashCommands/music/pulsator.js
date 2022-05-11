const player = require("../../client/player");

module.exports = {
    name: "pulsator",
    description: "Toggle the pulsator filer.",
    type: 'CHAT_INPUT',

    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: '❌ | No music is being played!' });
        
        await queue.setFilters({
            pulsator: !queue.getFiltersEnabled().includes('pulsator'),
            normalizer2: !queue.getFiltersEnabled().includes('pulsator')
        });

        setTimeout(() => {
            return interaction.followUp({ content: `🎵 | Pulsator ${queue.getFiltersEnabled().includes('pulsator') ? 'Enabled' : 'Disabled'}!` });
        }, queue.options.bufferingTimeout);

        

    },
};
