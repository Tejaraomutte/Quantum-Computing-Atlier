import { useEffect, useRef } from "react";

export default function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
    resize();
    addEventListener("resize", resize);
    const particles = Array.from({length: 85}, () => ({
      x: Math.random()*canvas.width, y: Math.random()*canvas.height,
      r: Math.random()*1.5+.3, vx:(Math.random()-.5)*.22, vy:(Math.random()-.5)*.22,
      p:Math.random()*Math.PI*2
    }));
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for (const q of particles) {
        q.x+=q.vx; q.y+=q.vy; q.p+=.012;
        if(q.x<0)q.x=canvas.width;if(q.x>canvas.width)q.x=0;
        if(q.y<0)q.y=canvas.height;if(q.y>canvas.height)q.y=0;
        ctx.beginPath();ctx.arc(q.x,q.y,q.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(103,232,249,${.25+Math.sin(q.p)*.16})`;ctx.fill();
      }
      raf=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(raf);removeEventListener("resize",resize);};
  },[]);
  return <canvas ref={canvasRef} className="particle-field"/>;
}