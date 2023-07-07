import { keys } from "./object.utils";
import { PrimitiveKey } from "./types.utils";

/**
 * LogicTable class is used to find the first boolean condition evaluated to true
 * and it's mapped key.
 *
 * @example
 * const table = { a: false, b: true, c: false };
 * const logicTable = new LogicTable(table);
 * console.log(logicTable.first()); // Outputs: "b"
 */
export class LogicTable<T extends PrimitiveKey> {
  table: Record<T, boolean | undefined>;

  constructor(table: Record<T, boolean | undefined>) {
    this.table = table;
  }

  /**
   * Returns the first condition in the table that is true.
   * @returns {T | undefined} - The first key for which the condition is true, or undefined if no such condition exists.
   */
  public first(): T | undefined {
    return keys(this.table).find((key) => this.table[key]);
  }
}
