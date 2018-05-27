/**
 * Created by alex on 25.05.2018.
 */

/*
https://en.wikipedia.org/w/api.php?
format=json&
action=query&
generator=search&
gsrnamespace=0&
gsrlimit=10&
prop=pageimages|extracts&
pilimit=max&
exintro&
explaintext&
exsentences=1&
exlimit=max&
gsrsearch=Tyson
*/

function WikiRequester(){
    this.url = "https://en.wikipedia.org/w/api.php";
}


WikiRequester.prototype.getPage = function(aSearch){
    var self = this;

    $.ajax({
        url: this.url,
        data: {
                "action" : "query",
                "generator" : "search",
                "format": "json",
                "gsrnamespace" : 0,
                "gsrlimit" : 10,
                "prop" : "pageimages|extracts",
                "pilimit" : "max",
                "exintro" : true,
                "explaintext" : true ,
                "exsentences" : 1,
                "exlimit" : "max",
                "origin" : "*",
                "gsrsearch" : aSearch
        },
        dataType: 'json',
        async: true,
        accept: {
            json: "application/json"
        },
        success: function(data){
           console.log("success");
            console.log(data.query.pages);
            $.each( data.query.pages, function( key, value ) {
                $("#data").append("<div class='container'>" +
                    "<a class='container-data' href='https://en.wikipedia.org/?curid="+ key +"' target='_blank'>"+
                    "<h4 class=''>"+ value.title +"</h4>" +
                    "<p class='lead'>"+value.extract+ "</p>" +
                    "</div>");
            });
        },
        error: function(data){
            console.log("error");
            console.log(data);
        },
    });
}

WikiRequester.prototype.getRandom = function(){
    var self = this;

    $.ajax({
        url: this.url,
        data: {
            "action" : "query",
            "generator" : "random",
            "format": "json",
            "gsrnamespace" : 0,
            "gsrlimit" : 1,
            "prop" : "pageimages|extracts",
            "pilimit" : "max",
            "exintro" : true,
            "explaintext" : true ,
            "exsentences" : 1,
            "exlimit" : "max",
            "origin" : "*"
        },
        dataType: 'json',
        async: true,
        accept: {
            json: "application/json"
        },
        success: function(data){
            console.log("success");
            console.log(data.query.pages);
            $.each( data.query.pages, function( key, value ) {
                $("#data").append("<div class='container'>" +
                    "<a class='container-data' href='https://en.wikipedia.org/?curid="+ key +"' target='_blank'>"+
                    "<h4 class=''>"+ value.title +"</h4>" +
                    "<p class='lead'>"+value.extract+ "</p>" +
                    "</div>");
            });
        },
        error: function(data){
            console.log("error");
            console.log(data);
        },
    });
}

function search(){
    var wr = new WikiRequester();
    $("#data").empty();
    if($("#search").val() != "")
        wr.getPage($("#search").val());
}

function random(){
    var wr = new WikiRequester();
    $("#data").empty();
    wr.getRandom();
}