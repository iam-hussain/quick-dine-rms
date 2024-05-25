import clsx from "clsx";
import React from "react";
import { MutatingDots } from "react-loader-spinner";

function Loader({ minFullScreen = false }: { minFullScreen?: boolean }) {
  return (
    <div
      className={clsx(
        "flex flex-col justify-center align-middle items-center w-full h-full",
        {
          "min-h-screen": minFullScreen,
        },
      )}
    >
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#6633ff"
        secondaryColor="#6633ff"
        // secondaryColor="#4fa94d"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Loader;
