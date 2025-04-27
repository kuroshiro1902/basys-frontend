import qs, { StringifyOptions } from 'query-string';

const stringifyOptions: StringifyOptions = { arrayFormat: 'separator', arrayFormatSeparator: '&' };

export const querySerializer = <TParams extends Record<string, any> = {}>(params: TParams) => {
  return qs.stringify(params, stringifyOptions);
};
