import attributes from '../attributes.json';

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

export enum Datatype {
  date = 'date',
  int = 'int',
  float = 'float',
  code = 'code',
  subgroups = 'SUBGROUPS',
  patients = 'PATIENTS',
}
// PATIENTS and SUBGROUPS are added to attributes manually and have this values as datatype

const attributeTooltips: { [key: string]: string } = {};
attributes.forEach(attribute => {
  attributeTooltips[attribute.attribute] = attribute.attributeTooltip;
});

export const getTooltip = (attribute: string): string => {
  return attributeTooltips[attribute];
};

export const filter = (datatypes: Datatype[]): Attribute[] => {
  return attributes.filter(
    attribute =>
      Object.values(datatypes).findIndex(
        datatype => attribute.datatype === datatype,
      ) !== -1,
  );
};

