require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT;

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/lista (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  const lista = ['ethereum', 'bitcoin', 'matic-network'];

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, 'ethereum, bitboin, matic-network');
});

bot.onText(/\/new_alert (.+)/, (msg, match) => {  
    const chaId = msg.chat.id;

    const array_text = match[1].split(' ');
    console.log(array_text[0]);
    console.log(array_text[1])
});