const { generateSessionId, generateUserId } = require('../service/function'); // Import các hàm từ tệp utils.js

let userList = [];

// Controller để xử lý route GET /users
const getUsers = (req, res) => {
    console.log(userList)
    res.json(userList);
};

// Controller để xử lý route POST /addUser
const addUser = (req, res) => {
    let logoBrowser = null;
    switch (req.body.browser) {
        case 'Microsoft Edge':
            logoBrowser = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Edge_Logo_2019.svg/1024px-Edge_Logo_2019.svg.png";
            break;
        case 'Google Chrome':
            logoBrowser = "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Chrome_icon_%28September_2014%29.svg";
            break;
        case 'Chromium':
            logoBrowser = "https://upload.wikimedia.org/wikipedia/commons/6/6f/C%E1%BB%91c_C%E1%BB%91c_logo.svg";
            break;
        default:
            logoBrowser = "https://cdn.onlinewebfonts.com/svg/img_145644.png"
    }
    const sessionId = generateSessionId(); // Hàm này sinh ra một Session ID duy nhất
    const newUser = {
        id: generateUserId(), // Hàm này sinh ra một User ID duy nhất
        sessionId,
        logo: logoBrowser,
        browser: req.body.browser,
        timestamp: (Date.now()),
    };
    userList.push(newUser);
    res.json(newUser);
};

// Controller để xử lý route DELETE /removeUser/:userId
const removeUser = (req, res) => {
    const userIdToRemove = parseInt(req.params.userId);
    userList = userList.filter((user) => user.sessionId !== userIdToRemove);
    res.json(userList);
};

module.exports = { getUsers, addUser, removeUser };