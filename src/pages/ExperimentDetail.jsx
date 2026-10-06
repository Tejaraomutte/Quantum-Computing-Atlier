import { Link, useParams } from "react-router-dom";
import BlochSphere from "../components/BlochSphere";
import GateSimulator from "../components/GateSimulator";
import QuantumCircuit from "../components/QuantumCircuit";
import { experiments } from "../data/experiments";

const conceptContent = {
  "single-qubit": {
    aimTitle: "Understand a single qubit",
    aimText: "A classical bit is like a light switch: either off or on. A qubit is different because it can hold a quantum state that combines both possibilities at once. This is the starting point for understanding quantum information and why quantum computers can explore many outcomes in parallel. In beginner terms, the qubit is the smallest unit that makes quantum computing possible.",
    theoryTitle: "Why quantum states are special",
    theoryText: "A qubit is described by a state vector in two-dimensional space, often written as a + b|1⟩. The numbers a and b are complex amplitudes, which means they carry both magnitude and phase. When you measure the qubit, the system collapses to one of the two outcomes with probabilities based on these amplitudes. This is the key difference from classical bits, where the value is always definite before measurement.",
    procedureTitle: "How to explore it in practice",
    procedureText: "Use the simulator to rotate the state, change the measurement basis, and observe how the probabilities shift. Start with a simple state such as |0⟩ or |1⟩, then move toward a superposition by applying an operation like the Hadamard gate. Try to connect what you see on the screen to the math: the more balanced the amplitudes, the more likely each outcome becomes after measurement."
  },
  "bloch-sphere": {
    aimTitle: "Visualize the qubit on a sphere",
    aimText: "The Bloch sphere is a way to picture the state of a single qubit without needing advanced mathematics. Every point on the sphere represents one possible state, and the north and south poles correspond to the basic states |0⟩ and |1⟩. For beginners, this gives a simple mental model: a qubit is not just a number, but a direction in space. By changing that direction, you change the quantum state itself.",
    theoryTitle: "What the sphere is telling you",
    theoryText: "The Bloch sphere maps the qubit state onto a unit vector with three coordinates, similar to how a point on Earth is described by latitude and longitude. The angle of the vector tells you how much the qubit is in superposition, while the phase tells you the relative timing between the two basis states. This visual model helps explain why operations like rotations change the state without changing the qubit from being one bit to another. It turns abstract complex numbers into a more intuitive geometric picture.",
    procedureTitle: "How to use the sphere effectively",
    procedureText: "Experiment by rotating the state around different axes and watch the vector move across the sphere. A rotation around the X axis, for example, changes the relative phase between |0⟩ and |1⟩, while a rotation around the Y axis changes the probability balance. As you move the state, notice that the measurement probability changes even though the qubit still remains a single quantum object. This is the foundation for understanding gates, measurement, and quantum control."
  },
  superposition: {
    aimTitle: "Understand superposition",
    aimText: "Superposition means a qubit can be in a blend of states rather than only in a definite 0 or 1. In classical systems, a bit is always either one or the other. In quantum systems, the qubit may exist as a weighted combination of both states before measurement. This idea is central to quantum computing because it allows calculations to explore many paths at once.",
    theoryTitle: "Why superposition matters",
    theoryText: "Mathematically, a superposition state is written as α|0⟩ + β|1⟩, where α and β are amplitudes. These amplitudes are not just ordinary numbers; they decide the likelihood of seeing each result when measured. If α and β are equal, the qubit is equally likely to collapse to either outcome. Quantum algorithms use this ability to create interference patterns that make correct answers more likely than incorrect ones.",
    procedureTitle: "How to observe it in the lab",
    procedureText: "Start with the qubit in a well-defined state, then apply a gate that creates an equal mixture of 0 and 1. Measure many times and compare the distribution of outcomes. Even though each measurement gives a single answer, the repeated pattern reveals the underlying quantum state. This repeated observation is how students and researchers understand the behavior of superposition in real quantum systems."
  },
  "quantum-gates": {
    aimTitle: "Learn how gates change qubits",
    aimText: "A quantum gate is the quantum equivalent of a logic operation in classical computing. It is a unitary transformation that rotates or changes the qubit state without destroying the quantum information. Gates are the building blocks of a quantum circuit, just like AND, OR, and NOT are the building blocks of classical logic. If you want to build a quantum algorithm, you must first understand how gates manipulate the state of qubits.",
    theoryTitle: "How gates act on states",
    theoryText: "Each quantum gate is represented by a matrix, and applying the gate changes the state vector by matrix multiplication. Some gates, like the X gate, flip the qubit state in a way similar to a NOT gate. Others, like the Hadamard gate, create superposition by turning a definite state into a balanced combination. The exact effect depends on the gate and the basis in which the qubit is represented. This is why gate design is such a central skill in quantum programming.",
    procedureTitle: "How to explore gate behavior",
    procedureText: "In the simulator, apply a single gate and observe how the state changes immediately. Then try sequences of gates and compare the final output with your expectation. A very useful habit is to reason step by step: first the initial state, then the first gate, then the next gate. This helps build intuition for how quantum circuits work and why gate ordering matters in quantum computation."
  },
  entanglement: {
    aimTitle: "Explore entanglement",
    aimText: "Entanglement is one of the most surprising ideas in quantum physics. When two qubits become entangled, their states are linked together so that measuring one instantly tells you something about the other. This does not mean information travels faster than light, but it does mean the two qubits share a joined quantum description that cannot be separated into independent pieces.",
    theoryTitle: "Why entanglement is special",
    theoryText: "Before measurement, an entangled pair acts as a single system with correlations between its outcomes. If the qubits are prepared in a Bell state, measuring both yields matched results more often than random chance would allow. This correlation is stronger than any classical explanation could produce. Entanglement is essential for many quantum technologies, from secure communication to error-corrected computing.",
    procedureTitle: "How to perform the experiment",
    procedureText: "Prepare two qubits in a simple initial state, then apply a sequence of gates that creates entanglement, such as a Hadamard followed by a controlled-NOT. Measure the outputs repeatedly and compare the linked results. You will notice a pattern: the results are correlated in a way that reveals the shared quantum state. This helps explain why entanglement is often described as the heart of quantum information science."
  },
  cnot: {
    aimTitle: "Understand the CNOT gate",
    aimText: "The CNOT gate is a two-qubit gate that performs a controlled flip. In simple language, it checks the state of one qubit and, if it is 1, flips the other qubit. This makes it one of the most important operations in quantum computing because it creates correlations between qubits and is essential for entanglement and error correction.",
    theoryTitle: "What control means in practice",
    theoryText: "The control qubit acts like a switch: if it is in the state |1⟩, the target qubit is flipped; if the control is |0⟩, nothing happens. The gate is conditional in a way that has no classical equivalent in the same form. This conditional behavior is what allows quantum circuits to build layered and highly structured states from relatively simple building blocks.",
    procedureTitle: "How to experiment with it",
    procedureText: "Set the control qubit to different initial states and then apply the CNOT operation to see how the target changes. Repeat the experiment with both qubits in superposition states to see how correlations emerge. The key lesson is that the gate does not just act independently on each qubit; it couples them, which is the basis of many advanced quantum algorithms and protocols."
  },
  "bell-state": {
    aimTitle: "Study Bell states",
    aimText: "Bell states are the simplest and most important maximally entangled states of two qubits. They represent the cleanest example of quantum correlation and are often used as a reference point for entanglement experiments. A Bell state is not just a pair of random bits; it is a joint state with special symmetry and maximum correlation.",
    theoryTitle: "Why Bell states are useful",
    theoryText: "There are four Bell states, each corresponding to a different combination of correlation and phase. They help explain how quantum systems can be strongly linked even when the two qubits are far apart. In a Bell state, measuring one qubit tells you what the other qubit would be if measured in the same basis. This property is used in testing quantum mechanics and building secure communication ideas.",
    procedureTitle: "How to explore Bell states",
    procedureText: "Create a Bell state using a Hadamard gate on one qubit and then a CNOT to couple both qubits. Measure the pair many times and see how the results line up. Compare the outcomes with a classical pair of bits to understand why Bell states are fundamentally different. The effect is not simply noise or randomness; it is a specific kind of correlated quantum structure."
  },
  teleportation: {
    aimTitle: "Learn quantum teleportation",
    aimText: "Quantum teleportation is a protocol for moving the state of a qubit from one place to another without physically sending the qubit itself. It sounds magical, but it relies on shared entanglement and classical communication. The important point is that the original qubit is not copied in the ordinary sense; instead, the state is transferred into a new qubit using a measurement-and-correction process.",
    theoryTitle: "How the protocol works",
    theoryText: "Teleportation starts by creating an entangled pair between two qubits shared by the sender and receiver. The sender then performs a joint measurement on the qubit to be teleported and their half of the entangled pair. This measurement outcome is sent classically to the receiver, who applies a correction gate to recover the original state. The protocol uses both quantum and classical resources together, which is why it is such a famous example in quantum communication.",
    procedureTitle: "How to follow the steps",
    procedureText: "Step through the protocol in the simulator one stage at a time: create entanglement, prepare the message qubit, perform the Bell measurement, and then apply the correction. Notice how the receiver's qubit changes only after the classical information arrives. This demonstrates that teleportation is not magic and not faster-than-light travel; it is a carefully designed protocol that uses entanglement and communication together."
  },
  grover: {
    aimTitle: "Understand Grover's search algorithm",
    aimText: "Grover's algorithm is a quantum search method that speeds up the process of finding a marked item in an unstructured list. In classical computing, a search may require checking many entries one by one. Grover's algorithm uses amplitude amplification to boost the probability of the correct answer so that it becomes much more likely to be found after a small number of iterations.",
    theoryTitle: "Why amplitude amplification matters",
    theoryText: "The algorithm repeatedly applies a reflection about the marked state and a reflection about the uniform superposition. This combination makes the probability amplitude of the target item grow while the amplitudes of other items shrink. In beginner terms, the algorithm repeatedly nudges the quantum state toward the correct answer until the measurement is likely to return it. This is not a magical shortcut; it is a clever use of interference and phase changes.",
    procedureTitle: "How to simulate the process",
    procedureText: "Use the search simulator to mark a target item, apply the Grover iterations, and watch how the probabilities shift. Compare the number of steps needed to get a high-confidence answer with a classical search. You will begin to see why Grover's algorithm is powerful for search tasks, even though it does not solve every problem faster than classical methods."
  },
  qft: {
    aimTitle: "Learn the quantum Fourier transform",
    aimText: "The quantum Fourier transform is a key subroutine in many quantum algorithms. It is the quantum version of the classical Fourier transform, which is used to analyze frequencies and patterns in signals. In quantum computing, the QFT transforms information from the computational basis into a frequency-like basis, which is especially useful for problems involving periodicity and structure.",
    theoryTitle: "Why frequency representation is powerful",
    theoryText: "The Fourier transform changes how information is represented, making hidden patterns easier to detect. In a quantum context, this can help reveal periodicity in a function or enable efficient algorithms for number-theoretic tasks. The phase relationships between amplitudes become more visible after the transform, and this is exactly what many advanced quantum algorithms exploit. For beginners, the main idea is that QFT changes the perspective from ordinary basis states to a more revealing frequency domain.",
    procedureTitle: "How to understand it experimentally",
    procedureText: "Apply the transform to a simple state and observe how the amplitudes change in a structured way. Try using a state that has repeating patterns and compare the transformed output to the original state. This helps reveal how the QFT highlights periodic structure that would be harder to see in the original basis. The goal is not to memorize the matrix, but to understand how this transformation exposes patterns that are useful in quantum algorithms."
  }
};

