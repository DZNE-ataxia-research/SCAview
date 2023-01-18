import React, { useState, useEffect } from 'react';
import Grid from '../components/Grid';
import Plot from '../components/Plot';
import localStorage from '../services/LocalStorage';
import backend, { Fit, Legend } from '../services/Backend';
import utilities from '../services/Utilities';
import Filter, { FilterState, defaultConcept, Subgroup } from './Filter';
import Configuration, {
  ControlsState,
  DiagramType,
  initialDiagramType,
  Visit,
  Datatype, Attribute
} from './Controls';
import { Figure } from 'react-plotly.js';
import { Datum } from 'plotly.js';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import './Viewer.css';
import AddIcon from '@material-ui/icons/Add';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import ReplayIcon from '@material-ui/icons/Replay';
import SettingsIcon from '@material-ui/icons/Settings';
import FilterListIcon from '@material-ui/icons/FilterList';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';


// CONFIG

export const initialControls = {
  identifier: '',
  type: initialDiagramType,
  attX: '',
  attY: '',
  attC: '',
  dt: 0,
  visit: Visit.all,
  followup: 0,
  tolerance: 0,
  norm: false,
  stack: false,
  fit: Fit.none,
  legend: Legend.legend,
  bins: 0,
};

// PROPS

interface Props {}





