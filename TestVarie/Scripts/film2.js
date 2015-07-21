/// <reference path="../typings/jquery/jquery.d.ts"/>



$(function () {
    var apiKey="626559fd3799f9466c64ea0daa420543";
    var baseUrl="";
    
    $.getJSON("https://api.themoviedb.org/3/configuration?api_key=" + apiKey,
        function (data) {
            baseUrl=data.images.base_url;
        }
    );
    

    
    
    $.getJSON("https://api.themoviedb.org/3/genre/movie/list?api_key=" + apiKey,
    function (data) {
        $.each(data.genres, function (i, item) {
            $("<option />")
                .text(item.name)
                .val(item.id)
                .appendTo("#ListeCategories");
        });
    });

    $("#getFilmsButton").click(function () {
        $.getJSON("https://api.themoviedb.org/3/discover/movie?api_key=" +
                apiKey + "&with_genres=" +  $("#ListeCategories").val() ,
         function (data) {
             $("#main").empty();
             $.each(data.results, function (i, item) {
                 $("<img />").attr("src", baseUrl + "w185" + item.poster_path).addClass("gauche").appendTo("#main");
                 $("<h3 />").text(item.title).appendTo("#main");
                 $("<p />").text(item.overview).appendTo("#main");
                 $("<br />").addClass("clear").appendTo("#main");
             });
         });
    });
});



