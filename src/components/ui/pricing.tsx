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
  description = "Choose the plan that works for you. All plans include access to our platform, design system generation, and dedicated support."
}: PricingProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return;
}