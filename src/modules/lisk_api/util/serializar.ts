
const serializar = (result: Record<string, unknown>): Record<string, unknown> => {
  return JSON.parse(JSON.stringify(result, (_, value) => {
    if (Array.isArray(value)) {
      return value.map(val => formatter(val));
    } else {
      return formatter(value);
    }
  }));
};

function formatter(val: any) {
  if (typeof val === 'bigint') {
    return val.toString();
  } else if (val.type === 'Buffer') {
    return Buffer.from(val).toString('hex');
  } else {
    return val;
  }
}

export default serializar;