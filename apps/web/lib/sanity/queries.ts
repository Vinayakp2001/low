import { getSanityClient } from "./client";
import type { Homepage, Service, TeamMember, Post, Testimonial, OfficeInfo, PolicyPage } from "@/types";

function client() {
  return getSanityClient();
}

async function fetchOrNull<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  const c = client();
  if (!c) return null;
  return c.fetch<T>(query, params ?? {});
}

// Homepage
export async function getHomepage(): Promise<Homepage | null> {
  return fetchOrNull<Homepage>(`*[_type == "homepage"][0]{
    heroHeadline, heroSubtext, heroCTA,
    introText,
    featuredServices[]->{_id, title, slug, shortDescription},
    featuredTestimonials[]->{_id, quote, clientName, clientRole, clientCompany, rating, featured},
    ctaBannerHeadline, ctaBannerSubtext,
    seo
  }`);
}

// Services
export async function getAllServices(): Promise<Service[]> {
  return (await fetchOrNull<Service[]>(`*[_type == "service"] | order(_createdAt asc){
    _id, title, slug, shortDescription, seo
  }`)) ?? [];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return fetchOrNull<Service>(`*[_type == "service" && slug.current == $slug][0]{
    _id, title, slug, shortDescription, overview, painPoints,
    solutionFraming, faqs, seo,
    relatedServices[]->{_id, title, slug, shortDescription}
  }`, { slug });
}

export async function getAllServiceSlugs(): Promise<{ slug: { current: string } }[]> {
  return (await fetchOrNull<{ slug: { current: string } }[]>(`*[_type == "service"]{ slug }`)) ?? [];
}

// Team
export async function getAllTeamMembers(): Promise<TeamMember[]> {
  return (await fetchOrNull<TeamMember[]>(`*[_type == "teamMember"] | order(_createdAt asc){
    _id, name, slug, title, photo, shortBio, expertiseAreas, seo
  }`)) ?? [];
}

export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
  return fetchOrNull<TeamMember>(`*[_type == "teamMember" && slug.current == $slug][0]{
    _id, name, slug, title, photo, shortBio, fullBio,
    expertiseAreas, barAdmissions, education, seo
  }`, { slug });
}

export async function getAllTeamSlugs(): Promise<{ slug: { current: string } }[]> {
  return (await fetchOrNull<{ slug: { current: string } }[]>(`*[_type == "teamMember"]{ slug }`)) ?? [];
}

// Blog / Insights
export async function getAllPosts(): Promise<Post[]> {
  return (await fetchOrNull<Post[]>(`*[_type == "post"] | order(publishedAt desc){
    _id, title, slug, publishedAt, categories, excerpt, featuredImage,
    author->{_id, name, slug}, seo
  }`)) ?? [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return fetchOrNull<Post>(`*[_type == "post" && slug.current == $slug][0]{
    _id, title, slug, publishedAt, categories, excerpt, featuredImage,
    body, author->{_id, name, slug}, seo
  }`, { slug });
}

export async function getAllPostSlugs(): Promise<{ slug: { current: string } }[]> {
  return (await fetchOrNull<{ slug: { current: string } }[]>(`*[_type == "post"]{ slug }`)) ?? [];
}

// Testimonials
export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  return (await fetchOrNull<Testimonial[]>(`*[_type == "testimonial" && featured == true][0...6]{
    _id, quote, clientName, clientRole, clientCompany, rating
  }`)) ?? [];
}

// Office Info
export async function getOfficeInfo(): Promise<OfficeInfo | null> {
  return fetchOrNull<OfficeInfo>(`*[_type == "officeInfo"][0]`);
}

// Policy Pages
export async function getPolicyPage(pageType: "privacy" | "terms" | "disclaimer"): Promise<PolicyPage | null> {
  return fetchOrNull<PolicyPage>(`*[_type == "policyPage" && pageType == $pageType][0]{
    pageType, title, lastUpdated, body
  }`, { pageType });
}
