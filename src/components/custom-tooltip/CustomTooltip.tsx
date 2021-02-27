import * as React from "react";

import "./index.scss";

interface IProps {
  isOpen: boolean;
  label: React.ReactNode | JSX.Element;
  position?: "left" | "right" | "center";
  handleChangeOpen(status: boolean): void;
  tooltipClassName?: string;
  ignoreClickOutside?: boolean;
}

class CustomTooltip extends React.Component<IProps> {
  private ref = React.createRef<HTMLDivElement>();

  render() {
    let tooltipClassName = "custom-tooltip__tooltip";
    let labelClassName = "custom-tooltip__label";

    if(this.props.tooltipClassName) {
        tooltipClassName += ` ${this.props.tooltipClassName}`
    }

    if(!this.props.isOpen) {
        tooltipClassName += " custom-tooltip__tooltip_hidden"
    }

    return (
      <div className="custom-tooltip" ref={this.ref}>
        <div
          className={labelClassName}
          onClick={this.handleLabelClick}
        >
          {this.props.label}
        </div>
        <div className={tooltipClassName}>{this.props.children}</div>
      </div>
    );
  }

  handleLabelClick = () => {
    if (!this.props.isOpen) {
      this.openMenu();
    } else {
      this.closeMenu();
    }
  };

  openMenu = () => {
    this.props.handleChangeOpen(true);
    if(!this.props.ignoreClickOutside) document.addEventListener('click', this.outsideClickListener);
  };

  closeMenu = () => {
    this.props.handleChangeOpen(false);
    if(!this.props.ignoreClickOutside) document.removeEventListener('click', this.outsideClickListener);
  };

  outsideClickListener = (event: Event) => {
		if(!this.ref.current || !(event.target instanceof Node)) return;
		if(!this.ref.current.contains(event.target)) {
			this.closeMenu();
		}
	}

}

export default CustomTooltip;
