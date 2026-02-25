import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, ZoomIn, ZoomOut } from 'lucide-react';

interface Image360ViewerProps {
  imageUrl: string;
  siteName: string;
}

export function Image360Viewer({ imageUrl, siteName }: Image360ViewerProps) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const imageRef = useRef<HTMLDivElement>(null);

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoRotating) return;

    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.5) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setRotation((prev) => (prev + diff * 0.5) % 360);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    setRotation((prev) => (prev + diff * 0.5) % 360);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5));
  };

  const toggleAutoRotate = () => {
    setIsAutoRotating(!isAutoRotating);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      {/* Image Container */}
      <div
        ref={imageRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `scale(${zoom})`,
          transition: isDragging ? 'none' : 'transform 0.3s ease',
        }}
      >
        <div
          className="w-full h-full bg-center bg-no-repeat bg-contain"
          style={{
            backgroundImage: `url(${imageUrl})`,
            transform: `perspective(1000px) rotateY(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.05s linear',
            transformStyle: 'preserve-3d',
          }}
        />
        
        {/* Perspective grid overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(255, 153, 51, 0.05) 25%, rgba(255, 153, 51, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 153, 51, 0.05) 75%, rgba(255, 153, 51, 0.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(255, 153, 51, 0.05) 25%, rgba(255, 153, 51, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 153, 51, 0.05) 75%, rgba(255, 153, 51, 0.05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '50px 50px',
          }} />
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/70 backdrop-blur-md px-4 py-3 rounded-full">
        <button
          onClick={handleZoomOut}
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        
        <div className="text-white text-sm px-3">
          {Math.round(zoom * 100)}%
        </div>
        
        <button
          onClick={handleZoomIn}
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        
        <div className="w-px h-6 bg-white/20 mx-2" />
        
        <button
          onClick={toggleAutoRotate}
          className={`p-2 rounded-full transition-colors ${
            isAutoRotating ? 'bg-[#FF9933] text-white' : 'hover:bg-white/10 text-white'
          }`}
          title={isAutoRotating ? 'Stop Auto-Rotate' : 'Start Auto-Rotate'}
        >
          <RotateCw className={`w-5 h-5 ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
        </button>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full">
        <p className="text-white text-sm">
          {isDragging ? '🔄 Rotating...' : '👆 Drag to rotate • Scroll to zoom'}
        </p>
      </div>

      {/* Site Info Badge */}
      <div className="absolute top-4 left-4 bg-gradient-to-r from-[#FF9933] to-[#138808] px-4 py-2 rounded-full shadow-lg">
        <p className="text-white text-sm font-medium">360° View</p>
      </div>

      {/* Angle Indicator */}
      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-2 rounded-full">
        <p className="text-white text-sm">{Math.round(rotation)}°</p>
      </div>
    </div>
  );
}
