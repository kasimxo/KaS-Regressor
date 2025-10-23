const CANVAS_WIDTH = 400
const CANVAS_HEIGHT = 400
const GRID_LINES_SPACE = 25

let ctx;
let dataPoints = []

function InitCanvas() {

    const canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    
    DrawGridLines(ctx)
    canvas.addEventListener('click', (e)=>DrawPoint(e));
    
}

function DrawGridLines(){
    ctx.beginPath();
    for(let y = 0; y<CANVAS_HEIGHT; y+=GRID_LINES_SPACE){
        ctx.moveTo(0, y)
        ctx.lineTo(CANVAS_WIDTH, y);
    }
    
    for(let x = 0; x<CANVAS_WIDTH; x+= GRID_LINES_SPACE){
        ctx.moveTo(x, 0)
        ctx.lineTo(x, CANVAS_HEIGHT);
    }
    ctx.stroke();
    ctx.closePath();
}

function DrawPoint(e){
    let x = e.offsetX
    let y = e.offsetY
    ctx.fillStyle = 'blue';
    console.log(x,y)
    ctx.arc(x, y, 5, 0, Math.PI * 2, true);
    ctx.fill()
    ctx.closePath()
    dataPoints.push([x, y])
}

InitCanvas()