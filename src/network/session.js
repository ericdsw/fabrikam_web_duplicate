const STORAGE_ELEMENT = 'user';

function parseUserData() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_ELEMENT));
    return data;
  } catch (e) {
    localStorage.removeItem()
    return null;
  }
}

function isLoggedIn() {
  const userData = parseUserData();
  return (userData && userData.token);
}

function logout() {
  localStorage.removeItem(STORAGE_ELEMENT);
}

function getUserData() {
  const userData = parseUserData();
  if (userData.user) {
    return userData.user;
  }
  return null;
}

function getUserToken() {
  const userData = parseUserData();
  if (userData.token) {
    return userData.token;
  }
  return null
}

function writeUserData(userData) {
  const writtenData = JSON.stringify(userData);
  localStorage.setItem(STORAGE_ELEMENT, writtenData);
}

export default {
  isLoggedIn, logout, getUserData, getUserToken, writeUserData
}