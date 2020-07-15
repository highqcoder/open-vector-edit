import React from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Switch } from "@blueprintjs/core";

import store from "./store";
import { render } from "react-dom";

import {
  CircularView,
  RowView,
  LinearView,
  DigestTool,
  updateEditor,
  EnzymeViewer
} from "../../src";

// import AddOrEditFeatureDialog from "../../src/helperComponents/AddOrEditFeatureDialog";
import exampleSequenceData from "./exampleData/exampleSequenceData";
import StandaloneDemo from "./StandaloneDemo";
import SimpleCircularOrLinearViewDemo from "./SimpleCircularOrLinearViewDemo";
import StandaloneAlignmentDemo from "./StandaloneAlignmentDemo";
import AlignmentDemo from "./AlignmentDemo";
import VersionHistoryView from "../../src/VersionHistoryView";
import pjson from "../../package.json";
import EditorDemo from "./EditorDemo";

// import GenbankView from "../../src/helperComponents/PropertiesDialog/GenbankView";

// import _CutsiteProperties from "../../src/helperComponents/PropertiesDialog/CutsiteProperties";
// import withEditorProps from "../../src/withEditorProps";
// import _OrfProperties from "../../src/helperComponents/PropertiesDialog/OrfProperties";
import "./style.css";

// const links = [
//   { name: "Editor", url: "Editor" },
//   { name: "Standalone", url: "Standalone" },
//   { name: "VersionHistoryView", url: "VersionHistoryView" },
//   { name: "StandaloneAlignment", url: "StandaloneAlignment" },
//   { name: "Alignment", url: "Alignment" },
//   { name: "SimpleCircularOrLinearView", url: "SimpleCircularOrLinearView" },
//   { name: "DigestTool", url: "DigestTool" },
//   { name: "EnzymeViewer", url: "EnzymeViewer" },
//   { name: "CircularView", url: "CircularView" },
//   { name: "RowView", url: "RowView" },
//   { name: "LinearView", url: "LinearView" },
//   { name: "ToolBar", url: "ToolBar" }
// ].map(({ url, name }) => {
//   return (
//     <div key={name} style={{ height: 20, marginLeft: 10 }}>
//       <Link to={url}> {name} </Link>
//     </div>
//   );
// });
// links.push(
//   <a key="umdDemo" style={{ marginLeft: 10 }} href="/UMDDemo.html">
//     UMD demo
//   </a>
// );

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      darkMode: document.body.className.includes("bp3-dark")
    };
  }

  changeDarkMode = () => {
    this.setState({
      darkMode: !this.state.darkMode
    });
    document.body.classList.toggle("bp3-dark");
  };

  render() {
    const { darkMode } = this.state;

    return (
      <Provider store={store}>
        <Router>
          <div
            style={{
              height: "100%",
              display: "flex",
              flexGrow: 1,
              flexDirection: "column"
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexShrink: 0
              }}
            >
              {/* {links}{" "} */}
              {/* <span style={{ marginLeft: 10 }}>Version: {pjson.version}</span>{" "} */}
            </div>
            <Route exact path="/" render={() => <Redirect to="/Editor" />} />
            <Route
              render={({ history }) => {
                return <EditorDemo history={history} />;
              }}
              path="/Editor"
            />
          </div>
        </Router>
      </Provider>
    );
  }
}

class WrapSimpleDemo extends React.Component {
  constructor(props) {
    super(props);
    updateEditor(store, "DemoEditor", {
      readOnly: false,
      sequenceData: exampleSequenceData
    });
  }
  render() {
    return this.props.children;
  }
}

render(<Demo />, document.querySelector("#demo"));
