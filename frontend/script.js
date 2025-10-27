const API_URL = 'http://localhost:8080/regressor'
const CANVAS_WIDTH = 400
const CANVAS_HEIGHT = 400
const GRID_LINES_SPACE = 25
const GRID_MARGINS = 25

let ctx;
let dataPoints = new Set()

function InitPage(){
    InitCanvas()
    AddListeners()
}

function AddListeners(){
    document.getElementById("canvas").addEventListener('click', (e)=>HandlePoint(e));
    document.getElementById("reset-canvas-button").addEventListener('click', (e)=>ResetCanvas())
    document.getElementById("calculate-regression-button").addEventListener('click', (e)=>CalculateRegression())
}

function InitCanvas() {
    const canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    
    DrawGridLines(ctx)
}

function DrawGridLines(){
    ctx.beginPath();
    ctx.strokeStyle = "grey";    
    ctx.fillStyle = 'black';
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

function DrawPoints(){
    dataPoints.values().forEach(point=>{
        let [x, y] = point.split(',').map(Number)
        y = CANVAS_HEIGHT-y
        DrawPoint(x, y)
    })
}

function HandlePoint(e){    
    let x = e.offsetX
    let y = e.offsetY
    dataPoints.add(`${x},${CANVAS_HEIGHT-y}`)
    DrawPoint(x, y)
}

function DrawPoint(x, y){
    ctx.fillStyle = 'blue';
    ctx.arc(x, y, 5, 0, Math.PI * 2, true);
    ctx.fill()
    ctx.closePath()
}

function ResetCanvas(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    dataPoints.clear()
    InitCanvas()
}

function ClearCanvas(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    InitCanvas()
}

async function CalculateRegression(){
    ClearCanvas()
    DrawPoints()
    try {
        console.log([...dataPoints])
        let body = JSON.stringify([...dataPoints])
        console.log("REQUEST BODY: ", body)
        const response = await fetch(API_URL, {
            method: 'POST',
            body: body
        })

        if(!response.ok) {
            throw new Error(response)
        }

        const content = await response.json()
        console.log("Response: ", content)
        let a = Number.parseFloat(content[0])
        let b = Number.parseFloat(content[1])
        DrawLinearRegression([a, b]) 
    } catch (error) {
        console.error(error)
    }
}

function DrawLinearRegression([a, b]){
    ctx.beginPath();
    ctx.strokeStyle = "red";
    let x1 = 0
    let y1 = a+CANVAS_HEIGHT+GRID_MARGINS
    ctx.moveTo(x1, y1 )
    let x2 = CANVAS_WIDTH
    let y2 = a - b *(x2)+CANVAS_HEIGHT-GRID_MARGINS
    ctx.lineTo(x2, y2 );
    ctx.stroke();
    ctx.closePath()
}

InitPage()