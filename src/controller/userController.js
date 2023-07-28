const { generateSessionId, generateUserId } = require('../service/function'); // Import các hàm từ tệp utils.js

let userList = [];

// Controller để xử lý route GET /users
const getUsers = (req, res) => {
    res.json(userList);
};

// Controller để xử lý route POST /addUser
const addUser = (req, res) => {
    const userAgentData = req.useragent;
    console.log(userAgentData)
    let logoBrowser = "https://cdn.onlinewebfonts.com/svg/img_145644.png";
    if (userAgentData.isChrome == true) {
        logoBrowser = "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Chrome_icon_%28September_2014%29.svg";
    }
    if (userAgentData.isEdge == true) {
        logoBrowser = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Edge_Logo_2019.svg/1024px-Edge_Logo_2019.svg.png";
    }
    if (userAgentData.isiPhone == true) {
        logoBrowser = "https://cdn-icons-png.flaticon.com/512/86/86736.png";
    }
    if (userAgentData.isAndroid == true) {
        logoBrowser = "https://cdn-icons-png.flaticon.com/512/174/174836.png";
    }
    if (userAgentData.isOpera == true) {
        logoBrowser = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Opera_2015_icon.svg/640px-Opera_2015_icon.svg.png";
    }
    if (userAgentData.isSafari == true) {
        logoBrowser = "https://cdn-icons-png.flaticon.com/512/564/564442.png";
    }
    const sessionId = generateSessionId(); // Hàm này sinh ra một Session ID duy nhất
    const newUser = {
        id: generateUserId(), // Hàm này sinh ra một User ID duy nhất
        sessionId,
        logo: logoBrowser,
        browser: userAgentData.browser,
        timestamp: (Date.now()),
    };
    userList.push(newUser);
    res.json(newUser);
};

// Controller để xử lý route DELETE /removeUser/:userId
const removeUser = (req, res) => {
    const userIdToRemove = parseInt(req.params.userId);
    userList = userList.filter((user) => user.sessionId != userIdToRemove);
    res.json(userList);
};

module.exports = { getUsers, addUser, removeUser };