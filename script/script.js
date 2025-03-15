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
      let;
    }
  }
};
