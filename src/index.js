import "../index.css";

const canvas = document.getElementById("hexCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");

function drawHexagon(context, x, y, size, width, height) {
  context.beginPath();
  for (let i = 0; i < 6; i++) {
    // if (i === 0) {
    //     context.strokeStyle = "#FF0000";
    // }
    let angle = ((2 * Math.PI) / 6) * i;
    let lineX = x + size * Math.cos(angle) * (i === 0 || i === 3 ? width : 1);
    let lineY = y + size * Math.sin(angle);
    context.lineTo(lineX, lineY);
  }
  context.closePath();
  context.stroke();
}
let counter = 1;
let zig = true;

let hw = 75;
let hh = 87;
let offset = false;

function drawHexBoard(context, x, y, w, h, counter) {
  // total hex width is 100
  // height seems like 137 ?
  for (let i = 0; i < w; i++) {
    if (i % 2) {
      offset = true;
    } else {
      offset = false;
    }
    for (let j = 0; j < h; j++) {
      drawHexagon(
        context,
        x + i * hw,
        y + j * hh + (offset ? 87 / 2 : 0),
        50,
        1
      );
    }
  }
}
function animate() {
  if (counter <= 0.5) {
    zig = false;
  }
  if (counter > 1) {
    zig = true;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawHexBoard(context, 0, 0, 28, 15, counter);
  counter += zig ? -0.01 : 0.01;
  requestAnimationFrame(animate);
}

animate();
