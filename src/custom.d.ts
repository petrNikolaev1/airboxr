declare module '*.svg' {
  const content: string;
  export default content;
}

interface Dictionary<T> {
  [Key: number]: T;
}

type Json = string | number | boolean | null | JsonObject | Json[];

type JsonObject = Partial<{ [property: string]: Json }>;

type Maybe<T> = T | null | undefined;

type RequestError = {
  message: string;
  statusCode: number;
};
