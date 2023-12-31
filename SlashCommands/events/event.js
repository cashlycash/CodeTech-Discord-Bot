const {
	MessageEmbed,
	MessageSelectMenu,
	MessageActionRow
} = require('discord.js');

const db = require(process.cwd() + "/database.js");

module.exports = {
  name: "events",
  description: "Fetch all active events",
  run: async (client, interaction) => {
    
		const events = await db.get('events')
		const emb = new MessageEmbed()
			.setTitle('Events -')
			.setDescription('Please browse thru the events and click on any to get more details about it')
			.setColor('BLUE')

		const row = new MessageActionRow()
			.setComponents(
				new MessageSelectMenu()
					.setCustomId('events')
					.setPlaceholder('Click to browse')
					.addOptions(
						events.map((event, index) => {
							return {
								label: event.name,
								description: `Hosted By - ${event.host}`,
								value: index.toString(),
							}
						})
					)
			)

		interaction.followUp({ embeds: [emb], components: [row] })
  }
}