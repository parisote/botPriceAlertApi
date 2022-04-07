const { bot } = require('../utils/bot');

const sendAlert = async (req, res) => {
    const { who } = req.body;
    bot.sendMessage(who,"Alerta enviada");
    return res.json({status:"Done"});
}

module.exports = { sendAlert }