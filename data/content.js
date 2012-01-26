function addStyleSheet(url) {
  var link = document.createElement("link");

  link.setAttribute("href", url);
  link.setAttribute("type", "text/css");
  link.setAttribute("rel", "StyleSheet");

  document.documentElement.appendChild(link);
}

function addComics() {
  var imageMatches = this.responseText.match(/<img src="([^"]+)"/i),
      url = imageMatches && imageMatches[1];

  if (!url) {
    console.exception("Something went wrong");
    return;
  }

  console.log("comics image URL:", url);

  var comicsImage = document.createElement("div");

  comicsImage.id = "penny-arcade-addon-comics";
  comicsImage.style.backgroundImage = "url(" + url + ")";

  document.body.appendChild(comicsImage);
}

self.port.on("init", function init(cssURL) {
  // We're not interested in frames
  if (window.frameElement) return;

  addStyleSheet(cssURL);

  var comicsPageURL = document.querySelector(".btnComic").href;
  var http = new XMLHttpRequest();

  http.open("GET", comicsPageURL, true);
  http.onload = addComics;
  http.send();
});
