const axios = require('axios');
const _ = require("underscore");
const tools = require("../tools/tools.js");


module.exports = {
    name: "followage",
    ping: false,
    description: 'This command will give you the time a given user has followed a given channel. Example: "bb followage HotBear1110 NymN"',
    permission: 100,
    category: "Info command",
    execute: async (channel, user, input, perm) => {
        try {
            if (module.exports.permission > perm) {
                return;
            }
            let username = user.username;
            if (input[2]) {
                if (input[2].startsWith("@")) {
                    input[2] = input[2].substring(1);
                }
                username = input[2];
            }
            let realchannel = channel;
            if (input[3]) {
                realchannel = input[3];
            }

            const followcheck = await axios.get(`https://api.ivr.fi/twitch/subage/${username}/${realchannel}`, {timeout: 10000});

            if (followcheck.data["followedAt"]) {
                const ms = new Date().getTime() - Date.parse(followcheck.data["followedAt"]);
                return `${username} has been following #${realchannel}ﾠfor (${tools.humanizeDuration(ms)})`;
            }
            return `${username} does not follow #${realchannel}.`;
        } catch (err) {
            console.log(err);
            return ` Error FeelsBadMan `;
        }
    }
}