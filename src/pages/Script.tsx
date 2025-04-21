import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { GeneratedScript } from "@/lib/gemini";
import ScriptHero from "@/components/ScriptHero";
import ScriptFrame from "@/components/ScriptFrame";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import FrameNavigation from "@/components/FrameNavigation";
import useEmblaCarousel from "embla-carousel-react";

const Script = () => {
  const [generatedScript, setGeneratedScript] = useState<GeneratedScript | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: false,
    dragFree: true
  });

  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setCurrentFrame(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  useEffect(() => {
    const storedScript = localStorage.getItem('generatedScript');
    if (storedScript) {
      setGeneratedScript(JSON.parse(storedScript));
    }
    const storedImages = localStorage.getItem('generatedImages');
    if (storedImages) {
      setGeneratedImages(JSON.parse(storedImages));
    }
  }, []);

  const handleBackToPrompt = () => {
    navigate('/prompt');
  };

  const handleFrameChange = (index: number, field: string, value: string) => {
    const updatedScript = {...generatedScript};
    updatedScript.frames[index][field] = value;
    setGeneratedScript(updatedScript);
    localStorage.setItem('generatedScript', JSON.stringify(updatedScript));
  };

  const handleFrameSelect = (index: number) => {
    emblaApi?.scrollTo(index);
    setCurrentFrame(index);
  };

  if (!generatedScript) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">No script generated yet.</h2>
            <Button 
              onClick={handleBackToPrompt}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300"
            >
              Back to Prompt
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Hero Section */}
      <ScriptHero />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        {/* Script Info */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex justify-between items-center gap-4 flex-wrap bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-primary/10">
            <div>
              <h2 className="text-2xl font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                {generatedScript.title}
              </h2>
              <p className="text-muted-foreground">
                {generatedScript.duration}
              </p>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={handleBackToPrompt}
                className="group transition-all duration-300 border-primary/20 hover:border-primary/50"
              >
                <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
                Back to Prompt
              </Button>
              <Button
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                disabled={isLoading}
                onClick={async () => {
                  if (!generatedScript) return;
                  setIsLoading(true);
                  setStatusMessage('Generating Frames...');
                  const images: string[] = [];
                  for (let i = 0; i < generatedScript.frames.length; i++) {
                    const frame = generatedScript.frames[i];
                    setStatusMessage(`Fetching image ${i + 1}/${generatedScript.frames.length}`);
                    const response = await fetch('http://localhost:3000/api/generate-image', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ prompt: frame.visual }),
                    });

                    const data = await response.json();
                    images.push(`data:image/png;base64,${data.data[0].b64_json}`);

                    // Delay for 10 seconds to avoid rate limiting
                    await new Promise(resolve => setTimeout(resolve, 10000));
                  }
                  setGeneratedImages(images);
                  localStorage.setItem('generatedImages', JSON.stringify(images));
                  setIsLoading(false);
                  setStatusMessage('');
                }}
              >
                {isLoading ? statusMessage : "Generate Frames →"}
              </Button>
            </div>
          </div>
        </div>

        {/* Frame Navigation */}
        <FrameNavigation 
          totalFrames={generatedScript.frames.length}
          currentFrame={currentFrame}
          onFrameSelect={handleFrameSelect}
        />

        {/* Frames Carousel */}
        <div className="max-w-5xl mx-auto">
          <Carousel ref={emblaRef} className="w-full">
            <CarouselContent>
              {generatedScript.frames.map((frame, index) => (
                <CarouselItem key={index} className="flex justify-center px-4">
                  <ScriptFrame
                    index={index}
                    frame={frame}
                    onChange={(field, value) => handleFrameChange(index, field, value)}
                    generatedImage={generatedImages[index]}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </main>
  );
};

export default Script;
