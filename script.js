const ceil = document.querySelectorAll(".ceil");
const numX = document.querySelector(".numX");
const numO = document.querySelector(".numO");
const winner_text = document.querySelector(".winner_text");
const win_modal = document.querySelector(".win_modal");
const cross = document.querySelectorAll(".cross");

document.querySelector(".continue").addEventListener("click", () => {
  closeModal();
});
document.querySelector(".reset").addEventListener("click", () => {
  reset();
});
document.querySelector(".restart").addEventListener("click", () => {
  localStorage.clear();
  count();
  closeModal();
});

let [x, o] = JSON.parse(localStorage.getItem("tic-tac")) ?? [0, 0];
function count() {
  [x, o] = JSON.parse(localStorage.getItem("tic-tac")) ?? [0, 0];
  numX.innerHTML = x;
  numO.innerHTML = o;
}
count();
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let play = "&times;";

function step(play) {
  [...cross].forEach((el) => {
    el.classList.remove("active");
    if (el.innerHTML == "o" && play == "o") {
      el.classList.add("active");
    } else if (el.innerHTML !== "o" && play !== "o") {
      el.classList.add("active");
    }
  });
}
step(play);
ceil.forEach((el) => {
  el.addEventListener("click", (e) => {
    const num = e.target.classList[1];
    if (arr[num] === "&times;" || arr[num] === "o" || num == undefined) {
      return;
    }
    arr[num] = play;
    arr.forEach((e, i) => {
      if (i == num) {
        const x = document.createElement("p");
        x.innerHTML = `${e}`;
        el.append(x);
        check();
      }
    });
    play = play == "&times;" ? "o" : "&times;";
    step(play);
  });
});

function paint(el, num) {}

function check() {
  setTimeout(() => {
    if (win()) {
      if (win() == "o") {
        localStorage.setItem("tic-tac", JSON.stringify([x, ++o]));
        showModal("o");
        numO.innerHTML = o;
      } else {
        localStorage.setItem("tic-tac", JSON.stringify([++x, o]));
        showModal("&times;");
        numX.innerHTML = x;
      }
      reset();
    }
    if (!arr.some(Number)) {
      showModal("&#9829;");
      reset();
    }
  }, 500);
}
function win() {
  if (
    (arr[0] == arr[1] && arr[1] == arr[2]) ||
    (arr[0] == arr[3] && arr[3] == arr[6])
  ) {
    return arr[0];
  }

  if (
    (arr[4] == arr[0] && arr[0] == arr[8]) ||
    (arr[4] == arr[1] && arr[1] == arr[7]) ||
    (arr[4] == arr[2] && arr[2] == arr[6]) ||
    (arr[4] == arr[3] && arr[3] == arr[5])
  ) {
    return arr[4];
  }

  if (
    (arr[8] == arr[5] && arr[5] == arr[2]) ||
    (arr[8] == arr[7] && arr[7] == arr[6])
  ) {
    return arr[8];
  }
}

function showModal(arg) {
  win_modal.style.display = "flex";
  winner_text.innerHTML = `${arg}`;
}

function closeModal() {
  win_modal.style.display = "none";
}

function reset() {
  [...ceil].forEach((e) => {
    e.innerHTML = "";
  });
  arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  play = "&times;";
  step(play);
}
