import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Loader2, Sparkles, MessageSquare, Hash, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Lightbulb } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ScriptFormData {
  prompt: string;
  threadCount: number;
}

const exampleTemplates = [
  {
    title: "Anime Moment",
    description: "A boy confesses his love under the cherry blossoms.",
    icon: Lightbulb,
  },
  {
    title: "Plot Twist Reveal",
    description: "Just as she opened the letter, thunder struck.",
    icon: Lightbulb,
  },
  {
    title: "Dreamy Opening Scene",
    description: "A girl floats above the glowing city lights, lost in thought.",
    icon: Lightbulb,
  },
  {
    title: "Sci-Fi Hook",
    description: "They told her the stars were unreachable — until today.",
    icon: Lightbulb,
  },
  {
    title: "Emotional Turn",
    description: "He smiled one last time, and walked into the sunset.",
    icon: Lightbulb,
  },
  {
    title: "Fantasy Quest Start",
    description: "The map burned as soon as he touched it.",
    icon: Lightbulb,
  },
];

/**
 * A component that renders a form for users to input a prompt, which is used
 * to generate a Twitter/X post using AI. The form includes validation and
 * submission handling.
 *
 * @returns A React component rendering the prompt input form and example templates.
 */
const CreateXPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<ScriptFormData>({
    defaultValues: {
      prompt: "",
    },
  });

  /**
   * Handles the form submission, generating a Twitter/X post from the user-provided prompt.
   *
   * @param data - The form data, including the user-provided prompt.
   */
  const onSubmit = async (data: ScriptFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/generate-thread-script`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: data.prompt,
          numberOfThreads: data.threadCount,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      localStorage.setItem('generatedScript', JSON.stringify(result));
      setIsLoading(false);
      toast.success("Successfully generated X post!");
      navigate('/thread');
    } catch (error) {
      console.error("Error generating X post:", error);
      setIsLoading(false);
      toast.error("Failed to generate X post. Please try again.");
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
            Summon Your Next Viral Thread with ThreadGenie
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            AI-crafted visuals & stories in one click.
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
              <div className="mb-4">
<div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="threadCount">Number of Threads (1-8)</Label>
                <FormField
                  control={form.control}
                  name="threadCount"
                  rules={{
                    required: "Please enter the number of threads",
                    min: {
                      value: 1,
                      message: "Number of threads must be at least 1",
                    },
                    max: {
                      value: 8,
                      message: "Number of threads must be at most 8",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="threadCount"
                          type="number"
                          min="1"
                          max="8"
                          defaultValue={1}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
                <FormField
                  control={form.control}
                  name="prompt"
                  rules={{
                    required: "Please enter a prompt",
                  minLength: {
                    value: 10,
                    message: "Prompt must be at least 10 characters"
                  },
                  maxLength: {
                    value: 280,
                    message: "Prompt must not exceed 280 characters"
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
                          placeholder="Write a scene idea like 'A girl stands alone on a rooftop at sunset'..."
                          className="min-h-[200px] mb-2 bg-white/50 backdrop-blur-sm border-2 border-primary/20 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
                          {...field}
                          defaultValue="A girl stands alone on a rooftop at sunset"
                        />
                      </motion.div>
                    </FormControl>
                    <div className="text-sm text-gray-500 mb-2">
                      {field.value.length}/280 characters
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>

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
                      Summoning ThreadGenie...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      ✨ Summon ThreadGenie
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>
        </motion.div>
        {/* Example Templates Section */}
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
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
                onClick={() => form.setValue("prompt", template.description)}
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20">
                  {<template.icon className="w-6 h-6 text-primary" />}
                </div>
                <h3 className="font-semibold mb-2">{template.title}</h3>
                <p className="text-sm text-gray-600">{template.description}</p>
                {/* Try this template button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    form.setValue("prompt", template.description);
                  }}
                >
                  Try this template
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default CreateXPost;