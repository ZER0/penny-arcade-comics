var PageMod = require("page-mod").PageMod;
var data = require("self").data;

PageMod({
  // page-mod will added only on the homepage and news page of penny-arcade.com,
  // with or without www as prefix.
  include: /^http:\/\/(www\.)?penny-arcade.com(\/|\/\d{4})?.*/,

  contentScriptFile: data.url("content.js"),

  contentScriptWhen: "ready",

  onAttach: function (worker) {
    worker.port.emit("init", data.url("content.css"));
  }
});