const fs = require("fs"); 
const Discord = require('discord.js'); // load Discord Nodejs Library
const fetch = require('node-fetch');

// Read users.json file 
fs.readFile("../config.json", function(err, data) { 
    // Check for errors 
    if (err) throw err; 
   
    // Converting to JSON 
    const config = JSON.parse(data); 


			const client = new Discord.Client(); // Call to Class
			client.login(config.token);

			client.on('ready', () => {
			  console.log('\x1b[32m', `${client.user.username} => Active!`);


			// Dừng vòng lặp khi hết giờ
			setInterval(function () {

			  var timeleft = 15;
				var Timer = setInterval(function(){
				  console.log("Game Sẽ Bắt Đầu Sau: "+timeleft+"s");
				  client.channels.cache.get(config.guild_id).send('Game Sẽ Bắt Đầu Sau: '+timeleft+'s');

				  if(timeleft <= 0){
				  	play_game();
				  	clearInterval(Timer);
				  }


				  timeleft -= 1;
				}, 1000);

			}, 136000); 




		function play_game() {

			console.log("Game Started!");
			client.channels.cache.get(config.guild_id).send('`GAME STARTED!`');

			// Dừng vòng lặp khi hết giờ
			setTimeout(function () {
			    console.log('Hết Thời Gian Cược!'); 
			    client.channels.cache.get(config.guild_id).send('`Hết Thời Gian Cược!`');
			    	// get User Trùng
					fetch(config.server+'/user/xuly.php?cmd=get_result')
						.then(res => res.text())
						.then(body => {
							const res = JSON.parse(body); 
							client.channels.cache.get(config.guild_id).send(res.msg);

							fetch(config.server+'/user/xuly.php?cmd=clear')
								.then(res => res.text())
								.then(body => {
									const res = JSON.parse(body); 
									console.log(res.msg);
							});


						});


			}, 120000); 

		}



			});



		client.on('message', async message => {

			  if (message.author.bot) return; //nếu người gửi là bot thì khỏi chạy tiếp

			//console.log('\x1b[36m%s\x1b[0m', +message.author +': '+message.content)


			if (message.content.startsWith(config.prefix)) { // xác nhận xem có prefix không
			        const args = message.content.slice(config.prefix.length).split(/ +/); // bỏ đi tiền tố và chia thành nhiều chuỗi nhỏ theo khoảng trắng
			        const cmd = args[0]; //lệnh sẽ là chuỗi đầu tiên

			        console.log(message.author+': command => '+ args[0]);
			        
					switch(cmd) {
					  case 'cuoc':

					  		if(!args[1]) {
					  			message.reply('Vui lòng sử dụng `--cuoc <số cần cược>`');
					  		}else {

								fetch(config.server+'/user/index.php?user_id='+message.author.id+'&cmd=cuoc_xoso&number='+args[1])
								    .then(res => res.text())
								    .then(body => {
								    	const res = JSON.parse(body); 
							    		message.reply(res.msg);
								    });

								console.log(message.author+': đặt số '+ args[1]);

					  		}
					  		
							 
					    break;


					case 'money':
							fetch(config.server+'/user/index.php?user_id='+message.author.id+'&cmd=get_money')
							    .then(res => res.text())
							    .then(body => {
							    	const res = JSON.parse(body); 
						    		message.reply(res.msg);
							    });
					    break;

					  case 'reg':
							fetch(config.server+'/user/index.php?user_id='+message.author.id+'&cmd=register')
							    .then(res => res.text())
							    .then(body => {
							    	const res = JSON.parse(body); 
						    		message.reply(res.msg);
							    });
					    break;

					  case 'user':
					    message.reply('ID của bạn là: `'+message.author.id+'`');
					   	break

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

					}



			}



			});











}); 
