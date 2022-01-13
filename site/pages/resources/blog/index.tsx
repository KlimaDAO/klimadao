import Blog from "components/pages/Blog";
import { fetchCMSContent } from "lib/fetchCMSContent";

export async function getStaticProps() {
  try {
    const fetchBlogs = await fetchCMSContent("blogs");
    if (!fetchBlogs) {
      throw new Error("No blogs found");
    }
    const blogs = fetchBlogs.map((blog) => {
      return {
        slug: blog.slug,
        publishedAt: blog.publishedAt,
        title: blog.title,
        summary: blog.summary,
        author: blog.author.name,
        imageUrl: blog.imageUrl,
      };
    });
    return {
      props: {
        blogs,
      },
      // revalidate: 120,
    };
  } catch (e) {
    return {
      notFound: true,
      // revalidate: 120
    };
  }
}

export default Blog;
