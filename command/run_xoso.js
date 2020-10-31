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


}); 
