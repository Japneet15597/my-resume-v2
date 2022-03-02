import { useEffect, useState, useRef, useMemo } from "react";
import { DialogBox, VerticalDivider } from "./components/components";
import { Canvas } from "@react-three/fiber";
import { Geometry, Stars } from "./threejsComps/comps";
import { DocumentIcon, DesktopComputerIcon } from "@heroicons/react/solid";
import Image from "next/image";

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

export default function Home() {
  const [openDialogs, setOpenDialogs] = useState([
    // {
    //   id: s4(),
    //   title: "Example Dialog",
    // },
  ]);
  const [time, setTime] = useState();
  const [showStartDialog, setShowStartDialog] = useState(true);

  useEffect(() => {
    // window.addEventListener("pointerdown", () => setShowStartDialog(false));
    setInterval(returnTime, 1000);
  }, []);

  const returnTime = () => {
    const newTime = new Date().toLocaleTimeString();
    setTime(newTime);
  };

  const closeDialog = (id) => {
    let arr = openDialogs;

    var index = openDialogs.findIndex(function (o) {
      return o.id === id;
    });
    if (index !== -1) openDialogs.splice(index, 1);

    setOpenDialogs(arr);
  };

  return (
    <div>
      <Canvas
        shadows={true}
        className="-z-50"
        style={{ backgroundColor: "#92F9F3", position: "absolute" }}
      >
        <directionalLight position={[0, 2, 5]} intensity={0.7} />
        <ambientLight color={"white"} intensity={1} />
        <Geometry />
        <Stars />
      </Canvas>

      <div
        onClick={() => {
          openDialogs.push({ id: s4(), title: "My Computer" });
        }}
        className="cursor-pointer  focus:ring focus:ring-violet-300 max-w-fit"
      >
        <DesktopComputerIcon className="mx-auto w-12 text-slate-400" />
        My Computer
      </div>

      {showStartDialog && (
        <div
          style={{
            boxShadow: "2px 2px #000000",
            border: "2px solid #C0C0C0",
            backgroundColor: "#BDBEBD",
          }}
          className="flex flex-row fixed bottom-10 left-0 h-2/4 w-80 whitespace-nowrap"
        >
          <div
            className="h-full w-1/12 bg-gradient-to-b from-blue-900 to-blue-500 p-4"
            style={{ paddingTop: "95%" }}
          >
            <div className=" font-bold text-2xl text-white rotate-90">
              JAPNEET SINGH
            </div>
          </div>
          <div className="flex flex-col w-full p-4 border-2 border-gray-200">
            <Image
              style={{ boxShadow: "2px 2px #000000" }}
              className="w-32 border-2 border-gray-200"
              src="/me.jpg"
            />
            <span className="text-xl mt-1">
              Japneet Singh<span className="text-xs">, 24 y.o</span>
            </span>
            <span className="">Full-Stack Developer</span>

            <hr
              style={{ boxShadow: "2px 2px #000000" }}
              className="gray-200 my-2"
            />

            <div
              onClick={() => {
                window.open("/Portfolio.pdf");
              }}
              className="cursor-pointer focus:outline-none focus:ring focus:ring-violet-300 max-w-fit"
            >
              <DocumentIcon className="w-12 text-white" />
              Resume
            </div>
          </div>
        </div>
      )}

      {openDialogs.map((item) => {
        return (
          <DialogBox
            key={item.id}
            closeDialog={() => closeDialog(item.id)}
            title={item.title}
          ></DialogBox>
        );
      })}

      <div
        className="fixed flex flex-row bottom-0 border-t-2 w-full p-1 justify-between items-center"
        style={{ backgroundColor: "#BDBEBD", borderColor: "#FFFFFF" }}
      >
        <div className="flex flex-row items-center">
          <button
            onClick={() => setShowStartDialog(!showStartDialog)}
            style={{ backgroundColor: "#BDBEBD" }}
            className={`px-2 font-bold border-2 border-r-black border-b-black ${
              showStartDialog
                ? "border-r-slate-50 border-b-slate-50 border-l-black border-t-black"
                : ""
            }`}
          >
            <div className="flex flex-row">
              <Image className="mr-1 w-6" src="/startIcon.png" />
              Start
            </div>
          </button>

          <VerticalDivider />

          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/Japneet15597"
          >
            <Image className="h-6 mx-2" src="/githubIcon.png" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/Japneet97Singh"
          >
            <Image className="h-6 mx-2" src="/twitterIcon.png" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/japneetsingh97/"
          >
            <Image className="h-6 mx-2" src="/linkedInIcon.png" />
          </a>

          <VerticalDivider />
        </div>

        <div className="flex flex-row items-center">
          <VerticalDivider />
          {time}
        </div>
      </div>
    </div>
  );
}
