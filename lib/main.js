var PageMod = require("page-mod").PageMod;
var data = require("self").data;
var Request = require("request").Request;

PageMod({
  // page-mod will added only on the homepage and news page of penny-arcade.com,
  // with or without www as prefix.
  include: /^http:\/\/(www\.)?penny-arcade.com(\/|\/\d{4})?.*/,

  contentScriptFile: data.url("content.js"),

  contentScriptWhen: "ready",

  onAttach: function (worker) {
    worker.port.on("initialized", function(comicsPageURL) {
      console.log("initialized, comics page URL:", comicsPageURL);

      Request({
        url: comicsPageURL,

        onComplete: function (response) {
          let imageMatches = response.text.match(/<img src="([^"]+)"/i);

          if (imageMatches === null) {
            console.exception("Something went wrong")
            return;
          }

          console.log("comics image URL:", imageMatches[1]);

          worker.port.emit("comics-url", imageMatches[1]);

        }
      }).get();
    });

    worker.port.emit("init", data.url("content.css"));
  }
});