import axios from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';

const fetcher = async (context: QueryFunctionContext) => {
  try {
    if (context.queryKey.length === 0) return undefined;
    const key = context.queryKey[0] as string;
    const { data } = await axios.get(key);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default fetcher;
