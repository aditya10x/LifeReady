import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoPlaceholder = ({ 
  title, 
  duration, 
  thumbnail, 
  description,
  comingSoon = true,
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handlePlayClick = () => {
    if (comingSoon) {
      alert('Video content coming soon! Stay tuned for updates.');
    } else {
      // Handle actual video play
      console.log('Playing video:', title);
    }
  };

  return (
    <div 
      className={`relative bg-card border border-border rounded-lg overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Thumbnail/Placeholder */}
      <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center">
            <Icon 
              name="Play" 
              size={48} 
              className="text-primary/60 mx-auto mb-2" 
            />
            <div className="text-sm text-muted-foreground">Video Preview</div>
          </div>
        )}
        
        {/* Play Button Overlay */}
        <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-200 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button
            variant="default"
            size="lg"
            onClick={handlePlayClick}
            iconName="Play"
            iconPosition="left"
            className="shadow-lg"
          >
            {comingSoon ? 'Coming Soon' : 'Play Video'}
          </Button>
        </div>

        {/* Duration Badge */}
        {duration && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
            {duration}
          </div>
        )}

        {/* Coming Soon Badge */}
        {comingSoon && (
          <div className="absolute top-2 left-2 bg-warning text-warning-foreground px-2 py-1 rounded text-xs font-medium">
            Coming Soon
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="p-4">
        <h4 className="font-semibold text-foreground mb-2 line-clamp-2">{title}</h4>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{description}</p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {duration && (
              <span className="flex items-center gap-1">
                <Icon name="Clock" size={12} />
                {duration}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Icon name="Eye" size={12} />
              {comingSoon ? 'Preview' : 'Watch'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={() => console.log('Bookmark video:', title)}
            >
              <Icon name="Bookmark" size={14} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={() => console.log('Share video:', title)}
            >
              <Icon name="Share2" size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Video Playlist Component
export const VideoPlaylist = ({ videos, className = '' }) => {
  const [selectedVideo, setSelectedVideo] = useState(0);

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden ${className}`}>
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Icon name="PlayCircle" size={18} />
          Video Tutorials
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Step-by-step video guides (coming soon)
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        {/* Main Video */}
        <div className="lg:col-span-2">
          <VideoPlaceholder
            title={videos?.[selectedVideo]?.title}
            duration={videos?.[selectedVideo]?.duration}
            description={videos?.[selectedVideo]?.description}
            thumbnail={videos?.[selectedVideo]?.thumbnail}
            comingSoon={videos?.[selectedVideo]?.comingSoon}
            className="border-0 rounded-none"
          />
        </div>
        
        {/* Playlist */}
        <div className="border-l border-border">
          <div className="p-3 border-b border-border">
            <h4 className="font-medium text-foreground text-sm">Playlist ({videos?.length})</h4>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {videos?.map((video, index) => (
              <button
                key={index}
                onClick={() => setSelectedVideo(index)}
                className={`w-full p-3 text-left hover:bg-muted/50 transition-colors duration-150 border-b border-border last:border-b-0 ${
                  selectedVideo === index ? 'bg-primary/5 border-l-2 border-l-primary' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-muted rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Play" size={12} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className={`text-sm font-medium line-clamp-2 ${
                      selectedVideo === index ? 'text-primary' : 'text-foreground'
                    }`}>
                      {video?.title}
                    </h5>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <span>{video?.duration}</span>
                      {video?.comingSoon && (
                        <span className="px-1 py-0.5 bg-warning/20 text-warning rounded text-xs">
                          Soon
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlaceholder;