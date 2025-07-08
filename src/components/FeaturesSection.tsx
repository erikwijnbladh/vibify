
import { Card } from "@/components/ui/card";
import { Palette, Code2, Zap, Users, Download, Settings } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: Palette,
      title: "AI-Powered Design Tokens",
      description: "Generate systematic color palettes, typography scales, and spacing systems from natural language descriptions.",
    },
    {
      icon: Code2,
      title: "Production-Ready Components",
      description: "Get React/TypeScript components that are ready to use in your projects with full shadcn/ui compatibility.",
    },
    {
      icon: Zap,
      title: "Instant Generation",
      description: "Transform aesthetic descriptions into complete design systems in under 30 seconds with Claude AI.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share design systems with your team and maintain visual consistency across all projects.",
    },
    {
      icon: Download,
      title: "Multiple Export Options",
      description: "Copy code directly, download as files, or integrate with GitHub for seamless workflow integration.",
    },
    {
      icon: Settings,
      title: "Customizable Output",
      description: "Fine-tune generated components with custom variants, sizes, and states to match your exact needs.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From concept to production, we provide all the tools you need to create and maintain beautiful, consistent design systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
