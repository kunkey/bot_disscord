const fs = require("fs"); 
const Discord = require('discord.js'); // load Discord Nodejs Library
const fetch = require('node-fetch');

// Read users.json file 
fs.readFile("./config.json", function(err, data) { 
    // Check for errors 
    if (err) throw err; 
   
    // Converting to JSON 
    const config = JSON.parse(data); 


			const client = new Discord.Client(); // Call to Class
			client.login(config.token);

			client.on('ready', () => {
			  console.log('\x1b[32m', `${client.user.username} => Active!`);
			});



		client.on('message', async message => {

			  if (message.author.bot) return; //nếu người gửi là bot thì khỏi chạy tiếp

			//console.log('\x1b[36m%s\x1b[0m', +message.author +': '+message.content)


			if (message.content.startsWith(config.prefix)) { // xác nhận xem có prefix không
			        const args = message.content.slice(config.prefix.length).split(/ +/); // bỏ đi tiền tố và chia thành nhiều chuỗi nhỏ theo khoảng trắng
			        const cmd = args[0]; //lệnh sẽ là chuỗi đầu tiên

			        console.log(message.author+': command => '+ args[0]);
			        
					switch(cmd) {

					  case 'name':

					  	var name = guild.members.fetch(message.author.id);

							    		message.channel.send(name);

							    		

					    break;


					}



			}



			});











}); 
