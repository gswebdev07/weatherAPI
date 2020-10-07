console.log("Client side javascript file is loaded!");

const form = document.querySelector("#form");
const address = document.querySelector("#location");
const message1 = document.querySelector("#p1");
const message2 = document.querySelector("#p2");

form.addEventListener("submit", (e) => {
  message1.textContent = "Loading...";
  message1.style.opacity = "1";
  message2.style.opacity = "0";
  e.preventDefault();
  fetch("http://localhost:3000/weather?address=" + address.value)
    .then((res) => res.json())
    .then((data) => {
      message1.style.opacity = "0";
      if (data.error) {
        message2.style.opacity = "1";
        message1.style.opacity = "0";
        message2.textContent = "Error : " + data.error;
        message1.textContent = "";
      } else {
        message1.textContent = data.forecast;
        message2.textContent = "";
        message1.style.opacity = "1";
        message2.style.opacity = "0";
      }
    });
});
