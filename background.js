chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        console.log("Check if on LinkedIn.com");
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { urlContains: 'linkedin.com/in/' },
                    })
                ],
                // And shows the extension's page action.
                actions: [ new chrome.declarativeContent.ShowPageAction() ]
            }
        ]);
    });
});

var contextMenuItem = {
    "id": "scrapeProfile",
    "title": "Scrape Profile",
    "contexts": ["all"]
};

chrome.contextMenus.removeAll(function() {
    chrome.contextMenus.create(contextMenuItem);
});

function scrape_it() {
        var notifOptions = {
            type: "basic",
            iconUrl: "48.png",
            title: "!",
            message: "Oh boy!!!!!!! I Got SCHWIFTY!!!"
        };
        // Will only work of course if notifications are on
        chrome.notifications.create('scrapeNotif', notifOptions);

        // Change the background color of the page via injecting simple code
        //  instead of calling a content script.
        chrome.tabs.executeScript({
            file: "content.js"
            });
        }



chrome.contextMenus.onClicked.addListener(function(clickData){
    if (clickData.menuItemId == "scrapeProfile") {
            scrape_it();
        } 
        });
        
chrome.commands.onCommand.addListener(function(command) {
    scrape_it();
});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", msg.message, true);
        xhr.send();

});

var save
