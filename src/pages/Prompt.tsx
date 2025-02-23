import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Loader2, Sparkles, ChefHat, Plane, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { generateScript } from "@/lib/gemini";
import { toast } from "sonner";

interface ScriptFormData {
  prompt: string;
}

const exampleTemplates = [
  {
    title: "AI Assistant Introduction",
    description: "A futuristic AI assistant wakes up and introduces itself",
    icon: Bot,
  },
  {
    title: "Cooking Tutorial",
    description: "A cooking tutorial for making the perfect sandwich",
    icon: ChefHat,
  },
  {
    title: "Travel Paradise",
    description: "A travel montage showcasing a hidden beach paradise",
    icon: Plane,
  },
];

const Prompt = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<ScriptFormData>({
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = async (data: ScriptFormData) => {
    setIsLoading(true);
    try {
      const script = await generateScript(data.prompt);
      setIsLoading(false);
      // Store the generated script in localStorage to share between pages
      localStorage.setItem('generatedScript', JSON.stringify(script));
      navigate('/script');
    } catch (error) {
      console.error("Error generating script:", error);
      setIsLoading(false);
      toast.error("Failed to generate script. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-pattern" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary">
            Turn Your Ideas into Stunning Video Scripts
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Enter a concept, and let AI generate a structured short-form video script
          </p>
        </motion.div>

        {/* Main Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto backdrop-blur-sm bg-white/10 p-8 rounded-2xl shadow-xl border border-white/20"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="prompt"
                rules={{ 
                  required: "Please enter a prompt",
                  minLength: {
                    value: 5,
                    message: "Prompt must be at least 5 characters"
                  },
                  maxLength: {
                    value: 2000,
                    message: "Prompt must not exceed 2000 characters"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Textarea
  placeholder="Describe your idea... AI will do the rest! ✨"
  className="min-h-[200px] mb-2 bg-white/50 backdrop-blur-sm border-2 border-primary/20 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
  {...field}
/>

                      </motion.div>
                    </FormControl>
                    <div className="text-sm text-gray-500 mb-2">
                      {field.value.length}/2000 characters
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
  type="submit"
  className="w-full mt-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white rounded-xl h-12 text-lg font-semibold shadow-lg transition-all duration-300 relative overflow-hidden"
  disabled={isLoading}
>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating your script...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate Script
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>
        </motion.div>

        {/* Example Templates Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Example Templates
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {exampleTemplates.map((template, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 cursor-pointer"
                onClick={() => form.setValue("prompt", template.description)}
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20">
                  {<template.icon className="w-6 h-6 text-primary" />}
                </div>
                <h3 className="font-semibold mb-2">{template.title}</h3>
                <p className="text-sm text-gray-600">{template.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Prompt;