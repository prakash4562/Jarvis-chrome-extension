chrome.runtime.sendMessage({
    auth_token: localStorage.getItem('authToken')
})