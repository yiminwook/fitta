import axios from 'axios';
import { QueryFunctionContext } from 'react-query';

const fetcher = async (context: QueryFunctionContext) => {
  try {
    const key = context.queryKey[0] as string;
    const { data } = await axios.get(key);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default fetcher;
