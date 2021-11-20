import { Abstract } from '../abstract/abstract.repository';

class Position extends Abstract {
  constructor({ positionModel }) {
    super(positionModel);
  }
}

export { Position };