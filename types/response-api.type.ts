export interface ResponseAPI<T> {
  data: T;
  meta: {
    total: number
  }
}