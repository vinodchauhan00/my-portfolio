import p1 from '../assets/project1.png'
import p2 from '../assets/project2.png'
import p3 from '../assets/project3.png'
import p4 from '../assets/project4.png'
import p5 from '../assets/project5.png'
import p6 from '../assets/project6.png'
import a1 from '../assets/arch1.png'
import a2 from '../assets/arch2.jpg'
import a3 from '../assets/arch3.png'

export const profile = {
  name: 'Vinod Chauhan',
  roles: ['Software Engineer', 'DevOps Engineer', 'Full-Stack Developer', 'EV Fleet Platform Builder'],
  tagline:
    'I build full-stack apps and production EV fleet platforms with Node.js and React, and keep them running with Linux, AWS, Docker, Kubernetes and CI/CD.',
  email: 'vinodchauhan3809@gmail.com',
  phone: '+91-827370xxxx',
  location: 'Delhi NCR, India',
  resume: '/Vinod_Chauhan_Resume.pdf',
  socials: {
    github: 'https://github.com/vinodchauhan00',
    linkedin: 'https://linkedin.com/in/vinodchauhan00',
    instagram: 'https://www.instagram.com/_vinod_chauhan__/',
  },
}

export const stats = [
  { value: 1000, suffix: '+', label: 'EV buses connected' },
  { value: 3, suffix: '', label: 'Windows servers monitored' },
  { value: 2, suffix: '+', label: 'Years building for the web' },
  { value: 8, suffix: '+', label: 'Projects shipped' },
]

export const about = {
  paragraphs: [
    "I'm a Software Engineer at Castmaster Mobility, where I work on live data from 1000+ electric buses: configuring Streamax MNVR units, decoding raw HEX telemetry into coordinates, speed, odometer and motor temperature, and building the platform around it.",
    "I started on the frontend with React and Tailwind, then moved deeper into backend and infrastructure: Node.js, MongoDB, Linux, AWS, Docker, Kubernetes and Jenkins. I like owning a feature end to end, from the protocol or API to the server it runs on.",
    "I'm finishing my BCA at GLA University, Mathura, and I'm always happy to talk about backend, DevOps or fleet-tech work.",
  ],
  highlights: [
    'Built CMLV, a fleet platform, on my own',
    'Remote Streamax / CEBBA-2 deployments',
    'Monitoring + auto-restart automation',
  ],
}

// icon = key resolved in Skills.jsx
export const skillGroups = [
  { title: 'Languages & Frameworks', items: [
    ['JavaScript', 'js'], ['Node.js', 'node'], ['Express.js', 'express'], ['React.js', 'react'],
    ['Socket.IO', 'socket'], ['REST APIs', 'api'],['Tailwind CSS', 'tailwind'], ['Python', 'python'], ['Bash', 'bash'], ['PowerShell', 'ps'],
  ]},
  { title: 'Cloud & DevOps', items: [
    ['AWS (EC2, IAM, VPC, CloudWatch)', 'aws'], ['Docker', 'docker'], ['Kubernetes', 'k8s'],
    ['Jenkins', 'jenkins'], ['GitHub Actions', 'gha'], ['CI/CD', 'cicd'],
  ]},
  { title: 'Databases', items: [['MongoDB', 'mongo'], ['MySQL', 'mysql']] },
  { title: 'Systems & Networking', items: [
    ['Linux', 'linux'], ['Windows Server', 'win'], ['PM2', 'pm2'], ['NSSM', 'nssm'],
    ['TCP/IP', 'net'], ['Firewall Rules', 'net'], ['Network Troubleshooting', 'net'],
  ]},
  { title: 'Domain', items: [
    ['Streamax MNVR', 'cam'], ['CEBBA-2', 'cam'], ['808 Protocol', 'net'], ['GPS / CAN Telemetry', 'gps'], ['Google Maps API', 'maps'],
  ]},
  { title: 'Tools', items: [['Git', 'git'], ['GitHub', 'github'], ['Postman', 'postman'], ['npm', 'npm'], ['VS Code', 'vscode'], ] },
]

