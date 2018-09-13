const sortObjectByKeyDefaults = { order: 'asc', type: 'number' };

export const sortObjectByKey = (key, options) => {
  const config = { ...sortObjectByKeyDefaults, ...options };

  if (config.type === 'number') {
    return (a, b) => config.order === 'desc' ? b[key] - a[key] : a[key] - b[key];
  }

  if (config.type === 'string') {
    return (a, b) => {
      if (a[key] < b[key]) {
        return config.order === 'desc' ? -1 : 1;
      }

      if (a[key] > b[key]) {
        return config.order === 'desc' ? 1 : -1;
      }

      return 0;
    };
  }

  // no-op
  return () => 0;
};
