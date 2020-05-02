const name = document.getElementById("name");
const show = document.getElementById("show");
const buy = document.getElementById("buy");

const text = document.getElementById("text");

buy.addEventListener("click", handleclick);

function handleclick(e) {
  getRequest();
}

// Example POST method implementation:
async function postData(url = "", data = {}) {
  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
}

function loginRequest() {
  postData("HTTP://localhost:3000/users", {
    name: name.value,
    boughtTicketsToShow: show.value,
  }).then((data) => {
    console.log(data);
  });
}

async function getDate(url = "") {
  try {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (err) {}
}

function getRequest() {
  getDate(`HTTP://localhost:3000/users/${name.value}`).then((data) => {
    text.innerHTML = JSON.stringify(data);
  });
}
