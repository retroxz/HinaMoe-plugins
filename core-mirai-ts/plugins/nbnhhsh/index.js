const {default: Bot} = require('el-bot')
const {check, Message} = require("mirai-ts");
// const COMMAND = ['/好好说话','好好说话']
const COMMAND = '好好说话'

const axios =  require("axios");
const request = axios.create()
async function guess(text) {
    const API_URL = "https://lab.magiconch.com/api/nbnhhsh/guess";
    const resp =  await request.post(API_URL, { text })
    return resp.data
}

/**
 * 能不能好好说话？
 * @param ctx
 */
module.exports =  function (ctx) {
    const mirai = ctx.mirai
    mirai.on('message', async (msg) => {
        try {
            if (check.re(msg.plain, `^(/${COMMAND})|${COMMAND}.*`)) {
                const keyword = msg.plain.split(COMMAND)[1].replace(/\s+/g, '')
                if (keyword.search("[\u4e00-\u9fa5]") !== -1 || !keyword) {
                    throw new Error("看不懂 嘻嘻")
                }
                const data = await guess(keyword);
                let replyMessage = data.length == 0 ? "看不懂 嘻嘻" : `【${keyword}】的意思可能是\n【${data[0].trans.toString()}】`
                msg.reply([Message.At(msg.sender.id), Message.Plain(replyMessage)])
            }
        } catch (e) {
            msg.reply(e.message)
        }
    })
}
