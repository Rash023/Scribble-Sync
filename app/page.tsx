'use client'

import { ChromePicker } from "react-color"
import { userDraw } from "../hooks/userDraw"
import { FC } from "react"
import {useState} from "react"


interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const { canvasRef,onMouseDown ,clear} = userDraw(drawLine)
  const [color,setColor]=useState<string>('#000')

  function drawLine({prevPoint,currentPoint,ctx}:Draw){
    const {x:currX, y:currY}=currentPoint
    const lineColor= color
    const lineWidth=5


    let startPoint=prevPoint ?? currentPoint
    ctx.beginPath()
    ctx.lineWidth=lineWidth
    ctx.strokeStyle=lineColor
    ctx.moveTo(startPoint.x,startPoint.y)
    ctx.lineTo(currX,currY)
    ctx.stroke()
    ctx.fillStyle=lineColor
    ctx.beginPath()
    ctx.arc(startPoint.x,startPoint.y,2,0,2*Math.PI)
    ctx.fill()



  }


  return (
    <div className="w-screen h-screen bg-[#818589] flex justify-center items-center">
      <div className="flex flex-col gap-10 pr-10 ">
        <ChromePicker color={color} onChange={(e)=>setColor(e.hex)}/>
        <button type='button' onClick={clear} className="p-2 rounded-md border border-black text-white bg-[#2C3539] shadow-md">Clear Canvas
        </button>
      </div>
      <canvas onMouseDown={onMouseDown} ref={canvasRef} width={750} height={750} className="border border-black rounded-md bg-white" />
    </div>
  )
}

export default Page
