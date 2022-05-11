const player = require("../../client/player");

module.exports = {
    name: "phaser",
    description: "Toggle the phaser filer.",
    type: 'CHAT_INPUT',

    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: '❌ | No music is being played!' });
        
        await queue.setFilters({
            phaser: !queue.getFiltersEnabled().includes('phaser'),
            normalizer2: !queue.getFiltersEnabled().includes('phaser')
        });

        setTimeout(() => {
            return interaction.followUp({ content: `🎵 | Phaser ${queue.getFiltersEnabled().includes('phaser') ? 'Enabled' : 'Disabled'}!` });
        }, queue.options.bufferingTimeout);

        

    },
};
