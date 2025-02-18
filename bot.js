const { Client, Intents, MessageAttachment } = require('discord.js');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES
  ]
});

client.once('ready', () => {
  console.log('Bot is ready');
});

client.on('message', async (message) => {
  if (message.author.bot) return; // Ignore bot messages

  if (message.content.toLowerCase() === '!leaderboard') {
    try {
      // URL for the leaderboard image from Google Drive
      const imageUrl = 'https://drive.google.com/uc?export=view&id=1sPX9en9JmerkwZ3kgOsUFtzIQIBGP9Ht'; 

      // Fetch the image from the URL
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

      // Create a MessageAttachment from the image data
      const attachment = new MessageAttachment(response.data, 'leaderboard.png');

      // Send the image to the Discord channel
      message.channel.send({ content: 'Here is the leaderboard:', files: [attachment] });
    } catch (error) {
      console.error('Error while fetching the image:', error);
      message.channel.send('Sorry, there was an issue fetching the leaderboard image.');
    }
  }
});

// Log in to Discord using your bot token from the .env file
client.login(process.env.BOT_TOKEN);
