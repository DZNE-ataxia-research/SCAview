import React, { useState } from 'react';
import './Controls.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
//import * as Attributes from '../services/Attributes_old';
import { Fit, Legend } from '../services/Backend';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Alert from '@material-ui/lab/Alert';

// STRUCTURES

export enum DiagramType {
  Scatter = 1,
  Histogram = 2,
  Bar = 3,
  Timeline = 4,
}

export enum Datatype {
  date = 'date',
  int = 'int',
  float = 'float',
  code = 'code',
  subgroups = 'SUBGROUPS',
  patients = 'PATIENTS',
}

export interface Attribute {
  topic: string;
  topicDescription: string;
  umbrella: string;
  umbrellaDescription: string;
  attribute: string;
  attributeDescription: string;
  attributeTooltip: string;
  datatype: string;
  domain: string;
  unit: string;
}

enum Control {
  attX,
  attY,
  attC,
  dt,
  visit,
  followup,
  tolerance,
  fit,
  norm,
  stack,
  legend,
  bins,
}

export interface ControlsState {
  identifier: string;
  type: DiagramType;
  attX: string;
  attY: string;
  attC: string;
  dt: number;
  visit: Visit;
  followup: number;
  tolerance: number;
  norm: boolean;
  stack: boolean;
  fit: Fit;
  legend: Legend;
  bins: number;
}

export enum Visit {
  all = 'ALL',
  baseline = 'BASELINE',
  follow = 'FOLLOW',
}

// CONFIG

const diagramTypeOptions = [
  { label: 'Scatter', value: DiagramType.Scatter },
  { label: 'Histogram', value: DiagramType.Histogram },
  { label: 'Bar', value: DiagramType.Bar },
  { label: 'Timeline', value: DiagramType.Timeline },
];

const visitOptions = [
  { label: 'All visits', value: Visit.all },
  { label: 'First visit', value: Visit.baseline },
  { label: 'Follow-up visits', value: Visit.follow },
];

type DiagramControlParameter = {
  [key in Control]: {
    visible: boolean;
    datatypes?: Datatype[];
  };
};

type DiagramControlParameters = {
  [key in DiagramType]: DiagramControlParameter;
};

