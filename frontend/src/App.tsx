import { CryptoContextProvider } from './context/CryptoContext';
import { AppLayout } from './components/layout/AppLayout';

const App: React.FC = () => (
  <CryptoContextProvider>
    <AppLayout />
  </CryptoContextProvider>
);

export default App;
