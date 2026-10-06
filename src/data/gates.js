export const gateCategories = [
  "All",
  "Pauli",
  "Superposition & Phase",
  "Rotations",
  "2-Qubit Entangling",
  "3-Qubit Universal"
];

export const quantumGates = [
  {
    id: "pauli-x",
    name: "Pauli-X Gate (Quantum NOT)",
    symbol: "X",
    category: "Pauli",
    qubits: 1,
    summary: "Flips the state of a qubit from |0⟩ to |1⟩ and vice versa, equivalent to a classical NOT gate.",
    blochAction: "180° (π radians) rotation around the X-axis of the Bloch sphere.",
    matrix: [
      ["0", "1"],
      ["1", "0"]
    ],
    properties: {
      unitary: "Yes (X†X = I)",
      hermitian: "Yes (X = X†)",
      selfInverse: "Yes (X² = I)",
      determinant: "-1",
      eigenvalues: "+1 (for |+⟩), -1 (for |-⟩)"
    },
    functionality: {
      overview: "The Pauli-X gate is the fundamental bit-flip operation in quantum computing. It acts on the computational basis states by interchanging the ground state |0⟩ and the excited state |1⟩.",
      mechanism: "When applied to an arbitrary state |ψ⟩ = α|0⟩ + β|1⟩, the X gate swaps the probability amplitudes: X|ψ⟩ = β|0⟩ + α|1⟩. In the computational basis, it maps basis states deterministically. In the Hadamard basis, |+⟩ is an eigenstate with eigenvalue +1, and |-⟩ is an eigenstate with eigenvalue -1.",
      classicalAnalogue: "Classical NOT gate (inverter). Unlike classical NOT, Pauli-X preserves quantum coherence and superpositions.",
      geometric: "On the Bloch sphere, the X gate rotates the state vector by π radians around the X-axis, mirroring the north pole (|0⟩) to the south pole (|1⟩)."
    },
    truthTable: [
      { input: "|0⟩", output: "|1⟩", phase: "No phase change (1)", explanation: "Bit flipped: ground state transitions to excited state" },
      { input: "|1⟩", output: "|0⟩", phase: "No phase change (1)", explanation: "Bit flipped: excited state transitions to ground state" },
      { input: "|+⟩", output: "|+⟩", phase: "+1 eigenstate", explanation: "(|0⟩ + |1⟩)/√2 remains unchanged (eigenvalue +1)" },
      { input: "|-⟩", output: "-|-⟩", phase: "π (factor of -1)", explanation: "(|0⟩ - |1⟩)/√2 acquires a global phase of -1" },
      { input: "α|0⟩ + β|1⟩", output: "β|0⟩ + α|1⟩", phase: "Linear superposition", explanation: "Amplitudes α and β are exchanged" }
    ],
    applications: [
      "Qubit state initialization (preparing |1⟩ from |0⟩)",
      "Target bit inversion in controlled gates (CNOT, Toffoli)",
      "Quantum error correction bit-flip syndrome recovery",
      "Bit-reversal and arithmetic in quantum algorithms"
    ],
    testInputs: [
      { label: "|0⟩", state: "|0⟩", outState: "|1⟩", probs: { "0": 0, "1": 100 } },
      { label: "|1⟩", state: "|1⟩", outState: "|0⟩", probs: { "0": 100, "1": 0 } },
      { label: "|+⟩", state: "(|0⟩+|1⟩)/√2", outState: "|+⟩", probs: { "0": 50, "1": 50 } },
      { label: "|-⟩", state: "(|0⟩-|1⟩)/√2", outState: "-|-⟩", probs: { "0": 50, "1": 50 } }
    ]
  },
  {
    id: "pauli-y",
    name: "Pauli-Y Gate (Bit & Phase Flip)",
    symbol: "Y",
    category: "Pauli",
    qubits: 1,
    summary: "Simultaneously flips the bit and introduces an imaginary relative phase of π.",
    blochAction: "180° (π radians) rotation around the Y-axis of the Bloch sphere.",
    matrix: [
      ["0", "-i"],
      ["i", "0"]
    ],
    properties: {
      unitary: "Yes (Y†Y = I)",
      hermitian: "Yes (Y = Y†)",
      selfInverse: "Yes (Y² = I)",
      determinant: "-1",
      eigenvalues: "+1 (for |+i⟩), -1 (for |-i⟩)"
    },
    functionality: {
      overview: "The Pauli-Y gate performs both a bit-flip and a phase-flip simultaneously (Y = iXZ). It maps |0⟩ to i|1⟩ and |1⟩ to -i|0⟩.",
      mechanism: "Acting on an arbitrary state |ψ⟩ = α|0⟩ + β|1⟩, the result is Y|ψ⟩ = -iβ|0⟩ + iα|1⟩. Its eigenstates are |+i⟩ = (|0⟩ + i|1⟩)/√2 and |-i⟩ = (|0⟩ - i|1⟩)/√2 with eigenvalues +1 and -1 respectively.",
      classicalAnalogue: "No direct classical analogue, because it introduces complex probability amplitudes.",
      geometric: "On the Bloch sphere, it rotates the state vector by π radians around the Y-axis."
    },
    truthTable: [
      { input: "|0⟩", output: "i|1⟩", phase: "+π/2 (+i phase factor)", explanation: "Flipped to |1⟩ with an imaginary phase multiplier +i" },
      { input: "|1⟩", output: "-i|0⟩", phase: "-π/2 (-i phase factor)", explanation: "Flipped to |0⟩ with an imaginary phase multiplier -i" },
      { input: "|+i⟩", output: "|+i⟩", phase: "+1 eigenstate", explanation: "(|0⟩ + i|1⟩)/√2 unchanged (eigenvalue +1)" },
      { input: "|-i⟩", output: "-|-i⟩", phase: "-1 eigenstate", explanation: "(|0⟩ - i|1⟩)/√2 acquires a factor of -1" },
      { input: "α|0⟩ + β|1⟩", output: "-iβ|0⟩ + iα|1⟩", phase: "Complex phase flip", explanation: "Simultaneous bit flip and complex phase rotation" }
    ],
    applications: [
      "Quantum error correction (correcting joint bit-flip and phase-flip errors)",
      "Single-qubit universal gate synthesis",
      "Hamiltonian simulation of spin-1/2 Heisenberg models",
      "Quantum tomography and Pauli measurement bases"
    ],
    testInputs: [
      { label: "|0⟩", state: "|0⟩", outState: "i|1⟩", probs: { "0": 0, "1": 100 } },
      { label: "|1⟩", state: "|1⟩", outState: "-i|0⟩", probs: { "0": 100, "1": 0 } },
      { label: "|+i⟩", state: "(|0⟩+i|1⟩)/√2", outState: "|+i⟩", probs: { "0": 50, "1": 50 } },
      { label: "|-i⟩", state: "(|0⟩-i|1⟩)/√2", outState: "-|-i⟩", probs: { "0": 50, "1": 50 } }
    ]
  },
  {
    id: "pauli-z",
    name: "Pauli-Z Gate (Phase Flip)",
    symbol: "Z",
    category: "Pauli",
    qubits: 1,
    summary: "Leaves |0⟩ unchanged and inverts the sign of |1⟩ by applying a π phase shift.",
    blochAction: "180° (π radians) rotation around the Z-axis of the Bloch sphere.",
    matrix: [
      ["1", "0"],
      ["0", "-1"]
    ],
    properties: {
      unitary: "Yes (Z†Z = I)",
      hermitian: "Yes (Z = Z†)",
      selfInverse: "Yes (Z² = I)",
      determinant: "-1",
      eigenvalues: "+1 (for |0⟩), -1 (for |1⟩)"
    },
    functionality: {
      overview: "The Pauli-Z gate is the quintessential phase-flip operation. It preserves computational measurement probabilities for definite states, but inverts relative phases in superpositions.",
      mechanism: "Acting on |ψ⟩ = α|0⟩ + β|1⟩, Z|ψ⟩ = α|0⟩ - β|1⟩. It interchanges the Hadamard basis states: Z|+⟩ = |-⟩ and Z|-⟩ = |+⟩.",
      classicalAnalogue: "No classical equivalent; classical bits do not have quantum phase degrees of freedom.",
      geometric: "On the Bloch sphere, the Z-gate rotates the state vector by π radians around the Z-axis (equatorial reflection)."
    },
    truthTable: [
      { input: "|0⟩", output: "|0⟩", phase: "0 (no phase change)", explanation: "Ground state remains invariant" },
      { input: "|1⟩", output: "-|1⟩", phase: "π (factor of -1)", explanation: "Excited state phase flipped: |1⟩ acquires minus sign" },
      { input: "|+⟩", output: "|-⟩", phase: "Superposition phase flip", explanation: "(|0⟩ + |1⟩)/√2 transforms into (|0⟩ - |1⟩)/√2" },
      { input: "|-⟩", output: "|+⟩", phase: "Superposition phase flip", explanation: "(|0⟩ - |1⟩)/√2 transforms into (|0⟩ + |1⟩)/√2" },
      { input: "α|0⟩ + β|1⟩", output: "α|0⟩ - β|1⟩", phase: "Relative phase inversion", explanation: "Phase of the |1⟩ component is flipped by 180°" }
    ],
    applications: [
      "Quantum phase-flip error correction (Shor 9-qubit code)",
      "Oracle phase inversion in Grover's search algorithm",
      "Controlled-Z (CZ) entangling gate construction",
      "Quantum state teleportation correction"
    ],
    testInputs: [
      { label: "|0⟩", state: "|0⟩", outState: "|0⟩", probs: { "0": 100, "1": 0 } },
      { label: "|1⟩", state: "|1⟩", outState: "-|1⟩", probs: { "0": 0, "1": 100 } },
      { label: "|+⟩", state: "(|0⟩+|1⟩)/√2", outState: "|-⟩", probs: { "0": 50, "1": 50 } },
      { label: "|-⟩", state: "(|0⟩-|1⟩)/√2", outState: "|+⟩", probs: { "0": 50, "1": 50 } }
    ]
  },
  {
    id: "hadamard",
    name: "Hadamard Gate (Superposition Generator)",
    symbol: "H",
    category: "Superposition & Phase",
    qubits: 1,
    summary: "Creates an equal superposition of |0⟩ and |1⟩, turning deterministic bits into quantum states.",
    blochAction: "180° rotation around the diagonal (X + Z)/√2 axis on the Bloch sphere.",
    matrix: [
      ["1/√2", "1/√2"],
      ["1/√2", "-1/√2"]
    ],
    properties: {
      unitary: "Yes (H†H = I)",
      hermitian: "Yes (H = H†)",
      selfInverse: "Yes (H² = I)",
      determinant: "-1",
      eigenvalues: "+1 (for cos(π/8)|0⟩ + sin(π/8)|1⟩), -1"
    },
    functionality: {
      overview: "The Hadamard gate is the most celebrated single-qubit gate in quantum computing. It converts computational basis states {|0⟩, |1⟩} into superposition states {|+⟩, |-⟩}.",
      mechanism: "H|0⟩ = (|0⟩ + |1⟩)/√2 = |+⟩, giving equal 50% probability to measure 0 or 1. H|1⟩ = (|0⟩ - |1⟩)/√2 = |-⟩. Applying H twice returns the state to its original configuration (H² = I), illustrating constructive and destructive interference.",
      classicalAnalogue: "Fair coin toss if followed immediately by measurement, but reversible and coherent in quantum circuits.",
      geometric: "Maps the Z-axis of the Bloch sphere to the X-axis, swapping longitudinal poles with equatorial states."
    },
    truthTable: [
      { input: "|0⟩", output: "(|0⟩ + |1⟩)/√2 = |+⟩", phase: "Equal in-phase superposition", explanation: "Creates 50%/50% superposition with 0 relative phase" },
      { input: "|1⟩", output: "(|0⟩ - |1⟩)/√2 = |-⟩", phase: "Equal opposite-phase superposition", explanation: "Creates 50%/50% superposition with π relative phase" },
      { input: "|+⟩", output: "|0⟩", phase: "Interference reconstruction", explanation: "Constructive interference on |0⟩, destructive on |1⟩" },
      { input: "|-⟩", output: "|1⟩", phase: "Interference reconstruction", explanation: "Destructive interference on |0⟩, constructive on |1⟩" },
      { input: "α|0⟩ + β|1⟩", output: "((α+β)|0⟩ + (α-β)|1⟩)/√2", phase: "Interference superposition", explanation: "Rotates state from Z basis into X basis" }
    ],
    applications: [
      "Algorithm initialization (creating uniform superposition of 2ⁿ states)",
      "Deutsch-Jozsa and Bernstein-Vazirani algorithms",
      "Grover's algorithm diffusion operator and search initialization",
      "Quantum Key Distribution (BB84 protocol basis switching)",
      "Quantum Fourier Transform (QFT) basis transitions"
    ],
    testInputs: [
      { label: "|0⟩", state: "|0⟩", outState: "|+⟩", probs: { "0": 50, "1": 50 } },
      { label: "|1⟩", state: "|1⟩", outState: "|-⟩", probs: { "0": 50, "1": 50 } },
      { label: "|+⟩", state: "|+⟩", outState: "|0⟩", probs: { "0": 100, "1": 0 } },
      { label: "|-⟩", state: "|-⟩", outState: "|1⟩", probs: { "0": 0, "1": 100 } }
    ]
  },
  {
    id: "phase-s",
    name: "Phase Gate (S Gate / √Z)",
    symbol: "S",
    category: "Superposition & Phase",
    qubits: 1,
    summary: "Applies a 90° (π/2) relative phase shift to |1⟩. Two S gates equal one Z gate.",
    blochAction: "90° (π/2 radians) rotation around the Z-axis of the Bloch sphere.",
    matrix: [
      ["1", "0"],
      ["0", "i"]
    ],
    properties: {
      unitary: "Yes (S†S = I)",
      hermitian: "No (S† ≠ S)",
      selfInverse: "No (S² = Z, S⁴ = I)",
      determinant: "i",
      eigenvalues: "+1 (for |0⟩), +i (for |1⟩)"
    },
    functionality: {
      overview: "The S gate (Phase gate) induces a quarter-turn rotation around the Z-axis. It is the square root of the Pauli-Z gate: S² = Z.",
      mechanism: "Leaves |0⟩ unchanged and multiplies the amplitude of |1⟩ by i = e^(iπ/2). It maps |+⟩ = (|0⟩+|1⟩)/√2 to |+i⟩ = (|0⟩+i|1⟩)/√2 (moving the state from the X-axis to the Y-axis on the Bloch sphere equator).",
      classicalAnalogue: "No classical counterpart.",
      geometric: "Rotates equatorial states counterclockwise by 90° around the vertical Z-axis."
    },
    truthTable: [
      { input: "|0⟩", output: "|0⟩", phase: "0 (unchanged)", explanation: "Ground state remains invariant" },
      { input: "|1⟩", output: "i|1⟩", phase: "+π/2 (+90° phase shift)", explanation: "Excited state acquires quarter-cycle phase i = e^(iπ/2)" },
      { input: "|+⟩", output: "|+i⟩ = (|0⟩ + i|1⟩)/√2", phase: "Mapped to +Y axis", explanation: "Moves superposition from +X axis to +Y axis" },
      { input: "|-⟩", output: "|-i⟩ = (|0⟩ - i|1⟩)/√2", phase: "Mapped to -Y axis", explanation: "Moves superposition from -X axis to -Y axis" },
      { input: "α|0⟩ + β|1⟩", output: "α|0⟩ + iβ|1⟩", phase: "Quarter-phase shift", explanation: "Imparts 90° relative phase between components" }
    ],
    applications: [
      "Clifford group generator (fault-tolerant quantum circuits)",
      "Quantum Fourier Transform (QFT) discrete phase adjustments",
      "Measurement in the Pauli-Y basis (H · S† sequence)",
      "Stabilizer quantum codes and surface code lattices"
    ],
    testInputs: [
      { label: "|0⟩", state: "|0⟩", outState: "|0⟩", probs: { "0": 100, "1": 0 } },
      { label: "|1⟩", state: "|1⟩", outState: "i|1⟩", probs: { "0": 0, "1": 100 } },
      { label: "|+⟩", state: "(|0⟩+|1⟩)/√2", outState: "|+i⟩", probs: { "0": 50, "1": 50 } },
      { label: "|-⟩", state: "(|0⟩-|1⟩)/√2", outState: "|-i⟩", probs: { "0": 50, "1": 50 } }
    ]
  },
  {
    id: "s-dagger",
    name: "S-Dagger Gate (S† / Inverse Phase)",
    symbol: "S†",
    category: "Superposition & Phase",
    qubits: 1,
    summary: "Applies a -90° (-π/2) relative phase shift to |1⟩, reversing the action of the S gate.",
    blochAction: "-90° (-π/2 radians) rotation around the Z-axis of the Bloch sphere.",
    matrix: [
      ["1", "0"],
      ["0", "-i"]
    ],
    properties: {
      unitary: "Yes (S†S = I)",
      hermitian: "No",
      selfInverse: "No ((S†)² = Z, (S†)⁴ = I)",
      determinant: "-i",
      eigenvalues: "+1 (for |0⟩), -i (for |1⟩)"
    },
    functionality: {
      overview: "The S† gate is the Hermitian conjugate and inverse of the S gate. It undoes the 90° Z-rotation applied by S.",
      mechanism: "S†|0⟩ = |0⟩, and S†|1⟩ = -i|1⟩ = e^(-iπ/2)|1⟩. When composed with S, S† · S = I.",
      classicalAnalogue: "None.",
      geometric: "Rotates equatorial states clockwise by 90° around the vertical Z-axis."
    },
    truthTable: [
      { input: "|0⟩", output: "|0⟩", phase: "0 (unchanged)", explanation: "Ground state remains invariant" },
      { input: "|1⟩", output: "-i|1⟩", phase: "-π/2 (-90° phase shift)", explanation: "Excited state acquires phase multiplier -i" },
      { input: "|+i⟩", output: "|+⟩", phase: "Mapped back to +X axis", explanation: "Restores |+i⟩ back to (|0⟩ + |1⟩)/√2" },
      { input: "|-i⟩", output: "|-⟩", phase: "Mapped back to -X axis", explanation: "Restores |-i⟩ back to (|0⟩ - |1⟩)/√2" }
    ],
    applications: [
      "Inverse Quantum Fourier Transform (IQFT)",
      "Uncomputing intermediate quantum phase registers",
      "Clifford group decomposition and circuit compilation"
    ],
    testInputs: [
      { label: "|0⟩", state: "|0⟩", outState: "|0⟩", probs: { "0": 100, "1": 0 } },
      { label: "|1⟩", state: "|1⟩", outState: "-i|1⟩", probs: { "0": 0, "1": 100 } },
      { label: "|+i⟩", state: "(|0⟩+i|1⟩)/√2", outState: "|+⟩", probs: { "0": 50, "1": 50 } }
    ]
  },
  {
    id: "t-gate",
    name: "T Gate (π/8 Gate / √S)",
    symbol: "T",
    category: "Superposition & Phase",
    qubits: 1,
    summary: "Applies a 45° (π/4) phase shift. Essential for achieving universal quantum computing.",
    blochAction: "45° (π/4 radians) rotation around the Z-axis of the Bloch sphere.",
    matrix: [
      ["1", "0"],
      ["0", "e^(iπ/4)"]
    ],
    properties: {
      unitary: "Yes (T†T = I)",
      hermitian: "No",
      selfInverse: "No (T² = S, T⁴ = Z, T⁸ = I)",
      determinant: "e^(iπ/4) = (1+i)/√2",
      eigenvalues: "+1, e^(iπ/4)"
    },
    functionality: {
      overview: "The T gate performs a π/4 (45°) phase rotation. It is also historically called the π/8 gate because with global phase factoring it can be written as diag(e^(-iπ/8), e^(iπ/8)).",
      mechanism: "T|0⟩ = |0⟩, and T|1⟩ = e^(iπ/4)|1⟩ = ((1+i)/√2)|1⟩. By the Gottesman-Knill theorem, Clifford gates alone (H, S, CNOT) can be simulated efficiently on classical computers. Adding the non-Clifford T gate confers universal quantum computational power.",
      classicalAnalogue: "None.",
      geometric: "Rotates equatorial states counterclockwise by 45° around the Z-axis."
    },
    truthTable: [
      { input: "|0⟩", output: "|0⟩", phase: "0 (unchanged)", explanation: "Ground state remains invariant" },
      { input: "|1⟩", output: "e^(iπ/4)|1⟩", phase: "+π/4 (+45° phase shift)", explanation: "Phase multiplied by (1 + i)/√2" },
      { input: "|+⟩", output: "(|0⟩ + e^(iπ/4)|1⟩)/√2", phase: "+45° relative rotation", explanation: "Superposition rotated by 45° along the equator" },
      { input: "α|0⟩ + β|1⟩", output: "α|0⟩ + e^(iπ/4)β|1⟩", phase: "Eighth-turn phase shift", explanation: "Imparts π/4 phase to the |1⟩ component" }
    ],
    applications: [
      "Universal quantum computation (Clifford + T gate set)",
      "Fault-tolerant magic state distillation protocols",
      "Solovay-Kitaev algorithm arbitrary unitary approximation",
      "Shor's factoring algorithm phase estimation"
    ],
    testInputs: [
      { label: "|0⟩", state: "|0⟩", outState: "|0⟩", probs: { "0": 100, "1": 0 } },
      { label: "|1⟩", state: "|1⟩", outState: "e^(iπ/4)|1⟩", probs: { "0": 0, "1": 100 } },
      { label: "|+⟩", state: "(|0⟩+|1⟩)/√2", outState: "(|0⟩+e^(iπ/4)|1⟩)/√2", probs: { "0": 50, "1": 50 } }
    ]
  },
  {
    id: "t-dagger",
    name: "T-Dagger Gate (T† / Inverse T)",
    symbol: "T†",
    category: "Superposition & Phase",
    qubits: 1,
    summary: "Applies a -45° (-π/4) phase shift to |1⟩, acting as the exact inverse of the T gate.",
    blochAction: "-45° (-π/4 radians) rotation around the Z-axis of the Bloch sphere.",
    matrix: [
      ["1", "0"],
      ["0", "e^(-iπ/4)"]
    ],
    properties: {
      unitary: "Yes (T†T = I)",
      hermitian: "No",
      selfInverse: "No",
      determinant: "e^(-iπ/4) = (1-i)/√2",
      eigenvalues: "+1, e^(-iπ/4)"
    },
    functionality: {
      overview: "The T† gate reverses the π/4 rotation of the T gate. T† · T = I.",
      mechanism: "T†|0⟩ = |0⟩, and T†|1⟩ = e^(-iπ/4)|1⟩ = ((1-i)/√2)|1⟩.",
      classicalAnalogue: "None.",
      geometric: "Rotates equatorial states clockwise by 45° around the Z-axis."
    },
    truthTable: [
      { input: "|0⟩", output: "|0⟩", phase: "0 (unchanged)", explanation: "Ground state remains invariant" },
      { input: "|1⟩", output: "e^(-iπ/4)|1⟩", phase: "-π/4 (-45° phase shift)", explanation: "Phase multiplied by (1 - i)/√2" },
      { input: "α|0⟩ + β|1⟩", output: "α|0⟩ + e^(-iπ/4)β|1⟩", phase: "Negative eighth-turn phase", explanation: "Imparts -π/4 phase to the |1⟩ component" }
    ],
    applications: [
      "T-count reduction and circuit optimization",
      "Uncomputing phase changes in quantum subroutines",
      "Arbitrary single-qubit rotation synthesis"
    ],
    testInputs: [
      { label: "|0⟩", state: "|0⟩", outState: "|0⟩", probs: { "0": 100, "1": 0 } },
      { label: "|1⟩", state: "|1⟩", outState: "e^(-iπ/4)|1⟩", probs: { "0": 0, "1": 100 } }
    ]
  },
  {
    id: "identity",
    name: "Identity Gate (No-Op)",
    symbol: "I",
    category: "Pauli",
    qubits: 1,
    summary: "Leaves any qubit state completely unchanged. Used for idle cycles, delays, and buffers.",
    blochAction: "Zero rotation (state remains stationary on the Bloch sphere).",
    matrix: [
      ["1", "0"],
      ["0", "1"]
    ],
    properties: {
      unitary: "Yes (I†I = I)",
      hermitian: "Yes (I = I†)",
      selfInverse: "Yes (I² = I)",
      determinant: "1",
      eigenvalues: "+1 (degenerate, all states are eigenstates)"
    },
    functionality: {
      overview: "The Identity gate corresponds to a null operation. It leaves both amplitudes and phases undisturbed.",
      mechanism: "I|ψ⟩ = |ψ⟩ for any arbitrary pure or mixed quantum state.",
      classicalAnalogue: "Buffer / Wire delay.",
      geometric: "No movement on the Bloch sphere."
    },
    truthTable: [
      { input: "|0⟩", output: "|0⟩", phase: "None", explanation: "Ground state unchanged" },
      { input: "|1⟩", output: "|1⟩", phase: "None", explanation: "Excited state unchanged" },
      { input: "|+⟩", output: "|+⟩", phase: "None", explanation: "Superposition state unchanged" },
      { input: "|ψ⟩", output: "|ψ⟩", phase: "None", explanation: "Arbitrary state unchanged" }
    ],
    applications: [
      "Hardware delay lines and dynamical decoupling (echo sequences)",
      "Padding circuit depths for quantum error benchmarking (RB)",
      "Mathematical identities in tensor network contractions"
    ],
    testInputs: [
      { label: "|0⟩", state: "|0⟩", outState: "|0⟩", probs: { "0": 100, "1": 0 } },
      { label: "|1⟩", state: "|1⟩", outState: "|1⟩", probs: { "0": 0, "1": 100 } },
      { label: "|+⟩", state: "(|0⟩+|1⟩)/√2", outState: "|+⟩", probs: { "0": 50, "1": 50 } }
    ]
  },
  {
    id: "rx",
    name: "Rotation-X Gate (Rx(θ))",
    symbol: "Rx(θ)",
    category: "Rotations",
    qubits: 1,
    summary: "Rotates the qubit state continuously by an arbitrary angle θ around the X-axis.",
    blochAction: "Angle θ rotation around the X-axis of the Bloch sphere.",
    matrix: [
      ["cos(θ/2)", "-i·sin(θ/2)"],
      ["-i·sin(θ/2)", "cos(θ/2)"]
    ],
    properties: {
      unitary: "Yes (Rx(θ)†Rx(θ) = I)",
      hermitian: "Only when θ = kπ",
      selfInverse: "Rx(-θ) is the inverse",
      determinant: "1",
      eigenvalues: "e^(-iθ/2), e^(iθ/2)"
    },
    functionality: {
      overview: "Rx(θ) is a parametric single-qubit gate defined by Rx(θ) = exp(-i θ X / 2). It provides continuous analog control over the state vector.",
      mechanism: "When θ = π, Rx(π) = -iX (Pauli-X up to a global phase). As θ varies from 0 to π, the probability of measuring |0⟩ smoothly transitions from 100% to 0%.",
      classicalAnalogue: "None (analog quantum rotation).",
      geometric: "Smooth trajectory along great circles perpendicular to the X-axis."
    },
    truthTable: [
      { input: "|0⟩ (at θ=π/2)", output: "(|0⟩ - i|1⟩)/√2", phase: "-i component", explanation: "Equal superposition with -i phase" },
      { input: "|0⟩ (at θ=π)", output: "-i|1⟩", phase: "-i global phase", explanation: "Complete bit flip to |1⟩" },
      { input: "|1⟩ (at θ=π)", output: "-i|0⟩", phase: "-i global phase", explanation: "Complete bit flip to |0⟩" },
      { input: "|+⟩ (any θ)", output: "e^(-iθ/2)|+⟩", phase: "Eigenstate", explanation: "|+⟩ is unchanged up to a global phase" }
    ],
    applications: [
      "Variational Quantum Eigensolver (VQE) parameterized ansatz circuits",
      "Quantum Approximate Optimization Algorithm (QAOA)",
      "Microwave pulse implementation in superconducting transmons"
    ],
    testInputs: [
      { label: "θ = π/2", state: "|0⟩", outState: "(|0⟩-i|1⟩)/√2", probs: { "0": 50, "1": 50 } },
      { label: "θ = π", state: "|0⟩", outState: "-i|1⟩", probs: { "0": 0, "1": 100 } },
      { label: "θ = 2π", state: "|0⟩", outState: "-|0⟩", probs: { "0": 100, "1": 0 } }
    ]
  },
  {
    id: "ry",
    name: "Rotation-Y Gate (Ry(θ))",
    symbol: "Ry(θ)",
    category: "Rotations",
    qubits: 1,
    summary: "Rotates the qubit state continuously by an arbitrary angle θ around the Y-axis.",
    blochAction: "Angle θ rotation around the Y-axis of the Bloch sphere.",
    matrix: [
      ["cos(θ/2)", "-sin(θ/2)"],
      ["sin(θ/2)", "cos(θ/2)"]
    ],
    properties: {
      unitary: "Yes (Ry(θ)†Ry(θ) = I)",
      hermitian: "Only when θ = kπ",
      selfInverse: "Ry(-θ) is the inverse",
      determinant: "1",
      eigenvalues: "e^(-iθ/2), e^(iθ/2)"
    },
    functionality: {
      overview: "Ry(θ) = exp(-i θ Y / 2). A purely real unitary rotation matrix that modifies probability amplitudes without introducing imaginary complex phase numbers.",
      mechanism: "Ry(θ)|0⟩ = cos(θ/2)|0⟩ + sin(θ/2)|1⟩. When θ = π/2, it produces the equal superposition (|0⟩ + |1⟩)/√2 = |+⟩ just like Hadamard, but with pure real coefficients.",
      classicalAnalogue: "2D geometric coordinate rotation.",
      geometric: "Rotates from the north pole down toward the south pole through the front of the Bloch sphere."
    },
    truthTable: [
      { input: "|0⟩ (at θ=π/2)", output: "(|0⟩ + |1⟩)/√2 = |+⟩", phase: "Purely real amplitudes", explanation: "Creates equal real superposition without complex phase" },
      { input: "|0⟩ (at θ=π)", output: "|1⟩", phase: "Real inversion", explanation: "Flips ground state to excited state" },
      { input: "|1⟩ (at θ=π)", output: "-|0⟩", phase: "Minus sign", explanation: "Flips excited state to ground state with negative sign" },
      { input: "|+i⟩ (any θ)", output: "e^(-iθ/2)|+i⟩", phase: "Eigenstate", explanation: "|+i⟩ is an eigenstate of the Y rotation" }
    ],
    applications: [
      "State preparation of arbitrary real superposition states",
      "VQE chemistry ansatz rotations (hardware-efficient circuits)",
      "Machine learning quantum neural network weight layers"
    ],
    testInputs: [
      { label: "θ = π/2", state: "|0⟩", outState: "(|0⟩+|1⟩)/√2", probs: { "0": 50, "1": 50 } },
      { label: "θ = π", state: "|0⟩", outState: "|1⟩", probs: { "0": 0, "1": 100 } },
      { label: "θ = π/3", state: "|0⟩", outState: "0.866|0⟩ + 0.5|1⟩", probs: { "0": 75, "1": 25 } }
    ]
  },
  {
    id: "rz",
    name: "Rotation-Z Gate (Rz(θ))",
    symbol: "Rz(θ)",
    category: "Rotations",
    qubits: 1,
    summary: "Rotates the qubit state continuously by an arbitrary angle θ around the Z-axis.",
    blochAction: "Angle θ rotation around the Z-axis of the Bloch sphere.",
    matrix: [
      ["e^(-iθ/2)", "0"],
      ["0", "e^(iθ/2)"]
    ],
    properties: {
      unitary: "Yes (Rz(θ)†Rz(θ) = I)",
      hermitian: "Only when θ = kπ",
      selfInverse: "Rz(-θ) is the inverse",
      determinant: "1",
      eigenvalues: "e^(-iθ/2), e^(iθ/2)"
    },
    functionality: {
      overview: "Rz(θ) = exp(-i θ Z / 2). It applies an arbitrary relative phase θ between |0⟩ and |1⟩ while keeping measurement probabilities in the Z-basis strictly unchanged.",
      mechanism: "Rz(θ)(α|0⟩ + β|1⟩) = e^(-iθ/2)α|0⟩ + e^(iθ/2)β|1⟩. In terms of relative phase, it is equivalent to multiplying the |1⟩ amplitude by e^(iθ).",
      classicalAnalogue: "None.",
      geometric: "Rotates around the vertical polar axis of the Bloch sphere."
    },
    truthTable: [
      { input: "|0⟩ (any θ)", output: "e^(-iθ/2)|0⟩", phase: "-θ/2 global phase", explanation: "Probabilities unaffected; global phase shift" },
      { input: "|1⟩ (any θ)", output: "e^(iθ/2)|1⟩", phase: "+θ/2 global phase", explanation: "Probabilities unaffected; global phase shift" },
      { input: "|+⟩ (at θ=π/2)", output: "(e^(-iπ/4)|0⟩ + e^(iπ/4)|1⟩)/√2", phase: "90° rotation", explanation: "Equatorial state rotates toward the Y axis" },
      { input: "|+⟩ (at θ=π)", output: "-i|-⟩", phase: "180° rotation", explanation: "|+⟩ is rotated into |-⟩" }
    ],
    applications: [
      "Phase estimation and continuous phase synthesis",
      "Virtual-Z frame tracking in superconducting hardware (zero physical error!)",
      "Adiabatic quantum evolution and Hamiltonian simulation"
    ],
    testInputs: [
      { label: "θ = π/2", state: "|+⟩", outState: "(|0⟩+i|1⟩)/√2 (up to global phase)", probs: { "0": 50, "1": 50 } },
      { label: "θ = π", state: "|+⟩", outState: "|-⟩ (up to global phase)", probs: { "0": 50, "1": 50 } }
    ]
  },
  {
    id: "phase-p",
    name: "Phase Shift Gate (P(φ))",
    symbol: "P(φ)",
    category: "Superposition & Phase",
    qubits: 1,
    summary: "Leaves |0⟩ invariant and multiplies |1⟩ by an arbitrary phase factor e^(iφ).",
    blochAction: "Angle φ rotation around the Z-axis, with zero phase added to |0⟩.",
    matrix: [
      ["1", "0"],
      ["0", "e^(iφ)"]
    ],
    properties: {
      unitary: "Yes (P(φ)†P(φ) = I)",
      hermitian: "When φ = 0, π",
      selfInverse: "P(-φ) is the inverse",
      determinant: "e^(iφ)",
      eigenvalues: "+1, e^(iφ)"
    },
    functionality: {
      overview: "The Phase Shift gate P(φ) is the direct generalization of the Z gate (φ=π), S gate (φ=π/2), and T gate (φ=π/4).",
      mechanism: "P(φ)|0⟩ = |0⟩, and P(φ)|1⟩ = e^(iφ)|1⟩. For an arbitrary state, P(φ)(α|0⟩ + β|1⟩) = α|0⟩ + e^(iφ)β|1⟩.",
      classicalAnalogue: "None.",
      geometric: "Rotates points around the Z-axis of the Bloch sphere by angle φ, keeping the north pole fixed."
    },
    truthTable: [
      { input: "|0⟩", output: "|0⟩", phase: "0 (invariant)", explanation: "Ground state untouched" },
      { input: "|1⟩", output: "e^(iφ)|1⟩", phase: "φ relative phase", explanation: "Excited state acquires e^(iφ) factor" },
      { input: "|+⟩", output: "(|0⟩ + e^(iφ)|1⟩)/√2", phase: "Phase-shifted superposition", explanation: "Equatorial state rotates by φ" }
    ],
    applications: [
      "Quantum Fourier Transform (QFT) controlled-phase subroutines",
      "Arbitrary phase kickback implementations in quantum oracles",
      "Single-qubit Z-rotations with fixed reference phase"
    ],
    testInputs: [
      { label: "φ = π/4 (T)", state: "|1⟩", outState: "e^(iπ/4)|1⟩", probs: { "0": 0, "1": 100 } },
      { label: "φ = π/2 (S)", state: "|1⟩", outState: "i|1⟩", probs: { "0": 0, "1": 100 } },
      { label: "φ = π (Z)", state: "|1⟩", outState: "-|1⟩", probs: { "0": 0, "1": 100 } }
    ]
  },
  {
    id: "cnot",
    name: "CNOT Gate (Controlled-NOT / CX)",
    symbol: "CNOT",
    category: "2-Qubit Entangling",
    qubits: 2,
    summary: "Flips the second qubit (target) if and only if the first qubit (control) is in state |1⟩.",
    blochAction: "Conditional rotation: X-rotation applied to target conditionally on the control state.",
    matrix: [
      ["1", "0", "0", "0"],
      ["0", "1", "0", "0"],
      ["0", "0", "0", "1"],
      ["0", "0", "1", "0"]
    ],
    properties: {
      unitary: "Yes (CNOT†CNOT = I)",
      hermitian: "Yes (CNOT = CNOT†)",
      selfInverse: "Yes (CNOT² = I)",
      determinant: "-1",
      eigenvalues: "+1, +1, +1, -1"
    },
    functionality: {
      overview: "The Controlled-NOT (CNOT or CX) gate is the cornerstone of multi-qubit quantum circuits. It couples two qubits, enabling entanglement creation, quantum logic, and error detection.",
      mechanism: "On computational basis states |c, t⟩ (control c, target t), CNOT|c, t⟩ = |c, t ⊕ c⟩ where ⊕ represents classical XOR addition modulo 2. If c=0, t is unchanged; if c=1, t is flipped. When control is in superposition (H|0⟩ = |+⟩) and target is |0⟩, CNOT creates the maximally entangled Bell state (|00⟩ + |11⟩)/√2.",
      classicalAnalogue: "Classical reversible XOR gate. CNOT preserves quantum superposition, enabling non-local quantum entanglement.",
      geometric: "Acts globally on the 4D Hilbert space of two qubits; cannot be decomposed into independent single-qubit Bloch sphere rotations."
    },
    truthTable: [
      { input: "|00⟩", output: "|00⟩", phase: "0 (no flip)", explanation: "Control = 0, target qubit 0 remains unchanged" },
      { input: "|01⟩", output: "|01⟩", phase: "0 (no flip)", explanation: "Control = 0, target qubit 1 remains unchanged" },
      { input: "|10⟩", output: "|11⟩", phase: "0 (bit flipped)", explanation: "Control = 1, target qubit flips from 0 to 1" },
      { input: "|11⟩", output: "|10⟩", phase: "0 (bit flipped)", explanation: "Control = 1, target qubit flips from 1 to 0" },
      { input: "(|0⟩+|1⟩)|0⟩/√2", output: "(|00⟩+|11⟩)/√2", phase: "Entanglement creation", explanation: "Produces maximally entangled Bell State |Φ+⟩" },
      { input: "|+-⟩", output: "|--⟩", phase: "Phase kickback", explanation: "Phase kickback flips control qubit while target stays in |-> state" }
    ],
    applications: [
      "Generation of maximally entangled Bell states and GHZ states",
      "Quantum Teleportation and Superdense Coding protocols",
      "Syndrome measurement in quantum error-correcting codes",
      "Arithmetic addition and reversible logic syntheses",
      "Decomposition of arbitrary n-qubit unitary operations"
    ],
    testInputs: [
      { label: "|00⟩", state: "|00⟩", outState: "|00⟩", probs: { "00": 100, "01": 0, "10": 0, "11": 0 } },
      { label: "|01⟩", state: "|01⟩", outState: "|01⟩", probs: { "00": 0, "01": 100, "10": 0, "11": 0 } },
      { label: "|10⟩", state: "|10⟩", outState: "|11⟩", probs: { "00": 0, "01": 0, "10": 0, "11": 100 } },
      { label: "|11⟩", state: "|11⟩", outState: "|10⟩", probs: { "00": 0, "01": 0, "10": 100, "11": 0 } },
      { label: "(|0⟩+|1⟩)|0⟩/√2", state: "H on Q0, then CNOT", outState: "(|00⟩+|11⟩)/√2 (Bell State)", probs: { "00": 50, "01": 0, "10": 0, "11": 50 } }
    ]
  },
  {
    id: "cz",
    name: "Controlled-Z Gate (CZ)",
    symbol: "CZ",
    category: "2-Qubit Entangling",
    qubits: 2,
    summary: "Applies a -1 phase factor if and only if both qubits are in state |11⟩. Completely symmetric.",
    blochAction: "Conditional Z-rotation: flips phase when both control and target are 1.",
    matrix: [
      ["1", "0", "0", "0"],
      ["0", "1", "0", "0"],
      ["0", "0", "1", "0"],
      ["0", "0", "0", "-1"]
    ],
    properties: {
      unitary: "Yes (CZ†CZ = I)",
      hermitian: "Yes (CZ = CZ†)",
      selfInverse: "Yes (CZ² = I)",
      determinant: "-1",
      eigenvalues: "+1, +1, +1, -1"
    },
    functionality: {
      overview: "The Controlled-Z gate is a diagonal entangling operation that flips the phase of the joint |11⟩ state. It is fully symmetric with respect to which qubit is considered the control or the target: CZ = (I ⊗ H) · CNOT · (I ⊗ H).",
      mechanism: "CZ|c, t⟩ = (-1)^(c·t)|c, t⟩. Only the state |11⟩ receives a factor of -1, while |00⟩, |01⟩, and |10⟩ remain unchanged.",
      classicalAnalogue: "None (phase entanglement).",
      geometric: "Conditional equatorial reflection on the target qubit dependent on the control qubit state."
    },
    truthTable: [
      { input: "|00⟩", output: "|00⟩", phase: "+1", explanation: "No phase shift" },
      { input: "|01⟩", output: "|01⟩", phase: "+1", explanation: "No phase shift" },
      { input: "|10⟩", output: "|10⟩", phase: "+1", explanation: "No phase shift" },
      { input: "|11⟩", output: "-|11⟩", phase: "-1 (π phase flip)", explanation: "Joint |11⟩ state acquires a negative sign" },
      { input: "|++⟩", output: "(|00⟩+|01⟩+|10⟩-|11⟩)/2", phase: "Cluster state creation", explanation: "Creates 2-qubit graph / cluster state used in measurement-based quantum computing" }
    ],
    applications: [
      "Native two-qubit gate in superconducting quantum processors",
      "Generation of cluster states for Measurement-Based Quantum Computing (MBQC)",
      "Grover's algorithm phase inversion oracle",
      "Quantum circuit optimization (converting between CNOT and CZ with Hadamards)"
    ],
    testInputs: [
      { label: "|00⟩", state: "|00⟩", outState: "|00⟩", probs: { "00": 100, "01": 0, "10": 0, "11": 0 } },
      { label: "|01⟩", state: "|01⟩", outState: "|01⟩", probs: { "00": 0, "01": 100, "10": 0, "11": 0 } },
      { label: "|10⟩", state: "|10⟩", outState: "|10⟩", probs: { "00": 0, "01": 0, "10": 100, "11": 0 } },
      { label: "|11⟩", state: "|11⟩", outState: "-|11⟩", probs: { "00": 0, "01": 0, "10": 0, "11": 100 } }
    ]
  },
  {
    id: "swap",
    name: "SWAP Gate",
    symbol: "SWAP",
    category: "2-Qubit Entangling",
    qubits: 2,
    summary: "Interchanges the quantum states of two qubits: |ψ⟩|φ⟩ → |φ⟩|ψ⟩.",
    blochAction: "Exchanges state trajectories between two quantum wires.",
    matrix: [
      ["1", "0", "0", "0"],
      ["0", "0", "1", "0"],
      ["0", "1", "0", "0"],
      ["0", "0", "0", "1"]
    ],
    properties: {
      unitary: "Yes (SWAP†SWAP = I)",
      hermitian: "Yes (SWAP = SWAP†)",
      selfInverse: "Yes (SWAP² = I)",
      determinant: "-1",
      eigenvalues: "+1, +1, +1, -1"
    },
    functionality: {
      overview: "The SWAP gate interchanges the states of two physical qubits. It can be constructed using three alternating CNOT gates: SWAP = CNOT(0,1) · CNOT(1,0) · CNOT(0,1).",
      mechanism: "SWAP|a, b⟩ = |b, a⟩. It maps |01⟩ to |10⟩ and |10⟩ to |01⟩, while leaving |00⟩ and |11⟩ untouched.",
      classicalAnalogue: "Classical wire crossing / bus swap.",
      geometric: "Permutes the two qubit subspaces symmetrically."
    },
    truthTable: [
      { input: "|00⟩", output: "|00⟩", phase: "+1", explanation: "Both qubits 0: swap leaves system invariant" },
      { input: "|01⟩", output: "|10⟩", phase: "+1", explanation: "First qubit becomes 1, second becomes 0" },
      { input: "|10⟩", output: "|01⟩", phase: "+1", explanation: "First qubit becomes 0, second becomes 1" },
      { input: "|11⟩", output: "|11⟩", phase: "+1", explanation: "Both qubits 1: swap leaves system invariant" },
      { input: "(α|0⟩+β|1⟩)|0⟩", output: "|0⟩(α|0⟩+β|1⟩)", phase: "State relocation", explanation: "Arbitrary quantum state transferred from qubit 0 to qubit 1" }
    ],
    applications: [
      "Physical qubit routing on hardware with limited coupling topologies (e.g. heavy-hex)",
      "Quantum Fourier Transform register bit-reversal stage",
      "Sorting and permutation subroutines in quantum algorithms"
    ],
    testInputs: [
      { label: "|00⟩", state: "|00⟩", outState: "|00⟩", probs: { "00": 100, "01": 0, "10": 0, "11": 0 } },
      { label: "|01⟩", state: "|01⟩", outState: "|10⟩", probs: { "00": 0, "01": 0, "10": 100, "11": 0 } },
      { label: "|10⟩", state: "|10⟩", outState: "|01⟩", probs: { "00": 0, "01": 100, "10": 0, "11": 0 } },
      { label: "|11⟩", state: "|11⟩", outState: "|11⟩", probs: { "00": 0, "01": 0, "10": 0, "11": 100 } }
    ]
  },
  {
    id: "cphase",
    name: "Controlled-Phase Gate (CP(φ))",
    symbol: "CP(φ)",
    category: "2-Qubit Entangling",
    qubits: 2,
    summary: "Applies a phase factor e^(iφ) if and only if both qubits are in state |11⟩.",
    blochAction: "Conditional Z-axis phase rotation by angle φ on target qubit.",
    matrix: [
      ["1", "0", "0", "0"],
      ["0", "1", "0", "0"],
      ["0", "0", "1", "0"],
      ["0", "0", "0", "e^(iφ)"]
    ],
    properties: {
      unitary: "Yes (CP(φ)†CP(φ) = I)",
      hermitian: "When φ = 0, π",
      selfInverse: "CP(-φ) is the inverse",
      determinant: "e^(iφ)",
      eigenvalues: "+1, +1, +1, e^(iφ)"
    },
    functionality: {
      overview: "The Controlled-Phase gate (CP or CROT) conditionally shifts the phase of the joint |11⟩ state by an arbitrary parameter φ. When φ=π, it reduces to the CZ gate.",
      mechanism: "CP(φ)|c, t⟩ = (e^(iφ))^(c·t)|c, t⟩. It modifies quantum interference without changing classical probability distributions in the computational basis.",
      classicalAnalogue: "None.",
      geometric: "Conditional equatorial rotation in Hilbert space."
    },
    truthTable: [
      { input: "|00⟩", output: "|00⟩", phase: "0", explanation: "No phase shift" },
      { input: "|01⟩", output: "|01⟩", phase: "0", explanation: "No phase shift" },
      { input: "|10⟩", output: "|10⟩", phase: "0", explanation: "No phase shift" },
      { input: "|11⟩", output: "e^(iφ)|11⟩", phase: "φ phase factor", explanation: "Multiplies |11⟩ amplitude by e^(iφ)" }
    ],
    applications: [
      "Core building block of the Quantum Fourier Transform (QFT)",
      "Phase estimation in Shor's algorithm",
      "Variational entangling layers in quantum machine learning"
    ],
    testInputs: [
      { label: "|11⟩ (φ=π/2)", state: "|11⟩", outState: "i|11⟩", probs: { "00": 0, "01": 0, "10": 0, "11": 100 } },
      { label: "|11⟩ (φ=π)", state: "|11⟩", outState: "-|11⟩ (CZ gate)", probs: { "00": 0, "01": 0, "10": 0, "11": 100 } }
    ]
  },
  {
    id: "iswap",
    name: "iSWAP Gate",
    symbol: "iSWAP",
    category: "2-Qubit Entangling",
    qubits: 2,
    summary: "Swaps states of two qubits and applies an imaginary phase +i to the swapped states.",
    blochAction: "Exchanges state populations while adding a π/2 phase to single-excitation states.",
    matrix: [
      ["1", "0", "0", "0"],
      ["0", "0", "i", "0"],
      ["0", "i", "0", "0"],
      ["0", "0", "0", "1"]
    ],
    properties: {
      unitary: "Yes (iSWAP†iSWAP = I)",
      hermitian: "No",
      selfInverse: "No ((iSWAP)² = diag(1, -1, -1, 1), (iSWAP)⁴ = I)",
      determinant: "1",
      eigenvalues: "+1, +1, +i, -i"
    },
    functionality: {
      overview: "The iSWAP gate interchanges the states of two qubits and adds a phase factor of i to the odd-parity basis states |01⟩ and |10⟩. It is the natural entangling gate generated by isotropic XY spin exchange interactions.",
      mechanism: "iSWAP|00⟩ = |00⟩, iSWAP|01⟩ = i|10⟩, iSWAP|10⟩ = i|01⟩, iSWAP|11⟩ = |11⟩.",
      classicalAnalogue: "None.",
      geometric: "Couples excitation states with a quarter-cycle phase shift."
    },
    truthTable: [
      { input: "|00⟩", output: "|00⟩", phase: "0", explanation: "Zero excitation state remains unchanged" },
      { input: "|01⟩", output: "i|10⟩", phase: "+π/2 (+i factor)", explanation: "Swapped to |10⟩ with an imaginary phase multiplier +i" },
      { input: "|10⟩", output: "i|01⟩", phase: "+π/2 (+i factor)", explanation: "Swapped to |01⟩ with an imaginary phase multiplier +i" },
      { input: "|11⟩", output: "|11⟩", phase: "0", explanation: "Two excitation state remains unchanged" }
    ],
    applications: [
      "Native gate in superconducting circuit QED and fluxonium systems",
      "Spin-based quantum dot quantum computation",
      "Synthesis of CNOT gates (two √iSWAP gates synthesize CNOT)"
    ],
    testInputs: [
      { label: "|01⟩", state: "|01⟩", outState: "i|10⟩", probs: { "00": 0, "01": 0, "10": 100, "11": 0 } },
      { label: "|10⟩", state: "|10⟩", outState: "i|01⟩", probs: { "00": 0, "01": 100, "10": 0, "11": 0 } }
    ]
  },
  {
    id: "toffoli",
    name: "Toffoli Gate (CCNOT / Controlled-Controlled-NOT)",
    symbol: "CCNOT",
    category: "3-Qubit Universal",
    qubits: 3,
    summary: "Flips the third qubit (target) if and only if both first two qubits (controls) are in state |1⟩.",
    blochAction: "Conditional bit-flip on target qubit dependent on the conjunction of two control qubits.",
    matrix: [
      ["1", "0", "0", "0", "0", "0", "0", "0"],
      ["0", "1", "0", "0", "0", "0", "0", "0"],
      ["0", "0", "1", "0", "0", "0", "0", "0"],
      ["0", "0", "0", "1", "0", "0", "0", "0"],
      ["0", "0", "0", "0", "1", "0", "0", "0"],
      ["0", "0", "0", "0", "0", "1", "0", "0"],
      ["0", "0", "0", "0", "0", "0", "0", "1"],
      ["0", "0", "0", "0", "0", "0", "1", "0"]
    ],
    properties: {
      unitary: "Yes (CCNOT†CCNOT = I)",
      hermitian: "Yes (CCNOT = CCNOT†)",
      selfInverse: "Yes (CCNOT² = I)",
      determinant: "-1",
      eigenvalues: "+1 (mult 7), -1 (mult 1)"
    },
    functionality: {
      overview: "The Toffoli gate (Controlled-Controlled-NOT or CCNOT) is a 3-qubit operation invented by Tommaso Toffoli in 1980. It is universal for classical reversible computing and a fundamental building block of quantum arithmetic.",
      mechanism: "On basis states |c₁, c₂, t⟩, CCNOT|c₁, c₂, t⟩ = |c₁, c₂, t ⊕ (c₁ ∧ c₂)⟩. It flips the target bit if and only if c₁=1 and c₂=1. When ancilla qubits are set to 0 or 1, Toffoli can compute classical NAND, AND, and XOR operations reversibly without deleting information.",
      classicalAnalogue: "Classical universal reversible logic gate (replaces NAND).",
      geometric: "Conditional transformation on the 8D state vector in three-qubit Hilbert space."
    },
    truthTable: [
      { input: "|000⟩", output: "|000⟩", phase: "0", explanation: "Controls 00: target qubit remains 0" },
      { input: "|001⟩", output: "|001⟩", phase: "0", explanation: "Controls 00: target qubit remains 1" },
      { input: "|010⟩", output: "|010⟩", phase: "0", explanation: "Controls 01: target qubit remains 0" },
      { input: "|011⟩", output: "|011⟩", phase: "0", explanation: "Controls 01: target qubit remains 1" },
      { input: "|100⟩", output: "|100⟩", phase: "0", explanation: "Controls 10: target qubit remains 0" },
      { input: "|101⟩", output: "|101⟩", phase: "0", explanation: "Controls 10: target qubit remains 1" },
      { input: "|110⟩", output: "|111⟩", phase: "Bit flipped (0 → 1)", explanation: "Controls 11 active: target qubit flipped from 0 to 1!" },
      { input: "|111⟩", output: "|110⟩", phase: "Bit flipped (1 → 0)", explanation: "Controls 11 active: target qubit flipped from 1 to 0!" }
    ],
    applications: [
      "Quantum arithmetic circuits (full adders, multipliers, modulo arithmetic)",
      "Oracle synthesis in Shor's and Grover's algorithms",
      "Universal classical reversible computing without thermodynamic entropy increase",
      "Fault-tolerant quantum error correction and flag qubit verification"
    ],
    testInputs: [
      { label: "|000⟩", state: "|000⟩", outState: "|000⟩", probs: { "000": 100 } },
      { label: "|010⟩", state: "|010⟩", outState: "|010⟩", probs: { "010": 100 } },
      { label: "|110⟩", state: "|110⟩", outState: "|111⟩ (Flipped!)", probs: { "111": 100 } },
      { label: "|111⟩", state: "|111⟩", outState: "|110⟩ (Flipped!)", probs: { "110": 100 } }
    ]
  },
  {
    id: "fredkin",
    name: "Fredkin Gate (CSWAP / Controlled-SWAP)",
    symbol: "CSWAP",
    category: "3-Qubit Universal",
    qubits: 3,
    summary: "Swaps target qubits 2 and 3 if and only if the control qubit 1 is in state |1⟩.",
    blochAction: "Conditional exchange of two target states controlled by a single master qubit.",
    matrix: [
      ["1", "0", "0", "0", "0", "0", "0", "0"],
      ["0", "1", "0", "0", "0", "0", "0", "0"],
      ["0", "0", "1", "0", "0", "0", "0", "0"],
      ["0", "0", "0", "1", "0", "0", "0", "0"],
      ["0", "0", "0", "0", "1", "0", "0", "0"],
      ["0", "0", "0", "0", "0", "0", "1", "0"],
      ["0", "0", "0", "0", "0", "1", "0", "0"],
      ["0", "0", "0", "0", "0", "0", "0", "1"]
    ],
    properties: {
      unitary: "Yes (CSWAP†CSWAP = I)",
      hermitian: "Yes (CSWAP = CSWAP†)",
      selfInverse: "Yes (CSWAP² = I)",
      determinant: "-1",
      eigenvalues: "+1 (mult 7), -1 (mult 1)"
    },
    functionality: {
      overview: "The Fredkin gate (Controlled-SWAP or CSWAP) is a 3-qubit conservative logic gate invented by Edward Fredkin. It swaps target qubits t₁ and t₂ if control c is 1, and leaves them untouched if c is 0.",
      mechanism: "CSWAP|c, t₁, t₂⟩ = |c, t₂, t₁⟩ if c=1, otherwise |c, t₁, t₂⟩. It preserves the number of 1s and 0s (Hamming weight conservation), making it a candidate for billiard-ball and conservative mechanical computing.",
      classicalAnalogue: "Classical reversible switch / conservative crossbar.",
      geometric: "Conditional permutation in 8D Hilbert space preserving particle count."
    },
    truthTable: [
      { input: "|000⟩", output: "|000⟩", phase: "0", explanation: "Control 0: targets 00 untouched" },
      { input: "|001⟩", output: "|001⟩", phase: "0", explanation: "Control 0: targets 01 untouched" },
      { input: "|010⟩", output: "|010⟩", phase: "0", explanation: "Control 0: targets 10 untouched" },
      { input: "|011⟩", output: "|011⟩", phase: "0", explanation: "Control 0: targets 11 untouched" },
      { input: "|100⟩", output: "|100⟩", phase: "0", explanation: "Control 1: targets 00 already identical" },
      { input: "|101⟩", output: "|110⟩", phase: "Targets swapped (01 → 10)", explanation: "Control 1 active: target qubits swapped from 01 to 10!" },
      { input: "|110⟩", output: "|101⟩", phase: "Targets swapped (10 → 01)", explanation: "Control 1 active: target qubits swapped from 10 to 01!" },
      { input: "|111⟩", output: "|111⟩", phase: "0", explanation: "Control 1: targets 11 already identical" }
    ],
    applications: [
      "Quantum SWAP test for measuring inner product / state overlap |⟨ψ|φ⟩|²",
      "Quantum Machine Learning kernel estimation",
      "Conservative reversible computing with zero energy dissipation limits",
      "Fault-tolerant quantum routing and crossbar switches"
    ],
    testInputs: [
      { label: "|001⟩", state: "|001⟩", outState: "|001⟩", probs: { "001": 100 } },
      { label: "|101⟩", state: "|101⟩", outState: "|110⟩ (Targets Swapped!)", probs: { "110": 100 } },
      { label: "|110⟩", state: "|110⟩", outState: "|101⟩ (Targets Swapped!)", probs: { "101": 100 } },
      { label: "|111⟩", state: "|111⟩", outState: "|111⟩", probs: { "111": 100 } }
    ]
  }
];
