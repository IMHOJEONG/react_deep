let panel = 0;
let start = 0;
let frames = 0;

const create = () => {
  const div = document.createElement("div");

  div.style.position = "fixed";
  div.style.left = "10px";
  div.style.top = "10px";
  div.style.width = "50px";
  div.style.height = "50px";
  div.style.backgroundColor = "black";
  div.style.color = "pink";

  return div;
};

const tick = () => {
  frames++;
  const now = window.performance.now();
  if (now > start + 10000) {
    panel.innerText = frames;
    frames = 0;
    start = now;
  }
  window.requestAnimationFrame(tick);
};

const init = (parent = document.body) => {
  panel = create();

  window.requestAnimationFrame(() => {
    start = window.performance.now();
    parent.appendChild(panel);
    tick();
  });
};

init();
export default {
  init,
};
