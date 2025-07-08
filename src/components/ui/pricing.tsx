"use client";

import { buttonVariants } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useState } from "react";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you. All plans include access to our platform, design system generation, and dedicated support.",
}: PricingProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">
            {title}
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={
                isDesktop
                  ? {
                      y: plan.isPopular ? -20 : 0,
                      opacity: 1,
                      scale: plan.isPopular ? 1.05 : 1.0,
                    }
                  : { y: 0, opacity: 1 }
              }
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              className={cn(
                "rounded-2xl border p-8 bg-gray-800 text-center relative transition-all duration-300 hover:scale-105",
                plan.isPopular 
                  ? "border-blue-500 border-2 shadow-xl shadow-blue-500/20" 
                  : "border-gray-700",
                "flex flex-col h-full"
              )}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold">
                    <Star className="h-4 w-4 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-200 mb-4">
                  {plan.name}
                </h3>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">
                    ${plan.price}
                  </span>
                  <span className="text-gray-400 ml-2">
                    / {plan.period}
                  </span>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-left">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={cn(
                    "w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300",
                    plan.isPopular
                      ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl"
                      : "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 hover:border-gray-500"
                  )}
                >
                  {plan.buttonText}
                </button>
                
                <p className="mt-4 text-sm text-gray-400">
                  {plan.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 