import React from "react";

interface Heading {
heading: string,
subHeading: string
}

const Heading = ({heading, subHeading}: Heading) => {
  return (
    <>
      <h1 className="text-sm text-center font-semibold text-gray-500 uppercase tracking-wider mb-4">
        {heading}
      </h1>
      <p className="text-5xl text-center font-bold text-black mb-4">
        {subHeading}
      </p>
    </>
  );
};

export default Heading;
