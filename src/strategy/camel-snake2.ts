export function camelToSnake2<T = any>(value: T) {
  if (value === null || value === undefined) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(camelToSnake2);
  }

  if (typeof value === "object" && !(value instanceof Date)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, value]) => [
        key.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase(),
        camelToSnake2(value),
      ]),
    );
  }
  return value;
}

export function snakeToCamel2<T = any>(value: T) {
  if (value === null || value === undefined) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(snakeToCamel2);
  }

  const impl = (str: string) => {
    const converted = str.replace(/([_]\w)/g, (group) =>
      group[1].toUpperCase(),
    );
    return converted[0].toLowerCase() + converted.slice(1);
  };

  if (typeof value === "object" && !(value instanceof Date)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, value]) => [
        impl(key),
        snakeToCamel2(value),
      ]),
    );
  }
  return value;
}
