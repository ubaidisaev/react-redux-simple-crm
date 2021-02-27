import * as React from "react";

import { CameraIcon } from "@/components/icons";

import "./index.scss";

class Avatar extends React.Component {
  render() {
    return (
      <div className="avatar-person">
        <CameraIcon fill="#49a1ba" width={50} />
      </div>
    );
  }
}

export default Avatar;
