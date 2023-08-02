const { generateSessionId, generateUserId } = require('../service/function');

let userList = [];

const getUsers = (req, res) => {
    try {
        return res.status(200).json(userList);
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addUser = (req, res) => {
    try {
        const userAgentData = req.useragent;
        let logoBrowser = "https://cdn.onlinewebfonts.com/svg/img_145644.png";

        if (userAgentData.isChrome == true) {
            logoBrowser = "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Chrome_icon_%28September_2014%29.svg";
        } else if (userAgentData.isEdge == true) {
            logoBrowser = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Edge_Logo_2019.svg/1024px-Edge_Logo_2019.svg.png";
        } else if (userAgentData.isiPhone == true) {
            logoBrowser = "https://cdn-icons-png.flaticon.com/512/86/86736.png";
        } else if (userAgentData.isAndroid == true) {
            logoBrowser = "https://cdn-icons-png.flaticon.com/512/174/174836.png";
        } else if (userAgentData.isOpera == true) {
            logoBrowser = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Opera_2015_icon.svg/640px-Opera_2015_icon.svg.png";
        } else if (userAgentData.isSafari == true) {
            logoBrowser = "https://cdn-icons-png.flaticon.com/512/564/564442.png";
        }

        const sessionId = generateSessionId();
        const newUser = {
            id: generateUserId(),
            sessionId,
            logo: logoBrowser,
            browser: userAgentData.browser,
            timestamp: Date.now(),
        };

        userList.push(newUser);
        return res.status(200).json(newUser);
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const removeUser = (req, res) => {
    try {
        const userIdToRemove = parseInt(req.params.userId);
        userList = userList.filter((user) => user.id !== userIdToRemove);
        return res.status(200).json(userList);
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getUsers, addUser, removeUser };