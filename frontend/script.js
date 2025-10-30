const API_URL = 'http://localhost:8080/regressor'
const CANVAS_WIDTH = 400
const CANVAS_HEIGHT = 400
const GRID_LINES_SPACE = 25
const GRID_MARGINS = 25
const DRAW_INTERVAL = 5

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
    ctx.beginPath();
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
        let body = JSON.stringify([...dataPoints].map(pair=>pair.split(',').map(Number)))
        
        const response = await fetch(API_URL, {
            method: 'POST',
            body: body
        })

        if(!response.ok) {
            throw new Error(response)
        }

        const data = await response.json()
        console.log("DATA: ", data)
        if(data.linear_regression !== undefined){
            DrawLinearRegression(data.linear_regression)
        }
        if(data.logarithmic_regression !== undefined) {
            DrawLogarithmicRegression(data.logarithmic_regression)
        }
        if(data.cuadratic_regression !== undefined) {
            DrawCuadraticRegression(data.cuadratic_regression)
        }
        if(data.exponential_regression !== undefined) {
            DrawExponentialRegression(data.exponential_regression)
        }
    } catch (error) {
        console.error(error)
    }
}

function DrawExponentialRegression([a, b]){
    ctx.beginPath();
    ctx.strokeStyle = "purple";
    ctx.moveTo(0, CANVAS_HEIGHT - a )
    for(let x2 = 0; x2 <= CANVAS_WIDTH; x2 += DRAW_INTERVAL){
        let y2 = CANVAS_HEIGHT - Math.pow(Math.E, b * x2) - a
        ctx.lineTo(x2, y2 );
    }
    ctx.stroke();
    ctx.closePath()
}

function DrawCuadraticRegression([a, b]){
    ctx.beginPath();
    ctx.strokeStyle = "orange";
    ctx.moveTo(0, CANVAS_HEIGHT - a )
    for(let x2 = 0; x2 <= CANVAS_WIDTH; x2 += DRAW_INTERVAL){
        let y2 = CANVAS_HEIGHT - b * (Math.pow(x2, 2)) - a
        ctx.lineTo(x2, y2 );
    }
    ctx.stroke();
    ctx.closePath()
}

function DrawLogarithmicRegression([a, b]){
    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.moveTo(0, CANVAS_HEIGHT - a )
    for(let x2 = 0; x2 <= CANVAS_WIDTH; x2 += DRAW_INTERVAL){
        let y2 = CANVAS_HEIGHT - b * (Math.log(x2)) - a
        ctx.lineTo(x2, y2 );
    }
    ctx.stroke();
    ctx.closePath()
}

function DrawLinearRegression([a, b]){
    ctx.beginPath();
    ctx.strokeStyle = "red";
    let x1 = 0
    let y1 = CANVAS_HEIGHT - a
    ctx.moveTo(x1, y1 )
    let x2 = CANVAS_WIDTH
    let y2 = CANVAS_HEIGHT - b * (x2) - a
    ctx.lineTo(x2, y2 );
    ctx.stroke();
    ctx.closePath()
}

InitPage()