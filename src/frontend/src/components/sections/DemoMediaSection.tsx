import { useState } from 'react';
import { resolveAppUrl } from '@/lib/resolveAppUrl';

interface Media {
  videoUrl?: string;
  images?: string[];
}

interface DemoMediaSectionProps {
  media: Media;
}

const DemoMediaSection = ({ media }: DemoMediaSectionProps) => {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const hasContent = media.videoUrl || (media.images && media.images.length > 0);

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  if (!hasContent) {
    return (
      <section id="demo" className="py-20 md:py-32 bg-muted/30">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-foreground">
              Demo & Media
            </h2>
            <div className="bg-card border-2 border-dashed border-border rounded-lg p-12 md:p-20">
              <p className="text-muted-foreground text-lg">
                Demo content coming soon. Check back later for videos and screenshots.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="demo" className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 text-foreground">
            Demo & Media
          </h2>

          {media.videoUrl && (
            <div className="mb-12 aspect-video rounded-lg overflow-hidden shadow-2xl">
              <iframe
                src={media.videoUrl}
                title="Project Demo Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {media.images && media.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {media.images.map((image, index) => {
                const resolvedUrl = resolveAppUrl(image);
                const hasError = imageErrors[index];

                if (hasError) {
                  return (
                    <div
                      key={index}
                      className="rounded-lg overflow-hidden shadow-lg bg-muted border border-border flex items-center justify-center min-h-[300px]"
                    >
                      <p className="text-muted-foreground text-center px-4">
                        Image failed to load
                      </p>
                    </div>
                  );
                }

                return (
                  <a
                    key={index}
                    href={resolvedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer block"
                  >
                    <img
                      src={resolvedUrl}
                      alt={`Demo screenshot ${index + 1}`}
                      className="w-full h-auto object-cover"
                      onError={() => handleImageError(index)}
                    />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DemoMediaSection;
