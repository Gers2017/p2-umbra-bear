import Nav from "./components/Nav";

type Props = {
  children: JSX.Element;
};

const App: React.FC<Props> = ({ children }) => {
  return (
    <div className="App">
      <Nav />
      <main>{children}</main>
    </div>
  );
};

export default App;
