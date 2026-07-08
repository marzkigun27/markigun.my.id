import {
  Project,
  ResearchPublication,
  TeachingExperience,
  BlogPost,
  Skill,
  ExperienceItem,
} from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "iaq-dashboard",
    slug: "indoor-air-quality-dashboard",
    title: "Indoor Air Quality IoT Dashboard & Analytics Engine",
    tagline: "Real-time sensor telemetry, kalman filtering, and predictive analytics for smart environments.",
    description:
      "An end-to-end IoT platform deploying ESP32 microcontroller arrays with BME680, MQ-135, and PMS5003 sensors. Features real-time MQTT data ingestion, server-side Kalman filtering for noise reduction, and a high-performance dashboard displaying CO2, VOCs, particulate matter, and thermodynamic drift.",
    category: "IoT & Sensor Analytics",
    date: "2025-11",
    technologies: [
      "ESP32 / C++",
      "MQTT / WebSockets",
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "TimescaleDB",
      "Python / NumPy",
    ],
    githubUrl: "https://github.com/umarzakigunawan/iaq-analytics-engine",
    liveUrl: "https://iaq-demo.umarzaki.io",
    featured: true,
    problem:
      "Commercial indoor air quality monitors suffer from high baseline drift and lack open API access for HVAC integration. In laboratory environments, raw particulate and VOC sensor data is plagued by high-frequency electronic noise and humidity cross-sensitivity.",
    solution:
      "Designed an embedded firmware array utilizing dual-stage Kalman filtering on an ESP32 dual-core MCU, broadcasting telemetry over TLS-secured MQTT. Built a reactive Next.js frontend with WebSockets that visualizes multi-sensor correlations and calculates real-time Air Quality Index (AQI) indices using EPA algorithms.",
    architecture:
      "ESP32 MCU -> MQTT Broker (EMQX) -> Python Telemetry Ingestion Service -> TimescaleDB (Time-series SQL) -> Next.js App Router (Server Actions & WebSockets) -> Recharts & Three.js 3D Room Heatmap.",
    challenges:
      [
        "Mitigating non-linear humidity cross-sensitivity on metal-oxide VOC sensors using empirical compensation curves.",
        "Ensuring zero-latency UI updates at 50Hz streaming rates without triggering React re-render bottlenecks.",
        "Designing an ultra-low-power sleep schedule for battery-operated remote sensor nodes while maintaining telemetry sync.",
      ],
    results:
      [
        "Reduced sensor noise variance by 73% through embedded Kalman filtering before network transmission.",
        "Achieved <45ms end-to-end latency from physical gas burst detection to browser UI alert.",
        "Deployed across 4 university research laboratories, monitoring ambient conditions for sensitive optical experiments.",
      ],
    lessonsLearned:
      [
        "Hardware calibration requires rigorous environmental chamber testing; software filters cannot fix uncalibrated physical sensors.",
        "WebSockets combined with TimescaleDB continuous aggregates provide the ideal architecture for high-frequency scientific IoT.",
      ],
    metrics: [
      { label: "Noise Variance Reduction", value: "73%" },
      { label: "Telemetry Latency", value: "<45ms" },
      { label: "Sensor Sampling Rate", value: "50 Hz" },
      { label: "Active Nodes Deployed", value: "12 Nodes" },
    ],
  },
  {
    id: "qm-notebook",
    slug: "quantum-mechanics-interactive-notebook",
    title: "Quantum Mechanics Interactive Numerical Notebook",
    tagline: "Solving the time-dependent Schrödinger equation in browser using WebAssembly and WebGL.",
    description:
      "An educational and research web suite for simulating 1D and 2D quantum mechanical wave packets. Implements Crank-Nicolson and Split-Step Fourier algorithms in WebAssembly (Rust/C++) to compute quantum tunneling, harmonic oscillators, and double-slit interference in real-time.",
    category: "Scientific Computing",
    date: "2025-08",
    technologies: [
      "Rust / WebAssembly",
      "TypeScript",
      "Three.js / WebGL",
      "Next.js",
      "Tailwind CSS",
      "KaTeX",
    ],
    githubUrl: "https://github.com/umarzakigunawan/quantum-interactive-solver",
    liveUrl: "https://qm.umarzaki.io",
    featured: true,
    problem:
      "Undergraduate physics students often struggle to visualize counter-intuitive quantum phenomena such as wave packet dispersion, barrier tunneling, and phase interference because standard textbooks rely on static 2D plots or slow desktop MATLAB scripts.",
    solution:
      "Engineered a high-performance numerical solver compiled from Rust to WebAssembly that integrates the Time-Dependent Schrödinger Equation (TDSE) at 60 FPS. Coupled the solver with React Three Fiber to render probability density clouds |ψ(x,y,t)|² and complex phase angles as vibrant dynamic shaders.",
    architecture:
      "React UI -> WebAssembly (Rust Numerical Engine: Split-Step Fourier & FFTW) -> WebGL Shared Memory -> Three.js Custom Shader Material -> Interactive DOM Canvas.",
    challenges:
      [
        "Maintaining unitarity (total probability = 1.0) over long numerical integration times without numerical dissipation.",
        "Optimizing 2D Fast Fourier Transforms (FFT) inside the browser memory sandbox for grid resolutions up to 512x512.",
        "Designing intuitive touch/mouse controls for users to draw arbitrary potential barriers V(x) directly onto the canvas.",
      ],
    results:
      [
        "Simulates 512x512 2D wave packet evolution at a stable 60 frames per second on standard laptop GPUs.",
        "Adopted by the Engineering Physics department as an official teaching tool for Introductory Quantum Mechanics.",
        "Demonstrated 15x performance speedup over pure JavaScript numerical integration.",
      ],
    lessonsLearned:
      [
        "WebAssembly shared memory buffers eliminate serialization overhead between computational loops and WebGL texture rendering.",
        "Visualizing complex numbers requires dual-variable color mapping (brightness for magnitude, HSL hue for phase angle).",
      ],
    metrics: [
      { label: "Simulation Grid Size", value: "512x512" },
      { label: "Frame Rate", value: "60 FPS" },
      { label: "Performance Boost vs JS", value: "15x" },
      { label: "Student Adoption", value: "120+ / Sem" },
    ],
  },
  {
    id: "rental-car-sys",
    slug: "enterprise-rental-car-management-system",
    title: "Enterprise Fleet & Rental Car Management Platform",
    tagline: "Scalable full-stack architecture with automated scheduling, GPS telemetry, and financial accounting.",
    description:
      "A comprehensive enterprise platform built for vehicle fleet operators. Features automated reservation conflict resolution, dynamic pricing based on utilization telemetry, automated maintenance ticketing, and multi-tenant role-based access control (RBAC).",
    category: "Full-Stack Systems",
    date: "2025-05",
    technologies: [
      "Next.js App Router",
      "Laravel / PHP 8.3",
      "PostgreSQL",
      "Docker & Redis",
      "Tailwind CSS",
      "Shadcn UI",
    ],
    githubUrl: "https://github.com/umarzakigunawan/enterprise-fleet-system",
    featured: false,
    problem:
      "Traditional vehicle rental businesses rely on fragmented Excel spreadsheets or legacy desktop software that cannot handle concurrent booking collisions, real-time GPS mileage tracking, or automated maintenance scheduling.",
    solution:
      "Developed a decoupled architecture with a robust Laravel REST API backend and a responsive Next.js frontend. Implemented PostgreSQL serializable transaction isolation to eliminate double-booking race conditions and integrated automated webhook triggers for vehicle maintenance schedules.",
    architecture:
      "Next.js Frontend (Server Components) -> Nginx API Gateway -> Laravel 11 Backend -> PostgreSQL + Redis Caching Layer -> GPS Telemetry Webhook Receiver.",
    challenges:
      [
        "Preventing race conditions when multiple customers attempt to reserve the same vehicle class simultaneously during peak holiday hours.",
        "Building a complex multi-view calendar (Day/Week/Month/Timeline) that renders thousands of reservation blocks without DOM lag.",
      ],
    results:
      [
        "Achieved 100% elimination of double-booking errors across 500+ simulated concurrent booking transactions.",
        "Reduced administrative reservation processing time from 15 minutes to under 2 minutes per rental.",
      ],
    lessonsLearned:
      [
        "Database transaction isolation levels are critical for booking systems; optimistic locking saves database overhead while preventing collisions.",
      ],
    metrics: [
      { label: "Concurrency Safety", value: "100%" },
      { label: "API Response Time", value: "<120ms" },
      { label: "Fleet Capacity", value: "250+ Cars" },
    ],
  },
  {
    id: "quantum-espresso-sim",
    slug: "quantum-espresso-material-simulation-pipeline",
    title: "Automated DFT Electronic Structure Simulation Pipeline",
    tagline: "High-throughput Density Functional Theory calculations for 2D semiconductor bandgaps.",
    description:
      "A Python and Bash automated simulation workflow wrapping Quantum ESPRESSO. Conducts high-throughput Density Functional Theory (DFT) calculations to predict electronic band structures, Density of States (DOS), and phonon dispersion in transition metal dichalcogenides (TMDs).",
    category: "Materials Simulation",
    date: "2025-02",
    technologies: [
      "Python / SciPy",
      "Quantum ESPRESSO",
      "MPI / High-Performance Computing",
      "Linux Shell Scripting",
      "Matplotlib / Plotly",
    ],
    githubUrl: "https://github.com/umarzakigunawan/dft-tmd-simulation-pipeline",
    featured: true,
    problem:
      "Manual preparation of Quantum ESPRESSO input files across hundreds of lattice parameter variations is error-prone and tedious. Extracting bandgap values and plotting Fermi energy crossings from raw FORTRAN output logs slows down materials discovery.",
    solution:
      "Created an automated Python package that generates pseudopotential input decks, executes parallel MPI simulations on Linux HPC clusters, parses FORTRAN output binaries, and automatically plots interactive electronic band structures and projected DOS.",
    architecture:
      "Python Controller (Pymatgen/ASE) -> Slurm Workload Manager -> Quantum ESPRESSO (pw.scf, bands.x, dos.x) -> Data Extraction Parser -> Plotly Interactive HTML Reports.",
    challenges:
      [
        "Handling SCF (Self-Consistent Field) convergence failures automatically by dynamically tweaking mixing beta parameters and kinetic energy cutoffs.",
        "Parsing multi-gigabyte binary charge density files efficiently without exhausting system RAM.",
      ],
    results:
      [
        "Simulated 45 distinct monolayer TMD semiconductor doping configurations in under 48 hours on an 64-core cluster.",
        "Identified a promising sulfur-vacancy defect state in MoS2 that exhibits optimal bandgap alignment for solar water splitting.",
      ],
    lessonsLearned:
      [
        "High-performance scientific computing is 80% data pipeline engineering and 20% physics execution.",
      ],
    metrics: [
      { label: "Configurations Tested", value: "45 Alloys" },
      { label: "HPC Core Scaling", value: "64 Cores" },
      { label: "Bandgap Accuracy", value: "±0.05 eV" },
    ],
  },
  {
    id: "portfolio-neo",
    slug: "interactive-scientific-laboratory-portfolio",
    title: "Playful Neo-Brutalist Scientific Laboratory Portfolio",
    tagline: "Bridging physics and software with tactile retro-pop aesthetics and Three.js simulations.",
    description:
      "The web platform you are currently exploring. Designed with Tone Segurado's Playful Neo-Brutalist guidelines (3px charcoal borders, zero border radius, shape-morphing tactile buttons) and engineered with Next.js, Bun, GSAP scroll orchestration, and React Three Fiber.",
    category: "Full-Stack Systems",
    date: "2026-07",
    technologies: [
      "Bun",
      "Next.js 16 (App Router)",
      "TypeScript",
      "Tailwind CSS v4",
      "GSAP & Lenis",
      "Three.js / React Three Fiber",
    ],
    githubUrl: "https://github.com/umarzakigunawan/portfolio-laboratory",
    featured: false,
    problem:
      "Standard software developer portfolios look identical—relying on generic dark mode templates and floating purple blobs that fail to convey deep technical competence in hardware, physics, and scientific computing.",
    solution:
      "Synthesized a 'Digital Laboratory' aesthetic using high-contrast Neo-Brutalist grids, tactile interactive UI elements, and real physics visualizations (3D crystal lattices and wave equations) that respond deterministically to user interaction.",
    architecture:
      "Next.js App Router -> Custom Tailwind v4 Theme Tokens -> GSAP Timeline Orchestrator -> React Three Fiber WebGL Canvas -> Strict Security CSP Headers.",
    challenges:
      [
        "Orchestrating smooth GSAP scroll timelines alongside Lenis smooth scrolling without frame stuttering or layout thrashing.",
        "Ensuring Three.js 3D canvas assets load instantly without blocking the First Contentful Paint (FCP).",
      ],
    results:
      [
        "Achieved 100% Lighthouse Performance, Accessibility, and SEO scores.",
        "Created an unforgettable digital identity that bridges software engineering with physical sciences.",
      ],
    lessonsLearned:
      [
        "Intentional animation (animating structure and physics rather than decorative fluff) creates a vastly superior user experience.",
      ],
    metrics: [
      { label: "Lighthouse Performance", value: "100/100" },
      { label: "3D Canvas FPS", value: "60 FPS" },
      { label: "Bundle Size Overhead", value: "<85 KB" },
    ],
  },
  {
    id: "fpga-rtl-verification",
    slug: "fpga-riscv-processor-rtl-design",
    title: "32-bit RISC-V Processor RTL Design & FPGA Implementation",
    tagline: "Custom 5-stage pipelined CPU core synthesized on Xilinx Artix-7 FPGA with hardware accelerator.",
    description:
      "Design and RTL verification of a custom 32-bit RISC-V (RV32I) processor core written in SystemVerilog. Features a 5-stage pipeline with hazard detection, branch forwarding, and a dedicated hardware accelerator module for matrix multiplication.",
    category: "Semiconductor & RTL",
    date: "2025-10",
    technologies: [
      "SystemVerilog",
      "Xilinx Vivado",
      "ModelSim / Verilator",
      "FPGA (Artix-7)",
      "C / Assembly",
    ],
    githubUrl: "https://github.com/umarzakigunawan/rv32i-pipelined-fpga",
    featured: true,
    problem:
      "General-purpose microcontrollers lack the throughput required for real-time edge AI matrix operations in power-constrained embedded instruments.",
    solution:
      "Architected a custom RISC-V CPU core with an integrated systolic array co-processor connected via a custom memory-mapped bus. Synthesized and verified timing closure on Xilinx Artix-7 FPGA architecture.",
    architecture:
      "Fetch -> Decode -> Execute (ALU + Systolic Matrix Unit) -> Memory Access -> Write Back -> UART Debug Interface.",
    challenges:
      [
        "Resolving data hazards and control branch mispredictions without stalling the pipeline excessively.",
        "Achieving timing closure at 100 MHz clock frequency within FPGA lookup table (LUT) routing constraints.",
      ],
    results:
      [
        "Successfully executed custom C-compiled firmware doing real-time sensor filtering 4.2x faster than standard ARM Cortex-M3 MCUs.",
        "Used only 14,200 LUTs and 8 DSP slices on the Xilinx Artix-7 FPGA.",
      ],
    lessonsLearned:
      [
        "Hardware-software co-design requires intimate knowledge of compiler toolchains and instruction set architecture (ISA) encoding.",
      ],
    metrics: [
      { label: "Clock Frequency", value: "100 MHz" },
      { label: "LUT Utilization", value: "14,200 (27%)" },
      { label: "Matrix Acceleration", value: "4.2x Speedup" },
    ],
  },
];

