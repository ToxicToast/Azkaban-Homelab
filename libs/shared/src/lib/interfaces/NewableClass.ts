export interface NewableClass<Type, Args = unknown> extends Function {
  new (...args: Array<Args>): Type;
}
