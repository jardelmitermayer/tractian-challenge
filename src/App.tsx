import { NavBar } from './components/NavBar/NavBar';
import './App.css';
import { CompanyPage } from './pages/company/[id]';

function App() {

  return (
    <div>
      <NavBar />
      <CompanyPage />
    </div>
  );
}

export default App;