export const RESEARCH_PUBLICATIONS: ResearchPublication[] = [
  {
    id: "pub-1",
    slug: "dft-bandgap-engineering-tmds",
    title: "Bandgap Engineering of Monolayer MoS₂ via Substitutional Doping: A First-Principles Density Functional Theory Study",
    authors: ["Umar Zaki Gunawan", "Dr. H. Santoso", "Prof. R. Widjaja"],
    venue: "Journal of Computational & Applied Physics (JCAP)",
    year: 2025,
    status: "Published",
    abstract:
      "We investigate the electronic structure modifications of monolayer Molybdenum Disulfide (MoS₂) doped with 3d transition metals (Fe, Co, Ni) and non-metals (N, P) using first-principles Density Functional Theory (DFT) within the Generalized Gradient Approximation (GGA-PBE). Our calculations demonstrate that substitutional Co doping at the Mo site introduces localized impurity states within the fundamental bandgap, reducing the optical transition threshold from 1.85 eV to 1.32 eV—ideal for near-infrared optoelectronic applications.",
    keywords: ["Density Functional Theory", "MoS2", "Bandgap Engineering", "Spintronics", "Quantum ESPRESSO"],
    pdfUrl: "/papers/dft-bandgap-mos2-2025.pdf",
    doiUrl: "https://doi.org/10.1016/j.jcap.2025.104821",
    equations: [
      {
        label: "Kohn-Sham Wave Equation",
        latex: "\\left[ -\\frac{\\hbar^2}{2m} \\nabla^2 + V_{ext}(\\mathbf{r}) + V_H(\\mathbf{r}) + V_{XC}(\\mathbf{r}) \\right] \\psi_i(\\mathbf{r}) = \\epsilon_i \\psi_i(\\mathbf{r})",
        description: "The fundamental self-consistent eigenvalue equation solved iteratively in DFT to find electronic ground states.",
      },
      {
        label: "Exchange-Correlation Functional (GGA-PBE)",
        latex: "E_{XC}^{GGA}[n] = \\int n(\\mathbf{r}) \\epsilon_{XC}\\left(n(\\mathbf{r}), |\\nabla n(\\mathbf{r})|\\right) d^3\\mathbf{r}",
        description: "Perdew-Burke-Ernzerhof gradient-enhanced functional accounting for local electron density gradients.",
      },
    ],
    methods: [
      "Plane-wave basis set with 50 Ry kinetic energy cutoff using ultrasoft pseudopotentials.",
      "Monkhorst-Pack k-point mesh sampling of 12x12x1 for Brillouin zone integration.",
      "Supercell 4x4x1 geometry optimization until Hellmann-Feynman forces fell below 0.01 eV/Å.",
    ],
    keyFindings: [
      "Co and Ni doping transition MoS₂ from a direct bandgap semiconductor to a ferromagnetic half-metal.",
      "Nitrogen substitution at sulfur sites creates p-type conduction pathways with low activation energy.",
    ],
  },
  {
    id: "pub-2",
    slug: "kalman-filter-gas-sensor-arrays",
    title: "Real-Time Embedded Dual-Stage Kalman Filtering for Drift Compensation in Metal-Oxide Semiconductor Gas Sensor Arrays",
    authors: ["Umar Zaki Gunawan", "A. Pratama"],
    venue: "IEEE International Conference on Embedded Systems & Scientific Instrumentation (ICESSI)",
    year: 2025,
    status: "Published",
    abstract:
      "Low-cost Metal-Oxide Semiconductor (MOS) gas sensors suffer from severe baseline drift and non-linear humidity interference. In this paper, we propose a lightweight, integer-math optimized dual-stage Kalman filter running on a 32-bit microcontroller. By coupling ambient thermohygrometric readings with raw conductance data, our algorithm reduces baseline VOC drift error by 78% over a continuous 90-day laboratory trial.",
    keywords: ["Kalman Filtering", "IoT Telemetry", "Embedded Firmware", "Gas Sensors", "Signal Processing"],
    pdfUrl: "/papers/embedded-kalman-gas-2025.pdf",
    doiUrl: "https://doi.org/10.1109/ICESSI.2025.9881204",
    equations: [
      {
        label: "Discrete Kalman State Prediction",
        latex: "\\hat{\\mathbf{x}}_{k|k-1} = \\mathbf{F}_k \\hat{\\mathbf{x}}_{k-1|k-1} + \\mathbf{B}_k \\mathbf{u}_k",
        description: "Predicting the true gas concentration state vector from prior time-step covariance and control inputs.",
      },
      {
        label: "Kalman Gain & Measurement Update",
        latex: "\\mathbf{K}_k = \\mathbf{P}_{k|k-1} \\mathbf{H}_k^T \\left( \\mathbf{H}_k \\mathbf{P}_{k|k-1} \\mathbf{H}_k^T + \\mathbf{R}_k \\right)^{-1}",
        description: "Optimal gain matrix balancing sensor measurement noise covariance R against state prediction error P.",
      },
    ],
    methods: [
      "Empirical derivation of humidity cross-sensitivity coefficients inside a controlled environmental chamber.",
      "Fixed-point arithmetic translation of Kalman matrix multiplications for ARM Cortex-M4 execution.",
    ],
    keyFindings: [
      "Achieved execution time of only 1.4ms per sampling cycle on ESP32 / ARM Cortex-M4 architectures.",
      "Demonstrated 78% reduction in false-positive VOC spikes during rapid ambient humidity transitions.",
    ],
  },
  {
    id: "pub-3",
    slug: "numerical-simulation-quantum-tunneling-finfet",
    title: "Numerical Simulation of Direct Quantum Tunneling Leakage in Sub-5nm High-k Gate Oxide FinFET Architectures",
    authors: ["Umar Zaki Gunawan", "Prof. R. Widjaja"],
    venue: "Symposium on Semiconductor Technology & Microelectronics",
    year: 2024,
    status: "Under Review",
    abstract:
      "As semiconductor scaling breaches the 5nm threshold, direct quantum mechanical tunneling across ultra-thin gate dielectrics becomes a dominant source of static power dissipation. We present a numerical Non-Equilibrium Green's Function (NEGF) solver implemented in Rust/Python to model electron tunneling probability across Hafnium Dioxide (HfO₂) and Zirconium Dioxide (ZrO₂) gate stacks.",
    keywords: ["Semiconductor Physics", "FinFET", "NEGF", "Quantum Tunneling", "High-k Dielectrics"],
    pdfUrl: "/papers/negf-finfet-tunneling-2024.pdf",
    equations: [
      {
        label: "WKB Tunneling Transmission Probability",
        latex: "T(E) \\approx \\exp \\left( -\\frac{2}{\\hbar} \\int_{x_1}^{x_2} \\sqrt{2m^* \\left[ V(x) - E \\right]} \\, dx \\right)",
        description: "Wentzel-Kramers-Brillouin approximation for electron tunneling probability across an oxide potential barrier V(x).",
      },
    ],
    methods: [
      "Self-consistent solution of 1D Poisson equation and Schrödinger equation across layered heterostructures.",
      "Incorporation of effective mass m* discontinuity across Si/HfO₂/Metal interfaces.",
    ],
    keyFindings: [
      "HfO₂ / ZrO₂ nanolaminates suppress direct gate leakage current by 3.2 orders of magnitude compared to equivalent SiO₂ thicknesses.",
    ],
  },
  {
    id: "pub-4",
    slug: "systolic-array-acceleration-fpga",
    title: "Area-Efficient Systolic Array Architecture for Real-Time Matrix Acceleration on FPGA Platforms",
    authors: ["Umar Zaki Gunawan"],
    venue: "International Workshop on Hardware-Software Co-Design",
    year: 2024,
    status: "Published",
    abstract:
      "This paper describes the architecture and RTL design of an 8x8 integer systolic array engine optimized for Xilinx 7-series FPGA architectures. By utilizing custom register-transfer level (RTL) data forwarding and DSP48E1 slice instantiation, the engine achieves 94% theoretical multiply-accumulate (MAC) efficiency while consuming minimal FPGA logic resources.",
    keywords: ["FPGA", "Systolic Array", "SystemVerilog", "Hardware Acceleration", "RISC-V"],
    doiUrl: "https://doi.org/10.1145/3689201.3689245",
    methods: [
      "SystemVerilog structural modeling of Processing Element (PE) interconnects.",
      "Timing-driven synthesis and place-and-route using Xilinx Vivado Design Suite.",
    ],
    keyFindings: [
      "Achieved 1.2 GOPS/W energy efficiency on Artix-7 hardware running at 125 MHz.",
    ],
  },
  {
    id: "pub-5",
    slug: "thermodynamic-modeling-fluid-flow",
    title: "Computational Fluid Dynamics Modeling of Micro-Channel Heat Sinks for High-Power Semiconductor Modules",
    authors: ["Umar Zaki Gunawan", "Dr. H. Santoso"],
    venue: "Journal of Thermal Engineering & Physics",
    year: 2023,
    status: "Published",
    abstract:
      "Thermal management is a critical bottleneck in high-density IGBT and GaN power semiconductor modules. Using 3D finite-volume numerical simulations, we analyze laminar and turbulent heat transfer in silicon micro-channel heat sinks featuring secondary branching manifolds.",
    keywords: ["CFD", "Thermal Engineering", "Semiconductor Packaging", "Navier-Stokes", "Finite Volume Method"],
    methods: [
      "3D steady-state Navier-Stokes solver coupled with solid-fluid conjugate heat transfer equations.",
      "Mesh refinement study utilizing 1.5 million hexahedral cells with wall-y+ < 1.0.",
    ],
    keyFindings: [
      "Secondary branching micro-channels reduce maximum chip junction temperature by 14.5°C with only a 12% increase in pumping pressure drop.",
    ],
  },
];

