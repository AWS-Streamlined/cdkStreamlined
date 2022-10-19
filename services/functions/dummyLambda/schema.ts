export type Event = {
  body: {
    name: string;
  };
};

export type Response = {
  statusCode: number;
  body: {
    message: string;
  };
};