const diagramControlParameters: DiagramControlParameters = {
  [DiagramType.Scatter]: {
    [Control.attX]: {
      visible: true,
      datatypes: [Datatype.float, Datatype.int, Datatype.code, Datatype.subgroups,
        Datatype.patients], //allow every datatype to be chosen in scatter
    },
    [Control.attY]: {
      visible: true,
      datatypes: [Datatype.float, Datatype.int, Datatype.code, Datatype.subgroups,
        Datatype.patients], //allow every datatype to be chosen in scatter
    },
    [Control.attC]: {
      visible: true,
      datatypes: [
        Datatype.subgroups,
        Datatype.patients,
        Datatype.float,
        Datatype.int,
        Datatype.code,
      ],
    },
    [Control.dt]: {
      visible: true,
    },
    [Control.visit]: {
      visible: true,
    },
    [Control.followup]: {
      visible: true,
    },
    [Control.tolerance]: {
      visible: true,
    },
    [Control.fit]: {
      visible: true,
    },
    [Control.norm]: {
      visible: false,
    },
    [Control.stack]: {
      visible: false,
    },
    [Control.legend]: {
      visible: true,
    },
    [Control.bins]: {
      visible: false,
    },
  },
  [DiagramType.Histogram]: {
    [Control.attX]: {
      visible: true,
      datatypes: [Datatype.float, Datatype.int],
    },
    [Control.attY]: {
      visible: false,
      datatypes: [],
    },
    [Control.attC]: {
      visible: true,
      datatypes: [
        Datatype.subgroups,
        Datatype.patients,
        Datatype.code,
      ],
    },
    [Control.dt]: {
      visible: true,
    },
    [Control.visit]: {
      visible: true,
    },
    [Control.followup]: {
      visible: true,
    },
    [Control.tolerance]: {
      visible: true,
    },
    [Control.fit]: {
      visible: false,
    },
    [Control.norm]: {
      visible: true,
    },
    [Control.stack]: {
      visible: true,
    },
    [Control.legend]: {
      visible: true,
    },
    [Control.bins]: {
      visible: true,
    },
  },
  [DiagramType.Bar]: {
    [Control.attX]: {
      visible: true,
      datatypes: [
        Datatype.subgroups,
        Datatype.patients,
        Datatype.code,
      ],
    },
    [Control.attY]: {
      visible: false,
      datatypes: [],
    },
    [Control.attC]: {
      visible: true,
      datatypes: [
        Datatype.subgroups,
        Datatype.patients,
        Datatype.code,
      ],
    },
    [Control.dt]: {
      visible: true,
    },
    [Control.visit]: {
      visible: true,
    },
    [Control.followup]: {
      visible: true,
    },
    [Control.tolerance]: {
      visible: true,
    },
    [Control.fit]: {
      visible: false,
    },
    [Control.norm]: {
      visible: true,
    },
    [Control.stack]: {
      visible: true,
    },
    [Control.legend]: {
      visible: true,
    },
    [Control.bins]: {
      visible: false,
    },
  },
  [DiagramType.Timeline]: {
    [Control.attX]: {
      visible: true,
      datatypes: [Datatype.date],
    },
    [Control.attY]: {
      visible: true,
      datatypes: [Datatype.float, Datatype.int],
    },
    [Control.attC]: {
      visible: true,
      datatypes: [Datatype.float, Datatype.int, Datatype.code],
    },
    [Control.dt]: {
      visible: true,
    },
    [Control.visit]: {
      visible: true,
    },
    [Control.followup]: {
      visible: true,
    },
    [Control.tolerance]: {
      visible: true,
    },
    [Control.fit]: {
      visible: true,
    },
    [Control.norm]: {
      visible: false,
    },
    [Control.stack]: {
      visible: false,
    },
    [Control.legend]: {
      visible: true,
    },
    [Control.bins]: {
      visible: false,
    },
  },
};

export const initialDiagramType: DiagramType = DiagramType.Scatter;

// PROPS

interface Props {
  controls: ControlsState;
  onControlsChanged: (
    identifier: string,
    controls: Partial<ControlsState>,
  ) => void;
  onClose: () => void;
  filter: (datatypes: Datatype[]) => Attribute[];
}

