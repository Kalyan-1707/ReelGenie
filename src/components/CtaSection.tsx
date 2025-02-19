
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CtaSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary to-secondary text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Creating with AI – Try ReelGenie Today!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of creators who are already transforming their content with ReelGenie
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-lg transition-all duration-300 hover:shadow-xl"
          >
            Get Started Free
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
