interface Media {
  videoUrl?: string;
  images?: string[];
}

interface DemoMediaSectionProps {
  media: Media;
}

const DemoMediaSection = ({ media }: DemoMediaSectionProps) => {
  const hasContent = media.videoUrl || (media.images && media.images.length > 0);

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
              {media.images.map((image, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={image}
                    alt={`Demo screenshot ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DemoMediaSection;