export const experience = [
  {
    role: 'Software Engineer',
    company: 'Castmaster Mobility India Pvt. Ltd.',
    place: 'Delhi NCR',
    period: 'Nov 2025 – Present',
    tools: ['Node.js', 'React', 'MongoDB', 'Streamax'],
    points: [
      'Configured Streamax MNVR units (cameras, GPS, CAN devices, CP4 displays) remotely to stream live data to company servers across 1000+ EV buses.',
      'Learned the protocol with the Streamax team and decoded raw HEX strings into readable fields: coordinates, speed, direction, odometer and motor temperature.',
      'Installed and configured Streamax CEBBA-2 on client servers remotely and exposed its APIs so clients can run the platform on their own infrastructure.',
      'Developed CMLV on my own, a separate platform covering what CEBBA-2 lacked: 808 protocol support, driver attendance by card punching, SOS, live video and two-way calling via the Streamax API.',
      'Wrote a forwarder service that passes device HEX data unchanged to both the client and CMLV, kept alive with NSSM and PM2.',
      'Built a PowerShell monitoring script for 3 Windows servers (CPU, RAM, disk, logs) that emails daily reports.',
      'Traced dropped data feeds via IP/port reachability, listening ports, process state and logs, then configured auto-restart so services recover without manual action.',
    ],
  },
  {
    role: 'Web Developer Intern',
    company: 'Cloud Quest',
    place: 'Bangalore',
    period: 'Nov 2024 – Jan 2025',
    tools: ['React', 'Tailwind CSS'],
    points: ['Built responsive screens with React.js, Tailwind CSS and JavaScript, connected to REST APIs, using reusable components.'],
  },
]

export const education = [
  { title: 'Bachelor of Computer Applications (BCA)', place: 'GLA University, Mathura', period: '2023 – 2026' },
  { title: 'Class XII', place: 'I.S. Memorial Public School, Hodal, Haryana', period: '2022 – 2023' },
  { title: 'Class X', place: 'I.S. Memorial Public School, Hodal, Haryana', period: '2020 – 2021' },
]

// github/demo: set to null to hide a button. image: null => gradient card
export const projects = [
  {
    title: 'CMLV Fleet Platform',
    image: null,
    tag: 'Featured · Full-stack',
    desc: 'Fleet system with user and API management, Google Maps view, live updates over Socket.IO, driver attendance, SOS, live video and two-way calling.',
    stack: ['Node.js', 'Express', 'React', 'MongoDB', 'MySQL', 'Socket.IO'],
    github: null, demo: null, status: 'Testing / Demo',
  },
  {
    title: 'Jenkins CI/CD Pipeline',
    image: null,
    tag: 'DevOps',
    desc: 'Pipeline that checks out code from GitHub, runs tests, builds Docker images and auto-deploys the container after a successful run.',
    stack: ['Jenkins', 'Docker', 'Git'],
    github: null, demo: null, status: 'Practice · 2026',
  },
  {
    title: 'News Portal',
    image: p4,
    tag: 'Full-stack',
    desc: 'Full-stack news portal with REST APIs for managing articles, JSON-based uploads and retrieval, tested with Postman.',
    stack: ['React', 'Tailwind', 'Node.js', 'Express'],
    github: 'https://github.com/vinodchauhan00/News_portal', demo: null,
  },
  {
    title: 'FortifyLearning',
    image: p2,
    tag: 'Internship project',
    desc: 'Learning platform website built during an internship.',
    stack: ['React', 'Tailwind'],
    github: 'https://github.com/vinodchauhan00/fortifylearning-intern', demo: 'https://fortifylearning.vercel.app/',
  },
  {
    title: '3D Animation',
    image: p1,
    tag: 'Frontend',
    desc: 'Interactive 3D animated web experience.',
    stack: ['JavaScript', 'CSS'],
    github: null, demo: 'https://celadon-jalebi-1eb1b1.netlify.app/',
  },
  {
    title: 'Portfolio v1',
    image: p3,
    tag: 'Frontend',
    desc: 'My first portfolio website.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    github: null, demo: 'https://vinod-chauhan-portfolio.netlify.app/',
  },
  {
    title: 'Flappy Bird Game',
    image: p5,
    tag: 'Game',
    desc: 'Browser-based Flappy Bird clone.',
    stack: ['JavaScript', 'Canvas'],
    github: null, demo: 'https://flappy-bird-game-20.netlify.app/',
  },
  {
    title: 'QR Code Generator',
    image: p6,
    tag: 'Mini project',
    desc: 'Generate QR codes instantly from any text or link.',
    stack: ['JavaScript', 'API'],
    github: 'https://github.com/vinodchauhan00/Mini-project/tree/main/qrcode', demo: 'https://qr-generator-2.netlify.app/',
  },
]

// image: certificate scan (optional), link: verify URL (optional)
export const certifications = [
  { title: 'Cloud Quest Internship', issuer: 'Cloud Quest', date: 'Nov 2024 – Jan 2025', image: null, link: null },
  { title: 'HackVision\u201924 Hackathon', issuer: 'HackVision', date: 'Nov 2024', image: null, link: null },
  { title: 'Achievement', issuer: '', date: '', image: a1, link: null },
  { title: 'Achievement', issuer: '', date: '', image: a2, link: null },
  { title: 'Achievement', issuer: '', date: '', image: a3, link: null },
]
