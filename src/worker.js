chrome.contextMenus.onClicked.addListener(genericOnClick);

function genericOnClick(info) {
    switch (info.menuItemId) {
        case 'search':
            chrome.tabs.create({ url: "https://eksisozluk.com/?q=" + encodeURIComponent(info.selectionText.toLowerCase()) });
            break;
    }
}

chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create(
        {
            "id": "search",
            "title": "ekşi sözlükte ara",
            "contexts": ["selection"]
        },
        function () {
            if (chrome.runtime.lastError) {
                console.log('Got expected error: ' + chrome.runtime.lastError.message);
            }
        }
    );
});