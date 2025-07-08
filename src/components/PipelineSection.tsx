
import { Card } from "@/components/ui/card";
import { MessageSquare, Palette, Code, Download } from "lucide-react";

export const PipelineSection = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "Describe Your Aesthetic",
      description: "Natural language input like 'Brutalist with neon colors' or 'Japanese minimal with soft grays'",
      example: "\"80s synthwave with chrome effects and electric blues\"",
    },
    {
      icon: Palette,
      title: "AI Generates Design Tokens",
      description: "Claude analyzes your description and creates systematic color palettes, typography, and spacing",
      example: "Colors, fonts, shadows, border radius values",
    },
    {
      icon: Code,
      title: "Components Created",
      description: "Production-ready React components with your custom styling and full TypeScript support",
      example: "Buttons, forms, cards with multiple variants",
    },
    {
      icon: Download,
      title: "Export & Integrate",
      description: "Copy code directly or download as files. Compatible with shadcn/ui and modern frameworks",
      example: "Ready for Next.js, Remix, Vite projects",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            From Aesthetic to Components
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered pipeline transforms your creative vision into systematic, production-ready design systems in minutes, not months.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-8 h-8 text-blue-600" />
              </div>
              
              <div className="text-sm font-semibold text-blue-600 mb-2">
                Step {index + 1}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {step.description}
              </p>
              
              <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-700 italic">
                {step.example}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Average generation time: 30 seconds
          </div>
        </div>
      </div>
    </section>
  );
};
