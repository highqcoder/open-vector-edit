import React from "react";
import { pick } from "lodash";
import versionHistoryTool from "./versionHistoryTool";
// import {connectToEditor} from "../withEditorProps";
import MenuBar from "../MenuBar";
import "./style.css";
import { Button, Tooltip } from "@blueprintjs/core";

import downloadTool from "./downloadTool";
import importTool from "./importTool";
import cutsiteTool from "./cutsiteTool";
import featureTool from "./featureTool";
import oligoTool from "./oligoTool";
import orfTool from "./orfTool";
import editTool from "./editTool";
import findTool from "./findTool";
import inlineFindTool from "./inlineFindTool";
import alignmentTool from "./alignmentTool";
import saveTool from "./saveTool";
import visibilityTool from "./visibilityTool";
import undoTool from "./undoTool";
import redoTool from "./redoTool";
import { isString } from "util";
import logo from "../../logo/logo.png";
import personLight from "../../logo/personLight.png";
import personDark from "../../logo/personDark.png";


const allTools = {
  downloadTool,
  importTool,
  cutsiteTool,
  alignmentTool,
  featureTool,
  oligoTool,
  orfTool,
  editTool,
  findTool,
  inlineFindTool,
  versionHistoryTool,
  saveTool,
  visibilityTool,
  undoTool,
  redoTool
};

export class ToolBar extends React.PureComponent {
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
    const {
      modifyTools,
      contentLeft,
      showMenuBar,
      displayMenuBarAboveTools,
      isProtein,
      openHotkeyDialog,
      onSave,
      userDefinedHandlersAndOpts,
      editorName,
      handleFullscreenClose,
      closeFullscreen,
      toolList = [
        "saveTool",
        "downloadTool",
        "importTool",
        "undoTool",
        "redoTool",
        "cutsiteTool",
        "featureTool",
        "oligoTool",
        "orfTool",
        "alignmentTool",
        "editTool",
        "findTool",
        "visibilityTool"
      ],
      ...rest
    } = this.props;
    let items = toolList
      .map((toolNameOrOverrides, index) => {
        let toolName;
        let toolOverride;
        if (isString(toolNameOrOverrides)) {
          toolName = toolNameOrOverrides;
        } else {
          toolOverride = toolNameOrOverrides;
          toolName = toolNameOrOverrides.name;
        }

        const Tool = toolOverride
          ? allTools[toolOverride.name]
          : allTools[toolName];
        if (!Tool) {
          console.error(
            "You're trying to load a tool that doesn't appear to exist: " +
            toolName
          );
          return false;
        }
        if (isProtein) {
          if (
            toolName === "cutsiteTool" ||
            toolName === "orfTool" ||
            toolName === "alignmentTool"
          ) {
            return false;
          }
        }
        if (toolName === "saveTool" && !onSave) {
          return false;
        } //don't show the option to save if no onSave handler is passed
        return (
          <Tool
            {...rest}
            onSave={onSave}
            toolbarItemProps={{ index, toolName, editorName, ...toolOverride }}
            editorName={editorName}
            key={toolName}
          />
        );
      })
      .filter(tool => !!tool);

    if (modifyTools) {
      items = modifyTools(items);
    }

    let modeBackground = "#f5f6fc"
    let moonColor = "#9b9caa"
    let menuColor = "#9b9caa"
    let personIcon = personLight
    if(this.state.darkMode) {
      modeBackground = "#25234f"
      moonColor = "yellow"
      menuColor = "#4f4f8a"
      personIcon = personDark
    }
    return (
      <div style={{ display: "flex" }}>
        {contentLeft}
        <div
          style={{
            ...(displayMenuBarAboveTools && showMenuBar
              ? {
                display: "flex",
                width: "100%",
                // flexDirection: "column",
                alignItems: "flex-start"
              }
              : {
                display: "flex",
                width: "100%",
                // justifyContent: "center",
                flexWrap: "wrap"
              })
          }}
          className="veToolbar"
        >
          <img src={logo} alt="Logo" style = {{width: "50px", paddingRight : '10px', paddingTop: "4px"}} />
          {displayMenuBarAboveTools && showMenuBar ? (
            <div
              className="veTools-displayMenuBarAboveTools"
              style={{
                display: "flex",
                // justifyContent: "center",
                marginLeft: 15,
                // flexWrap: "wrap"
                width: "100%"
              }}
            >
              {items}
            </div>
          ) : (
              items
            )}
          <div
            style={{
              float: 'right',
              cursor: 'pointer'
            }}
          >
            {/* {showMenuBar && (
              <MenuBar
                openHotkeyDialog={openHotkeyDialog}
                {...pick(this.props, userDefinedHandlersAndOpts)}
                onSave={onSave} //needs to be passed so that editor commands will have it
                style={{ marginLeft: 0 }}
                editorName={editorName}
              />
            )} */}
          </div>
          <div
            classname="buttonDarkMode"
            style={{
              float: "right",
              cursor: 'pointer',
              width: "35px",
              height: "35px",
              display: 'flex',
              alignItems: "center",
              borderRadius: "5px",

              backgroundColor: modeBackground
            }}
            onClick={this.changeDarkMode}
          >
            {/* {this.state.darkMode ? <i class="fa fa-moon-o">DA</i> : <i class="fa fa-moon-o">LI</i>} */}
            <div
              style = {{
                marginLeft: "0px",
                marginTop: '-10px',
                height: "20px",
                width: "20px",
                borderRadius: "50%",
                boxShadow: `5px 5px 0 0 ${moonColor}`
              }}
            >
            </div>
          </div>
          <div
            style = {{
              width: "35px",
              height: "35px",
              marginLeft: "20px",
              borderRadius: "5px",
              display:"flex",
              alignItems: "center",
              backgroundColor : modeBackground,
              cursor: "pointer"
            }}
          >
          <img style = {{ width : "20px", height : "20px", margin:"auto"}} src = {personIcon}/>
          </div>
          <div
            style = {{
              width: "35px",
              height: "35px",
              marginLeft: "20px",
              borderRadius: "5px",
              textAlign: "center",
              backgroundColor : modeBackground,
              cursor: "pointer"
            }}
          >
            <div style = {{
              height: "6px"
            }}></div>
            <div 
              style = {{
                width: "20px",
                height: "3px",
                backgroundColor: menuColor,
                borderRadius : "4px",
                margin : "4px auto"
              }}
            ></div>
            <div 
              style = {{
                width: "20px",
                height: "3px",
                borderRadius : "4px",
                backgroundColor: menuColor,
                margin : "4px auto"
              }
            }></div>
            <div 
              style = {{
                width: "20px",
                height: "3px",
                borderRadius : "4px",
                backgroundColor: menuColor,
                margin : "4px auto"
              }
            }></div>
          </div>
        </div>
        {closeFullscreen && (
          <CloseFullscreenButton onClick={handleFullscreenClose} />
        )}
      </div>
    );
  }
}

export default ToolBar;
// export default connectToEditor()  ToolBar

const CloseFullscreenButton = props => {
  return (
    <Tooltip content="Close Fullscreen Mode">
      <Button
        minimal
        style={{
          marginTop: 2,
          marginRight: 2
        }}
        onClick={props.onClick}
        className="ve-close-fullscreen-button"
        icon="minimize"
      />
    </Tooltip>
  );
};

