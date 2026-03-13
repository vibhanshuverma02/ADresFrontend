"use client";

import Link from "next/link";
import {  ArrowDown, ArrowDownLeft, ArrowUp ,  ArrowDownRight, ArrowUp01} from 'lucide-react';
import { motion, easeOut } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface NetworkNode {
  id: string;
  name: string;
  color: string;
  hoverColor: string;
  route?: string;
  members?: string[];
}

const networkStructure = {
  categories: [
    {
      id: "feeder",
      name: "Feeder",
      color: "bg-blue-100 text-blue-800",
      description: "Centres of Excellence and research bodies contributing cutting-edge knowledge.",
      children: [
        {
          id: "coes",
          name: "CoEs",
          color: "bg-blue-50 text-orange-900",
          hoverColor: "hover:bg-blue-300",
          subItems: [
            { id: "drr", name: "DRR", color: "bg-blue-50 text-orange-900", hoverColor: "hover:bg-orange-400", route: "/drr" },
            { id: "cca", name: "CCA", color: "bg-blue-50 text-orange-900", hoverColor: "hover:bg-orange-400", route: "/cca" }
          ]
        }
      ]
    },
    {
      id: "implementer",
      name: "Implementer",
      color: "bg-blue-100 text-blue-800",
      description: "State agencies and partners delivering solutions on the ground." ,
      children: [
        {
          id: "states-uts",
          name: "States / UTs",
          color: "bg-blue-50 text-orange-900",
          hoverColor: "hover:bg-blue-300",
          subItems: [
            { id: "state-cc-cell", name: "State CC cell", color: "bg-blue-50 text-orange-900", hoverColor: "hover:bg-orange-400", route: "/states" },
            { id: "sdma", name: "SDMA", color: "bg-blue-50 text-orange-900", hoverColor: "hover:bg-orange-400", route: "/sdma" }
          ]
        }
      ]
    },
    {
      id: "policy-user",
      name: "Policy User",
      color: "bg-blue-100 text-blue-800",
      description: "Decision-makers shaping strategies and governance frameworks.",
      children: [
        {
          id: "central-ministries",
          name: "Central Ministries",
          color: "bg-blue-50 text-orange-900",
          hoverColor: "hover:bg-blue-300",
          subItems: [
            { id: "sectoral-ministries", name: "Sectoral Ministries", color: "bg-blue-50 text-orange-900", hoverColor: "hover:bg-orange-400", route: "/sectoral" },
            { id: "ministry-institutes", name: "Ministry Institutes", color: "bg-blue-50 text-orange-900", hoverColor: "hover:bg-orange-400", route: "/institutes" }
          ]
        }
      ]
    },
    {
      id: "resource-hub",
      name: "Resource Hub",
      color: "bg-blue-100 text-blue-800",
      description: "Global data repositories, best practices, and thematic clusters.",
      children: [
        {
          id: "external-resources",
          name: "External Resources",
          color: "bg-blue-50 text-orange-900",
          hoverColor: "hover:bg-blue-300",
          subItems: [
            { id: "international-partner", name: "International Partner", color: "bg-blue-50 text-orange-900", hoverColor: "hover:bg-orange-400", route: "/partners" },
            { id: "un-agencies", name: "UN Agencies", color: "bg-blue-50 text-orange-900", hoverColor: "hover:bg-orange-400", route: "/agencies" },
            { id: "partner-institutions", name: "Partner Institutions", color: "bg-blue-50 text-orange-900", hoverColor: "hover:bg-orange-400", route: "/institutions" }
          ]
        }
      ]
    }
  ]
};

interface NetworkNodeProps {
  node: NetworkNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

function NetworkNodeComponent({ node, className, size = 'md' }: NetworkNodeProps) {
  const sizeClasses = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-3 text-sm',
    lg: 'px-6 py-4 text-base'
  };

  const content = (
    <div 
      className={cn(
        'rounded-lg font-medium transition-all duration-200 cursor-pointer transform hover:scale-105 hover:shadow-md border border-gray-300',
        node.color,
        node.hoverColor,
        sizeClasses[size],
        className
      )}
    >
      {node.name}
    </div>
  );

return node.route ? (
    <Link href={node.route}>{content}</Link>
  ) : content;}
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut }, // ✅ Now valid
  },
};


