import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const REVALIDATE_SECRET = process.env.SANITY_REVALIDATE_SECRET;

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (REVALIDATE_SECRET && secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const type: string = body?._type ?? "";

    // Revalidate relevant paths based on document type
    const pathMap: Record<string, string[]> = {
      homepage: ["/"],
      service: ["/services", "/services/[slug]"],
      teamMember: ["/team", "/team/[slug]", "/about"],
      post: ["/insights", "/insights/[slug]"],
      officeInfo: ["/contact"],
      testimonial: ["/"],
      policyPage: ["/privacy", "/terms", "/disclaimer"],
    };

    const paths = pathMap[type] ?? ["/"];
    paths.forEach((p) => revalidatePath(p));

    return NextResponse.json({ revalidated: true, paths });
  } catch {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
