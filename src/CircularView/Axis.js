import getAngleForPositionMidpoint from "./getAngleForPositionMidpoint";
import PositionAnnotationOnCircle from "./PositionAnnotationOnCircle";
import shouldFlipText from "./shouldFlipText";
import React from "react";
import calculateTickMarkPositionsForGivenRange from "../utils/calculateTickMarkPositionsForGivenRange";
import { divideBy3 } from "../utils/proteinUtils";

function Axis({
  radius,
  color = "red",
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
        <filter id="f1" x="-0.1" y="-0.1" width="200%" height="200%">
          <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
          <feColorMatrix class = "circle " result = "matrixOut" in = "offOut" type = "matrix"
            values = "0.5 0 0 0 0 0 0.4 0 0 0 0 0 0.6 0 0 0 0 0 0.9 0"
          />
          <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="10" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      
      <g id="bigRing" stroke-width="5">
        <circle
          r = {radiusToUse + 80}
        />
      </g>
      <g id ="thickRing" stroke-width="5">
        <circle
          r = {radiusToUse + 5}
        />
      </g>
      {/* medium ring */}
      <circle
        filter="url(#f1)"
        className="veAxisFill"
        id="circularViewAxis"
        key="circleOuter"
        r={radiusToUse + ringThickness}
      />
      {/* small_ring shadow */}
      <g 
        fill={color} 
        stroke-width="5"
      >
        {/* <defs>
          <filter id="f1" x="0" y="0" width="200%" height="200%">
            <feOffset result="offOut" in="SourceGraphic" dx="20" dy="20" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
        </defs> */}
        <circle
          id=""
          key="circle"
          r={radiusToUse - 25}
          filter = "url(#f1)"
          style={{ fill: "white" }}
        />
      </g>
      {/* small_ring */}
      <g 
        fill={color} 
        stroke-width="5"
      >
        <circle
          id="circularViewAxis"
          key="circle"
          r={radiusToUse - 25}
          style={{ fill: "white"}}
        />
      </g>
      {/* inner_samll_ring
      <g 
        fill={color} 
        stroke-width="5"
      >
        <circle
          id="circularViewAxis"
          key="circle"
          r={radiusToUse - 55}
          filter = "url(#f1)"
          style={{ fill: "white"}}
        />
      </g> */}
      {tickMarksAndLabels}
    </g>
  );
  return {
    component,
    height
  };
}

export default Axis;
