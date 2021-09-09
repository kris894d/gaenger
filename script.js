"use strict";
const header = document.querySelector("h2");

// kode fra restdb - tag url'en//
const url = "https://hiking-f964.restdb.io/rest/dataliste";

// id fra main site//
const options = {
  headers: {
    "x-apikey": "6138a3ea7b91b61a0002921e",
  },
};

document.addEventListener("DOMContentLoaded", start);

let omroder;
let filtrer = "alle";

// første funktion - henter dataen fra html///
function start() {
  hentData();
  const filtrerKnapper = document.querySelectorAll("nav button");
  filtrerKnapper.forEach((knap) =>
    knap.addEventListener("click", filtrerOmroder)
  );
}

//den henter dataen som vi har defineret og angir at du kan navigere rundt i div. områder//
function filtrerOmroder() {
  hentData();
  filtrer = this.dataset.område;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  header.textContent = this.textContent;
}

// hentData fanger vores ruter og lister(arrays)i json fra restd///
async function hentData() {
  const rute = await fetch(url, options);
  const json = await rute.json();
  vis(json);
}

function vis(json) {
  console.log(json);
}
