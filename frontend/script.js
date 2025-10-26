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
    document.getElementById("canvas").addEventListener('click', (e)=>DrawPoint(e.offsetX, e.offsetY));
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
        let [x, y] = point.split(',')
        DrawPoint(x, y)
    })
}

function DrawPoint(x, y){
    ctx.fillStyle = 'blue';
    ctx.arc(x, y, 5, 0, Math.PI * 2, true);
    ctx.fill()
    ctx.closePath()
    dataPoints.add(`${x},${y}`)
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
        //let a = Math.random() * 3 - 1.5
        //let b = Math.random() * 200 + 100
        DrawLinearRegression([a, b]) // Simulate api response: y = ax + b -> a = 2, b = 55
    } catch (error) {
        console.error(error)
    }
}

function DrawLinearRegression([a, b]){
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.moveTo(0, CANVAS_HEIGHT - GRID_MARGINS - b)
    ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT - GRID_MARGINS - b - a * CANVAS_WIDTH);
    ctx.stroke();
    ctx.closePath()
}

InitPage()