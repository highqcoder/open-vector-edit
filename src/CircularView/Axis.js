import getAngleForPositionMidpoint from "./getAngleForPositionMidpoint";
import PositionAnnotationOnCircle from "./PositionAnnotationOnCircle";
import shouldFlipText from "./shouldFlipText";
import React from "react";
import calculateTickMarkPositionsForGivenRange from "../utils/calculateTickMarkPositionsForGivenRange";
import { divideBy3 } from "../utils/proteinUtils";

function Axis({
  radius,
  sequenceLength,
  rotationRadians,
  showAxisNumbers,
  circularAndLinearTickSpacing,
  tickMarkHeight = 5,
  tickMarkWidth = 1,
  textOffset = 15,
  ringThickness = 4,
  isProtein
}) {
  let height =
    ringThickness + (showAxisNumbers ? textOffset + tickMarkHeight : 0);
  const radiusToUse = showAxisNumbers
    ? radius + textOffset + tickMarkHeight
    : radius;
  let tickPositions = calculateTickMarkPositionsForGivenRange({
    range: {
      start: 0,
      end: sequenceLength
    },
    tickSpacing: circularAndLinearTickSpacing,
    sequenceLength,
    isProtein
  });
  let tickMarksAndLabels = showAxisNumbers
    ? tickPositions.map(function (tickPosition, index) {
        let tickAngle = getAngleForPositionMidpoint(
          tickPosition,
          sequenceLength
        );
        const tickAnglePlusRotation = tickAngle + rotationRadians;
        return (
          <g
            key={"axis" + index}
            {...PositionAnnotationOnCircle({
              sAngle: tickAngle,
              eAngle: tickAngle,
              height: radiusToUse
            })}
          >
            <text
              transform={
                (shouldFlipText(tickAnglePlusRotation) ? "rotate(180)" : "") +
                ` translate(0, ${
                  shouldFlipText(tickAnglePlusRotation)
                    ? -textOffset
                    : textOffset
                })`
              }
              style={{
                textAnchor: "middle",
                dominantBaseline: "central",
                fontSize: "small"
              }}
            >
              {divideBy3(tickPosition + 1, isProtein) + ""}
            </text>
            <rect width={tickMarkWidth} height={tickMarkHeight} />
          </g>
        );
      })
    : null;
  let component = (
    <g key="veAxis" className="veAxis">
      <defs>
        <filter id="f1" x="0" y="0" width="200%" height="200%">
          <feOffset result="offOut" in="SourceGraphic" dx="5" dy="10" />
          <feColorMatrix result = "matrixOut" in = "offOut" type = "matrix" values = "0.5 0 0 0 0 0 0.4 0 0 0 0 0 0.6 0 0 0 0 0 0.3 0"/>
          <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="10" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      <circle
        filter="url(#f1)"
        className="veAxisFill"
        id="circularViewAxis"
        key="circleOuter"
        r={radiusToUse + ringThickness}
      />
      {/* <circle
        id="circularViewAxis"
        key="circle"
        r={radiusToUse}
        style={{ fill: "white", stroke: "black", strokeWidth: 0.5 }}
      /> */}
      {tickMarksAndLabels}
    </g>
  );
  return {
    component,
    height
  };
}

export default Axis;