const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export function NetworkFunnel() {
  const [hasAnimatedOnce, setHasAnimatedOnce] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [descIndex, setDescIndex] = useState(-1);
  const [childIndex, setChildIndex] = useState(-1);
  const [subItemIndex, setSubItemIndex] = useState(-1);

  // ---- DEBUG SWITCH ----
  const DEBUG = true;

  // Configurable fast-forward duration (total time to jump from current → step 10)
  const FAST_FORWARD_TOTAL = 800; // ms

  // Compute reveal durations dynamically
  const descDuration = networkStructure.categories.length * 1500;
  const childDuration =
    networkStructure.categories.reduce((acc, cat) => acc + cat.children.length, 0) *
    1500;
  const subItemDuration =
    networkStructure.categories.reduce(
      (acc, cat) =>
        acc +
        cat.children.reduce((childAcc, c) => childAcc + (c.subItems?.length || 0), 0),
      0
    ) * 1500;

  // --- Refs to avoid stale closures
  const stepRef = useRef(step);
  const hasAnimatedOnceRef = useRef(hasAnimatedOnce);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => { stepRef.current = step }, [step]);
  useEffect(() => { hasAnimatedOnceRef.current = hasAnimatedOnce }, [hasAnimatedOnce]);

  // Small helpers
  const clearAllTimers = () => {
    if (DEBUG) console.log('[NF] clearAllTimers() –', timersRef.current.length, 'timers');
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
  };

  const setStepSafe = (s: number) => {
    if (DEBUG) console.log(`[NF] setStepSafe -> ${s}`);
    setStep(s);
    stepRef.current = s;
  };

  // Normal animation scheduling
  const startAnimationFrom = (currentStep: number) => {
    if (DEBUG) console.log('[NF] startAnimationFrom()', { currentStep });
    clearAllTimers();

    const plan = planScheduleFrom(currentStep);
    if (DEBUG) console.table(plan);

    plan.forEach(({ step: s, delay }) => {
      const t = setTimeout(() => {
        if (DEBUG) console.log(`[NF] timer fired -> setStep(${s})`);
        setStepSafe(s);
        if (s === 10) setHasAnimatedOnce(true);
      }, delay);
      timersRef.current.push(t);
    });
  };

  const buildRelativeDeltas = () => ({
    '1->2': 1000,
    '2->3': 1000 + descDuration,
    '3->4': 500,
    '4->5': 500 + childDuration,
    '5->6': 1500,
    '6->7': subItemDuration,
    '7->8': 500,
    '8->9': 1000,
    '9->10': 1000,
  });

  const planScheduleFrom = (currentStep: number) => {
    const deltas = buildRelativeDeltas();
    const order = [1,2,3,4,5,6,7,8,9,10];
    const idx = order.indexOf(currentStep);
    const following = order.slice(Math.max(idx, 0) + 1);
    let acc = 0;
    const plan: { step: number; delay: number }[] = [];

    for (let i = 0; i < following.length; i++) {
      const from = i === 0 ? currentStep : following[i - 1];
      const to = following[i];
      const key = `${from}->${to}` as keyof ReturnType<typeof buildRelativeDeltas>;
      const d = deltas[key] ?? 0;
      acc += d;
      plan.push({ step: to, delay: acc });
    }
    return plan;
  };

  // 🔥 Fast-forward helper when leaving viewport early
  const fastForwardToEnd = (fromStep: number) => {
    const remaining = 10 - fromStep;
    if (remaining <= 0) return;

    const perStep = FAST_FORWARD_TOTAL / remaining;
    if (DEBUG) console.log(`[NF] fastForwardToEnd from step ${fromStep}, perStep=${perStep}`);

    for (let i = fromStep + 1; i <= 10; i++) {
      const t = setTimeout(() => {
        setStepSafe(i);
        if (i === 10) setHasAnimatedOnce(true);
      }, (i - fromStep) * perStep);
      timersRef.current.push(t);
    }
  };