export const TEACHING_EXPERIENCE: TeachingExperience[] = [
  {
    id: "ta-c-prog",
    course: "Advanced C Programming & Algorithmic Foundations",
    code: "TF-2104",
    semester: "Fall 2024 & Fall 2025",
    role: "Head Teaching Assistant & Lab Instructor",
    description:
      "Led weekly laboratory sessions for 120+ undergraduate engineering physics students. Taught low-level memory management (pointers, malloc/free, stack vs heap), data structures, file I/O, and modular firmware design.",
    responsibilities: [
      "Designed 8 weekly hands-on laboratory assignments focusing on pointers, structs, linked lists, and numerical algorithms.",
      "Developed an automated grading script in Python/Bash utilizing Valgrind to detect memory leaks and segmentation faults in student submissions.",
      "Conducted weekly 2-hour interactive debugging workshops, teaching students how to use GDB and LLDB effectively.",
      "Managed a team of 4 junior teaching assistants and coordinated midterm/final practical examinations.",
    ],
    topics: [
      "Pointers & Memory Addressing",
      "Dynamic Memory Allocation (Valgrind)",
      "Data Structures (Linked Lists, Trees)",
      "Bitwise Operations & Hardware Registers",
      "Modular Multi-File Compilation (Makefiles)",
    ],
    studentCount: 128,
    feedbackQuote:
      "Umar's lab sessions were the clearest explanation of pointers and memory allocation I've ever had. He showed us how C code actually executes on the processor silicon.",
  },
  {
    id: "ta-num-methods",
    course: "Numerical Methods & Scientific Computing",
    code: "TF-3102",
    semester: "Spring 2025",
    role: "Teaching Assistant",
    description:
      "Assisted in teaching computational methods for solving engineering physics equations. Guided students through implementing numerical linear algebra, differential equation solvers, and curve fitting in Python and MATLAB.",
    responsibilities: [
      "Delivered guest lectures on solving Ordinary Differential Equations (ODEs) using Runge-Kutta 4th Order (RK4) and boundary value problems.",
      "Authored interactive Jupyter Notebook tutorials demonstrating the convergence behavior and stability limits of Euler vs Crank-Nicolson methods.",
      "Hosted 1-on-1 office hours to assist students in debugging complex computational simulations of heat conduction and wave propagation.",
    ],
    topics: [
      "Root Finding & Non-linear Equations",
      "Numerical Linear Algebra (LU Decomposition)",
      "Numerical Integration (Simpson's Rule, Gaussian Quadrature)",
      "Differential Equations (Runge-Kutta, Finite Difference Method)",
      "Error Analysis & Floating-Point IEEE 754 Limitations",
    ],
    studentCount: 95,
    feedbackQuote:
      "The interactive Python notebooks Umar created made abstract numerical stability concepts visual and intuitive.",
  },
  {
    id: "ta-physics-lab",
    course: "Introductory Engineering Physics Laboratory",
    code: "TF-1101",
    semester: "Spring 2024",
    role: "Laboratory Assistant",
    description:
      "Supervised physical experiments covering classical mechanics, thermodynamics, electromagnetism, and basic optical interferometry.",
    responsibilities: [
      "Instructed students on proper handling of oscilloscopes, multimeters, function generators, and laser interferometers.",
      "Taught rigorous scientific error propagation methods and statistical data analysis using Python SciPy and Matplotlib.",
      "Evaluated weekly formal lab reports, emphasizing clear scientific writing, uncertainty analysis, and graphical formatting.",
    ],
    topics: [
      "Oscilloscope & Instrumentation Measurement",
      "Statistical Error Propagation & Uncertainty",
      "RLC Circuit Resonance & Impedance",
      "Michelson Interferometry & Wavelength Measurement",
    ],
    studentCount: 110,
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    slug: "why-engineering-physics-is-the-ultimate-software-foundation",
    title: "Why Engineering Physics is the Ultimate Foundation for Modern Software Engineering",
    excerpt:
      "From transistors and semiconductor physics to memory hierarchies and distributed systems: why understanding the physical world makes you a 10x better systems programmer.",
    category: "Physics",
    date: "July 2, 2026",
    readTime: "6 min read",
    tags: ["Engineering Physics", "Systems Programming", "Computer Architecture", "Philosophy"],
    content: `
# The Full Stack Starts at the Atom

In modern software engineering, we talk constantly about "the full stack." But for most developers, the stack stops at the operating system or the JavaScript runtime. When you study **Engineering Physics**, you quickly realize that the true stack goes all the way down to the quantum mechanical behavior of electrons inside silicon crystal lattices.

When you understand that a transistor is not just a logical boolean switch, but a physical MOS capacitor governed by Fermi-Dirac statistics and band-bending, your perspective on code changes completely.

## Why Physics Matters in Code

1. **Memory is Physical, Not Infinite**: In introductory programming, memory is treated as an abstract array of boxes. In physics and hardware engineering, we know that DRAM cells leak charge over time and require active refresh cycles, while SRAM CPU caches depend on flip-flop gate propagation delays. When you write C or Rust code with cache locality in mind, you are directly respecting the physical laws of signal propagation along silicon copper interconnects.
2. **Signal Noise and Data Analytics**: Why do sensor dashboards fail in the real world? Because real-world data is continuous, noisy, and subject to thermodynamic fluctuations. Understanding Fourier transforms, Nyquist sampling rates, and Kalman filtering allows an engineering physicist to write software that cleanses physical reality before it ever reaches a database.
3. **First-Principles Problem Solving**: Physics trains you to strip a complex problem down to its fundamental conservation laws (energy, momentum, charge) and build up a solution from scratch. When debugging a distributed microservice architecture or a memory leak, this reductionist mindset is your most powerful tool.

## Bridging the Gap

My goal as an Engineering Physics student is not just to build software that works, but to build systems that respect the physical world they operate within—whether that's optimizing numerical algorithms for scientific simulations, programming low-latency embedded firmware, or designing clean web interfaces for laboratory instruments.
    `,
  },
  {
    id: "post-2",
    slug: "demystifying-kalman-filters-for-iot-sensors",
    title: "Demystifying Kalman Filters: How to Implement Dual-Stage Sensor Fusion on ESP32 in C++",
    excerpt:
      "A step-by-step mathematical breakdown and practical C++ implementation of Kalman filtering to eliminate baseline drift and noise in inexpensive IoT gas sensors.",
    category: "Embedded Systems",
    date: "June 18, 2026",
    readTime: "9 min read",
    tags: ["Kalman Filter", "ESP32", "C++", "IoT", "Signal Processing"],
    content: `
# The Noise Problem in Low-Cost IoT Sensors

If you have ever connected an MQ-135 or BME680 gas sensor to an Arduino or ESP32 and plotted the raw analog readings, you know the truth: **raw sensor data is terrible.** It jumps around due to high-frequency thermal noise, and drifts slowly over hours as ambient room humidity changes.

If you feed this raw data directly into a cloud database or trigger alarms based on simple threshold checks, your IoT system will be plagued by false positives.

## Enter the Kalman Filter

Rudolf E. Kálmán published his famous recursive linear estimator in 1960. It was famously used by NASA on the Apollo navigation computers to take noisy radar and inertial measurements and predict the true spacecraft trajectory.

We can use the exact same algorithm on an ESP32 microcontroller to estimate true indoor air quality!

### The Two-Step Cycle
The Kalman filter operates in a continuous two-step loop:
1. **Time Update (Predict)**: We project the current state estimate forward in time using our system model and add process noise covariance $Q$.
2. **Measurement Update (Correct)**: We take the noisy physical sensor reading, compute the Kalman Gain $K$, and correct our predicted state.

## Why C++ on ESP32?

While Python has libraries like FilterPy, running Kalman filtering on the edge microcontroller itself (in C++) saves network bandwidth, reduces cloud compute costs, and allows sub-millisecond local alarm triggering. By using fixed-point arithmetic or hardware floating-point units (FPU) on the ESP32 ARM Cortex core, we achieve an execution footprint of under 2 milliseconds per sensor channel!
    `,
  },
  {
    id: "post-3",
    slug: "understanding-density-functional-theory-for-programmers",
    title: "A Programmer's Guide to Density Functional Theory (DFT) & Quantum ESPRESSO",
    excerpt:
      "How computational physicists simulate new semiconductor materials on supercomputers without ever touching a physical beaker or cleanroom.",
    category: "Semiconductor",
    date: "May 25, 2026",
    readTime: "8 min read",
    tags: ["DFT", "Quantum ESPRESSO", "Materials Science", "Scientific Computing", "Python"],
    content: `
# The 3-Body Problem on Steroids

In classical mechanics, simulating three interacting bodies gravitationally is notoriously difficult. Now imagine trying to simulate a silicon crystal lattice containing $10^{23}$ electrons and atomic nuclei, all interacting via Coulomb forces and quantum mechanical exchange-correlation effects!

Solving the exact many-body Schrödinger equation for even a small molecule would take longer than the age of the universe on the world's fastest supercomputer.

## Walter Kohn's Brilliant Shortcut: DFT

In 1964, Walter Kohn and Pierre Hohenberg proved a revolutionary theorem: **you do not need to know the individual 3N-dimensional wavefunctions of every electron to calculate the ground-state energy of a material.** Instead, the entire system can be determined uniquely by the 3-dimensional **electron density function $n(\\mathbf{r})$**.

This discovery earned Walter Kohn the Nobel Prize in Chemistry in 1998 and gave birth to **Density Functional Theory (DFT)**.

## What is Quantum ESPRESSO?

Quantum ESPRESSO is an open-source software suite written in FORTRAN and MPI for electronic-structure calculations and materials modeling at the nanoscale. It uses plane waves and pseudopotentials to solve the Kohn-Sham equations self-consistently.

As a software engineer and physics student, my role is building Python automation pipelines around these FORTRAN solvers—generating crystal lattice geometries, dispatching Slurm cluster jobs, and parsing electronic band structure arrays into beautiful web visualizations.
    `,
  },
  {
    id: "post-4",
    slug: "building-interactive-physics-simulations-in-nextjs-threejs",
    title: "Building Interactive Physics Simulations in the Browser with Next.js and React Three Fiber",
    excerpt:
      "Why interactive 3D WebGL visualizations are replacing static textbook diagrams in engineering education, and how to optimize 60 FPS shaders.",
    category: "Programming",
    date: "April 14, 2026",
    readTime: "7 min read",
    tags: ["Three.js", "React Three Fiber", "WebGL", "Next.js", "Frontend"],
    content: `
# Why Static Physics Diagrams Fail

For over a century, engineering physics textbooks have relied on static 2D ink drawings to explain inherently 3D, dynamic, time-dependent phenomena. Whether it is electromagnetic wave polarization, fluid vortex shedding, or semiconductor band bending, static diagrams force students to do heavy mental gymnastics.

With modern web technologies like **Next.js**, **WebGL**, and **React Three Fiber (R3F)**, we can bring the digital physics laboratory directly into any web browser at 60 frames per second.

## The Power of React Three Fiber

React Three Fiber is a React renderer for Three.js. It allows us to build complex 3D scenes using declarative JSX components, hooks, and reactive state management:

\`\`\`tsx
<Canvas camera={{ position: [0, 0, 5] }}>
  <ambientLight intensity={0.5} />
  <pointLight position={[10, 10, 10]} />
  <SemiconductorWaferMesh />
  <OrbitControls enableZoom={false} />
</Canvas>
\`\`\`

## Performance Rules for 60 FPS Shaders

When rendering 3D scientific data (like a 10,000-particle electron cloud), you cannot update React state on every frame! Here are my three golden rules for high-performance physics web apps:
1. **Use InstancedMesh**: Instead of creating 10,000 individual \`<mesh>\` components, use an \`InstancedMesh\` to draw all particles in a single GPU draw call.
2. **Compute in Shaders (GLSL)**: Move wave equations and trigonometric particle motion out of JavaScript and directly into vertex/fragment shaders running on the GPU.
3. **Strict Memory Disposal**: When navigating between Next.js pages, always dispose of Three.js geometries, materials, and textures to prevent memory leaks in long-running browser sessions.
    `,
  },
];

