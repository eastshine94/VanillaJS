const title = document.querySelector("#title");

const CLICKED_CLASS = "clicked";

function clickhandle(){
    
    // const hasClass = title.classList.contains(CLICKED_CLASS);
   
    // if(!hasClass){
    //     title.classList.add(CLICKED_CLASS);
    // } else{
    //     title.classList.remove(CLICKED_CLASS);
    // }
    // toggle은 위 코드와 동일한 역할을 한다.
    title.classList.toggle(CLICKED_CLASS);
}

title.addEventListener("click", clickhandle);

