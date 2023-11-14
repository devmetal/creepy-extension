const creeper = chrome.runtime.getURL("images/creeper.png");

let creeped = 0;
let started;
let finished;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "start" && !creeped) {
    creeped = 0;

    document.querySelectorAll("img").forEach((tag) => {
      const original = tag.src;
      tag.src = creeper;

      creeped++;

      const fix = () => {
        tag.src = original;

        creeped--;
        chrome.runtime.sendMessage({ message: "fixed", creeped });

        if (0 === creeped) {
          finished = Date.now();
          console.log(started);
          console.log(finished);

          chrome.runtime.sendMessage({
            message: "finished",
            started,
            finished,
          });
        }

        tag.removeEventListener("mouseenter", fix);
      };

      tag.addEventListener("mouseenter", fix);
    });

    started = Date.now();
  }

  if (request.message === "reset") {
    /*document.querySelectorAll("img").forEach((tag, index) => {
      tag.src = old[index];
    });
    old = [];*/
  }
});
