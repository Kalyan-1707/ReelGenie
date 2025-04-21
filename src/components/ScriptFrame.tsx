
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Music, Video, Mic, Move } from "lucide-react";

interface ScriptFrameProps {
  index: number;
  frame: {
    visual: string;
    voiceover: string;
    music: string;
    transition: string;
  };
  onChange: (field: string, value: string) => void;
  generatedImage?: string;
}

const ScriptFrame = ({ index, frame, onChange, generatedImage }: ScriptFrameProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="w-full max-w-2xl"
    >
      <Card className="backdrop-blur-md bg-white/50 border border-primary/20 shadow-lg transition-all duration-300">
        <CardHeader className="pb-4">
          <h3 className="text-xl font-semibold flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Frame {index + 1}
          </h3>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Image Section */}
          {generatedImage && (
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src={generatedImage} 
                alt={`Generated image for frame ${index + 1}`} 
                className="w-full object-cover aspect-video rounded-lg shadow-md"
              />
            </div>
          )}

          {/* Visual Section */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-primary">
              <Video className="w-4 h-4" />
              Visual
            </Label>
            <Textarea
              value={frame.visual}
              onChange={(e) => onChange('visual', e.target.value)}
              className="min-h-[100px] bg-white/80 hover:bg-white transition-colors border-primary/20 focus:border-primary/40"
              placeholder="Describe the visual elements..."
            />
          </div>

          {/* Voiceover Section */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-secondary">
              <Mic className="w-4 h-4" />
              Voiceover
            </Label>
            <Textarea
              value={frame.voiceover}
              onChange={(e) => onChange('voiceover', e.target.value)}
              className="min-h-[100px] bg-white/80 hover:bg-white transition-colors border-primary/20 focus:border-primary/40 font-italic"
              placeholder="Write the voiceover script..."
            />
          </div>

          {/* Music Section */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-accent">
              <Music className="w-4 h-4" />
              Music
            </Label>
            <Textarea
              value={frame.music}
              onChange={(e) => onChange('music', e.target.value)}
              className="min-h-[60px] bg-white/80 hover:bg-white transition-colors border-primary/20 focus:border-primary/40"
              placeholder="Describe the background music..."
            />
          </div>

          {/* Transition Section */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-primary/80">
              <Move className="w-4 h-4" />
              Transition
            </Label>
            <Textarea
              value={frame.transition}
              onChange={(e) => onChange('transition', e.target.value)}
              className="min-h-[60px] bg-white/80 hover:bg-white transition-colors border-primary/20 focus:border-primary/40"
              placeholder="Describe the transition effect..."
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ScriptFrame;
