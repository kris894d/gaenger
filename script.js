//const lavet til burgermenu. Navne defineret i HTML.
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

// Definere hvad der skal ske, når der er blevet klikket på burgerButton.
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

//Når alt content er loaded, så går vi ned i function "start"//
document.addEventListener("DOMContentLoaded", start);

//Her bliver vores filtrering defineret. let filtrer = "alle", definere at den skal starte ved alle.//
let omroder;
let filtrer = "alle";
const splash = document.querySelector(".splashbillede");

//første funktion - henter dataen fra html//
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

  if (filtrer == "alle") {
    splash.querySelector("img").src = "./img/sjælland_splash.jpg";
  } else {
    splash.querySelector("img").src = "img/" + filtrer + "_splash.jpg";
  }
}

// hentData fanger vores ruter og lister(arrays)i json fra restd//
async function hentData() {
  const rute = await fetch(url, options);
  const json = await rute.json();
  vis(json);
}

function vis(json) {
  console.log(json);

  //container henter liste elementer fra HTML og galleriTemplate henter template elementer i HTML//
  const container = document.querySelector("#liste");
  const galleriTemplate = document.querySelector("template");

  container.textContent = "";

  // hvert objekt i array(liste) kan rulles ud hver for sig og ligge i rigtigt orden 0-3fx //
  json.forEach((omroder) => {
    if (filtrer == omroder.område || filtrer == "alle") {
      let klon = galleriTemplate.cloneNode(true).content;

      klon.querySelector("img").src = "img/" + omroder.billed + ".jpg";

      klon.querySelector("h2").textContent = omroder.navn;
      klon.querySelector(".kortbeskrivelse").textContent =
        omroder.kortbeskrivelse;
      klon.querySelector(".km").textContent = omroder.km;
      klon.querySelector(".tid").textContent = omroder.tid;

      klon
        .querySelector("article")
        .addEventListener("click", () => visDetaljer(omroder));

      container.appendChild(klon);
    }
  });

  // hvert objekt i array(liste) kan blive kopiret over i vores popup vindue, indenfor det enkelte element //
  document
    .querySelector("#luk")
    .addEventListener("click", () => (popup.style.display = "none"));

  function visDetaljer(omroder) {
    console.log(omroder);
    const popup = document.querySelector("#popup");
    popup.style.display = "block";

    popup.querySelector("img").src = "img/" + omroder.billed + ".jpg";
    popup.querySelector("h2").textContent = omroder.navn;
    popup.querySelector(".kortbeskrivelse").textContent =
      omroder.kortbeskrivelse;
    popup.querySelector(".km").textContent = omroder.km;
    popup.querySelector(".tid").textContent = omroder.tid;
  }
}
