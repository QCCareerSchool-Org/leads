// JSON primitives
export type JsonPrimitive =
  | string
  | number
  | boolean
  | null;

export type JsonArray = JsonValue[];

export interface JsonObject {
  [key: string]: JsonValue;
}

// Recursive JSON value
export type JsonValue =
  | JsonPrimitive
  | JsonObject
  | JsonArray;
