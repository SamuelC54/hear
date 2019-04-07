import { Application } from 'express';
import route from './route';

export function setup(app: Application) {
  route(app);
}

/**
 * @typedef string
 */
