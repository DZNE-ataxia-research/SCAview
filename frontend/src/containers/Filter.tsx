import React, { useState } from 'react';
import './Filter.css';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
//import * as Attributes from '../services/Attributes_old';

import { Datum } from 'plotly.js';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

// STRUCTURES

export enum Concept {
  patient = 1,
  visit = 2,
}

interface Constraint {
  attribute: string;
  lower: number | null;
  upper: number | null;
  items: Datum[];
}

interface ConstraintRow {
  attribute: string;
  lower: string;
  upper: string;
  items: string;
}

export interface Subgroup {
  name: string;
  constraints: Constraint[];
}

export interface FilterState {
  concept: Concept;
  constraints: Constraint[];
}

// CONFIG

export const defaultConcept = Concept.patient;

const conceptOptions = [
  { label: 'Patient', value: Concept.patient },
  { label: 'Visit', value: Concept.visit },
];

// PROPS

interface Props {
  filter: FilterState;
  subgroups: Subgroup[];
  onFilterChanged: (filter: Partial<FilterState>) => void;
  onSubgroupDefine: (subgroup: Subgroup) => void;
  onSubgroupDelete: (name: string) => void;
  onSubgroupActivate: (name: string) => void;
  onClose: () => void;
  getTooltip: (attribute_ : string) => string
}

const Filter: React.FunctionComponent<Props> = props => {
  React.useEffect(() => {
    onPropsChanged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  // STATES

  //constraintsTableState
  const [constraintsTableState, setConstraintsTableState] = useState<
    ConstraintRow[]
  >([]);

  //newSubgroupState
  const [newSubgroupState, setNewSubgroupState] = useState<string>('');

  //checkRadioState
  const [selectSubgroupState, setSelectSubgroupState] = useState<Subgroup | null>();

  // HANDLERS

  const onPropsChanged = () => {
    
    setConstraintsTableState(
      props.filter.constraints.map(constraint => {
        return {
          attribute: constraint.attribute,
          lower: constraint.lower ? constraint.lower.toFixed(1) : '',
          upper: constraint.upper ? constraint.upper.toFixed(1) : '',
          items: constraint.items.join(', '),
        };
      }),
    );
  };

  const onConstraintChanging = (
    attribute: string,
    constraint: Partial<ConstraintRow>,
  ) => {
    const newConstraint: ConstraintRow = {
      attribute: '',
      lower: '',
      upper: '',
      items: '',
      ...constraintsTableState.find(
        constraint => constraint.attribute === attribute,
      ),
      ...constraint,
    };
    setConstraintsTableState([
      ...constraintsTableState.filter(
        constraint => constraint.attribute !== attribute,
      ),
      newConstraint,
    ]);
  };

  const onConstraintsChanged = () => {
    props.onFilterChanged({
      constraints: constraintsTableState.map(constraint => {
        return {
          attribute: constraint.attribute,
          lower: constraint.lower ? +constraint.lower : null,
          upper: constraint.upper ? +constraint.upper : null,
          items:
            constraint.items.length > 0 ? constraint.items.split(', ') : [],
        };
      }),
    });
    setSelectSubgroupState(null);
  };

  const onConstraintsReset = () => {
    props.onFilterChanged({ constraints: [] });
    setSelectSubgroupState(null);
  };

  const onConstraintRemove = (attribute: string) => {
    props.onFilterChanged({
      constraints: props.filter.constraints.filter(
        constraint => constraint.attribute !== attribute,
      ),
    });
    setSelectSubgroupState(null);
  };

  // HELPER

  // RENDER

  return (
    <Card className="filter">
      <CardHeader
        subheader="Filter"
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
      <CardContent className="filter__content">
        <div className="form__title">Filter Settings</div>
        <RadioGroup
          row
          value={props.filter.concept}
          onChange={event => {
            props.onFilterChanged({ concept: +event.target.value });
          }}
        >
          {conceptOptions.map(concept => (
            <FormControlLabel
              key={concept.value}
              value={concept.value}
              control={<Radio color="primary" />}
              label={concept.label}
            />
          ))}
        </RadioGroup>
        {!!constraintsTableState.length && (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Attribute</TableCell>
                  <TableCell>Lower</TableCell>
                  <TableCell>Upper</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {constraintsTableState.map(constraint => (
                  <TableRow key={constraint.attribute}>
                    <TableCell>
                      {props.getTooltip(constraint.attribute)}
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={constraint.lower}
                        disabled={!!constraint.items}
                        onChange={event => {
                          onConstraintChanging(constraint.attribute, {
                            lower: event.target.value,
                          });
                        }}
                        onBlur={() => onConstraintsChanged()}
                        onKeyUp={event => {
                          if (event.key === 'Enter') {
                            onConstraintsChanged();
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={constraint.upper}
                        disabled={!!constraint.items}
                        onChange={event => {
                          onConstraintChanging(constraint.attribute, {
                            upper: event.target.value,
                          });
                        }}
                        onBlur={() => onConstraintsChanged()}
                        onKeyUp={event => {
                          if (event.key === 'Enter') {
                            onConstraintsChanged();
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={constraint.items}
                        disabled={!constraint.items}
                        onChange={event => {
                          onConstraintChanging(constraint.attribute, {
                            items: event.target.value,
                          });
                        }}
                        onBlur={() => onConstraintsChanged()}
                        onKeyUp={event => {
                          if (event.key === 'Enter') {
                            onConstraintsChanged();
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        aria-label="remove"
                        onClick={() => {
                          onConstraintRemove(constraint.attribute);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={onConstraintsReset}
        >
          Reset filters
        </Button>
        <div className="form__title">Subgroup Definitions</div>
        <div className="input-group">
          <TextField
            value={newSubgroupState}
            label="Name"
            onChange={event => {
              setNewSubgroupState(event.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onKeyUp={event => {
              if (event.key === 'Enter') {
                props.onSubgroupDefine({
                  name: newSubgroupState,
                  constraints: props.filter.constraints,
                });
                setNewSubgroupState('');
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              const subgroup = {
                name: newSubgroupState,
                constraints: props.filter.constraints,
              };
              props.onSubgroupDefine(subgroup);
              setNewSubgroupState('');
              setSelectSubgroupState(subgroup);
            }}
          >
            Define
          </Button>
        </div>
        {!!props.subgroups.length && (
          <RadioGroup
            onChange={event => {
              const subgroup = props.subgroups.find(subgroup => subgroup.name === event.target.value);
              setSelectSubgroupState(subgroup);
              props.onSubgroupActivate(event.target.value);
            }}
            className="subgroups"
          >
            {props.subgroups.map(subgroup => (
              <FormControlLabel
                key={subgroup.name}
                value={subgroup.name}
                control={<Radio color="primary" checked={subgroup === selectSubgroupState}/>}
                label={
                  <div className="subgroup__label">
                    <span>{subgroup.name}</span>
                    <IconButton
                      size="small"
                      aria-label="remove"
                      onClick={() => {
                        props.onSubgroupDelete(subgroup.name);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                }
              />
            ))}
          </RadioGroup>
        )}
      </CardContent>
    </Card>
  );
};

export default Filter;
