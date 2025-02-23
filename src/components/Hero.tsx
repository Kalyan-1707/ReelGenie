
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Clapperboard } from "lucide-react";

const Hero = () => {
  const socialIcons = [
    {
      name: 'TikTok',
      svg: (
        <svg viewBox="0 0 32 32" fill="currentColor" className="w-16 h-16">
          <path d="M16.708 0.027c1.745-0.027 3.48-0.011 5.213-0.027 0.105 2.041 0.839 4.12 2.333 5.563 1.491 1.479 3.6 2.156 5.652 2.385v5.369c-1.923-0.063-3.855-0.463-5.6-1.291-0.76-0.344-1.468-0.787-2.161-1.24-0.009 3.896 0.016 7.787-0.025 11.667-0.104 1.864-0.719 3.719-1.803 5.255-1.744 2.557-4.771 4.224-7.88 4.276-1.907 0.109-3.812-0.411-5.437-1.369-2.693-1.588-4.588-4.495-4.864-7.615-0.032-0.667-0.043-1.333-0.016-1.984 0.24-2.537 1.495-4.964 3.443-6.615 2.208-1.923 5.301-2.839 8.197-2.297 0.027 1.975-0.052 3.948-0.052 5.923-1.323-0.428-2.869-0.308-4.025 0.495-0.844 0.547-1.485 1.385-1.819 2.333-0.276 0.676-0.197 1.427-0.181 2.145 0.317 2.188 2.421 4.027 4.667 3.828 1.489-0.016 2.916-0.88 3.692-2.145 0.251-0.443 0.532-0.896 0.547-1.417 0.131-2.385 0.079-4.76 0.095-7.145 0.011-5.375-0.016-10.735 0.025-16.093z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'YouTube',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-pattern" />
      
      {/* Social Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {socialIcons.map((icon, index) => (
          <motion.div
            key={index}
            className="absolute text-primary/40"
            initial={{ 
              x: Math.random() * 80 + 10 + '%', 
              y: Math.random() * 80 + 10 + '%',
              scale: 0
            }}
            animate={{
              x: [
                Math.random() * 80 + 10 + '%',
                Math.random() * 80 + 10 + '%',
                Math.random() * 80 + 10 + '%'
              ],
              y: [
                Math.random() * 80 + 10 + '%',
                Math.random() * 80 + 10 + '%',
                Math.random() * 80 + 10 + '%'
              ],
              scale: 1
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
              scale: {
                duration: 1,
                ease: "easeOut"
              }
            }}
          >
            {icon.svg}
          </motion.div>
        ))}
      </div>

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
          <Button
            size="lg"
            className="relative bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg transition-all duration-300 hover:shadow-xl"
          >
            Try ReelGenie for Free
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
