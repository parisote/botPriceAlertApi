require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT;
const bot = new TelegramBot(token, {polling: true});

var answerCallbacks = [];

bot.on('message', (msg) => {
  let callback = answerCallbacks[msg.chat.id];
  if (callback) {
    delete answerCallbacks[msg.chat.id];
    callback(msg);
  }
});

bot.onText(/\/new_alert/, async (msg) => {  
    const chatId = msg.chat.id;

    const opts = {
      reply_to_message_id: msg.message_id,
      reply_markup: {
        "keyboard": [
          [{ text: "Ethereum" }],
          [{ text: "Bitcoin" }],
          [{ text: "Matic" }]
        ]        
      }
    };

    bot.sendMessage(chatId, 'Sobre que coin quiere crear la alerta?', opts)
    .then(() => {
      answerCallbacks[chatId] = function(msg) {
        bot.sendMessage(msg.chat.id, "Cual es el precio sobre el cual desea alertar sobre "+ msg.text + "?")
      };
    });
});