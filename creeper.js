const creeper = chrome.runtime.getURL("images/creeper.png");
const explosion = chrome.runtime.getURL("images/explosion.gif");

let started;

const getImages = () => [...document.querySelectorAll("img")];

// for sending massage back
// chrome.runtime.sendMessage({ message: "fixed" });s

chrome.runtime.onMessage.addListener(function (request) {
  if (request.message === "start" && !started) {
    started = true;
  }
});
