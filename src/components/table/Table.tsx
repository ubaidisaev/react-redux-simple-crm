import * as React from "react";
import {
  VariableSizeList as List,
  ListChildComponentProps,
} from "react-window";
import AutoSizer, { Size } from "react-virtualized-auto-sizer";

import { getWinWidth } from "@/utils/base";

import "./index.scss";

interface IProps {
  data: unknown[];
  renderHeader: (style: React.CSSProperties) => JSX.Element;
  renderRow: (style: React.CSSProperties, id: string) => JSX.Element;
  getItemSize: (deviceWidth: number, index: number) => number;
}

class Table extends React.Component<IProps> {
  private deviceWidth = getWinWidth();
  private resizeDelay = 250;
  private resizeTimer?: NodeJS.Timeout;
  private ListRef: List | null = null;

  componentDidMount() {
    window.addEventListener("resize", this.resizeListener);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeListener);
  }

  resizeListener = () => {
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.deviceWidth = getWinWidth();
      // if (this.ListRef) this.ListRef.resetAfterIndex(0);
    }, this.resizeDelay);
  };

  itemSize = (index: number) => {
    return this.props.getItemSize(this.deviceWidth, index);
  };

  renderRow = ({ data, index, style }: ListChildComponentProps) => {
    if (index === 0) {
      return this.props.renderHeader(style);
    }

    const id = data[index - 1];

    if (!id) return null;

    return this.props.renderRow(style, id);
  };


  render() {
    const itemCount = this.props.data.length + 1;
    return (
      <AutoSizer>
        {({ height, width }: Size) => (
          <List
            ref={ref => this.ListRef = ref}
            className="table"
            width={width}
            height={height}
            itemSize={this.itemSize}
            itemCount={itemCount}
            itemData={this.props.data}
          >
            {this.renderRow}
          </List>
        )}
      </AutoSizer>
    );
  }
}

export default Table;
