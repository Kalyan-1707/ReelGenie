import { motion } from "framer-motion";

const ScriptHero = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative py-12 mb-8"
    >
      {/* Background animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-pattern" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
        >
          Your AI-Powered Video Script is Ready!
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Fine-tune your frames, customize details, and bring your vision to life.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ScriptHero;