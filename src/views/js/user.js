let idSession = 0;

function saveSessionIdToLocalStorage(sessionId) {
    localStorage.setItem('sessionId', sessionId);
}

function formatTimeAgo(timestamp) {
    const currentTime = Date.now();
    const timeDifference = currentTime - timestamp;

    if (timeDifference < 1000) {
        return '1 seconds ago';
    } else if (timeDifference < 60 * 1000) {
        const secondsAgo = Math.floor(timeDifference / 1000);
        return `${secondsAgo} seconds ago`;
    } else if (timeDifference < 60 * 60 * 1000) {
        const minutesAgo = Math.floor(timeDifference / (60 * 1000));
        return `${minutesAgo} minutes ago`;
    } else {
        const hoursAgo = Math.floor(timeDifference / (60 * 60 * 1000));
        return `${hoursAgo} hours ago`;
    }
}

function renderUserList(users) {
    const userListElement = document.getElementById('userList');
    userListElement.innerHTML = ''; // Xóa danh sách người dùng hiện tại

    // Sắp xếp mảng người dùng theo thời gian giảm dần
    users.sort((a, b) => b.timestamp - a.timestamp);

    users.forEach((user) => {
        const userItem = document.createElement('li');
        userItem.classList.add('user-item');

        const userAvatar = document.createElement('img');
        userAvatar.classList.add('user-avatar');
        userAvatar.src = user.logo;

        const userInfo = document.createElement('div');
        userInfo.classList.add('user-info');

        const userName = document.createElement('h5');
        userName.classList.add('user-name');
        userName.textContent = user.browser; // Thay tên người dùng vào đây

        const userAge = document.createElement('p');
        userAge.classList.add('user-age');
        userAge.textContent = `Time: ${formatTimeAgo(user.timestamp)}`;
        userInfo.appendChild(userName);
        userInfo.appendChild(userAge);

        userItem.appendChild(userAvatar);
        userItem.appendChild(userInfo);

        userListElement.appendChild(userItem);
    });
}


// Hàm để lấy danh sách người dùng từ máy chủ
function fetchUsers() {
    axios.get('http://27.118.27.43/api')
        .then((response) => {
            const users = response.data;
            renderUserList(users); // Hiển thị danh sách người dùng trong giao diện
        })
        .catch((error) => console.error('Error:', error));
}

function addUser() {
    axios.post('http://27.118.27.43/api', {

        })
        .then((response) => {
            idSession = response.data.sessionId;
            // saveSessionIdToLocalStorage(sessionId); // Lưu sessionId vào localStorage
            fetchUsers();
        })
        .catch((error) => console.error('Error:', error));
}


function removeUser(userId) {
    return axios.delete(`http://27.118.27.43/api/${userId}`);
}

window.addEventListener('unload', async() => {
    try {
        await removeUser(idSession);
        await fetchUsers();
        document.addEventListener('DOMContentLoaded', () => {
            addUser();
        });
    } catch (error) {
        console.error('Error:', error);
    }
});





fetchUsers(); // Lấy danh sách người dùng lúc ban đầu

setInterval(fetchUsers, 5000); // Cập nhật danh sách người dùng mỗi 5 giây