import React from 'react';
import './Grid.css';
import { WidthProvider, Responsive } from 'react-grid-layout';
import '../../node_modules/react-grid-layout/css/styles.css';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface Props {
  breakpointCols: {
    lg: number;
    md: number;
    sm: number;
    xs: number;
    xxs: number;
  };
  rowHeight: number;
  layouts: ReactGridLayout.Layouts;
  onBreakpointChange: (breakpoint: string, cols: number) => void;
  onLayoutChange: (
    layout: ReactGridLayout.Layout[],
    layouts: ReactGridLayout.Layouts,
  ) => void;
}

const Grid: React.FunctionComponent<Props> = props => {
  return (
    <ResponsiveReactGridLayout
      className="grid"
      rowHeight={props.rowHeight}
      cols={props.breakpointCols}
      layouts={props.layouts}
      draggableHandle=".grid--draggable"
      onBreakpointChange={props.onBreakpointChange}
      onLayoutChange={props.onLayoutChange}
      margin={[24, 24]}
    >
      {props.children}
    </ResponsiveReactGridLayout>
  );
};

export default Grid;
