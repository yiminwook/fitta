import { REACT_APP_SERVER_URL } from '@/consts';
import app from '@/pages/App.module.scss';
import { getEnv } from '@/utils/getEnv';

const App = () => {
  const serverUrl = getEnv(REACT_APP_SERVER_URL);
  console.log(serverUrl);
  return (
    <div className={app['app']}>
      <header className="App-header">hello</header>
    </div>
  );
};

export default App;
