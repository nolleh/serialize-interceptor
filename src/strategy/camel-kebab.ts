export function camelToKebab<T = any>(value: T) {
  if (value === null || value === undefined) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(camelToKebab);
  }

  if (typeof value === "object" && !(value instanceof Date)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, value]) => [
        key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
        camelToKebab(value),
      ]),
    );
  }
  return value;
}

export function kebabToCamel<T = any>(value: T) {
  if (value === null || value === undefined) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(kebabToCamel);
  }

  const impl = (str: string) => {
    const converted = str.replace(/([-]\w)/g, (group) =>
      group[1].toUpperCase(),
    );
    return converted[0].toLowerCase() + converted.slice(1);
  };

  if (typeof value === "object" && !(value instanceof Date)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, value]) => [
        impl(key),
        kebabToCamel(value),
      ]),
    );
  }
  return value;
}
