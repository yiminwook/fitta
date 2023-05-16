import axios from 'axios';
import { QueryFunctionContext } from 'react-query';
const fetcher = async (context: QueryFunctionContext) => {
  try {
    const { data } = await axios.get('/userDummy.json');
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default fetcher;