// IO observer
useEffect(() => {
  if (observerRef.current) observerRef.current.disconnect();

  observerRef.current = new IntersectionObserver(
    ([entry]) => {
      if (DEBUG) {
        console.log('[NF] IO callback', {
          isIntersecting: entry.isIntersecting,
          ratio: entry.intersectionRatio,
        });
      }

      // Debounce enter/leave events
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        if (entry.isIntersecting) {
          // 👀 ENTERING viewport
          clearAllTimers();

          if (!hasAnimatedOnceRef.current) {
            // Always animate from scratch first time
            startAnimationFrom(1);
          } 
          else {
            // After full run → always static final
            setStepSafe(10);
          }
        } else {
          // 👋 LEAVING viewport
          const s = stepRef.current;
          clearAllTimers();

          if (!hasAnimatedOnceRef.current && s > 0 && s < 10) {
            // If left before completion → fast-forward to end
            fastForwardToEnd(s);

            // Also reveal ALL desc/child/subitems instantly (so no half-drawn lists)
            setDescIndex(networkStructure.categories.length - 1);
            setChildIndex(
              networkStructure.categories.reduce((a, c) => a + c.children.length, 0) - 1
            );
            setSubItemIndex(
              networkStructure.categories.reduce(
                (a, c) => a + c.children.reduce((ca, cc) => ca + (cc.subItems?.length || 0), 0),
                0
              ) - 1
            );
           } 
           //else {
          //   // Already completed once → just snap final
          //   setStepSafe(10);
          // }
        }
      }, 100);
    },
    { threshold: 0.4 } // require ~60% visibility
  );

  const obs = observerRef.current;
  if (ref.current) obs.observe(ref.current);

  return () => {
    if (DEBUG) console.log('[NF] cleanup IO effect');
    obs.disconnect();
    clearAllTimers();
    if (debounceRef.current) clearTimeout(debounceRef.current);
  };
}, [descDuration, childDuration, subItemDuration]);


  // Sequential reveal for desc/child/sub-items (unchanged)
  useEffect(() => {
    if (step === 2) {
      let i = 0;
      const interval = setInterval(() => {
        setDescIndex(i++);
        if (i >= networkStructure.categories.length) clearInterval(interval);
      }, 1500);
      return () => clearInterval(interval);
    }

    if (step === 4) {
      let j = 0;
      const totalChildren = networkStructure.categories.reduce((acc, cat) => acc + cat.children.length, 0);
      const interval = setInterval(() => {
        setChildIndex(j++);
        if (j >= totalChildren) clearInterval(interval);
      }, 1500);
      return () => clearInterval(interval);
    }

    if (step === 6) {
      let k = 0;
      const totalSubItems = networkStructure.categories.reduce(
        (acc, cat) => acc + cat.children.reduce((cAcc, c) => cAcc + (c.subItems?.length || 0), 0),
        0
      );
      const interval = setInterval(() => {
        setSubItemIndex(k++);
        if (k >= totalSubItems) clearInterval(interval);
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [step]);



  return (
    
    <motion.div
      ref={ref}
      className="space-y-8"
      initial="hidden"
      animate={step > 0 ? "visible" : "hidden"}
      variants={containerVariants}
    >
      

      {/* Step 1 & 2: Categories */}
      {step >= 1 && (
        <motion.div className="grid grid-cols-4 gap-7 mb-8" variants={stagger}>
          {networkStructure.categories.map((category: any, catIndex: number) => (
            <motion.div
              key={category.id}
              className="text-center space-y-4"
              variants={fadeIn}
            >
              {/* Always show category name */}
              <div className="font-semibold">{category.name}</div>

              {/* Step 2: sequential descriptions */}
              {step === 2 && descIndex >= catIndex && (
                <motion.p
                  className="text-sm text-gray-500"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {category.description}
                </motion.p>
              )}

              {/* Step 3+: keep desc + add arrows */}
              {step >= 3 && (
                <>
                  <p className="text-sm text-gray-500">{category.description}</p>
                  <div className="flex justify-center mt-2">
                    <ArrowDown className="h-4 w-4 text-gray-800" />
                  </div>
                </>
              )}

              {/* Step 4: Children */}
{/* Step 4: Children */}
{step >= 4 &&
  category.children.map((child: any, index: number) => {
    // global index for child across all categories
    const globalChildIndex =
      networkStructure.categories
        .slice(0, catIndex) // count all children before this category
        .reduce((acc, cat) => acc + cat.children.length, 0) + index;

    return (
      childIndex >= globalChildIndex && (
        <motion.div
          key={child.id}
          className="space-y-3"
          variants={fadeIn}
        >
          <NetworkNodeComponent node={child} className="mx-auto max-w-32" />

          {/* Step 5: Sub Connectors */}
          {step >= 5 && child.subItems?.length > 0 && (
            <motion.div className="flex justify-center gap-2" variants={fadeIn}>
              {child.subItems.length === 1 && <ArrowDown className="h-4 w-4" />}
              {child.subItems.length === 2 && (
                <>
                  <ArrowDownLeft className="h-4 w-4" />
                  <ArrowDownRight className="h-4 w-4" />
                </>
              )}
              {child.subItems.length >= 3 && (
                <>
                  <ArrowDownLeft className="h-4 w-4" />
                  <ArrowDown className="h-4 w-4" />
                  <ArrowDownRight className="h-4 w-4" />
                </>
              )}
            </motion.div>
          )}

          {/* Step 6: Sub Items */}
          {step >= 6 && (
            <motion.div
              className="flex justify-center gap-4 mt-2"
              variants={stagger}
            >
              {child.subItems?.map((subItem: any, subIdx: number) => {
                // global subItem index across all categories + children
                const globalSubItemIndex =
                  networkStructure.categories
                    .slice(0, catIndex) // count sub-items in earlier categories
                    .reduce(
                      (acc, cat) =>
                        acc +
                        cat.children.reduce(
                          (childAcc, c) =>
                            childAcc + (c.subItems?.length || 0),
                          0
                        ),
                      0
                    ) +
                  // count sub-items before this one in current child
                  child.subItems!.slice(0, subIdx).length;

                return (
                  subItemIndex >= globalSubItemIndex && (
                    <motion.div key={subItem.id} variants={fadeIn}>
                      <NetworkNodeComponent
                        node={subItem}
                        size="sm"
                        className="max-w-28"
                      />
                    </motion.div>
                  )
                );
              })}
            </motion.div>
          )}
        </motion.div>
      )
    );
  })}


            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Step 7: Arrows Up */}
      {step >= 7 && (
        <motion.div
          className="flex justify-center space-x-12 mb-4"
          variants={stagger}
        >
          {[1, 2, 3, 4].map((i) => (
            <motion.div key={i} variants={fadeIn}>
              <ArrowUp className="h-6 w-6 text-orange-400" />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Step 8: Funnel */}
      {step >= 8 && (
        <motion.div
          className="relative h-24 overflow-hidden mb-8"
          variants={fadeIn}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 800 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 50 20 Q 400 80 750 20"
              stroke="#3B82F6"
              strokeWidth="4"
              fill="none"
            />
          </svg>
        </motion.div>
      )}

      {/* Step 9: Arrows Down */}
      {step >= 9 && (
        <motion.div
          className="flex justify-center space-x-12 mb-4"
          variants={stagger}
        >
          {[1, 2, 3, 4].map((i) => (
            <motion.div key={i} variants={fadeIn}>
              <ArrowDown className="h-6 w-6 text-orange-400" />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Step 10: Thematic Cluster */}
      {step >= 10 && (
        <motion.div className="text-center mb-6" variants={fadeIn}>
          <h3 className="text-2xl font-bold text-orange-600">
            Thematic Cluster
          </h3>
        </motion.div>
      )}
      {/* Cluster Grid */}
      {/* <motion.div className="grid grid-cols-2 md:grid-cols-5 gap-4 justify-center max-w-4xl mx-auto" variants={stagger}>
        {clusterMapping.map((cluster) => {
          const fullCluster = thematicClusters.find((c) =>
            c.id === cluster.id ||
            c.name.toLowerCase().includes(cluster.name.toLowerCase()) ||
            (cluster.id === "ladakh" && c.id === "ladakh") ||
            (cluster.id === "wef" && c.id === "wef-nexus") ||
            (cluster.id === "wr" && c.id === "water-resilience") ||
            (cluster.id === "acctra" && c.id === "transformation")
          );

          const route = fullCluster?.route || `/clusters/${cluster.id}`;

          return (
            <motion.div key={cluster.id} variants={fadeIn}>
              <Link to={route} className="group">
                <div className="bg-blue-100 hover:bg-blue-200 text-blue-900 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer transform hover:scale-105 hover:shadow-md border border-blue-300 text-center">
                  {cluster.name}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div> */}

      
     
    </motion.div>
  );
}