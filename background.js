chrome.runtime.onMessage.addListener(function (request,) {
    if (request.todo == "showPageAction") {
        //Highlights extension icon
        chrome.tabs.query({active:true, currentWindow: true}, function (tabs) {
            chrome.pageAction.show(tabs[0].id);
        });
    }
});