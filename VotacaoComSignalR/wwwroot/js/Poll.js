"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/pollHub").build();
var chartBlock = '\u25A3';

connection.on("ReceiveMessage", function (user, message, myBandId, myBandVal) {

    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var pollResultMsg = user + " votou em '" + myBandVal + "'.";

    var ulPoll = document.getElementById("messagesList");
    var liPollResult = document.createElement("li");
    liPollResult.textContent = pollResultMsg;

    ulPoll.insertBefore(liPollResult, ulPoll.childNodes[0]);

    document.getElementById(myBandId + 'Block').innerHTML += chartBlock;
});

connection.start().catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = "";

    if (!user) {
        user = "[Anônimo]";
    }

    if ($('input:radio[name=myBand]').is(':checked')) {
        var myBandId = $('input[name=myBand]:checked').attr('id');
        var myBandVal = $('input[name=myBand]:checked').val();
        connection.invoke("SendMessage", user, message, myBandId, myBandVal).catch(function (err) {
            return console.error(err.toString());
        });
    } else {
        return console.log("Não possui nenhum tipo de votação selecionado.");
    }

    event.preventDefault();
});