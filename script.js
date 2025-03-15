function drag(event) {
    event.dataTransfer.setData("text", event.target.outerHTML); 
}

const selectionBar = document.getElementById("selectionBar");

selectionBar.addEventListener("dragover", function(event) {
    event.preventDefault(); 
});

selectionBar.addEventListener("drop", function(event) {
    event.preventDefault(); 
    const data = event.dataTransfer.getData("text"); 
    const button = document.createElement("div");
    button.innerHTML = data; 
    button.firstChild.setAttribute("draggable", "false"); 
    selectionBar.appendChild(button); 
});