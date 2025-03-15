// ---
// Section: Global Variables
// ---

const synth = window.speechSynthesis;
const utteranceList = [];
let automaticSpeechToggle = true;

// ---
// Section: Functions
// ---

const getJSONData = () => {
  return new Promise(async (resolve) => {
    const file = await fetch("/script/data/buttons.json");
    const data = await file.json();
    resolve(data);
  });
};

const setupGridButtons = () => {
  const gridButtons = document.querySelectorAll(".button-grid button");
  gridButtons.forEach((currentButton) => {
    currentButton.addEventListener("click", () => {
      pressButton(currentButton);
    });
  });
};

const createButtons = async () => {
  const buttonGrid = document.getElementById("button-grid");
  const buttonData = await getJSONData();
  const buttonKeys = Object.keys(buttonData);
  for (var i = 0; i < buttonKeys.length; i++) {
    let currentKey = buttonKeys[i];
    let currentButtons = buttonData[currentKey];
    for (var j = 0; j < currentButtons.length; j++) {
      let currentButtonData = currentButtons[j];
      let currentButton = document.createElement("button");
      currentButton.className = "button-" + currentKey;
      currentButton.type = "button";
      let currentDiv = document.createElement("div");
      currentDiv.className = "button-div";
      let currentImg = document.createElement("img");
      currentImg.className = "button-img";
      currentImg.src = currentButtonData.src;
      currentImg.alt = currentButtonData.alt;
      let currentText = document.createElement("p");
      currentText.className = "button-text";
      currentText.innerHTML = currentButtonData.text;
      currentDiv.appendChild(currentImg);
      currentDiv.appendChild(currentText);
      currentButton.appendChild(currentDiv);
      buttonGrid.appendChild(currentButton);
    }
  }
  setupGridButtons();
};

const replaceButtons = async (keyName) => {
  const buttonGrid = document.getElementById("button-grid");
  buttonGrid.innerHTML = "";

  const buttonData = await getJSONData();
  if (keyName == "all") {
    const buttonKeys = Object.keys(buttonData);
    for (var i = 0; i < buttonKeys.length; i++) {
      let currentKey = buttonKeys[i];
      let currentButtons = buttonData[currentKey];
      for (var j = 0; j < currentButtons.length; j++) {
        let currentButtonData = currentButtons[j];
        let currentButton = document.createElement("button");
        currentButton.className = "button-" + currentKey;
        currentButton.type = "button";
        let currentDiv = document.createElement("div");
        currentDiv.className = "button-div";
        let currentImg = document.createElement("img");
        currentImg.className = "button-img";
        currentImg.src = currentButtonData.src;
        currentImg.alt = currentButtonData.alt;
        let currentText = document.createElement("p");
        currentText.className = "button-text";
        currentText.innerHTML = currentButtonData.text;
        currentDiv.appendChild(currentImg);
        currentDiv.appendChild(currentText);
        currentButton.appendChild(currentDiv);
        buttonGrid.appendChild(currentButton);
      }
    }
  } else {
    let currentButtons = buttonData[keyName];
    for (var k = 0; k < currentButtons.length; k++) {
      let currentButtonData = currentButtons[j];
      let currentButton = document.createElement("button");
      currentButton.className = "button-" + keyName;
      currentButton.type = "button";
      let currentDiv = document.createElement("div");
      currentDiv.className = "button-div";
      let currentImg = document.createElement("img");
      currentImg.className = "button-img";
      currentImg.src = currentButtonData.src;
      currentImg.alt = currentButtonData.alt;
      let currentText = document.createElement("p");
      currentText.className = "button-text";
      currentText.innerHTML = currentButtonData.text;
      currentDiv.appendChild(currentImg);
      currentDiv.appendChild(currentText);
      currentButton.appendChild(currentDiv);
      buttonGrid.appendChild(currentButton);
    }
  }
  setupGridButtons();
};

const appendTextButton = (button) => {
  const textboxDiv = document.getElementById("text-box");
  const currentCopy = document.createElement("div");
  currentCopy.className =
    "div-copy div-" + button.className.split("button-")[1];
  const currentCopyDiv = document.createElement("div");
  currentCopyDiv.className = "text-div";
  const currentCopyImg = document.createElement("img");
  currentCopyImg.className = "text-img";
  currentCopyImg.src = button.querySelector(".button-img").src;
  currentCopyImg.alt = button.querySelector(".button-img").alt;
  const currentCopyText = document.createElement("p");
  currentCopyText.className = "text-text";
  currentCopyText.innerHTML = button.querySelector(".button-text").innerHTML;
  currentCopyDiv.appendChild(currentCopyImg);
  currentCopyDiv.appendChild(currentCopyText);
  currentCopy.appendChild(currentCopyDiv);
  textboxDiv.appendChild(currentCopy);
  textboxDiv.scrollTop = textboxDiv.scrollHeight;
};

const setupTopicButtons = () => {
  const topicButtons = document.querySelectorAll(".topic-grid button");
  topicButtons.forEach((currentButton) => {
    currentButton.addEventListener("click", () => {
      let keyName = currentButton.className.split("button-")[1];
      replaceButtons(keyName);
    });
  });
};

const pressButton = (button) => {
  const currentText = button.querySelector(".button-text").innerHTML;
  const currentUtterance = new SpeechSynthesisUtterance(currentText);
  utteranceList.push(currentUtterance);
  appendTextButton(button);
  if (automaticSpeechToggle) {
    synth.speak(currentUtterance);
  }
};

document.getElementById("text-toggle-button").addEventListener("click", () => {
  automaticSpeechToggle = !automaticSpeechToggle;
});
document.getElementById("text-read-button").addEventListener("click", () => {
  for (var i = 0; i < utteranceList.length; i++) {
    synth.speak(utteranceList[i]);
  }
});
document.getElementById("text-clear-button").addEventListener("click", () => {
  document.getElementById("text-box").innerHTML = "";
  utteranceList.length = 0;
});

createButtons();
setupTopicButtons();
