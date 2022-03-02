import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Geometry, Stars } from "./threejsComps/comps";
import { DocumentIcon, DesktopComputerIcon } from "@heroicons/react/solid";

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
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
            <img
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
              <img className="mr-1 w-6" src="/startIcon.png" />
              Start
            </div>
          </button>

          <VerticalDivider />

          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/Japneet15597"
          >
            <img className="h-6 mx-2" src="/githubIcon.png" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/Japneet97Singh"
          >
            <img className="h-6 mx-2" src="/twitterIcon.png" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/japneetsingh97/"
          >
            <img className="h-6 mx-2" src="/linkedInIcon.png" />
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

const DialogBox = (props) => {
  const [X, setX] = useState();
  const [Y, setY] = useState();
  const [xDiff, setXDiff] = useState();
  const [yDiff, setYDiff] = useState();

  useEffect(() => {
    setX(getRandomArbitrary(window.screen.width / 3, window.screen.width / 2));
    setY(
      getRandomArbitrary(window.screen.height / 3, window.screen.height / 2)
    );
  }, []);

  const handleMouseMove = (e) => {
    if (e.changedTouches) {
      setX(e.changedTouches[0].clientX - xDiff);
      setY(e.changedTouches[0].clientY - yDiff);
    } else {
      setX(e.clientX - xDiff);
      setY(e.clientY - yDiff);
    }
  };

  const handleDragStart = (e) => {
    if (e.changedTouches) {
      setXDiff(e.changedTouches[0].clientX - X);
      setYDiff(e.changedTouches[0].clientY - Y);
    } else {
      setXDiff(e.clientX - X);
      setYDiff(e.clientY - Y);
    }
  };

  const handleDragEnd = (e) => {
    if (e.changedTouches) {
      setX(e.changedTouches[0].clientX - xDiff);
      setY(e.changedTouches[0].clientY - yDiff);
    } else {
      setX(e.clientX - xDiff);
      setY(e.clientY - yDiff);
    }
  };

  return (
    <div
      style={{
        transform: `translate(${X}px, ${Y}px)`,
        boxShadow: "2px 2px #000000",
        border: "2px solid #C0C0C0",
      }}
      className="bg-white overflow-hidden shadow w-2/6 sm:h-2/6 absolute select-none"
    >
      <div
        draggable
        onClick={() => console.log("Clicked!")}
        onDrag={handleMouseMove}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onTouchMove={handleMouseMove}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
        className="flex flex-row place-items-end cursor-auto bg-gradient-to-r from-blue-900 to-blue-500 p-1 justify-between border-b-4"
        style={{ backgroundColor: "#BDBEBD" }}
      >
        <h1 className="text-xl text-white">{props.title}</h1>
        <button
          onClick={props.closeDialog}
          style={{ backgroundColor: "#BDBEBD" }}
          className="w-6 font-bold border-2 border-r-black border-b-black active:border-l-black active:border-t-black active:border-r-slate-50 active:border-b-slate-50"
        >
          X
        </button>
      </div>
      <div className="px-4 py-5 sm:p-6">{props.children}</div>
    </div>
  );
};

const VerticalDivider = () => {
  return (
    <div
      style={{
        borderRightColor: "#C0C0C0",
        boxShadow: "1px 1px #000000",
      }}
      className="h-8 border-l-2 border-r-2 ml-2 mr-2"
    />
  );
};
