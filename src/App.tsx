import { useEffect } from 'react';
import './App.css';
import { fetchData } from './utils/getData';
import { NavBar } from './components/NavBar/NavBar';
import { TreeFiltersAndActions } from './components/TreeFiltersAndActions';
import { TreeView } from './components/TreeView';
import { useTreeState } from './context/useTreeState';

function App() {
  const { state, dispatch } = useTreeState();
  const companyId = '662fd0ee639069143a8fc387';

  useEffect(() => {
    fetchData(companyId).then((data) => {
      dispatch({ type: "INIT_DATA", data });
    });
  }, [dispatch, companyId]);
  return (
    <div>
      <NavBar />
      <TreeFiltersAndActions />
      <TreeView data={state} />
    </div>
  );
}

export default App;
