//Variables
const petDiv = document.querySelector("#pet");

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
const renderStat = (type, value, petDiv) => {
  const div = document.createElement("div");
  const label = document.createElement("label");
  label.innerText = `${type}: `;
  label.for = `${type}Progress`;
  const progress = document.createElement("progress");
  progress.id = `${type}Progress`;
  progress.value = value;
  progress.max = 100;
  div.appendChild(label);
  div.appendChild(progress);
  petDiv.appendChild(div);
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


//Render Pet
const renderPet = (pet) => {
  //Create elements
  const myPetDiv = document.createElement("div");

  const buttonDiv = document.createElement("button");
  buttonDiv.innerHTML = "";

  const name = document.createElement("p");
  name.innerText = pet.name;
  myPetDiv.appendChild(name);

  const type = document.createElement("p");
  type.innerText = `Type: ${pet.animalType}`;
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
  img.style.width = "100px"
  myPetDiv.appendChild(img);

  //Render stats
  renderStat("tiredness", pet.tiredness, myPetDiv);
  renderStat("hunger", pet.hunger, myPetDiv);
  renderStat("loneliness", pet.loneliness, myPetDiv);
  renderStat("happiness", pet.happiness, myPetDiv);

  //Render buttons

  /*renderButton(pet.nap, "Nap", buttonDiv, pet);
  renderButton(pet.play, "Play", buttonDiv, pet);
  renderButton(pet.eat, "Feed", buttonDiv, pet);*/

  const napButton = document.createElement("button");
  napButton.innerText = "Nap";
  napButton.addEventListener("click", () => {
    pet.nap();
    myPetDiv.innerHTML = "";
    renderPet(pet)
    console.log(`You put ${pet.name} to bed`)
  })
  buttonDiv.appendChild(napButton);

  const playButton = document.createElement("button");
  playButton.innerText = "Play";
  playButton.addEventListener("click", () => {
    pet.play();
    myPetDiv.innerHTML = "";
    renderPet(pet)
    console.log(`You played with ${pet.name}`)
  })
  buttonDiv.appendChild(playButton);

  const feedButton = document.createElement("button");
  feedButton.innerText = "Feed";
  feedButton.addEventListener("click", () => {
    pet.eat();
    myPetDiv.innerHTML = "";
    renderPet(pet)
    console.log(`You fed ${pet.name}`)
  })
  buttonDiv.appendChild(feedButton);

  //Kill
  const killButton = document.createElement("button");
  killButton.innerText = "KILL!!!!!"
  killButton.addEventListener("click", () => {
    myPetDiv.remove();
    console.log(`${pet.name} is screaming in agony!`)
  });

  //Append
  myPetDiv.appendChild(buttonDiv);
  myPetDiv.appendChild(killButton);
  petDiv.appendChild(myPetDiv);
}

//Submit
document.querySelector("#createPet").addEventListener("submit", (e) => {
  //Get values
  const nameInput = document.querySelector("#nameInput").value;
  const typeInput = document.querySelector("#typeInput").value;

  //Create and render pet
  const myPet = new Pet (nameInput, typeInput, 50, 50, 50, 50);
  renderPet(myPet);

  e.preventDefault();
})
