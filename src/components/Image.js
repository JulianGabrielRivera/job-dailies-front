import React from "react";

export const Image = React.memo(({ src }) => {
  return <img src={src} className="" />;
});
