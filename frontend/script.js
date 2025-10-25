const CANVAS_WIDTH = 400
const CANVAS_HEIGHT = 400
const GRID_LINES_SPACE = 25
const GRID_MARGINS = 25

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
    ctx.strokeStyle = "grey";
    ctx.font = "15px serif";
    
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    for(let y = GRID_MARGINS; y<CANVAS_HEIGHT; y+=GRID_LINES_SPACE){
        ctx.moveTo(GRID_MARGINS, y)
        ctx.lineTo(CANVAS_WIDTH, y);
        if(y%(GRID_MARGINS*2)) ctx.fillText(`${y-GRID_MARGINS}`, GRID_MARGINS, CANVAS_HEIGHT-y);
    }
    
    ctx.textAlign = 'center'    
    ctx.textBaseline = 'top'
    for(let x = GRID_MARGINS; x<CANVAS_WIDTH; x+= GRID_LINES_SPACE){
        ctx.moveTo(x, 0)
        ctx.lineTo(x, CANVAS_HEIGHT-GRID_MARGINS);
        if(x%(GRID_MARGINS*2)!==0) ctx.fillText(`${x-GRID_MARGINS}`, x, CANVAS_HEIGHT-GRID_MARGINS);
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