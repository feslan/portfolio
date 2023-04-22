import { siteMetadata } from "@/data/siteMetadata";
import { PageSEO } from "@/components/PageSEO";
import myTechStack from "@/data/myTechStack";
import TechStack from "@/components/TechStack";
import experienceData from "@/data/experienceData";

export default function Home() {
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="hidden bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text  text-3xl font-extrabold leading-9 tracking-tight text-transparent sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Ferhat Aslan
          </h1>
          <h1 className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-3xl  leading-9 tracking-tight text-transparent sm:text-4xl sm:leading-10 md:text-6xl md:leading-14   font-black ">
            Ferhat Aslan
          </h1>
          <div className="terminal hidden min-h-[100px] w-full flex-col items-start justify-start rounded-lg bg-slate-800">
            <span className="relative flex h-8 w-full items-center justify-start rounded-t-lg bg-black opacity-90">
              <div className="ml-3 flex flex-row gap-x-2">
                <span className="h-3 w-3 rounded-full bg-[#f56565]"></span>
                <span className="h-3 w-3 rounded-full bg-[#ed8936]"></span>
                <span className="h-3 w-3 rounded-full bg-[#32cc77]"></span>
              </div>
              <div className="text-ceter absolute flex w-full  items-center justify-center">
                <span>terminal.js</span>
              </div>
            </span>
            <span className="flex h-full w-full flex-col items-start justify-start p-3">
              <div className="text-sm text-white opacity-90">
                ferhataslan@feslan ~ %
              </div>
            </span>
          </div>
          <p className="text-base leading-7 text-black  dark:text-white">
            {/* {siteMetadata.description} */}Hey 🖐, I am a Software Developer
            who is focused on <span className="text-indigo-500">Web</span> and{" "}
            <span className="text-orange-400">IoT. </span>
            based in Turkiye🇹🇷. I studied Electric/Electronic Engineering and
            Civil Engineering. I have solid experience/knowledge about Web
            Development, Angular, Typescript, Javascript, HTML, CSS. I am
            technology enthusiast, loves to learn new things.
          </p>
        </div>
        <section className="font-alcatraz mb-10 mt-2 w-full pt-2 text-center text-2xl">
          My Tech Stach
        </section>
        <main className="grid w-full grid-cols-2 justify-items-center gap-5 border-none sm:grid-cols-4 md:grid-cols-6">
          {myTechStack.map((res: any) => (
            <TechStack key={res.title} src={res.src} text={res.title} />
          ))}
        </main>
        <section className="font-alcatraz mb-10 mt-2 w-full pt-2 text-center text-2xl">
          Experience
        </section>
        <main className="mt-3 flex w-full flex-col items-start justify-start gap-y-2 border-none">
          {experienceData.map((exp: any) => (
            <article key={exp.title} className="mb-4 w-full">
              <h1 className="text-lg">
                {exp.title}{" "}
                <span className="text-violet-500"> {exp.company}</span>
              </h1>
              <span className="text-xs  text-indigo-500">{exp.dateRange}</span>
              <div className="text-sm opacity-70">{exp.description}</div>
              <div className="mt-2 flex flex-row flex-wrap items-center justify-start gap-2">
                {exp.skills.map((skill: any) => (
                  <span
                    key={skill}
                    className="cursor-pointer rounded-md bg-sky-500 px-2 py-1 text-xs text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </main>
      </div>
    </>
  );
}
