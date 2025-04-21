
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Music, Video, Mic, Move, Download } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `frame-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="w-full max-h-[calc(100vh-320px)] overflow-y-auto"
    >
      <Card className="backdrop-blur-md bg-opacity-50 border border-primary/20 shadow-lg transition-all duration-300 w-full">
        <CardHeader>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            Frame {index + 1}
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Image Section with Preview Dialog */}
          {generatedImage && (
            <div className="relative group">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer relative">
                    <img 
                      src={generatedImage} 
                      alt={`Generated image for frame ${index + 1}`} 
                      className="mb-4 rounded-md w-full h-48 object-cover transition-transform hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-sm">Click to preview</span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <img 
                    src={generatedImage} 
                    alt={`Generated image for frame ${index + 1}`} 
                    className="w-full rounded-lg"
                  />
                </DialogContent>
              </Dialog>
              <Button
                variant="outline"
                size="icon"
                onClick={handleDownload}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-primary/10 hover:text-primary border-primary/20"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {/* Visual Section */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Video className="w-4 h-4 text-primary" />
                Visual
              </Label>
              <Textarea
                value={frame.visual}
                onChange={(e) => onChange('visual', e.target.value)}
                className="min-h-[80px] bg-background/50 hover:bg-background/80 transition-colors"
                placeholder="Describe the visual elements..."
              />
            </div>

            {/* Voiceover Section */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-primary" />
                Voiceover
              </Label>
              <Textarea
                value={frame.voiceover}
                onChange={(e) => onChange('voiceover', e.target.value)}
                className="min-h-[80px] bg-background/50 hover:bg-background/80 transition-colors font-italic"
                placeholder="Write the voiceover script..."
              />
            </div>

            {/* Music Section */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Music className="w-4 h-4 text-primary" />
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
                <Move className="w-4 h-4 text-primary" />
                Transition
              </Label>
              <Textarea
                value={frame.transition}
                onChange={(e) => onChange('transition', e.target.value)}
                className="min-h-[60px] bg-background/50 hover:bg-background/80 transition-colors"
                placeholder="Describe the transition effect..."
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ScriptFrame;
