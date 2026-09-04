import { useState } from "react";
import { Cpu, Database, Gauge, Radio, Thermometer, Waves } from "lucide-react";
const systems=[
 {id:"classical",icon:<Database/>,title:"Classical Computer",text:"Coordinates programs, data processing and experiment control."},
 {id:"control",icon:<Radio/>,title:"Control Electronics",text:"Generates precisely timed signals that manipulate physical qubits."},
 {id:"processor",icon:<Cpu/>,title:"Quantum Processor",text:"The central device where quantum states are prepared, transformed and measured."},
 {id:"cryogenic",icon:<Thermometer/>,title:"Cryogenic Environment",text:"Keeps many superconducting quantum systems at extremely low temperatures."},
 {id:"readout",icon:<Gauge/>,title:"Readout System",text:"Converts the quantum measurement into classical information."},
 {id:"signals",icon:<Waves/>,title:"Quantum Signals",text:"Microwave, optical or other physical signals can implement quantum operations."}
];
export default function Systems(){
 const [selected,setSelected]=useState("processor");
 const active=systems.find(x=>x.id===selected);
 return <section className="page"><div className="system-hero"><span className="eyebrow">Quantum Hardware</span><h1>Inside a<span> quantum computer.</span></h1><p>Click a system component to focus the architecture view and learn what role it plays.</p></div>
 <div className="system-lab"><div className="system-visual">
   {systems.slice(0,3).map((s,i)=><button key={s.id} onClick={()=>setSelected(s.id)} className={`arch-node ${s.id} ${selected===s.id?"selected":""}`} style={{"--i":i}}>{s.icon}<span>{s.title}</span></button>)}
   <div className="arch-core"><div className="core-rings"/><span>QPU</span></div>
   {systems.slice(3).map((s,i)=><button key={s.id} onClick={()=>setSelected(s.id)} className={`arch-node lower ${s.id} ${selected===s.id?"selected":""}`} style={{"--i":i}}>{s.icon}<span>{s.title}</span></button>)}
 </div><div className="system-detail"><span className="eyebrow">Selected Component</span><div className="detail-icon">{active.icon}</div><h2>{active.title}</h2><p>{active.text}</p><div className="detail-line"/><span>Interactive architecture • component {systems.findIndex(x=>x.id===active.id)+1} of {systems.length}</span></div></div>
 <div className="system-grid">{systems.map(s=><button className={`system-card ${selected===s.id?"active":""}`} onClick={()=>setSelected(s.id)} key={s.id}><div>{s.icon}</div><h3>{s.title}</h3><p>{s.text}</p></button>)}</div>
 </section>;
}