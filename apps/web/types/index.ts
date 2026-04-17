// Sanity image reference
export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
}

// SEO fields shared across content types
export interface SeoFields {
  title?: string;
  description?: string;
  ogImage?: SanityImage;
}

// Service / Practice Area
export interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription: string;
  overview?: unknown; // portableText
  painPoints?: string[];
  solutionFraming?: unknown; // portableText
  faqs?: { question: string; answer: unknown }[];
  relatedServices?: Pick<Service, "_id" | "title" | "slug" | "shortDescription">[];
  seo?: SeoFields;
}

// Team Member / Attorney
export interface TeamMember {
  _id: string;
  name: string;
  slug: { current: string };
  title: string;
  photo?: SanityImage;
  shortBio: string;
  fullBio?: unknown; // portableText
  expertiseAreas?: string[];
  barAdmissions?: string[];
  education?: { degree: string; institution: string; year?: number }[];
  seo?: SeoFields;
}

// Testimonial
export interface Testimonial {
  _id: string;
  quote: string;
  clientName: string;
  clientRole?: string;
  clientCompany?: string;
  rating?: number;
  featured: boolean;
}

// Blog Post
export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  author?: Pick<TeamMember, "_id" | "name" | "slug">;
  publishedAt: string;
  categories?: string[];
  excerpt: string;
  featuredImage?: SanityImage;
  body?: unknown; // portableText
  seo?: SeoFields;
}

// Office / Contact Info
export interface OfficeInfo {
  firmName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  socialLinks?: { platform: string; url: string }[];
}

// CTA Block
export interface CTABlock {
  headline: string;
  subtext?: string;
  buttonLabel: string;
  buttonHref: string;
  variant: "light" | "dark";
}

// Homepage
export interface Homepage {
  heroHeadline: string;
  heroSubtext: string;
  heroCTA: { label: string; href: string };
  introText: string;
  featuredServices?: Service[];
  featuredTestimonials?: Testimonial[];
  ctaBannerHeadline: string;
  ctaBannerSubtext?: string;
  seo?: SeoFields;
}

// Policy Page
export interface PolicyPage {
  pageType: "privacy" | "terms" | "disclaimer";
  title: string;
  lastUpdated?: string;
  body?: unknown; // portableText
}

// API response types
export interface ApiSuccessResponse {
  success: true;
  message: string;
}

export interface ApiErrorResponse {
  detail: string;
}

export interface CheckoutResponse {
  checkout_url: string;
}
