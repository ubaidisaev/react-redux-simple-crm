import * as React from "react";

import "./index.scss";

export interface IAction {
  label: string;
  action: string;
  icon?: string;
}

interface IContextMenuProps {
  actions: IAction[];
  onClick: (action: string) => void;
}

class ContextMenu extends React.Component<IContextMenuProps> {
  private ref = React.createRef<HTMLDivElement>();
  state = {
    isOpen: false,
  };

  openMenu = () => {
    this.setState({ isOpen: true });
    document.addEventListener("click", this.outsideClickListener);
  };

  closeMenu = () => {
    this.setState({ isOpen: false });
    document.removeEventListener("click", this.outsideClickListener);
  };
  outsideClickListener = (event: any) => {
    if (!this.ref.current) return;
    if (!this.ref.current.contains(event.target) && this.state.isOpen) {
      this.closeMenu();
    }
  };

  handleMenuClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  handleIconClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!this.state.isOpen) {
      this.openMenu();
    } else {
      this.closeMenu();
    }
  };

  handleListItemClick = (action: string) => {
    this.props.onClick(action);
    this.closeMenu();
  };

  render() {
    let wrapperClassName = "context-menu";
    let labelIconClassName = "context-menu__label-icon";
    let listClassName = "context-menu__list";

    if (!this.state.isOpen) {
      listClassName += " context-menu__list_hidden";
    }

    return (
      <div
        ref={this.ref}
        className={wrapperClassName}
        onClick={this.handleMenuClick}
      >
        <div className="context-menu__label">
          <div className={labelIconClassName} onClick={this.handleIconClick}>
            <span></span>
          </div>
        </div>
        <div className={listClassName}>
          <div className="context-menu__list-inner">
            {this.props.actions.map((action, index) => (
              <div
                key={index}
                className={"context-menu__list-item"}
                onClick={this.handleListItemClick.bind(this, action.action)}
              >
                {action.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ContextMenu;
