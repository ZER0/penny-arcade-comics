function addStyleSheet(url) {
  var link = document.createElement("link");

  link.setAttribute("href", url);
  link.setAttribute("type", "text/css");
  link.setAttribute("rel", "StyleSheet");

  document.documentElement.appendChild(link);
}

self.port.on("comics-url", function(url) {
  var comicsImage = document.createElement("div");

  comicsImage.id = "penny-arcade-addon-comics";
  comicsImage.style.backgroundImage = "url(" + url + ")";

  document.body.appendChild(comicsImage);
});

self.port.on("init", function init(cssURL) {
  // We're not interested in frames
  if (window.frameElement) return;

  console.log("content script, init");

  addStyleSheet(cssURL);

  var comicsPageURL = document.querySelector(".btnComic").href;

  self.port.emit("initialized", comicsPageURL);
});
