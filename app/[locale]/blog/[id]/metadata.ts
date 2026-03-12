import { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/blogs/${params.id}`,
      { cache: "no-store" }
    );
    
    if (!response.ok) {
      return createMetadata({
        title: "Blog Yazısı",
        description: "Blog yazısı detay sayfası",
        url: `/blog/${params.id}`,
        type: "article",
      });
    }

    const blog = await response.json();

    return createMetadata({
      title: blog.title || "Blog Yazısı",
      description: blog.excerpt || blog.content?.substring(0, 160) || "Blog yazısı",
      keywords: ["blog", "haber", blog.category, "TSR GROUP"],
      image: blog.image,
      url: `/blog/${params.id}`,
      type: "article",
    });
  } catch (error) {
    return createMetadata({
      title: "Blog Yazısı",
      description: "Blog yazısı detay sayfası",
      url: `/blog/${params.id}`,
      type: "article",
    });
  }
}












