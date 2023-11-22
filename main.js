//Funktion som fetchar öl från ett API
//Lägger in bild och text i ett kort utifrån API
//länka "see more" till ölens "info" och skriv ut det i en lista
// slumpas varje gång sidan laddar om
//En sökfunktion för att hitta öl och skriver ut en lista med max 10st items som är knappar som länkar till "see more"
//skapa ett kort i html som kan uppdateras med data från API. skall innehålla namnet på ölen & "see more"
//hämtar en lista på öl

const beerImg = document.querySelector(".main__beer-image");

//Hämtar alla öl
const getBeer = async () => {
    const response = await fetch("https://api.punkapi.com/v2/beers/")
    const data = await response.json();
    console.log("beers", data);

    
}

//Hämtar en random öl
const getRandomBeer = async () => {
    const response = await fetch("https://api.punkapi.com/v2/beers/random/")
    const data = await response.json();
    console.log("random beer", data); 
}