const Viewer: React.FunctionComponent<Props> = props => {
  // GET ATTRIBUTES METHODS

  
 

  const [attributes, setAttributes] = useState<Attribute[]>([]);
  // PATIENTS and SUBGROUPS are added to attributes manually and have this values as datatype
  
  
  const getTooltip = (attribute_: string): string => {
      return attributes ? attributes.filter((attr: Attribute) => attr["attribute"] === attribute_)[0]["attributeTooltip"] : "";
  };
  
  const filter = (datatypes: Datatype[]): Attribute[] => {
    return attributes.filter(
      attribute =>
        Object.values(datatypes).findIndex(
          datatype => attribute.datatype === datatype,
        ) !== -1,
    );
  };

  // STATES

  // errorState
  const [errorState, setErrorState] = useState<boolean>();
  const [errorText, setErrorText] = useState<string>('');

  //


  //const [loadingAttributes, setLoadingAttributes] = useState();

  useEffect(()=>{
    backend.getAttributes().then((response) =>{
      console.log(response);
      setAttributes(response.data.allAttributes);
    });
  }, []);

  // viewerState
  const initialViewerState = {
    controlsVisible: false,
    filtersVisible: true,
    activePlot: '',
  };
  const [viewerState, setViewerState] =
    useState<{
      controlsVisible: boolean;
      filtersVisible: boolean;
      activePlot: string;
    }>(initialViewerState);
  const [gridLayoutsState, setGridLayoutsState] =
    useState<ReactGridLayout.Layouts>(
      localStorage.getObjectItem('grid.layouts') ?? {},
    );

  useEffect(() => {
    localStorage.setObjectItem('grid.layouts', gridLayoutsState);
    forceResize();
  }, [gridLayoutsState, viewerState]);

  // gridLayoutsState

  useEffect(() => {
    localStorage.setObjectItem('grid.layouts', gridLayoutsState);
    forceResize();
  }, [gridLayoutsState]);

  // gridItemsState
  const [gridItemsState, setGridItemsState] = useState<
    ReactGridLayout.Layout[]
  >(
    (localStorage.getObjectItem('grid.items') ?? [])
      // Workaround for bug in layout serialization - Infinity (and possibly others) gets saved as null
      .map((item: ReactGridLayout.Layout) => {
        return { ...item, y: item.y ?? Infinity };
      }),
  );
  useEffect(() => {
    localStorage.setObjectItem('grid.items', gridItemsState);
  }, [gridItemsState]);

  // gridResponsiveState
  const initialResponsiveState = { breakpoint: '', cols: 12 };
  const [gridResponsiveState, setGridResponsiveState] = useState<{
    breakpoint: string;
    cols: number;
  }>(initialResponsiveState);
  useEffect(() => {
    forceResize();
  }, [gridResponsiveState]);

  // filterState
  const defaultFilterState: FilterState = {
    concept: defaultConcept,
    constraints: [],
  };

  const [filterState, setFilterState] = useState<FilterState>(
    localStorage.getObjectItem('filter') ?? defaultFilterState,
  );
  useEffect(() => {
    localStorage.setObjectItem('filter', filterState);
  }, [filterState]);

  // subgroupsState
  const [subgroupsState, setSubgroupsState] = useState<Subgroup[]>(
    localStorage.getObjectItem('subgroups') ?? [],
  );
  useEffect(() => {
    localStorage.setObjectItem('subgroups', subgroupsState);
  }, [subgroupsState]);

  // plotControlsState
  interface PlotControlsState {
    [key: string]: { controls: ControlsState };
  }

  const [plotControlsState, setPlotControlsState] = useState<PlotControlsState>(
    localStorage.getObjectItem('controls') ?? {},
  );
  useEffect(() => {
    localStorage.setObjectItem('controls', plotControlsState);
  }, [plotControlsState]);

  // plotsState
  interface PlotState {
    data: Plotly.Data[];
    layout: Partial<Plotly.Layout>;
  }
  const [plotsState, setPlotsState] = useState<{ [key: string]: PlotState }>(
    localStorage.getObjectItem('plots') ?? {},
  );
  useEffect(() => {
    localStorage.setObjectItem('plots', plotsState);
  }, [plotsState]);

  // updatingState
  interface UpdatingState {
    [key: string]: boolean;
  }
  const [updatingState, setUpdatingState] = useState<UpdatingState>({});

  // HANDLERS

  const onGridBreakpointChange = (breakpoint: string, cols: number) => {
    setGridResponsiveState({
      breakpoint: breakpoint,
      cols: cols,
    });
  };

  const onViewerConfigurationToggle = () => {
    setViewerState({
      ...viewerState,
      controlsVisible: !viewerState.controlsVisible,
    });
  };

  const onViewerFilterToggle = () => {
    setViewerState({
      ...viewerState,
      filtersVisible: !viewerState.filtersVisible,
    });
  };

  const onGridLayoutChange = (
    layout: ReactGridLayout.Layout[],
    layouts: ReactGridLayout.Layouts,
  ) => {
    setGridLayoutsState(layouts);
  };

  const onGridItemAdd = () => {
    const identifier = utilities.generateIdentifier();
    const newIdentifiers = [...Object.keys(plotsState), identifier];
    backend
      .sessionInit(newIdentifiers)
      .then(() => {
        setGridItemsState([...gridItemsState, createGridItem(identifier)]);
        setPlotControlsState({
          ...plotControlsState,
          ...{ [identifier]: createInitialPlotControlsState(identifier) },
        });
        setPlotsState({
          ...plotsState,
          ...{ [identifier]: { data: [], layout: {} } },
        });
        setViewerState({
          ...viewerState,
          activePlot: identifier,
          controlsVisible: true,
        });
        document.querySelector(".scrollContainer")?.scrollTo({
          top: document.querySelector(".scrollContainer")?.scrollHeight,
          behavior: 'smooth'
        });
      })
      .catch(handleError);
  };

  const onGridItemRemove = (identifier: string) => {
    const newPlotsState = { ...plotsState };
    delete newPlotsState[identifier];
    backend
      .sessionInit(Object.keys(newPlotsState))
      .then(() => {
        setGridItemsState(
          gridItemsState.filter(
            (item: ReactGridLayout.Layout) => item.i !== identifier,
          ),
        );
        setPlotsState(newPlotsState);
        const newPlotControlsState = { ...plotControlsState };
        delete newPlotControlsState[identifier];
        setPlotControlsState(newPlotControlsState);
        if (viewerState.activePlot === identifier) {
          setViewerState({
            ...viewerState,
            activePlot: '',
            controlsVisible: false,
          });
        }
      })
      .catch(handleError);
  };

  const onGridItemEdit = (identifier: string) => {
    setViewerState({
      ...viewerState,
      activePlot: identifier,
      controlsVisible: true,
    });
  };

  const onReset = () => {
    backend
      .sessionReset()
      .then(() => {
        setViewerState(initialViewerState);
        setGridResponsiveState(initialResponsiveState);
        localStorage.setObjectItem('grid.layouts', {});
        setGridLayoutsState({});
        localStorage.setObjectItem('grid.items', []);
        setGridItemsState([]);
        localStorage.setObjectItem('filter', defaultFilterState);
        setFilterState(defaultFilterState);
        localStorage.setObjectItem('controls', {});
        setPlotControlsState({});
        localStorage.setObjectItem('plots', {});
        setPlotsState({});
        localStorage.setObjectItem('subgroups', []);
        setSubgroupsState([]);
        
      })
      .catch(handleError);
  };

  const onPlotSelected = (
    identifier: string,
    range: Plotly.SelectionRange | undefined,
    items: Datum[],
  ) => {
    if (!range) {
      return;
    }

    setUpdating();
    const newFilterState: FilterState = {
      ...filterState,
      constraints: [...filterState.constraints],
    };
    // Update/add x-constraint
    if (
      [
        DiagramType.Scatter,
        DiagramType.Histogram,
        DiagramType.Timeline,
      ].includes(plotControlsState[identifier].controls.type)
    ) {
      const newXConstraint = {
        attribute: plotControlsState[identifier].controls.attX,
        lower: range.x[0],
        upper: range.x[1],
        items: [],
      };
      const constraintXIndex = newFilterState.constraints.findIndex(
        constraint =>
          constraint.attribute === plotControlsState[identifier].controls.attX,
      );
      if (constraintXIndex > -1) {
        newFilterState.constraints[constraintXIndex] = newXConstraint;
      } else {
        newFilterState.constraints.push(newXConstraint);
      }
    }
    // Update/add y-constraint
    if (
      [DiagramType.Scatter, DiagramType.Timeline].includes(
        plotControlsState[identifier].controls.type,
      )
    ) {
      const newYConstraint = {
        attribute: plotControlsState[identifier].controls.attY,
        lower: range.y[0],
        upper: range.y[1],
        items: [],
      };
      const constraintYIndex = newFilterState.constraints.findIndex(
        constraint =>
          constraint.attribute === plotControlsState[identifier].controls.attY,
      );
      if (constraintYIndex > -1) {
        newFilterState.constraints[constraintYIndex] = newYConstraint;
      } else {
        newFilterState.constraints.push(newYConstraint);
      }
    }
    // Update/add discrete constraint
    if (
      [DiagramType.Bar].includes(plotControlsState[identifier].controls.type)
    ) {
      const newXConstraint = {
        attribute: plotControlsState[identifier].controls.attX,
        lower: null,
        upper: null,
        items: items,
      };
      const constraintXIndex = newFilterState.constraints.findIndex(
        constraint =>
          constraint.attribute === plotControlsState[identifier].controls.attX,
      );
      if (constraintXIndex > -1) {
        newFilterState.constraints[constraintXIndex] = newXConstraint;
      } else {
        newFilterState.constraints.push(newXConstraint);
      }
    }

    setFilterState(newFilterState);
    utilities.devLog('new filters:', newFilterState);
    backend
      .filterUpdate(newFilterState)
      .then((figures: { [key: string]: Partial<Figure> }) => {
        handleFilterUpdateResponse(figures);
      })
      .catch(handleError);
  };

  const onFilterChanged = (filters: Partial<FilterState>) => {
    setUpdating();
    const newFilterState: FilterState = {
      ...filterState,
      ...filters,
    };
    setFilterState(newFilterState);
    utilities.devLog('new filters:', newFilterState);
    backend
      .filterUpdate(newFilterState)
      .then((figures: { [key: string]: Partial<Figure> }) => {
        handleFilterUpdateResponse(figures);
      })
      .catch(handleError);
  };

  const onSubgroupDefine = (subgroup: Subgroup) => {
    backend
      .subgroupDefine(subgroup.name)
      .then(() => {
        setSubgroupsState([
          ...subgroupsState.filter(
            _subgroup => _subgroup.name !== subgroup.name,
          ),
          subgroup,
        ]);


        
        

      })
      .catch(handleError);
  };

  const onSubgroupDelete = (name: string) => {
    //alert('Not yet implemented in backend.');
    backend.subgroupDelete(name).then(response =>{
      setSubgroupsState([
        ...subgroupsState.filter(subgroup => subgroup.name !== name),
      ]);
    });
    
  };
  const onSubgroupActivate = (name: string) => {
    const subgroup = subgroupsState.find(subgroup => subgroup.name === name);
    //console.log(subgroup);
    onFilterChanged({
      ...filterState,
      constraints: subgroup?.constraints,
    });
  };

  const onControlsChanged = (
    identifier: string,
    controls: Partial<ControlsState>,
  ) => {
    setUpdating(identifier);
    const newControls: ControlsState = {
      ...plotControlsState[identifier].controls,
      ...controls,
    };
    const newPlotControls = {
      ...plotControlsState,
      ...{
        [identifier]: {
          ...plotsState[identifier],
          controls: newControls,
        },
      },
    };
    //console.log()
    setPlotControlsState(newPlotControls);
    utilities.devLog('new controls:', newControls);
    backend
      .controlsUpdate(newPlotControls[identifier].controls)
      .then((figure: Partial<Figure>) => {
        handleControlsUpdateResponse(identifier, figure);
      })
      .catch(handleError);
  };

  // HELPER (see first part above)

  const handleError = (error: any) => {
    console.log(error);
    try {
      setErrorText(`${error.toJSON().name}: ${error.toJSON().message}`);
    } catch (e) {
      setErrorText('ERROR: unknown');
    }

    setErrorState(true);
    const newState: UpdatingState = {};
      Object.keys(plotControlsState).forEach(identifier => {
        newState[identifier] = false;
      });
      setUpdatingState(newState);
  };

  const handleControlsUpdateResponse = (
    identifier: string,
    figure: Partial<Figure>,
  ) => {
    setPlotsState({
      ...plotsState,
      [identifier]: {
        ...plotsState[identifier],
        data: figure.data || [],
        layout: figure.layout || {},
      },
    });
    utilities.devLog(identifier, 'done');
    setUpdatingState({
      ...updatingState,
      [identifier]: false,
    });
  };

  const handleFilterUpdateResponse = (figures: {
    [key: string]: Partial<Figure>;
  }) => {
    const identifiers = Object.keys(figures);
    const newPlotsState = { ...plotsState };
    const newUpdatingState = { ...updatingState };
    identifiers.forEach(identifier => {
      newPlotsState[identifier] = {
        data: figures[identifier].data || [],
        layout: figures[identifier].layout || {},
      };
      newUpdatingState[identifier] = false;
    });
    setPlotsState(newPlotsState);
    setUpdatingState(newUpdatingState);
  };

  const forceResize = () => {
    // Workaround to trigger plot resize
    window.dispatchEvent(new Event('resize'));
  };

  const createGridItem = (identifier: string): ReactGridLayout.Layout => {
    return {
      i: identifier,
      x: (gridItemsState.length * 5) % gridResponsiveState.cols,
      y: Infinity,
      w: 5,
      h: 4,
    };
  };

  const createInitialPlotControlsState = (
    identifier: string,
  ): { controls: ControlsState } => {
    return { controls: { ...initialControls, identifier } };
  };

  const setUpdating = (identifier?: string) => {
    if (identifier) {
      setUpdatingState({
        ...updatingState,
        [identifier]: true,
      });
    } else {
      const newState: UpdatingState = {};
      Object.keys(plotControlsState).forEach(identifier => {
        newState[identifier] = true;
      });
      setUpdatingState(newState);
    }
  };

  // RENDER

  const createGridItemElement = (item: ReactGridLayout.Layout) => {
    return (
      <Card
        key={item.i}
        data-grid={item}
        className={`grid__item ${
          viewerState.activePlot === item.i ? ' grid__item--active' : ''
        }`}
        onClick={() => {
          onGridItemEdit(item.i);
        }}
      >
        <div className="grid__item-header grid--draggable">
          <IconButton
            size="small"
            aria-label="edit"
            
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            aria-label="close"
            onClick={() => {
              onGridItemRemove(item.i);
            }}
            className="grid__item--close"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className="grid__item-loader">
          {updatingState[item.i] && <LinearProgress />}
        </div>
        <CardContent className="grid__item-content">
          <Plot
            identifier={item.i}
            data={plotsState[item.i]?.data}
            layout={plotsState[item.i]?.layout}
            onSelected={onPlotSelected}
          />
        </CardContent>
      </Card>
    );
  };
  if (!(attributes && attributes.length)) return null;
  return (
    <div className="container">
      <div className="toolbar">
        <div className="toolbar__left">
          <Button
            onClick={onGridItemAdd}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            title="Add new diagram"
          >
            Add
          </Button>

          <Button
            onClick={forceResize}
            variant="contained"
            color="primary"
            startIcon={<AspectRatioIcon />}
            title="Force resize"
          >
            Resize
          </Button>

          <Button
            onClick={onReset}
            variant="contained"
            color="primary"
            startIcon={<ReplayIcon />}
            title="Reset session"
          >
            Reset session
          </Button>
        </div>

        <div className="toolbar__right">
          <Button
            onClick={onViewerConfigurationToggle}
            variant="contained"
            color="primary"
            startIcon={<SettingsIcon />}
            title="Toggle configuration panel"
          >
            Configuration
          </Button>

          <Button
            onClick={onViewerFilterToggle}
            variant="contained"
            color="primary"
            startIcon={<FilterListIcon />}
            title="Toggle filter panel"
          >
            Filter
          </Button>
        </div>
      </div>
      <div className="row">
        {viewerState.filtersVisible && (
          <Filter
            filter={filterState}
            subgroups={subgroupsState}
            onFilterChanged={onFilterChanged}
            onSubgroupDefine={onSubgroupDefine}
            onSubgroupDelete={onSubgroupDelete}
            onSubgroupActivate={onSubgroupActivate}
            onClose={onViewerFilterToggle}
            getTooltip = {getTooltip}
          />
        )}
        <div className="scrollContainer">
        <Grid
          breakpointCols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={100}
          layouts={gridLayoutsState}
          onBreakpointChange={onGridBreakpointChange}
          onLayoutChange={onGridLayoutChange}
        >
          {gridItemsState.map((item: ReactGridLayout.Layout) =>
            createGridItemElement(item),
          )}
        </Grid>
        </div>
        {viewerState.controlsVisible && (
          <Configuration
            controls={plotControlsState[viewerState.activePlot]?.controls}
            onControlsChanged={onControlsChanged}
            onClose={onViewerConfigurationToggle}
            filter={filter}
          />
        )}
      </div>

      <Snackbar
        open={errorState}
        autoHideDuration={10000}
        onClose={() => {
          setErrorState(false);
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          variant="filled"
          severity="error"
          onClose={() => {
            setErrorState(false);
          }}
        >
          {errorText}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Viewer;
