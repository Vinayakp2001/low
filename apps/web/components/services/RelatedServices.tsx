import { ServiceCard } from "./ServiceCard";

interface RelatedService {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription: string;
}

interface RelatedServicesProps {
  services: RelatedService[];
}

export function RelatedServices({ services }: RelatedServicesProps) {
  if (!services.length) return null;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-text-primary mb-8">Related Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            title={service.title}
            description={service.shortDescription}
            slug={service.slug.current}
          />
        ))}
      </div>
    </div>
  );
}
