const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID,
OWNER_NAME: process.env.OWNER_NAME || "AmeenInt",
BOT_NAME: process.env.BOT_NAME || "AstroX-V2",
PREFIX: process.env.PREFIX || ".",
NUMBER: process.env.NUMBER || "917777777777",
OWNER_NUMBER: process.env.OWNER_NUMBER || "916238768108"
};
