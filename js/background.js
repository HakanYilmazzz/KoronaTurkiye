var formatNr = input => {
    // formats fi. 120000 to 120,000 (set the "," character below to "." to format as 120.000)
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(document).ready(() => {
    $('.covid-around section').addClass('loading');
    $.getJSON({url: "http://ip-api.com/json"}).done( ipInfo => {
        $.ajax({url: `https://corona.lmao.ninja/v2/countries/${ipInfo.country.toLowerCase()}?strict=true`}).done(
            data => {                
                if (data) {
                   $(".covid-around #confirmedtoday").text(`${formatNr(data.todayCases)}`);
                    
                } else {
                    $(".covid-around div").hide();
                    $(".covid-around .countryInfo").text(`Türkiye için Korona Durumu Yenilenemedi!!`);
                }
                $('.covid-around section').removeClass('loading');
                chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab) {
                chrome.browserAction.setBadgeBackgroundColor({ color: [102, 102,0, 255] });                
                chrome.browserAction.setBadgeText(data.todayCase);
            });
            } 
        );
    });    
});

chrome.browserAction.setBadgeText(data.todayCase);
//chrome.browserAction.setBadgeText({text: '1.111'});
    
        
