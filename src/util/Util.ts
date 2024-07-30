import { Collection } from "@discordjs/collection";
export const isObject = (d: any) => typeof d === "object" && d !== null;

export function flatten(
  obj: Record<string, any>,
  ...props: Array<Record<string, boolean | string>>
): Record<string, any> {
  if (!isObject(obj)) return obj;

  const objProps = Object.keys(obj)
    .filter((key) => !key.startsWith("_"))
    .map((key) => ({ [key]: true }));

  props = objProps.length
    ? Object.assign({}, ...objProps, ...props)
    : [{}, ...props];

  const out: Record<string, any> = {};

  for (let propObj of props) {
    for (let [prop, newProp] of Object.entries(propObj)) {
      if (!newProp || !obj.hasOwnProperty(prop)) continue;
      newProp = newProp === true ? prop : newProp;

      const element = obj[prop];
      const elemIsObj = isObject(element);
      const valueOf =
        elemIsObj && typeof (element as any).valueOf === "function"
          ? (element as any).valueOf()
          : null;
      const hasToJSON =
        elemIsObj && typeof (element as any).toJSON === "function";

      // If it's a Collection, make the array of keys
      if (element instanceof Collection)
        out[newProp] = Array.from(element.keys());
      // If the valueOf is a Collection, use its array of keys
      else if (valueOf instanceof Collection)
        out[newProp] = Array.from(valueOf.keys());
      // If it's an array, call toJSON function on each element if present, otherwise flatten each element
      else if (Array.isArray(element))
        out[newProp] = element.map(
          (elm: any) => elm.toJSON?.() ?? flatten(elm)
        );
      // If it's an object with a primitive `valueOf`, use that value
      else if (typeof valueOf !== "object") out[newProp] = valueOf;
      // If it's an object with a toJSON function, use the return value of it
      else if (hasToJSON) out[newProp] = (element as any).toJSON();
      // If element is an object, use the flattened version of it
      else if (typeof element === "object") out[newProp] = flatten(element);
      // If it's a primitive
      else if (!elemIsObj) out[newProp] = element;
    }
  }

  return out;
}
