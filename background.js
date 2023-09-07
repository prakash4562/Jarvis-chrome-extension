chrome.webRequest.onResponseStarted.addListener(
    (details) => {
        if (details.url.includes("get_allotted_country_states")) {
            chrome.storage.local.get(['myData']).then((result) => {
                if (result.hasOwnProperty('myData')) {
                    console.log('Retrieved from storage: ', result.myData)
                } else {
                    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
                        const authToken = message.auth_token;
                        fetch(details.url, {
                            method: "GET",
                            headers: new Headers({
                                'Authorization': authToken
                            })
                        }).then(res => res.json()).then(response => {
                            console.log(response)
                            chrome.storage.local.set({ myData: response }).then(() => {
                                console.log('Data saved successfully.')
                            })
                        })
                            .catch(error => {
                                console.error('Error: ', error)
                            })
                    })
                }
            })
        }
    },
    { urls: ["https://saral-staging.ccdms.in/zila/api/data/get_allotted_country_states"] }
)
