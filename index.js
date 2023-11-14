function message(msg) {
  chrome.tabs.query(
    { currentWindow: true, active: true },
    async function (tabs) {
      var activeTab = tabs[0];

      chrome.tabs.sendMessage(activeTab.id, {
        message: msg,
      });
    }
  );
}

chrome.runtime.onMessage.addListener(function (request) {
  const results = document.querySelector("#results");

  if (request.message === "fixed") {
    const { creeped } = request;
    results.innerHTML = "Remaining: " + creeped;
  }

  if (request.message === "finished") {
    const { started, finished } = request;
    const inSeconds = (finished - started) / 1000;
    results.innerHTML = "You fixed the page in " + inSeconds + "s";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  message("start");
  const results = document.querySelector("#results");
  results.innerHTML = "";
});