const Controls: React.FunctionComponent<Props> = props => {
  React.useEffect(() => {
    onPropsChanged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  // HELPER (see second part below)

  const filterItems = (
    datatypes: Datatype[],
  ): Attribute[] => {
    return props.filter(datatypes);
  };

  // STATES

  // dataState
  interface DataState {
    diagramType: DiagramType;
    diagramControlParameter: DiagramControlParameter;
    attXData: Attribute[];
    attYData: Attribute[];
    attCData: Attribute[];
  }
  const initialDataState: DataState = {
    diagramType: initialDiagramType,
    diagramControlParameter: diagramControlParameters[initialDiagramType],
    attXData: filterItems(
      diagramControlParameters[initialDiagramType][Control.attX].datatypes ||
        [],
    ),
    attYData: filterItems(
      diagramControlParameters[initialDiagramType][Control.attY].datatypes ||
        [],
    ),
    attCData: filterItems(
      diagramControlParameters[initialDiagramType][Control.attC].datatypes ||
        [],
    ),
  };
  const [dataState, setDataState] = useState<DataState>(initialDataState);
  const [currentBin, setCurrentBin] = useState<number | null>(null);

  // HANDLERS

  const onPropsChanged = () => {
    if (props.controls && props.controls.type !== dataState.diagramType) {
      onDiagramTypeChange(props.controls.type);
    }
  };

  const onDiagramTypeChange = (value: DiagramType) => {
    setDataState({
      diagramType: value,
      diagramControlParameter: diagramControlParameters[value],
      attXData: filterItems(
        diagramControlParameters[value][Control.attX].datatypes || [],
      ),
      attYData: filterItems(
        diagramControlParameters[value][Control.attY].datatypes || [],
      ),
      attCData: filterItems(
        diagramControlParameters[value][Control.attC].datatypes || [],
      ),
    });
  };

  // HELPER (see first part above)

  // RENDER

  return (
    <Card className="configuration">
      <CardHeader
        subheader="Plot Configurations"
        action={
          <IconButton
            size="small"
            aria-label="close"
            onClick={() => {
              props.onClose();
            }}
            className="grid__item--close"
          >
            <CloseIcon />
          </IconButton>
        }
      />
      <CardContent className="configuration__content">
        {!props.controls ? (
          <Alert severity="info">No plot selected</Alert>
        ) : (
          <>
            <div className="form__title">Graph Data</div>

            <FormControl variant="outlined" fullWidth>
              <InputLabel>Plot type</InputLabel>
              <Select
                value={props.controls.type}
                onChange={event => {
                  props.onControlsChanged(props.controls.identifier, {
                    type: event.target.value as number,
                  });
                }}
                label="Plot type"
              >
                {diagramTypeOptions.map(diagramType => (
                  <MenuItem key={diagramType.value} value={diagramType.value}>
                    {diagramType.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {dataState.diagramControlParameter[Control.attX].visible && (
              <FormControl variant="outlined" fullWidth>
                <Autocomplete
                  options={dataState.attXData.sort(
                    (a, b) => -b.topic.localeCompare(a.topic),
                  )}
                  groupBy={option => option.topic}
                  getOptionLabel={option => option.attributeTooltip}
                  value={
                    dataState.attXData.find(
                      a => a.attribute === props.controls.attX,
                    ) || null
                  }
                  onChange={(_event, newValue) => {
                    props.onControlsChanged(props.controls.identifier, {
                      attX: newValue?.attribute || '',
                    });
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="X-coordinate attribute"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            )}

            {dataState.diagramControlParameter[Control.attY].visible && (
              <FormControl variant="outlined" fullWidth>
                <Autocomplete
                  options={dataState.attYData.sort(
                    (a, b) => -b.topic.localeCompare(a.topic),
                  )}
                  groupBy={option => option.topic}
                  getOptionLabel={option => option.attributeTooltip}
                  value={
                    dataState.attYData.find(
                      a => a.attribute === props.controls.attY,
                    ) || null
                  }
                  onChange={(_event, newValue) => {
                    props.onControlsChanged(props.controls.identifier, {
                      attY: newValue?.attribute || '',
                    });
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Y-coordinate attribute"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            )}

            {dataState.diagramControlParameter[Control.attC].visible && (
              <FormControl variant="outlined" fullWidth>
                <Autocomplete
                  options={dataState.attCData.sort(
                    (a, b) => -b.topic.localeCompare(a.topic),
                  )}
                  groupBy={option => option.topic}
                  getOptionLabel={option => option.attributeTooltip}
                  value={
                    dataState.attCData.find(
                      a => a.attribute === props.controls.attC,
                    ) || null
                  }
                  onChange={(_event, newValue) => {
                    props.onControlsChanged(props.controls.identifier, {
                      attC: newValue?.attribute || '',
                    });
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Color attribute"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            )}

            {dataState.diagramControlParameter[Control.dt].visible && (
              <TextField
                variant="outlined"
                fullWidth
                type="number"
                label="Time span of a visit (Days)"
                value={props.controls.dt || 0}
                onChange={event => {
                  props.onControlsChanged(props.controls.identifier, {
                    dt: +event.target.value,
                  });
                }}
                InputProps={{ inputProps: { min: 0 } }}
              />
            )}

            {dataState.diagramControlParameter[Control.visit].visible && (
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Visit</InputLabel>
                <Select
                  label="Visit"
                  value={props.controls.visit}
                  onChange={event => {
                    const valueString: string = event.target.value as string;
                    let value: Visit = Visit.all;
                    switch (valueString) {
                      case 'BASELINE': {
                        value = Visit.baseline;
                        break;
                      }
                      case 'FOLLOW': {
                        value = Visit.follow;
                        break;
                      }
                    }
                    props.onControlsChanged(props.controls.identifier, {
                      visit: value,
                    });
                  }}
                >
                  {visitOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {props.controls.visit === Visit.follow && (
              <div className="followup">
                {dataState.diagramControlParameter[Control.followup]
                  .visible && (
                  <TextField
                    type="number"
                    variant="outlined"
                    label="Months from first visit"
                    value={props.controls.followup || 0}
                    onChange={event => {
                      props.onControlsChanged(props.controls.identifier, {
                        followup: +event.target.value,
                      });
                    }}
                    InputProps={{ inputProps: { min: 0 } }}
                    className="followup__months"
                  />
                )}

                {dataState.diagramControlParameter[Control.tolerance]
                  .visible && (
                  <TextField
                    type="number"
                    variant="outlined"
                    label="+/- (Months)"
                    value={props.controls.tolerance || 0}
                    onChange={event => {
                      props.onControlsChanged(props.controls.identifier, {
                        tolerance: +event.target.value,
                      });
                    }}
                    className="followup__tolerance"
                  />
                )}
              </div>
            )}

            <div className="form__title">Display Options</div>

            {dataState.diagramControlParameter[Control.fit].visible && (
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Fit</InputLabel>
                <Select
                  value={props.controls.fit}
                  onChange={event => {
                    //console.log(event.target.value);
                    props.onControlsChanged(props.controls.identifier, {
                      fit: (event.target.value as Fit) || Fit.none,
                    });
                  }}
                  label="fit"
                >
                  <MenuItem value={Fit.none}>none</MenuItem>
                  <MenuItem value={Fit.regression}>regression</MenuItem>
                  {/* @TODO add more fit values here */}
                </Select>
              </FormControl>
            )}

            <div className="switches">
              {dataState.diagramControlParameter[Control.norm].visible && (
                <FormControlLabel
                  control={
                    <Switch
                      checked={props.controls.norm}
                      onChange={event => {
                        props.onControlsChanged(props.controls.identifier, {
                          norm: event.target.checked,
                        });
                      }}
                      color="primary"
                    />
                  }
                  label="Normalize"
                />
              )}

              {dataState.diagramControlParameter[Control.stack].visible && (
                <FormControlLabel
                  control={
                    <Switch
                      checked={props.controls.stack}
                      onChange={event => {
                        props.onControlsChanged(props.controls.identifier, {
                          stack: event.target.checked,
                        });
                      }}
                      color="primary"
                    />
                  }
                  label="Stack"
                />
              )}
            </div>

            {dataState.diagramControlParameter[Control.legend].visible && (
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Legend</InputLabel>
                <Select
                  value={props.controls.legend}
                  onChange={event => {
                    props.onControlsChanged(props.controls.identifier, {
                      legend: (event.target.value as Legend) || Legend.none,
                    });
                  }}
                  label="Legend"
                >
                  <MenuItem value={Legend.none}>no</MenuItem>
                  <MenuItem value={Legend.legend}>yes</MenuItem>
                  {/* @TODO add more legend values here */}
                </Select>
              </FormControl>
            )}

            {dataState.diagramControlParameter[Control.bins].visible && (
              <div className="slider" style={{display: "none" }}>
                <Typography id="viewer-configuration-bin-acuteness-label">
                  Bin acuteness
                </Typography>

                <Slider
                  value={
                    currentBin !== null ? currentBin : props.controls.bins || 0
                  }
                  onChange={(event: any, newValue: number | number[]) => {
                    const value = newValue as number;
                    setCurrentBin(value);
                  }}
                  onChangeCommitted={(
                    event: any,
                    newValue: number | number[],
                  ) => {
                    setCurrentBin(null);
                    const value = newValue as number;
                    if (value !== props.controls.bins) {
                      props.onControlsChanged(props.controls.identifier, {
                        bins: value,
                      });
                    }
                  }}
                  aria-labelledby="viewer-configuration-bin-acuteness-label"
                />
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Controls;
