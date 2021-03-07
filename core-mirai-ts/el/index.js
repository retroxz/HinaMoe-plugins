require("dotenv").config();
const { resolve } = require("path");
const { utils } = require("el-bot");
console.log(__dirname)
module.exports = {
  qq: parseInt(process.env.BOT_QQ),
  // 你可以直接解析 mirai-api-http 的配置
  setting: "./config/http.yml",
  db: {
    // 默认关闭
    enable: false,
    uri: process.env.BOT_DB_URI,
    analytics: true,
  },
  bot: utils.config.parse(resolve(__dirname, "../config/app.yml")),
  // webhook
  webhook: {
    enable: false,
    path: "/webhook",
    port: 7777,
    secret: process.env.WEBHOOK_SECRET
  },
};
