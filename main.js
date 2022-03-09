//Variables
const petDiv = document.querySelector("#pet");
const messageBubble = document.querySelector("#messageBubble");

//Check max min value
const maxMinValue = (value) => {
  if (value < 0) {
    value = 0;
  } else if (value > 100) {
    value = 100;
  }
  return value;
}

//Object
class Pet {
  constructor(name, animalType, tiredness, hunger, loneliness, happiness) {
    this.name = name;
    this.animalType = animalType;
    this.tiredness = tiredness;
    this.hunger = hunger;
    this.loneliness = loneliness;
    this.happiness = happiness;
  }
  nap() {
    this.tiredness -= 50;
    this.tiredness = maxMinValue(this.tiredness);

    this.happiness -= 20;
    this.happiness = maxMinValue(this.happiness);

    this.hunger += 20;
    this.hunger = maxMinValue(this.hunger);

    this.loneliness += 20;
    this.loneliness = maxMinValue(this.loneliness);

    return this;
  }
  play() {
    if (this.tiredness < 70) {
      this.happiness += 30;
      this.happiness = maxMinValue(this.happiness);

      this.hunger += 20;
      this.hunger = maxMinValue(this.hunger);

      this.tiredness += 20;
      this.tiredness = maxMinValue(this.tiredness);

      this.loneliness -= 10;
      this.loneliness = maxMinValue(this.loneliness);

      return this;
    } else {
      console.log(`${this.name} is too tired to do this!`)
    }
  }
  eat() {
    this.hunger -= 60;
    this.hunger = maxMinValue(this.hunger);

    this.tiredness += 10;
    this.tiredness = maxMinValue(this.tiredness);

    return this;
  }
}

//Images 
const petImages = [
  {
    name: "mametchi",
    img: "mametchi.png"
  },
  {
    name: "kutchipatchi",
    img: "Kuchipatchi.PNG.png"
  },
  {
    name: "memetchi",
    img: "Memetchi_blue.png"
  },
  {
    name: "mimitchi",
    img: "Mimitchi_blue.PNG.png"
  },
  {
    name: "itchigotchi",
    img: "Ichigotchi.png"
  }
]



//Render stats
const renderStat = (type, value) => {
  const div = document.createElement("div");
  div.classList.add("stats")
  const label = document.createElement("label");
  label.innerText = type;
  label.for = `${type}Progress`;
  const progress = document.createElement("progress");
  progress.classList.add("progressBar")
  progress.id = `${type}Progress`;
  progress.value = value;
  progress.max = 100;
  div.appendChild(label);
  div.appendChild(progress);
  //petDiv.appendChild(div);
  return div;
}
//Get and append new stats
const updateStats = (statsDiv, tiredness, hunger, loneliness, happiness, pet) => {
    statsDiv.innerHTML ="";
    tiredness = renderStat("tiredness", pet.tiredness);
    hunger = renderStat("hunger", pet.hunger);
    loneliness = renderStat("loneliness", pet.loneliness);
    happiness = renderStat("happiness", pet.happiness);
    statsDiv.appendChild(tiredness);
    statsDiv.appendChild(hunger);
    statsDiv.appendChild(loneliness);
    statsDiv.appendChild(happiness);
}

/*const renderButton = (method, text, buttonDiv, pet) => {
  const button = document.createElement("button");
  button.innerText = text;
  button.addEventListener("click", () => {
    pet.nap();
    renderPet(pet)
  })
  buttonDiv.appendChild(button);
};*/


//Update message
const updateMessage = (message) => {
  console.log(message)
    messageBubble.classList.remove("hidden");
    messageBubble.innerText = message;
}



//Render Pet
const renderPet = (pet, myPetDiv) => {
  //Create elements
  const buttonDiv = document.createElement("div");
  buttonDiv.innerHTML = "";
  buttonDiv.classList.add("buttonDiv");

  const name = document.createElement("h2");
  name.innerText = pet.name.toUpperCase();
  myPetDiv.appendChild(name);

  const type = document.createElement("p");
  type.innerText = pet.animalType;
  myPetDiv.appendChild(type);

  //Render image
  const img = document.createElement("img");
  let imgUrl = "";
  petImages.forEach(obj => {
    if (obj.name == pet.animalType) {
      imgUrl = obj.img;
    }
  })
  img.src = imgUrl;
  myPetDiv.appendChild(img);

  //Render stats
  let tiredness = renderStat("tiredness", pet.tiredness);
  let hunger = renderStat("hunger", pet.hunger);
  let loneliness = renderStat("loneliness", pet.loneliness);
  let happiness = renderStat("happiness", pet.happiness);
  let statsDiv = document.createElement("div");
  statsDiv.appendChild(tiredness);
  statsDiv.appendChild(hunger);
  statsDiv.appendChild(loneliness);
  statsDiv.appendChild(happiness);
  myPetDiv.appendChild(statsDiv);
  

  //Render buttons

  /*renderButton(pet.nap, "Nap", buttonDiv, pet);
  renderButton(pet.play, "Play", buttonDiv, pet);
  renderButton(pet.eat, "Feed", buttonDiv, pet);*/

  const napButton = document.createElement("button");
  napButton.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  napButton.addEventListener("click", () => {
    pet.nap();
    updateStats(statsDiv, tiredness, hunger, loneliness, happiness, pet);
    updateMessage(`${pet.name} cried themselves to sleep`);
  })
  buttonDiv.appendChild(napButton);

  const playButton = document.createElement("button");
  playButton.innerHTML = `<i class="fa-solid fa-football"></i>`;
  playButton.addEventListener("click", () => {
    pet.play();
    updateStats(statsDiv, tiredness, hunger, loneliness, happiness, pet);
    updateMessage(`for once, ${pet.name} actually feels loved since you constantly neglect them`);
  })
  buttonDiv.appendChild(playButton);

  const feedButton = document.createElement("button");
  feedButton.innerHTML = `<i class="fa-solid fa-utensils"></i>`;
  feedButton.addEventListener("click", () => {
    pet.eat();
    updateStats(statsDiv, tiredness, hunger, loneliness, happiness, pet);
    updateMessage(`${pet.name} is no longer starving`);
  })
  buttonDiv.appendChild(feedButton);

  //Kill
  const killButton = document.createElement("button");
  killButton.innerText = "MURDER"
  killButton.classList.add("killButton");
  killButton.addEventListener("click", () => {
    myPetDiv.remove();
    console.log(`${pet.name} is screaming in agony!`)
    messageBubble.innerText = `${pet.name} is screaming in agony`;
  });

  //Append
  myPetDiv.appendChild(buttonDiv);
  myPetDiv.appendChild(killButton);
  //petDiv.appendChild(myPetDiv);

  return myPetDiv;
}



//Submit
document.querySelector("#createPet").addEventListener("submit", (e) => {
  //Get values
  const nameInput = document.querySelector("#nameInput").value.toLowerCase();
  const typeInput = document.querySelector("#typeInput").value;

  //Clear input
  document.querySelector("#nameInput").value = "";
  document.querySelector("#typeInput").value = "mametchi";


  //Create and render pet
  const myPet = new Pet (nameInput, typeInput, 50, 50, 50, 50);

  const individualPetDiv = document.createElement("div");
  individualPetDiv.classList.add("indivdualPetDiv")
  const individualPet = renderPet(myPet, individualPetDiv);
  petDiv.appendChild(individualPet);

  //Adoption message
  updateMessage(`congratulations! you've adopted the ${typeInput} ${nameInput}!`);

  e.preventDefault();
})
