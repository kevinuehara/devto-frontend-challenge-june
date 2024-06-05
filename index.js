const BASE_URL_PATH = "https://wygzk.wiremockapi.cloud/beachs";
const cardsBeach = document.getElementsByClassName("beach-list__box");
let activeMap = false;
let x, y;
const locations = [];

const map = L.map("map");

const insertElementOnCard = async () => {
  const response = await fetch(BASE_URL_PATH);
  const data = await response.json();
  let index = 0;
  for (card of cardsBeach) {
    const domImg = document.createElement("img");
    card.setAttribute(
      "onclick",
      `renderMap(${data[index].location[0]},${data[index].location[1]})`
    );
    const textContent = card.firstElementChild.textContent;
    domImg.src = data[index].image;
    domImg.style.width = "100%";
    domImg.style.height = "30%";
    domImg.ariaLabel = textContent;
    domImg.alt = textContent;
    locations.push(data[index].location);
    index++;
    card.appendChild(domImg);
  }
};

document.addEventListener("mousemove", function (event) {
  x = event.screenX;
  y = event.screenY;
});

const renderMap = (lat, long) => {
  const mapContainer = document.getElementsByClassName("map__container")[0];

  if (!activeMap) {
    mapContainer.style.display = "flex";
    mapContainer.style.justifyContent = "center";
    mapContainer.style.alignItems = "center";
    mapContainer.style.marginTop = `${y}px`;
    map.setView([lat, long], 4);
    L.marker([lat, long]).addTo(map);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    activeMap = true;
  } else {
    mapContainer.style.display = "none";
    activeMap = false;
  }
};

insertElementOnCard();
