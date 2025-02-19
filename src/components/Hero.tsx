
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-pattern" />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 inline-block">
            AI-Powered Video Creation
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Create Stunning Short-Form Videos Effortlessly
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            ReelGenie uses AI to generate engaging scripts, voiceovers, and short-form videos – ready to publish in minutes!
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg transition-all duration-300 hover:shadow-xl animate-shine"
          >
            Try ReelGenie for Free
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
