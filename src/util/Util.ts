export const isObject = (d: any) => typeof d === "object" && d !== null;

export function flatten(
  obj: Record<string, any>,
  ...props: Array<Record<string, boolean | string>>
): Record<string, any> {
  const result: Record<string, any> = {};

  const flattenObject = (
    obj: Record<string, any>,
    prefix: string = ""
  ): void => {
    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (isObject(value)) {
        flattenObject(value, newKey);
      } else {
        result[newKey] = value;
      }
    }
  };

  flattenObject(obj);

  for (const propObj of props) {
    for (const [prop, newProp] of Object.entries(propObj)) {
      if (!newProp || !result.hasOwnProperty(prop)) continue;
      result[newProp === true ? prop : newProp] = result[prop];
      delete result[prop];
    }
  }

  return result;
}
