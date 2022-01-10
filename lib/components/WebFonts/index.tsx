import React from "react";

/** <link> elements to load Righteous and Raleway fonts. For Next.js, render this in a <Head> component */
export const WebFonts = () => {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Righteous&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;700&display=swap"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&display=swap"
        rel="stylesheet"
      ></link>
    </>
  );
};
