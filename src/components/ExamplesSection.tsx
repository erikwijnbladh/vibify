
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ExamplesSection = () => {
  const examples = [
    {
      name: "Brutalist Neon",
      description: "Bold, raw concrete aesthetics with electric neon accents",
      colors: ["#FF0080", "#00FF80", "#0080FF", "#FFFF00"],
      preview: "brutalist with neon colors and harsh shadows",
    },
    {
      name: "Botanical Earth",
      description: "Organic forms inspired by nature with earthy tones",
      colors: ["#8B4513", "#228B22", "#DEB887", "#F4A460"],
      preview: "organic botanical with earth tones and natural textures",
    },
    {
      name: "80s Synthwave",
      description: "Retro-futuristic chrome effects with electric blues",
      colors: ["#FF006E", "#8338EC", "#3A86FF", "#06FFA5"],
      preview: "80s synthwave with chrome effects and electric blues",
    },
    {
      name: "Japanese Minimal",
      description: "Clean, zen-like design with soft grays and negative space",
      colors: ["#F5F5F5", "#E0E0E0", "#BDBDBD", "#757575"],
      preview: "japanese minimal with soft grays and zen aesthetics",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Style Examples
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get inspired by these aesthetic presets, or describe your own unique vision in natural language.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {examples.map((example, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <div className="mb-4">
                <div className="flex gap-2 mb-4">
                  {example.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-8 h-8 rounded-full border-2 border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {example.name}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {example.description}
                </p>
                
                <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-700 italic mb-4">
                  "{example.preview}"
                </div>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 transition-colors"
              >
                Try This Style
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Create Your Own
            </h3>
            <p className="text-gray-600 mb-6">
              Describe any aesthetic in natural language and watch AI transform it into a complete design system.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Start Generating
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};
