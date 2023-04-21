import TelegramBot from "node-telegram-bot-api";
const token = "6230612885:AAF2g3FAMhlmKDAZGcMN3CfCkk5vICyw0cg";
const bot = new TelegramBot(token, { polling: true });
bot.sendMessage("1321186972", "fef");
