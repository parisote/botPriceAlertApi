require('dotenv').config();
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT;
const API = process.env.API;
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

    /*const opts = {
      reply_to_message_id: msg.message_id,
      reply_markup: {
        "keyboard": [
          [{ text: "Ethereum"}],
          [{ text: "Bitcoin"}],
          [{ text: "Matic"}]
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
        force_reply: true,
      }
    };*/

    const opts = {
      reply_markup: {
        inline_keyboard: [[
            {
                text: 'Ethereum',
                callback_data: 'ethereum'
            }, {
                text: 'Bitcoin',
                callback_data: 'bitcoin'
            }, {
                text: 'Matic',
                callback_data: 'matic-network'
            }, {
                text: 'Dot',
                callback_data: 'matic-network'
            }, {
                text: 'Terra',
                callback_data: 'matic-network'
            }
        ]]
      }
    };

    bot.sendMessage(chatId, 'Sobre que coin quiere crear la alerta?', opts);
});

// Listener (handler) for callback data from /label command
bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  const category = callbackQuery.data;

  bot.sendMessage(message.chat.id, `Cual es el precio sobre el cual desea alertar sobre "${category}"?`)
  .then(() => answerCallbacks[message.chat.id] = async (msg) => {
    axios.post(API,{
      coin: category,
      price: msg.text,
      who: msg.chat.id
    })
    .then(res => { 
      bot.sendMessage(message.chat.id, "Alerta guardada correctamente");
    })
    .catch(error => {
      console.log(error);
    })
  })
});