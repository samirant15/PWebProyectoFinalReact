import React from "react";
import Particles from "react-particles-js";

export default () => (
  <div
    style={{
      zIndex: -1,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%"
    }}
  >
    <Particles
      params={{
        particles: {
            number:{
            value:150
            },
            line_linked: {
                shadow: {
                    enable: true,
                    color: "#e34a6f",
                    blur: 1
                }
            }
        }
    }}
    />
  </div>
);
