/** because the regenerated value's field is differ from original,
 * it is hard to declare return type.
 * the input type is also not meaningful.
 *
 * in: request layer (default: snakeToCamel),
 * out: response layer (default: camelToSnake).
 *
 * i.e. const DEFAULT_STRATEGY: Strategy = { in: snakeToCamel, out: camelToSnake };
 */
export class Strategy {
  in: (value: any) => any;
  out: (value: any) => any;
}
