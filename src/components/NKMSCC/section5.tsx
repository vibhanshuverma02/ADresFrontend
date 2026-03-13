import React from 'react';
import { ArrowRight, Network, Database, Telescope, FileText, GraduationCap, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function Section5Fulfillment() {
  const alignments = [
    {
      nmskcc: {
        icon: Network,
        text: 'Knowledge networks',
        description: 'Establish networks of institutions',
      },
      adres: {
        icon: Network,
        text: 'ADRES connects institutions nationwide',
        description: 'Active collaboration platform',
      },
    },
    {
      nmskcc: {
        icon: Database,
        text: 'Data sharing',
        description: 'Create data-sharing systems',
      },
      adres: {
        icon: Database,
        text: 'ADRES open resource library',
        description: 'Centralized knowledge repository',
      },
    },
    {
      nmskcc: {
        icon: Telescope,
        text: 'Technology foresight',
        description: 'Global technology watch',
      },
      adres: {
        icon: Telescope,
        text: 'ADRES expert clusters & watch groups',
        description: 'International collaboration',
      },
    },
    {
      nmskcc: {
        icon: FileText,
        text: 'Fill knowledge gaps',
        description: 'Address climate science gaps',
      },
      adres: {
        icon: FileText,
        text: 'ADRES thematic research clusters',
        description: 'Targeted research programs',
      },
    },
    {
      nmskcc: {
        icon: GraduationCap,
        text: 'Strengthen capacity',
        description: 'Build human & institutional capacity',
      },
      adres: {
        icon: GraduationCap,
        text: 'ADRES training & mentorship programs',
        description: 'Comprehensive skill development',
      },
    },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20 px-6">
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1  className="text-[#2C3E50] text-2xl sm:text-4xl font-serif leading-tight drop-shadow-lg mb-6">How ADRES Fulfills NMSKCC</h1>
         
        </motion.div>

        {/* Alignment Comparison */}
        <div className="space-y-8 max-w-6xl mx-auto">
          {alignments.map((alignment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-center">
                {/* NMSKCC Action */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <alignment.nmskcc.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-blue-900 mb-1">{alignment.nmskcc.text}</h3>
                      <p className="text-blue-700/80 text-sm">{alignment.nmskcc.description}</p>
                    </div>
                  </div>
                </div>

                {/* Bridge Arrow */}
                <div className="flex items-center justify-center lg:mx-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3, type: 'spring' }}
                    viewport={{ once: true }}
                    className="hidden lg:flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg"
                  >
                    <ArrowRight className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className="flex lg:hidden items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg rotate-90 mx-auto my-2"
                  >
                    <ArrowRight className="w-6 h-6 text-white -rotate-90" />
                  </motion.div>
                </div>

                {/* ADRES Response */}
                <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 border-2 border-emerald-300 rounded-xl p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-md">
                      <alignment.adres.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-emerald-900 mb-1">{alignment.adres.text}</h3>
                      <p className="text-emerald-700/80 text-sm">{alignment.adres.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connection line for mobile */}
              <div className="lg:hidden absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-300 to-cyan-300 -z-10 transform -translate-x-1/2" />
            </motion.div>
          ))}
        </div>

        {/* Success Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-full shadow-2xl">
            <CheckCircle className="w-8 h-8" />
            <span className="text-lg">100% Mission Alignment Achieved</span>
          </div>
        </motion.div>

        {/* Bottom Bridge Visualization */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 relative h-32 max-w-4xl mx-auto"
        >
          <svg className="w-full h-full" viewBox="0 0 800 100">
            <defs>
              <linearGradient id="bridge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            
            {/* Bridge structure */}
            <path
              d="M 50 80 Q 200 20, 400 50 T 750 80"
              fill="none"
              stroke="url(#bridge-gradient)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 50 80 Q 200 25, 400 50 T 750 80"
              fill="none"
              stroke="url(#bridge-gradient)"
              strokeWidth="2"
              opacity="0.5"
              strokeLinecap="round"
            />
            
            {/* Support pillars */}
            {[150, 300, 450, 600].map((x, i) => (
              <motion.line
                key={i}
                x1={x}
                y1="85"
                x2={x}
                y2="40"
                stroke="url(#bridge-gradient)"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                viewport={{ once: true }}
              />
            ))}
          </svg>
          
          {/* Labels */}
          <div className="absolute bottom-0 left-0 text-blue-700">NMSKCC</div>
          <div className="absolute bottom-0 right-0 text-emerald-700">ADRES</div>
        </motion.div>
      </div>
    </section>
  );
}
