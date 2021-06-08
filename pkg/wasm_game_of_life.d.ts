/* tslint:disable */
/* eslint-disable */
/**
*/
export enum Cell {
  Dead,
  Alive,
}
/**
*/
export class Universe {
  free(): void;
/**
*/
  tick(): void;
/**
* @param {number} banding_filter
* @returns {Universe}
*/
  static new(banding_filter: number): Universe;
/**
* @returns {string}
*/
  render(): string;
/**
* @returns {number}
*/
  width(): number;
/**
* @returns {number}
*/
  height(): number;
/**
* @returns {number}
*/
  cells(): number;
/**
* @returns {number}
*/
  cells_green(): number;
/**
* @returns {number}
*/
  cells_blue(): number;
}
