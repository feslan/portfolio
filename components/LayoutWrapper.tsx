import { siteMetadata } from "@/data/siteMetadata";

const LayoutWrapper = ({ children }: any) => {
  return (
    <div className="w-screen h-10 min-h-10 bg-blue-500">
      <main className="mb-auto">{children}</main>
    </div>
  );
};

export default LayoutWrapper;
