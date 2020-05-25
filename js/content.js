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
                    $(".covid-around .countryInfo").text(`Türkiyenin Korona Son Durumu`);
                    $(".covid-around #confirmed").text(`${formatNr(data.cases)}`);
                    $(".covid-around #confirmedtoday").text(`${formatNr(data.todayCases)}`);
                    $(".covid-around #active").text(`${formatNr(data.active)}`);
                    $(".covid-around #recovered").text(`${formatNr(data.recovered)}`);
                    $(".covid-around #deaths").text(`${formatNr(data.deaths)}`);
                    $(".covid-around #deathstoday").text(`${formatNr(data.todayDeaths)}`);
                    $(".covid-around #deathrate").text(`${ " % " + (Math.round((data.deaths / data.cases) * 10000) / 100)}`);
                    $(".covid-around #carerate").text(`${ " % " + (Math.round((data.recovered / data.cases) * 10000) / 100)}`);
                    $(".covid-around #tests").text(`${formatNr(data.tests)}`);
                    $(".covid-around #critical").text(`${formatNr(data.critical)}`);
                } else {
                    $(".covid-around div").hide();
                    $(".covid-around .countryInfo").text(`Türkiye için Korona Durumu Yenilenemedi!!`);
                }
                $('.covid-around section').removeClass('loading');
            } 
        );
    });    
});