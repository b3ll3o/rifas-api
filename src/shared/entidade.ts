export abstract class Entidade<T> {
  constructor(objeto: Partial<T>) {
    Object.assign(this, objeto);
  }
}
