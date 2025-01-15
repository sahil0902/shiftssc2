import Typewriter from "../../components/fancyui/Typewriter";

export default function About() {
    return (
        <div className="w-full h-full md:text-4xl lg:text-5xl sm:text-3xl text-2xl flex flex-row items-start justify-start bg-background font-normal overflow-hidden p-16 pt-48">
          <p className="whitespace-pre-wrap">
            <span>{"We're born 🌞 to "}</span>
            <Typewriter
              text={["experience", "dance", "love", "be alive", "create things that make the world a better place"]}
              speed={70}
              className="text-yellow-500"
              waitTime={1500}
              deleteSpeed={40}
              cursorChar={"_"}
            />
          </p>
        </div>
      );
}