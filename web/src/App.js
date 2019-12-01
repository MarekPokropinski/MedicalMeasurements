import React from "react";
import "./App.css";
import Login from "./components/login";
import MeasurementsContainer from "./components/MeasurementsContainer";
import { isNull } from "util";
import { Route, HashRouter } from "react-router-dom";

class App extends React.Component {
  state = {
    loggedIn: false
  };

  componentDidMount() {
    const loggedIn = !isNull(localStorage.getItem("token"));
    this.setState({ loggedIn });
  }

  render() {
    return (
      <div className="App">
        <HashRouter>
          <Route
            render={props =>
              this.state.loggedIn ? (
                <MeasurementsContainer
                  {...props}
                  onLogout={() => this.setState({ loggedIn: false })}
                />
              ) : (
                <Login
                  {...props}
                  onLogin={() => this.setState({ loggedIn: true })}
                />
              )
            }
          />
        </HashRouter>
      </div>
    );
  }
}

export default App;
