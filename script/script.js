const getJSONData = () => {
  return new Promise(async (resolve) => {
    const file = await fetch("/script/data/buttons.json");
    const data = await file.json();
    resolve(data);
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
};

const setupButtons = () => {
  const topicButtons = document.querySelectorAll(".topic-grid button");
  topicButtons.forEach((currentButton) => {
    currentButton.addEventListener("click", () => {
      let keyName = currentButton.className.split("button-")[1];
      replaceButtons(keyName);
    });
  });
};

createButtons();
setupButtons();
