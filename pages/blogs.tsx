import { siteMetadata } from "@/data/siteMetadata";
import ListLayout from "@/components/ListLayout";
import blogsData from "@/data/blogsData";
import { PageSEO } from "@/components/PageSEO";

export const POSTS_PER_PAGE = 5;

export async function getStaticProps() {
  const posts = blogsData;
  console.log(posts);
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return { props: { initialDisplayPosts, posts, pagination } };
}

export default function Blogs({ posts, initialDisplayPosts, pagination }: any) {
  return (
    <>
      <PageSEO
        title={`Blog - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <ListLayout pagination={pagination} title="All Posts" />
    </>
  );
}
