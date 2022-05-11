const player = require("../../client/player");

module.exports = {
    name: "vaporwave",
    description: "Toggle the vaporwave filer.",
    type: 'CHAT_INPUT',

    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: '❌ | No music is being played!' });
        
        await queue.setFilters({
            vaporwave: !queue.getFiltersEnabled().includes('vaporwave'),
            normalizer2: !queue.getFiltersEnabled().includes('vaporwave')
        });

        setTimeout(() => {
            return interaction.followUp({ content: `🎵 | Vaporwave ${queue.getFiltersEnabled().includes('vaporwave') ? 'Enabled' : 'Disabled'}!` });
        }, queue.options.bufferingTimeout);

        

    },
};