export default function ExperimentDetail() {
  const { id } = useParams();
  const experiment = experiments.find((item) => item.id === id);

  if (!experiment) {
    return <section className="page not-found"><h1>Experiment not found</h1><Link to="/experiments">Return to experiments</Link></section>;
  }

  const content = conceptContent[id] || {
    aimTitle: `Understand ${experiment.title}`,
    aimText: `This concept introduces the fundamental ideas behind ${experiment.title}. You will learn how the quantum system behaves, what makes it different from classical logic, and how the simulation helps you explore the pattern visually. The goal is to build intuition before moving on to more advanced topics or algorithms.`,
    theoryTitle: "Quantum mechanics in action",
    theoryText: "Quantum information behaves differently from classical information because the state of a qubit is not limited to a single definite value before measurement. Instead, probability amplitudes, phase, and operations such as gates shape the result. The simulation below makes these ideas concrete by letting you manipulate the system and observe how the output changes. This is the bridge between abstract theory and practical intuition.",
    procedureTitle: "Experiment interactively",
    procedureText: "Manipulate the controls in the simulation, watch how the state responds, and compare your result with the theory above. Repeat the experiment several times with different inputs so you can notice consistent patterns. The more you test, the easier it becomes to connect the visualization with the underlying quantum reasoning."
  };

  const simulation =
    id === "bloch-sphere" ? <BlochSphere /> :
    id === "quantum-gates" ? <GateSimulator /> :
    <QuantumCircuit />;

  return (
    <section className="experiment-detail">
      <div className="experiment-heading">
        <span className="eyebrow">Experiment {experiment.number}</span>
        <h1>{experiment.title}</h1>
        <p>{experiment.description}</p>
      </div>

      <div className="learning-grid">
        <article>
          <span>Aim</span>
          <h2>{content.aimTitle}</h2>
          <p>{content.aimText}</p>
        </article>
        <article>
          <span>Theory</span>
          <h2>{content.theoryTitle}</h2>
          <p>{content.theoryText}</p>
        </article>
        <article>
          <span>Procedure</span>
          <h2>{content.procedureTitle}</h2>
          <p>{content.procedureText}</p>
        </article>
      </div>

      <section className="simulation-section">
        <div className="simulation-header"><span className="eyebrow">Simulation View</span><h2>Interactive experiment</h2></div>
        {simulation}
      </section>

      <div className="observation-box"><span className="eyebrow">Observation</span><h2>What did you observe?</h2><p>Record how the quantum state changes as you interact with the simulation. Compare your observations with the theoretical behavior of the quantum system and look for patterns in the probability distribution and phase changes.</p></div>
      <div className="assignment-box"><span className="eyebrow">Assignment</span><h2>Think like a quantum engineer.</h2><p>Try to predict what happens if you apply another gate before measuring. Describe your expected outcome in simple words, then verify it using the simulation to see whether your reasoning matches the actual quantum behavior.</p></div>
      <div className="references"><span className="eyebrow">References</span><p>Nielsen & Chuang — Quantum Computation and Quantum Information</p><p>IBM Quantum Learning resources</p></div>
    </section>
  );
}