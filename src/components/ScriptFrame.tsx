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
      className="mr-6 w-full"
    >
      <Card className="backdrop-blur-md bg-opacity-50 border border-primary/20 shadow-lg transition-all duration-300 w-full">
        <CardHeader>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            Frame {index + 1}
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Image Section */}
          {generatedImage && <img src={generatedImage} alt={`Generated image for frame ${index + 1}`} className="mb-4 rounded-md w-full object-cover aspect-video" />}

          {/* Visual Section */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Video className="w-4 h-4 text-blue-400" />
              Visual
            </Label>
            <Textarea
              value={frame.visual}
              onChange={(e) => onChange('visual', e.target.value)}
              className="min-h-[100px] bg-background/50 hover:bg-background/80 transition-colors"
              placeholder="Describe the visual elements..."
            />
          </div>

          {/* Voiceover Section */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-purple-400" />
              Voiceover
            </Label>
            <Textarea
              value={frame.voiceover}
              onChange={(e) => onChange('voiceover', e.target.value)}
              className="min-h-[100px] bg-background/50 hover:bg-background/80 transition-colors font-italic"
              placeholder="Write the voiceover script..."
            />
          </div>

          {/* Music Section */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Music className="w-4 h-4 text-green-400" />
              Music
            </Label>
            <Textarea
              value={frame.music}
              onChange={(e) => onChange('music', e.target.value)}
              className="min-h-[60px] bg-background/50 hover:bg-background/80 transition-colors"
              placeholder="Describe the background music..."
            />
          </div>

          {/* Transition Section */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Move className="w-4 h-4 text-yellow-400" />
              Transition
            </Label>
            <Textarea
              value={frame.transition}
              onChange={(e) => onChange('transition', e.target.value)}
              className="min-h-[60px] bg-background/50 hover:bg-background/80 transition-colors"
              placeholder="Describe the transition effect..."
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ScriptFrame;