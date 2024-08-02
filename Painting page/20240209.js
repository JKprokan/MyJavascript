const canvas=document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const colorbtns=document.querySelectorAll(".pallet button");
const eraserbtn = document.querySelector("#eraser");
const downloadbtn = document.querySelector("#download");

let isDrawing = false;
let isErasing = false;

ctx.lineWidth = 5;
ctx.strokeStyle = 'red';
function startDrawing(e) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX,e.offsetY);
}
function Drawing(e) {
    if(isDrawing == false) return;
    if(isErasing){
        ctx.clearRect(e.offsetX, e.offsetY,20,20);
    }
    else{
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();
    }
}
function stopDrawing(){ 
    isDrawing = false;
    ctx.closePath();
}
function startErasing(e){
    isErasing = true;
    colorbtns.forEach(button => button.classList.remove("selected"));
    e.currentTarget.classList.add("selected");
    
}
function changeColor(e){
    isErasing = false;
    ctx.strokeStyle = e.currentTarget.dataset.color;
    colorbtns.forEach((button) => {
        if(button === e.currentTarget){
            button.classList.add("selected");
        }
        else {
            button.classList.remove("selected");
        }
    });
    eraserbtn.classList.remove("selected");
}

function downloadCanvas(){
    const image = canvas.toDataURL("image/png",1.0);
    const linkEl = document.createElement('a');
    linkEl.href = image;
    linkEl.download = 'PaintApp';
    linkEl.click();
}
canvas.addEventListener("mousedown",startDrawing);
canvas.addEventListener("mousemove",Drawing);
canvas.addEventListener("mouseup",stopDrawing);
colorbtns.forEach((button) => button.addEventListener("click",changeColor));
eraserbtn.addEventListener("click",startErasing);
downloadbtn.addEventListener("click",downloadCanvas)