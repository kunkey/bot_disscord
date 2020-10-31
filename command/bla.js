const fs = require("fs"); 
const fetch = require('node-fetch');
const Discord = require('discord.js'); // load Discord Nodejs Library



// Read users.json file 
fs.readFile("../config.json", function(err, data) { 
    // Check for errors 
    if (err) throw err; 
   
    // Converting to JSON 
    const config = JSON.parse(data); 

	const client = new Discord.Client(); // Call to Class
	client.login(config.token);


client.on('ready', () => {
  console.log('\x1b[32m', `${client.user.username} => Ready!`);
});

client.on('message', async message => {

  if (message.author.bot) return; //nếu người gửi là bot thì khỏi chạy tiếp

console.log('\x1b[36m%s\x1b[0m', +message.author +': '+message.content)


if (message.content.startsWith(config.prefix)) { // xác nhận xem có prefix không
        const args = message.content.slice(config.prefix.length).split(/ +/); // bỏ đi tiền tố và chia thành nhiều chuỗi nhỏ theo khoảng trắng
        const cmd = args[0]; //lệnh sẽ là chuỗi đầu tiên

        console.log(args[0]);
        
		switch(cmd) {
		  case 'author':
		  		message.reply('`DISCORD BOT BY KUNKEYPR - VŨ DUY LỰC`');
		    break;

		  case 'wtf':
		  	// Extract the required classes from the discord.js module
			const { Client, MessageAttachment } = require('discord.js');

			// Create an instance of a Discord client
			const client = new Client();
			const attachment = new MessageAttachment('http://hentai.ghienanime.net/data/wtf.mp4');
		    // Send the attachment in the message channel
		    message.reply(attachment);
		   break;


		  case 'img':
			  fetch('http://hentai.ghienanime.net/data/get_img_hentai.php')
			    .then(res => res.text())
			    .then(body => {
		  	// Extract the required classes from the discord.js module
			const { Client, MessageAttachment } = require('discord.js');

			// Create an instance of a Discord client
			const client = new Client();
			const attachment = new MessageAttachment(body);
		    // Send the attachment in the message channel
		    message.reply(attachment);
			    });
		    break;			


			case 'tiktok':
				  fetch(config.server+'/data/get_tiktok.php')
				    .then(res => res.text())
				    .then(body => {
			  	// Extract the required classes from the discord.js module
				const { Client, MessageAttachment } = require('discord.js');

				// Create an instance of a Discord client
				const client = new Client();
				const attachment = new MessageAttachment(body);
			    // Send the attachment in the message channel
			    message.reply(attachment);
				    });
			    break;	



		}

}





});








}); 

return;

