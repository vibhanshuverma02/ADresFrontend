import React from 'react';
import { Zap, Network, Building2, BookOpen, Users, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

export function Section4Solution() {
  const capabilities = [
    { icon: Network, text: 'Builds national & regional knowledge networks' },
    { icon: Building2, text: 'Connects Centres of Excellence & universities' },
    { icon: BookOpen, text: 'Hosts workshops, datasets, reports' },
    { icon: Users, text: 'Enhances institution capacity & mentorship' },
    { icon: Lightbulb, text: 'Enables scientific collaboration' },
    { icon: Zap, text: 'Supports climate adaptation & resilience research' },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 py-20 px-6 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="network-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="#10b981" />
              <circle cx="0" cy="0" r="1" fill="#06b6d4" />
              <circle cx="60" cy="60" r="1" fill="#06b6d4" />
              <line x1="30" y1="30" x2="0" y2="0" stroke="#10b981" strokeWidth="0.5" />
              <line x1="30" y1="30" x2="60" y2="60" stroke="#10b981" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#network-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            viewport={{ once: true }}
            className="text-[#2C3E50] text-4xl sm:text-7xl font-serif leading-tight drop-shadow-lg mb-6"
          >
          <h2 >Centers OF Excellence
</h2>
          </motion.div>
         
        
        </motion.div>

        {/* India Network Map */}
         <div className="relative w-full h-[600px]  overflow-hidden shadow-lg">

  {/* Your custom overlay header */}
  <div className="absolute top-0 left-0 w-full h-[65px] bg-white/90 z-20 pointer-events-none">

    <h2 className="text-[#2C3E50] text-2xl sm:text-4xl font-serif leading-tight drop-shadow-lg mb-6">NMSKCC – DST (Centres of Excellence)</h2>
    
  </div>

  {/* Google map iframe */}
  <iframe
    src="https://www.google.com/maps/d/embed?mid=1UdOcvhsQbL7e8_zohICnQcVdbiTHNSA"
    className="absolute inset-0 w-full h-full border-0 z-10"
  ></iframe>

  {/* (Optional) overlay gradient to hide header area more smoothly */}
  <div className="absolute top-0 left-0 w-full h-26 bg-gradient-to-b 
                  from-white to-transparent z-10 pointer-events-none"></div>

</div>


        {/* Capabilities Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {capabilities.map((cap, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 hover:border-emerald-300/50 transition-all shadow-lg"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center mb-4 shadow-md">
                <cap.icon className="w-6 h-6 text-black" />
              </div>
              <p className="text-white/90">{cap.text}</p>
            </motion.div>
          ))}
        </div> */}
      </div>
    </section>
  );
}

function IndiaNetworkMap() {
  const nodes = [
    { x: '20%', y: '20%', label: 'North', delay: 0 },
    { x: '50%', y: '15%', label: 'Northeast', delay: 0.1 },
    { x: '80%', y: '25%', label: 'East', delay: 0.2 },
    { x: '15%', y: '45%', label: 'West', delay: 0.3 },
    { x: '50%', y: '50%', label: 'Central', delay: 0.4, isHub: true },
    { x: '75%', y: '55%', label: 'Central-East', delay: 0.5 },
    { x: '30%', y: '75%', label: 'South-West', delay: 0.6 },
    { x: '60%', y: '85%', label: 'South', delay: 0.7 },
  ];

  const connections = [
    { from: 4, to: 0 },
    { from: 4, to: 1 },
    { from: 4, to: 2 },
    { from: 4, to: 3 },
    { from: 4, to: 5 },
    { from: 4, to: 6 },
    { from: 4, to: 7 },
    { from: 0, to: 1 },
    { from: 2, to: 5 },
    { from: 6, to: 7 },
  ];

  return (
    <div className="relative h-[500px] bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map((conn, i) => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];
          return (
            <motion.line
              key={i}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="url(#line-gradient)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1, delay: i * 0.1 }}
              viewport={{ once: true }}
            />
          );
        })}
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Network nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: node.x,
            top: node.y,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: node.delay, type: 'spring' }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <motion.div
              className={`${node.isHub ? 'w-16 h-16' : 'w-12 h-12'} rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center shadow-xl border-4 border-white/30`}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(16, 185, 129, 0.5)',
                  '0 0 40px rgba(16, 185, 129, 0.8)',
                  '0 0 20px rgba(16, 185, 129, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {node.isHub ? (
                <Network className="w-8 h-8 text-white" />
              ) : (
                <Building2 className="w-5 h-5 text-white" />
              )}
            </motion.div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className="text-black/80 text-xs">{node.label}</span>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Pulse effect from center */}
      <motion.div
        className="absolute rounded-full border-2 border-emerald-400/30"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          width: ['0px', '400px'],
          height: ['0px', '400px'],
          opacity: [0.8, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
      />
    </div>
  );
}
