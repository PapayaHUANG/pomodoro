import Main from './Main/Main';

function App() {
  const value = {
    sessionValue: 25,
    breakValue: 5,
  };
  return (
    <>
      <Main value={value} />
    </>
  );
}

export default App;
