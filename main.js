//Funktion som fetchar öl från ett API
//Lägger in bild och text i ett kort utifrån API
//länka "see more" till ölens "info" och skriv ut det i en lista
// slumpas varje gång sidan laddar om
//En sökfunktion för att hitta öl och skriver ut en lista med max 10st items som är knappar som länkar till "see more"
//skapa ett kort i html som kan uppdateras med data från API. skall innehålla namnet på ölen & "see more"
//hämtar en lista på öl

const beerImg = document.querySelector(".main__beer-image");
const randomBtn = document.querySelector("#random-beer-btn");
const beerTitle = document.querySelector("#beer-title");
const beerList = document.getElementById("search-list");
const seeMoreBtn = document.getElementById("see-more-btn");
const searchBtn = document.getElementById("searchBeerBtn");

//Hämtar alla öl
const getBeer = async () => {
  const response = await fetch(
    "https://api.punkapi.com/v2/beers?page=1&per_page=10"
  );
  const data = await response.json();
  console.log("beers", data); //arrayen

  // gör alla öl (data.name) till knappar
  for (const beer of data) {
    const beerNameBtn = document.createElement("button");
    beerNameBtn.innerText = beer.name;
    console.log("Ölnamn: ", beer.name);

    // lägger knapparn i en lista <li>
    const beerItem = document.createElement("li"); //skapar li i HTML
    beerItem.appendChild(beerNameBtn);
    beerList.append(beerItem); //gör så li-elementen syns i HTML
  }

  getRandomBeer();
};

//Hämtar en random öl
const getRandomBeer = async () => {
  const response = await fetch("https://api.punkapi.com/v2/beers/random");
  const data = await response.json();
  console.log("random beer", data);
  console.log("random beer", data[0]);
  beerImg.src = `${data[0]?.image_url}`;
  beerTitle.textContent = `${data[0].name}`;

  //kommer att skriva ut i bildrutan att bilden ej finns
  if (data[0]?.image_url === null) {
    console.log("bilden är null");
    beerImg.src =
      "https://img.freepik.com/premium-vector/beer-bottle-brown-glass-soda-drink-bottle-blank-alcohol-beverage-product-brand-illustration_83194-1979.jpg?size=626&ext=jpg&ga=GA1.1.2013632916.1700655652&semt=ais";
  }
  seeMoreBtn.addEventListener("click", () => {
    if (data[0].name) {
      beerList.innerText = "";
      let hops = [];
      let malt = [];

      data[0].ingredients.hops.forEach((element) => {
        // console.log("hops", element);
        hops.push(element.name);
      });

      data[0].ingredients.malt.forEach((element) => {
        console.log("malt", element);
        malt.push(element.name);
      });

      const beerDescription = document.createElement("ul");
      beerDescription.innerHTML = `
            <li>Description: ${data[0].description}<li/>
            <li>Alcohol by volume: ${data[0].abv}%<li/>
            <li>Brewers tips: ${data[0].brewers_tips}<li/>
            <li>Volume: ${data[0].volume.value} liters<li/>
            <li>Food pairing: ${data[0].food_pairing}<li/>
            <p>Ingredients</p>
            <li>Hops: ${hops}<li/>
            <li>Malt: ${malt}<li/>
            <li>Yeast: ${data[0].ingredients.yeast}<li/>
            `;

      beerList.append(beerDescription);
    }
  });
};



randomBtn.addEventListener("click", () => {
  getRandomBeer();
});

searchBtn.addEventListener("click", () => {

  });

getBeer();
