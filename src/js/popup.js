var selectedIndex = -1;
var searchResults = [];
var timer, delay = 500;

$('#txtQuery').bind('input', function () {
    var _this = $(this);
    clearTimeout(timer);
    timer = setTimeout(function() {
        if ($('#txtQuery').val() != '') {
            loadResults($('#txtQuery').val());
        } else {
            selectedIndex = -1;
            $("#lstResults").hide();
        }
    }, delay );
});

function loadResults(query) {
    $.ajax({
        url: `https://eksisozluk.com/autocomplete/query?q=${query}&_=1454711765213`,
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        success: function (result) {
            searchResults = [];
            
            for (var i = 0; i < result.Titles.length; i++) {
                searchResults.push({ keyword: result.Titles[i], type: "title" });
            }

            for (var i = 0; i < result.Nicks.length; i++) {
                searchResults.push({ keyword: result.Nicks[i], type: "nick" });
            }

            selectedIndex = -1;
            init();
        }
    });
}

function init() {    
    var output = "";
    
    for (var i = 0; i < searchResults.length; i++) {
        output += `<a href="https://eksisozluk.com/?q=${searchResults[i].keyword}"><li class="list-group-item list-group-item-action list-group-item-dark ${selectedIndex == i ? "active" : ""}">${(searchResults[i].type == "nick" ? "@" : "")}${searchResults[i].keyword}</li></a>`; 
    }

    $("#lstResults").html(output);
    document.getElementById("txtQuery").focus();
}

$(document).keydown(function(e) {
	if(e.keyCode == 40) { // Down
        if (searchResults.length > selectedIndex) {
            selectedIndex = (selectedIndex == -1 ? 0 : selectedIndex + 1);
        }
	}

	if(e.keyCode == 38) { // Up
		if (selectedIndex > 0) {
            selectedIndex--;
        }
	}

    if(e.keyCode == 13) { // Enter
		if (selectedIndex != -1) {
            chrome.tabs.create({url: `https://eksisozluk.com/?q=${(searchResults[selectedIndex].type == "nick" ? "@" : "")}${searchResults[selectedIndex].keyword}`}); 
        } else {
            chrome.tabs.create({url: `https://eksisozluk.com/?q=${$('#txtQuery').val()}`}); 
        }
	}

    init();
});

document.getElementById("txtQuery").focus();