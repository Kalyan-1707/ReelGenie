
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clapperboard, Sparkles } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
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
          <div className="flex items-center justify-center gap-2 mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-primary/10 p-3 rounded-xl"
            >
              <Clapperboard className="w-6 h-6 text-primary" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            >
              ReelGenie
            </motion.span>
          </div>
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 inline-block">
            AI-Powered Video Creation
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Create Stunning Short-Form Videos Effortlessly
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">ReelGenie</span> uses AI to generate engaging scripts, voiceovers, and short-form videos – ready to publish in minutes!
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative inline-block"
          >
            {/* Animated ring */}
            <motion.div
              className="absolute -inset-4 rounded-full bg-primary/20 z-0"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Sparkles */}
            <motion.div
              className="absolute -right-2 -top-2"
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.div>

            <Button
              size="lg"
              className="relative bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg transition-all duration-300 hover:shadow-xl z-10"
              onClick={() => navigate('/prompt')}
            >
              Try ReelGenie for Free
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