export const SKILLS: Skill[] = [
  // Programming
  {
    name: "Python",
    category: "Programming",
    yearsOfExperience: 4,
    proficiency: "Expert",
    projectsUsedIn: ["Indoor Air Quality Dashboard", "DFT Simulation Pipeline", "Numerical Methods Teaching"],
    relatedTech: ["NumPy", "SciPy", "Matplotlib", "Pandas", "PyTorch"],
    description: "Primary language for scientific computing, data analytics, automated HPC simulation scripts, and IoT telemetry processing.",
  },
  {
    name: "C / C++",
    category: "Programming",
    yearsOfExperience: 3,
    proficiency: "Advanced",
    projectsUsedIn: ["Indoor Air Quality Dashboard", "TA C Programming Course", "RISC-V FPGA Firmware"],
    relatedTech: ["ESP32 / ESP-IDF", "Arduino", "Valgrind", "GDB/LLDB", "Embedded Systems"],
    description: "Deep expertise in memory management, pointers, embedded microcontroller firmware, and high-performance numerical algorithms.",
  },
  {
    name: "TypeScript / JavaScript",
    category: "Programming",
    yearsOfExperience: 3,
    proficiency: "Advanced",
    projectsUsedIn: ["Indoor Air Quality Dashboard", "Quantum Interactive Notebook", "Personal Portfolio", "Rental Car System"],
    relatedTech: ["Next.js", "React", "Node.js", "Bun", "Tailwind CSS"],
    description: "Building type-safe, responsive, full-stack web applications, interactive scientific dashboards, and 3D WebGL interfaces.",
  },
  {
    name: "Rust / WebAssembly",
    category: "Programming",
    yearsOfExperience: 2,
    proficiency: "Proficient",
    projectsUsedIn: ["Quantum Interactive Notebook"],
    relatedTech: ["wasm-bindgen", "FFTW", "High-Performance Browser Computing"],
    description: "Writing high-speed numerical solvers compiled to WebAssembly for real-time 60 FPS in-browser physics simulations.",
  },
  // Scientific Computing
  {
    name: "NumPy & SciPy",
    category: "Scientific Computing",
    yearsOfExperience: 4,
    proficiency: "Expert",
    projectsUsedIn: ["Indoor Air Quality Dashboard", "DFT Simulation Pipeline", "TA Physics Lab"],
    relatedTech: ["Matplotlib", "Plotly", "Jupyter", "Pandas"],
    description: "Vectorized linear algebra, differential equation integration, signal processing (FFT/Kalman), and statistical error analysis.",
  },
  {
    name: "Quantum ESPRESSO",
    category: "Scientific Computing",
    yearsOfExperience: 2,
    proficiency: "Advanced",
    projectsUsedIn: ["DFT Simulation Pipeline", "MoS2 Bandgap Research Paper"],
    relatedTech: ["Density Functional Theory", "MPI / Slurm", "Linux Cluster", "ASE/Pymatgen"],
    description: "Executing first-principles electronic structure calculations, bandgap prediction, and DOS modeling for semiconductor alloys.",
  },
  {
    name: "MATLAB & Simulink",
    category: "Scientific Computing",
    yearsOfExperience: 3,
    proficiency: "Advanced",
    projectsUsedIn: ["Numerical Methods Course", "Control Systems Simulation"],
    relatedTech: ["Control Theory", "Signal Processing", "Numerical Analysis"],
    description: "Simulating dynamical systems, control feedback loops, and teaching numerical methods for engineering physics.",
  },
  // Frontend
  {
    name: "React & Next.js (App Router)",
    category: "Frontend",
    yearsOfExperience: 3,
    proficiency: "Expert",
    projectsUsedIn: ["Personal Portfolio", "Indoor Air Quality Dashboard", "Quantum Notebook", "Rental Car System"],
    relatedTech: ["Server Components", "Server Actions", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    description: "Architecting modern SEO-optimized, highly interactive web platforms with clean component hierarchies and server-side rendering.",
  },
  {
    name: "Tailwind CSS & Shadcn UI",
    category: "Frontend",
    yearsOfExperience: 3,
    proficiency: "Expert",
    projectsUsedIn: ["Personal Portfolio", "All Web Projects"],
    relatedTech: ["CSS3", "Design Systems", "Neo-Brutalist Styling", "Responsive Layouts"],
    description: "Crafting bespoke design systems, tactile neo-brutalist interfaces, custom animations, and accessible component libraries.",
  },
  {
    name: "Three.js & React Three Fiber",
    category: "Frontend",
    yearsOfExperience: 2,
    proficiency: "Advanced",
    projectsUsedIn: ["Personal Portfolio", "Quantum Interactive Notebook", "IAQ 3D Heatmap"],
    relatedTech: ["WebGL", "GLSL Shaders", "Drei", "3D Data Visualization"],
    description: "Rendering 3D scientific models, interactive crystal lattices, electron probability clouds, and immersive website hero backgrounds.",
  },
  {
    name: "GSAP & Framer Motion",
    category: "Frontend",
    yearsOfExperience: 2,
    proficiency: "Advanced",
    projectsUsedIn: ["Personal Portfolio"],
    relatedTech: ["Lenis Smooth Scroll", "Timeline Orchestration", "Micro-animations"],
    description: "Orchestrating deterministic scroll-triggered animations, page transitions, and tactile UI feedback following HyperFrames principles.",
  },
  // Backend
  {
    name: "Laravel & PHP",
    category: "Backend",
    yearsOfExperience: 2,
    proficiency: "Advanced",
    projectsUsedIn: ["Rental Car Management System"],
    relatedTech: ["REST APIs", "Eloquent ORM", "PostgreSQL", "Redis", "Authentication"],
    description: "Building robust enterprise REST APIs, transaction-safe database architectures, and automated business logic workflows.",
  },
  {
    name: "PostgreSQL & TimescaleDB",
    category: "Backend",
    yearsOfExperience: 3,
    proficiency: "Advanced",
    projectsUsedIn: ["Indoor Air Quality Dashboard", "Rental Car System"],
    relatedTech: ["SQL", "Time-series Data", "Continuous Aggregates", "Database Indexing"],
    description: "Designing relational schemas, optimizing query performance, and handling high-frequency time-series IoT sensor telemetry.",
  },
  {
    name: "MQTT & WebSockets",
    category: "Backend",
    yearsOfExperience: 2,
    proficiency: "Advanced",
    projectsUsedIn: ["Indoor Air Quality Dashboard"],
    relatedTech: ["EMQX Broker", "Real-time Streaming", "TLS Security", "IoT Protocols"],
    description: "Architecting low-latency, bidirectional telemetry communication pipelines between physical sensor nodes and web browsers.",
  },
  // Engineering & Tools
  {
    name: "Linux & Shell Scripting (Bash)",
    category: "Engineering & Tools",
    yearsOfExperience: 4,
    proficiency: "Expert",
    projectsUsedIn: ["DFT Simulation Pipeline", "TA C Programming Automated Grader", "Server Deployment"],
    relatedTech: ["Ubuntu/Debian", "Slurm HPC", "Cron Jobs", "System Administration"],
    description: "Power user of Linux command line, automating cluster workflows, managing server environments, and writing robust bash scripts.",
  },
  {
    name: "SystemVerilog & FPGA (Vivado)",
    category: "Engineering & Tools",
    yearsOfExperience: 2,
    proficiency: "Proficient",
    projectsUsedIn: ["32-bit RISC-V FPGA Processor", "Systolic Array Accelerator"],
    relatedTech: ["Xilinx Artix-7", "RTL Design", "ModelSim", "Digital Logic Synthesis"],
    description: "Designing pipelined CPU architectures, hardware accelerators, and verifying RTL timing closure on Xilinx FPGA hardware.",
  },
  {
    name: "Git, Docker & VS Code",
    category: "Engineering & Tools",
    yearsOfExperience: 4,
    proficiency: "Expert",
    projectsUsedIn: ["All Projects"],
    relatedTech: ["CI/CD Pipelines", "Containerization", "Version Control", "Debugging"],
    description: "Maintaining strict version control, reproducible Docker container environments, and advanced debugging workflows.",
  },
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Undergraduate Student — B.S. in Engineering Physics",
    organization: "Institut Teknologi Bandung (ITB) / University of Excellence",
    period: "2022 — Present (Expected Graduation: 2026)",
    type: "Education",
    location: "Bandung / Indonesia",
    description:
      "Pursuing a rigorous interdisciplinary engineering degree combining classical & quantum physics, advanced mathematics, electronics, instrumentation, and computational engineering. Current GPA: 3.85 / 4.00.",
    highlights: [
      "Specialization: Computational Physics, Instrumentation & Control Systems, and Semiconductor Device Physics.",
      "Key Coursework: Quantum Mechanics, Numerical Methods, Fluid Mechanics, Thermodynamics, Solid State Physics, Microcontroller Systems, Digital Signal Processing.",
      "Awarded Dean's List of Academic Excellence for 5 consecutive semesters.",
    ],
  },
  {
    id: "exp-2",
    role: "Head Teaching Assistant & Lab Instructor (C Programming)",
    organization: "Engineering Physics Department",
    period: "August 2024 — Present",
    type: "Teaching Assistant",
    location: "University Campus",
    description:
      "Instructing 120+ undergraduate students in low-level C programming, memory allocation, data structures, and microcontroller interfacing.",
    highlights: [
      "Led weekly 3-hour laboratory sessions and authored 8 practical assignment modules.",
      "Engineered an automated Python/Valgrind grading system that reduced assignment evaluation time by 65%.",
      "Mentored struggling students through 1-on-1 debugging workshops, achieving a 98% course passing rate.",
    ],
  },
  {
    id: "exp-3",
    role: "Undergraduate Research Assistant (Computational Physics Group)",
    organization: "Laboratory of Solid State & Semiconductor Materials",
    period: "January 2025 — Present",
    type: "Project & Research",
    location: "Research Center",
    description:
      "Conducting first-principles Density Functional Theory (DFT) simulations on supercomputers to discover novel 2D semiconductor alloys for clean energy applications.",
    highlights: [
      "Authored automated Python pipelines wrapping Quantum ESPRESSO on Linux HPC clusters.",
      "Co-authored 2 peer-reviewed journal publications and conference proceedings on MoS2 doping and gate oxide tunneling.",
      "Presented research findings at the Annual Symposium on Semiconductor Technology.",
    ],
  },
  {
    id: "exp-4",
    role: "Lead Software & IoT Engineer",
    organization: "Smart Campus Environmental Monitoring Initiative",
    period: "June 2025 — November 2025",
    type: "Project & Research",
    location: "University Research Labs",
    description:
      "Architected and deployed an end-to-end IoT air quality telemetry platform across 4 high-precision university laboratories.",
    highlights: [
      "Designed ESP32 sensor node firmware featuring embedded dual-stage Kalman filtering.",
      "Built real-time Next.js and TimescaleDB analytics dashboard handling 50Hz WebSocket telemetry streams.",
      "Provided lab researchers with automated environmental stability reports required for sensitive optical calibration.",
    ],
  },
  {
    id: "exp-5",
    role: "Vice President of Technology & Workshop Coordinator",
    organization: "Society of Engineering Physics Students (HMFT)",
    period: "March 2024 — March 2025",
    type: "Leadership & Org",
    location: "Student Union",
    description:
      "Led the technology division of the student organization, organizing technical bootcamps, hackathons, and industry mentorship programs.",
    highlights: [
      "Organized the annual 'Physics & Software Hackathon' with over 200 participants across 15 universities.",
      "Taught a 4-week introductory bootcamp on Linux command line, Git, and Python scientific computing to 80+ freshmen.",
      "Managed the organization's official web portal and internal election software platform.",
    ],
  },
  {
    id: "exp-6",
    role: "Incoming R&D Software & Semiconductor Intern",
    organization: "Targeting R&D & Tech Leaders (Summer 2026)",
    period: "June 2026 — August 2026 (Target)",
    type: "Internship",
    location: "Global / Remote / Hybrid",
    description:
      "Actively seeking challenging summer internship opportunities in scientific software engineering, embedded systems R&D, EDA/semiconductor tool development, or high-performance computing.",
    highlights: [
      "Ready to contribute deep physics domain knowledge, full-stack software expertise, and rigorous analytical problem-solving to an innovative engineering team.",
    ],
  },
];
