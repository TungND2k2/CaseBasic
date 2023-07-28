const generateSessionId = () => {
    return Date.now().toString().replace(/-/g, '');
};

const generateUserId = () => {
    return Date.now().toString().replace(/-/g, '');
};

module.exports = {
    generateSessionId,
    generateUserId,
};