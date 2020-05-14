const title = document.getElementById("title");
const handleResize = (event) => {
    console.log(event);
}

window.addEventListener("resize", handleResize);

function handleClick() {
    title.style.color= "blue";
}
title.addEventListener("click", handleClick);