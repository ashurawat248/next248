import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function VideoPlayer({
  videoUrl,
  showSolution,
  setShowSolution,
}: {
  videoUrl: string;
  showSolution: boolean;
  setShowSolution: any;
}) {
  console.log(videoUrl, 'url')
  return (
    <Dialog open={showSolution} onOpenChange={(open) => setShowSolution(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Video Solution</DialogTitle>
          <DialogDescription>Watch the video solution below.</DialogDescription>
        </DialogHeader>

        {/* Video Player */}
        <div className="relative">
          <video
            width="100%"
            height="auto"
            controls
            autoPlay
            // key={videoUrl}
            className="rounded-sm"
            // poster="/youtube.png"
            style={{
                objectFit: "contain", 
                maxWidth: "1000px", 
                maxHeight: "250px", 
                width: "100%",
              }}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>

        </div>
      </DialogContent>
    </Dialog>
  );
}

export default VideoPlayer;
