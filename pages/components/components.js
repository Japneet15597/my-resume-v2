import { useState, useEffect } from "react";

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export const DialogBox = (props) => {
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

export const VerticalDivider = () => {
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
