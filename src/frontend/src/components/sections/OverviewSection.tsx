interface OverviewSectionProps {
  overview: string;
}

const OverviewSection = ({ overview }: OverviewSectionProps) => {
  return (
    <section id="overview" className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 text-foreground">
            Project Overview
          </h2>
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed text-center md:text-left">
            <p className="text-base sm:text-lg md:text-xl">{overview}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
