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
      currentButton.className = currentKey;
      currentButton.type = "button";
      let currentDiv = document.createElement("div");
      currentDiv.className = "button-div";
      let currentImg = document.createElement("img");
      currentDiv.className = "button-img";
      currentImg.src = currentButtonData.src;
      currentImg.alt = currentButtonData.alt;
      let currentText = document.createElement("p");
      currentDiv.className = "button-text";
      currentText.innerHTML = currentButtonData.text;
      currentDiv.appendChild(currentImg);
      currentDiv.appendChild(currentText);
      currentButton.appendChild(currentDiv);
      buttonGrid.appendChild(currentButton);
    }
  }
};

createButtons();
