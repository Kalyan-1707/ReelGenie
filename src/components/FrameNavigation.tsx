
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FrameNavigationProps {
  totalFrames: number;
  currentFrame: number;
  onFrameSelect: (index: number) => void;
}

const FrameNavigation = ({ totalFrames, currentFrame, onFrameSelect }: FrameNavigationProps) => {
  return (
    <div className="flex justify-center gap-2 mb-6">
      {Array.from({ length: totalFrames }).map((_, index) => (
        <Button
          key={index}
          variant={currentFrame === index ? "default" : "outline"}
          size="sm"
          onClick={() => onFrameSelect(index)}
          className={cn(
            "w-10 h-10 rounded-lg transition-all duration-300",
            currentFrame === index && "bg-gradient-to-r from-primary to-secondary hover:opacity-90",
            currentFrame !== index && "hover:border-primary/50"
          )}
        >
          {index + 1}
        </Button>
      ))}
    </div>
  );
};

export default FrameNavigation;
