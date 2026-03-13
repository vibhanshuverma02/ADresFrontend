import React from 'react';
import { CloudRain, Network, GraduationCap, LineChart, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export function Section3Pillars() {
  const pillars = [
    {
      title: 'Pillar 1',
      subtitle: 'Strengthening Climate Science',
      icon: CloudRain,
      color: 'from-blue-600 to-blue-400',
      items: [
        { icon: LineChart, text: 'Region-specific climate modelling' },
        { icon: CloudRain, text: 'Impact assessments' },
        { icon: LineChart, text: 'Sector-wise climate impact research' },
      ],
    },
    {
      title: 'Pillar 2',
      subtitle: 'Building Knowledge & Technology Networks',
      icon: Network,
      color: 'from-emerald-600 to-emerald-400',
      items: [
        { icon: Network, text: 'National knowledge networks' },
        { icon: Users, text: 'Linking research institutions' },
        { icon: CloudRain, text: 'Global technology watch groups' },
      ],
    },
    {
      title: 'Pillar 3',
      subtitle: 'Enhancing Capacity',
      icon: GraduationCap,
      color: 'from-teal-600 to-teal-400',
      items: [
        { icon: Award, text: 'New Centres of Excellence' },
        { icon: GraduationCap, text: '50 Climate Research Chairs' },
        { icon: Users, text: 'Training 200 climate professionals' },
      ],
    },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-20 px-6">
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-slate-900 mb-4">NMSKCC Objectives</h1>
          <h2 className="text-blue-700">The Pillars</h2>
        </motion.div>

        {/* Three Pillars Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Pillar structure */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-t-8 border-transparent hover:scale-105 transition-transform duration-300">
                <div className={`h-3 bg-gradient-to-r ${pillar.color}`} />
                
                {/* Pillar header */}
                <div className={`bg-gradient-to-br ${pillar.color} p-8 text-white`}>
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/40">
                      <pillar.icon className="w-10 h-10" />
                    </div>
                  </div>
                  <h3 className="text-center mb-2">{pillar.title}</h3>
                  <p className="text-center text-white/90">{pillar.subtitle}</p>
                </div>

                {/* Pillar items */}
                <div className="p-6 space-y-4">
                  {pillar.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + itemIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${pillar.color} flex items-center justify-center flex-shrink-0`}>
                        <item.icon className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-gray-700 flex-1">{item.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Base of pillar */}
              <div className={`h-4 bg-gradient-to-r ${pillar.color} rounded-b-lg -mt-2 mx-4 opacity-30`} />
              <div className={`h-2 bg-gradient-to-r ${pillar.color} rounded-b-lg -mt-1 mx-8 opacity-20`} />
            </motion.div>
          ))}
        </div>

        {/* Foundation bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="h-2 bg-gradient-to-r from-blue-600 via-emerald-600 to-teal-600 rounded-full max-w-4xl mx-auto origin-center"
        />
      </div>
    </section>
  );
}
