const sendEmbed = (Discord, msg, message, sessionMinutes, time, type) => {
    const statusEmbed = new Discord.MessageEmbed()
	.setColor('RANDOM')
	.setTitle('Current Session')
	.setURL('')
	.setAuthor('DAPOMODO','','')
	.setDescription(`${message}.`)
    .addFields(
		{ name: 'Session Time:', value: `${Math.floor(time / 60)} minutes.` },
        { name: 'Left Time:', value: `${Math.floor(sessionMinutes / 60)} minutes.` },
    )
	.setThumbnail('https://cdn.discordapp.com/attachments/858033542378684447/858070253141622824/aao.png')
	.setTimestamp()

    const helpEmbed = new Discord.MessageEmbed()
	.setColor('RANDOM')
	.setTitle('Help Menu')
	.setAuthor('DAPOMODO','','')
    .addFields(
		{ name: 'Control commands', value: `dapomo!start [Work Time] - Starts your session.` },
        { name: '\u200B', value: `dapomo!end - Ends your session.` },
        { name: '\u200B', value: `dapomo!pause - Pauses your session.` },
        { name: '\u200B', value: `dapomo!restart - Restarts your session at the same duration.` },
        { name: '\u200B', value: `dapomo!resume - Resumes your session.` },
        { name: '\u200B', value: `dapomo!help - Opens the help menu.` },
        { name: '\u200B', value: `dapomo!status - Shows your session status.` },
    )
	.setThumbnail('https://cdn.discordapp.com/attachments/858033542378684447/858070253141622824/aao.png')
	.setTimestamp()
    if (type === "status") {
        msg.channel.send(statusEmbed)
    }
    if (type === "help") {
        msg.channel.send(helpEmbed);
    }

}
exports.sendEmbed = sendEmbed