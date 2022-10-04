type Props = {
  children: JSX.Element;
};

const App: React.FC<Props> = ({ children }) => {
  return (
    <div className="App">
      <main>{children}</main>
    </div>
  );
};

export default App;
