import { useState } from "react";

function withHover(WrappedComponent: any) {
  return function (props: any) {
    const [isHovered, setHovered] = useState(false);

    function handleMouseEnter() {
      setHovered(true);
    }

    function handleMouseLeave() {
      setHovered(false);
    }

    return (
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <WrappedComponent {...props} area="25" />
      </div>
    );
  };
}

export default withHover;
