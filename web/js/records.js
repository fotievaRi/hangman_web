window.onload = function () {

    var xml = new XMLHttpRequest();
    xml.open("GET", "/profile", true);
    xml.onload = function (ev) {
        var records = JSON.parse(xml.responseText);
        var div = document.createElement("div");
        var listHTML = document.getElementById("list");

    };
    xml.send();
}