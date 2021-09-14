//Burgermenu
const burgerButton = document.querySelector(".burgerButton");
const streg1 = document.querySelector(".streg1");
const streg2 = document.querySelector(".streg2");
const streg3 = document.querySelector(".streg3");
const navbarLinks = document.querySelector(".navbarLinks");

// Når HTML og CSS er loaded startes sidenVises
window.addEventListener("load", sidenVises);

// Når #burger_btn er "clicked" startes open
function sidenVises() {
  burgerButton.addEventListener("click", open);
}

function open() {
  console.log("open menu");
  streg1.classList.toggle("aktiv");
  streg2.classList.toggle("aktiv");
  streg3.classList.toggle("aktiv");
  navbarLinks.classList.toggle("aktiv");
}

//Listedokument
("use strict");
const header = document.querySelector("h2");

// kode fra restdb - tag url'en//
const url = "https://hiking-f964.restdb.io/rest/dataliste";

// id fra main site//
const options = {
  headers: {
    "x-apikey": "6139ec0c43cedb6d1f97eeec",
  },
};

document.addEventListener("DOMContentLoaded", start);

let omroder;
let filtrer = "alle";

// // første funktion - henter dataen fra html///
function start() {
  const filtrerKnapper = document.querySelectorAll("nav button");
  filtrerKnapper.forEach((knap) =>
    knap.addEventListener("click", filtrerOmroder)
  );
  hentData();
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

  const container = document.querySelector("#liste");
  const galleriTemplate = document.querySelector("template");
  const splash = document.querySelector(".splashbillede");
  container.textContent = "";

  // hvert objekt i array(liste) kan rulles ud hvert for sig og ligge i rigtigt orden 0-3fx //
  json.forEach((omroder) => {
    if (filtrer == omroder.område || filtrer == "alle") {
      let klon = galleriTemplate.cloneNode(true).content;
      klon.querySelector("img").src = "img/" + omroder.billed + ".jpg";
      klon.querySelector("h2").textContent = omroder.navn;
      klon.querySelector(".kortbeskrivelse").textContent =
        omroder.kortbeskrivelse;
      klon.querySelector(".km").textContent = omroder.km;
      klon.querySelector(".tid").textContent = omroder.tid;
      splash.querySelector("img").src = "img/" + omroder.splashbillede + ".jpg";

      container.appendChild(klon);
    }
  });
  document
    .querySelector("#luk")
    .addEventListener("click", () => (popup.style.display = "none"));
    function visDetaljer(omrod)
}
