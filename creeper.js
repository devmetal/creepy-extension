const creeper = chrome.runtime.getURL("images/creeper.png");
const explosion = chrome.runtime.getURL("images/explosion.gif");

let creeped = 0;
let started;
let finished;

// for sending massage back
// chrome.runtime.sendMessage({ message: "fixed", creeped });s

chrome.runtime.onMessage.addListener(function (request) {
  if (request.message === "start" && !creeped) {
    creeped = 0;

    document.querySelectorAll("img").forEach((tag) => {
      const { x, y, width, height } = tag.getBoundingClientRect();

      const monster = document.createElement("img");
      monster.src = creeper;
      monster.style.position = "absolute";
      monster.style.zIndex = 100;
      monster.style.top = `${y}px`;
      monster.style.left = `${x}px`;
      monster.style.width = `${width}px`;
      monster.style.height = `${height}px`;
      document.body.append(monster);

      monster.onclick = () => {
        monster.src = explosion;

        setTimeout(() => {
          monster.remove();
        }, 1000);
      };

      creeped++;
    });

    started = Date.now();
  }
});
