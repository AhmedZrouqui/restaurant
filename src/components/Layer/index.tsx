import React from "react";

interface IProps {
  children: React.ReactNode;
}

function Layer(props: IProps) {
  return (
    <div className="min-h-screen h-screen w-full bg-paper">
      {props.children}
    </div>
  );
}

export default Layer;
