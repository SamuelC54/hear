import { Request, Response } from 'express';
import { DataTypeAbstract, DefineAttributeColumnOptions } from 'sequelize';

// Taken from : https://michalzalecki.com/using-sequelize-with-typescript/
export type SequelizeAttributes<T extends { [key: string]: any }> = {
  [P in keyof T]: string | DataTypeAbstract | DefineAttributeColumnOptions
};

export interface LabelValue {
  label: string;
  value: string;
}

export interface IEquipment extends LabelValue {
  name: string;
  active: boolean;
  icon: string;
  model: string;
  organization: LabelValue;
  team?: LabelValue;
  brand: LabelValue;
  type: LabelValue;
}
