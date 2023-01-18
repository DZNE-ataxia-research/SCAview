import { Figure } from 'react-plotly.js';
import { FilterState, Concept } from '../containers/Filter';
import localStorage from '../services/LocalStorage';
import utilities from '../services/Utilities';
import { DiagramType, Visit, ControlsState } from './../containers/Controls';
import _axios from 'axios';
import { Datum } from 'plotly.js';

let token: string;

const axios = _axios.create({
  withCredentials: true
});

// HELPER

const parseFigure = (input: string): Partial<Figure> => {
  const figure = JSON.parse(input);
  return {
    ...figure,
    data: figure.data?.map((fd: any) => {
      return {
        ...fd,
        // use scatter plot WebGL variant to improve performance
        type: fd.type === 'scatter' ? 'scattergl' : fd.type,
      };
    }),
  };
};

// SESSION INIT

interface SessionInitRequest {
  usertoken: string;
  plot_ids: string[];
}

type SessionInitResponse = any; // @TODO define SessionInitResponse

type SessionInitReturn = any; // @TODO define SessionInitReturn

const sessionInit = (
  identifiers: string[] = []
): Promise<SessionInitReturn> => {
  const requestBody: SessionInitRequest = {
    usertoken: token,
    plot_ids: identifiers,
  };
  return axios
    .post(`${api_url}/init`, requestBody)
    .then((response: SessionInitResponse) => response.data);
};

// SESSION RESET

interface SessionResetRequest {
  usertoken: string;
}

type SessionResetResponse = any; // @TODO define SessionResetResponse

type SessionResetReturn = any; // @TODO define SessionResetReturn

const sessionReset = (): Promise<SessionResetReturn> => {
  const requestBody: SessionResetRequest = {
    usertoken: token,
  };
  return axios
    .post(`${api_url}/reset-session`, requestBody)
    .then((response: SessionResetResponse) => response.data);
};

// CONTROLS UPDATE

export enum Legend {
  none = 'none',
  legend = 'legend',
  // @TODO add more legend values here
}

export enum Fit {
  none = 'none',
  regression = 'regression',
  // @TODO add more fit values here
}

enum Stack {
  stack = 'stack',
}

enum Norm {
  norm = 'norm',
}

interface ControlsUpdateRequest {
  usertoken: string;
  controls: {
    plot: string;
    type: DiagramType;
    attX: string;
    attY: string;
    attC: string;
    Dt: number | null;
    visit: Visit;
    followup: number;
    tolerance: number;
    bins: number;
    norm: Norm[];
    stack: Stack[];
    fit: Fit[];
    legend: Legend[];
  };
}

type ControlsUpdateResponse = any; // @TODO define ControlsUpdateResponse

type ControlsUpdateReturn = Partial<Figure>;

const controlsUpdate = (
  controlsState: ControlsState
): Promise<ControlsUpdateReturn> => {
  const requestBody: ControlsUpdateRequest = {
    usertoken: token,
    controls: {
      plot: controlsState.identifier,
      type: controlsState.type,
      attX: controlsState.attX,
      attY: controlsState.attY,
      attC: controlsState.attC,
      Dt: controlsState.dt,
      visit: controlsState.visit,
      followup: controlsState.followup,
      tolerance: controlsState.tolerance,
      bins: controlsState.bins,
      norm: controlsState.norm ? [Norm.norm] : [],
      stack: controlsState.stack ? [Stack.stack] : [],
      fit: [controlsState.fit] ,
      legend: [controlsState.legend] , 
    },
  };
  return axios
    .post(`${api_url}/getdata`, requestBody)
    .then((responseRaw: ControlsUpdateResponse) => {
      return parseFigure(responseRaw.data.figure);
    });
};

// FILTER UPDATE

interface FilterUpdateRequest {
  usertoken: string;
  concept: Concept;
  filter_table: {
    // @TODO @API rename this to constraints
    attribute: string;
    lower: number | null;
    upper: number | null;
    list: Datum[] | null;
    // set: [], // @TODO @API is filter-edit.filter_table.set required?
    // human_readable: string // @TODO @API is filter-edit.filter_table.human_readable required?
  }[];
}

type FilterUpdateResponse = any; // @TODO define FiltersUpdateResponse

export type FilterUpdateReturn = { [key: string]: Partial<Figure> };

const filterUpdate = (
  filterState: FilterState
): Promise<FilterUpdateReturn> => {
  const requestBody: FilterUpdateRequest = {
    usertoken: token,
    concept: filterState.concept,
    filter_table: filterState.constraints.map((constraint) => {
      return {
        attribute: constraint.attribute,
        lower: constraint.lower,
        upper: constraint.upper,
        list: constraint.items.length > 0 ? constraint.items : null,
      };
    }), // @TODO @API rename this to constraints
  };
  return axios
    .post(`${api_url}/update-filter`, requestBody)
    .then((response) => {
      const result: { [key: string]: Partial<Figure> } = {};
      Object.keys(response.data.plots).forEach((identifier) => {
        result[identifier] = parseFigure(
          response.data.plots[identifier].figure
        );
      });
      return result;
    });
};

// SUBGROUP DEFINE

interface SubgroupDefineRequest {
  usertoken: string;
  name: string;
}

type SubgroupDefineResponse = any; // @TODO define SubgroupDefineResponse

type SubgroupDefineReturn = null;

const subgroupDefine = (name: string): Promise<SubgroupDefineReturn> => {
  const requestBody: SubgroupDefineRequest = {
    usertoken: token,
    name: name,
  };
  return axios
    .post(`${api_url}/subgroup-define`, requestBody)
    .then((response: SubgroupDefineResponse) => null);
};

// SUBGROUP DELETE

interface SubgroupDeeleteRequest {
  usertoken: string;
  name: string;
}

const subgroupDelete = (name: string): Promise<any> => {
  const requestBody: SubgroupDefineRequest = {
    usertoken: token,
    name: name,
  };
  return axios
    .post(`${api_url}/subgroup-delete`, requestBody)
    .then((response: any) => null);
};

// GET ALL ATTRIBUTES

const getAttributes = (): Promise<any> =>{
  return axios.get(`${api_url}/get-all-attributes`);
}


// TOKEN

const api_url = process.env.REACT_APP_API_URL;

const getToken = () => {
  let token = localStorage.getStringItem('token');
  if (!token) {
    token = utilities.generateIdentifier();
    localStorage.setStringItem('token', token);
    sessionInit(); // @TODO do we need to wait until ready?
  }
  return token;
};

token = getToken();

export default {
  sessionInit,
  sessionReset,
  controlsUpdate,
  filterUpdate,
  subgroupDefine,
  subgroupDelete,
  getAttributes
};
