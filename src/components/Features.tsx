
import { motion } from "framer-motion";
import { Wand2, Mic2, Video, Share2, Layout, BarChart } from "lucide-react";

const features = [
  {
    icon: <Wand2 className="w-6 h-6" />,
    title: "AI-Powered Script Generator",
    description: "Instantly generate high-quality video scripts with our advanced AI.",
  },
  {
    icon: <Mic2 className="w-6 h-6" />,
    title: "Voiceover & Text-to-Speech",
    description: "Choose from realistic AI voices in multiple languages.",
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: "Automatic Video Assembly",
    description: "AI stitches videos, animations, and subtitles seamlessly.",
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: "Social Media Scheduler",
    description: "Schedule and publish videos directly to major platforms.",
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: "Customizable Templates",
    description: "Professional video templates with branding options.",
  },
  {
    icon: <BarChart className="w-6 h-6" />,
    title: "AI-Driven Insights",
    description: "Get performance data and recommendations for better engagement.",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What ReelGenie Offers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Powerful features to transform your video content creation process
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
