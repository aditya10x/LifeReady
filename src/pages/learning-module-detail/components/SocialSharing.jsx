import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialSharing = ({ 
  achievement, 
  moduleTitle, 
  progress, 
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = window.location?.href;
  const shareText = achievement 
    ? `🎉 Just completed "${achievement}" in ${moduleTitle} on Adulting Academy! #AdultingWin #LifeSkills`
    : `📚 Learning "${moduleTitle}" on Adulting Academy - ${progress}% complete! #AdultingJourney #LifeSkills`;

  const socialPlatforms = [
    {
      name: 'Twitter',
      icon: 'Twitter',
      color: 'text-blue-500',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'text-blue-600',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
    },
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      color: 'text-green-600',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    }
  ];

  const handleShare = (platform) => {
    window.open(platform?.url, '_blank', 'width=600,height=400');
    setIsOpen(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: moduleTitle,
          text: shareText,
          url: shareUrl
        });
        setIsOpen(false);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        size="default"
        onClick={() => setIsOpen(!isOpen)}
        iconName="Share2"
        iconPosition="left"
      >
        Share Progress
      </Button>
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Share Modal */}
          <div className="absolute top-full right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg z-50 animate-in">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Share Your Progress</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="w-6 h-6"
                >
                  <Icon name="X" size={14} />
                </Button>
              </div>

              {/* Achievement Badge */}
              {achievement && (
                <div className="bg-success/5 border border-success/20 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name="Award" size={16} className="text-success" />
                    <span className="text-sm font-medium text-success">Achievement Unlocked!</span>
                  </div>
                  <p className="text-sm text-foreground">{achievement}</p>
                </div>
              )}

              {/* Progress Display */}
              <div className="bg-muted/50 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{moduleTitle}</span>
                  <span className="text-sm text-muted-foreground">{progress}% complete</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Social Platforms */}
              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-medium text-foreground">Share on social media</h4>
                <div className="grid grid-cols-2 gap-2">
                  {socialPlatforms?.map((platform) => (
                    <button
                      key={platform?.name}
                      onClick={() => handleShare(platform)}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors duration-150 text-left"
                    >
                      <Icon name={platform?.icon} size={18} className={platform?.color} />
                      <span className="text-sm text-foreground">{platform?.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Copy Link */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">Or copy link</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-3 py-2 bg-input border border-border rounded-md text-sm text-muted-foreground"
                  />
                  <Button
                    variant="outline"
                    size="default"
                    onClick={handleCopyLink}
                    iconName={copied ? "Check" : "Copy"}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>

              {/* Native Share (Mobile) */}
              {navigator.share && (
                <div className="mt-4 pt-4 border-t border-border">
                  <Button
                    variant="default"
                    size="default"
                    onClick={handleNativeShare}
                    iconName="Share"
                    iconPosition="left"
                    className="w-full"
                  >
                    Share via Device
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Achievement Celebration Component
export const AchievementCelebration = ({ 
  achievement, 
  onClose, 
  onShare,
  isVisible = false 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in">
      <div className="bg-card border border-border rounded-lg p-6 max-w-md mx-4 text-center animate-in">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Award" size={32} className="text-success" />
        </div>
        
        <h2 className="text-xl font-bold text-foreground mb-2">🎉 Congratulations!</h2>
        <p className="text-muted-foreground mb-6">
          You've completed: <strong>{achievement}</strong>
        </p>
        
        <div className="flex gap-3 justify-center">
          <Button
            variant="default"
            onClick={onShare}
            iconName="Share2"
            iconPosition="left"
          >
            Share Achievement
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
          >
            Continue Learning
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SocialSharing;