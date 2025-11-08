import qs from "query-string";

type urlQueryStringParams = {
  params: string;
  key: string;
  value: string;
};

type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export const formUrlQuery = ({ params, key, value }: urlQueryStringParams) => {
  const queryString = qs.parse(params); //example: localhttp://localhost:3000/?search=hello shows {search:"hello"}

  queryString[key] = value;

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: queryString,
  });
};

export const removeKeysFromUrlQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const queryString = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete queryString[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: queryString,
    },
    { skipNull: true }
  );
};
