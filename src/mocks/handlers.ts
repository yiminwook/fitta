import { envConfig } from '@/configs';
import { rest } from 'msw';

const { REACT_APP_SERVER_URL } = envConfig();

const handlers = [
  rest.get(`${REACT_APP_SERVER_URL}/userdata`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
];

export default handlers;
