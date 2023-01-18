import { Datum, PlotSelectionEvent } from 'plotly.js';
import React from 'react';
import Plotly from 'react-plotly.js';

interface Props {
  identifier: string;
  data: Plotly.Data[];
  layout: Partial<Plotly.Layout>;
  onSelected: (
    identifier: string,
    range: Plotly.SelectionRange | undefined,
    items: Datum[],
  ) => void;
}

const Plot: React.FunctionComponent<Props> = props => {
  return (
    <Plotly
      data={props.data}
      layout={{ ...props.layout, autosize: true }}
      config={{
        modeBarButtonsToRemove: ['lasso2d'],
      }}
      useResizeHandler={true}
      onSelected={(data: PlotSelectionEvent) => {
        const pointXValuesWithDuplicates = data.points.map(point => point.x);
        const pointXValues = pointXValuesWithDuplicates.filter(
          (x, i, a) => a.indexOf(x) === i,
        );
        props.onSelected(props.identifier, data.range, pointXValues);
      }}
    />
  );
};

export default Plot;
