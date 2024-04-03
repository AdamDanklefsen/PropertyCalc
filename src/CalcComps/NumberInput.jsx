import * as React from "react";
import {styled} from "@mui/system";
import {
  Unstable_NumberInput as BaseNumberInput,
  numberInputClasses,
} from "@mui/base/Unstable_NumberInput";
import { useTheme } from "@mui/system";
import { useEffect } from "react";
import { useCallback } from "react";

export default function NumberInput({
  value,
  onChange,
  fmt,
  min = 0,
  max = 1e7,
  inc = 1,
  id=0,
}) {
  return (
    <React.Fragment>
        <div className="CustomNumberInput">
            <button className="btn increment"
                onClick={id==0 ? 
                    (e) => {onChange(e,Number(value)+Number(inc))}
                    :
                    (e) => {onChange(e,Number(value)+Number(inc),Number(id)-1)}
                }
            >▴</button>
            <button className="btn decrement"
                onClick={id==0 ? 
                    (e) => {onChange(e,Number(value)-Number(inc))}
                    :
                    (e) => {onChange(e,Number(value)-Number(inc),Number(id)-1)}
                }
            >▾</button>
            {fmt==='$'
            ? <p className="adorn StartAdornment">$</p>
            : <></>}
            <input
                className="input"
                type="number"
                value={Math.round(100*value)/100}
                onChange={id==0?
                    (e) => {
                    const newValue = parseFloat(e.target.value);
                    onChange(e,newValue)}
                    :
                    (e) => {
                        const newValue = parseFloat(e.target.value);
                        onChange(e,newValue, Number(id)-1)}
                    }
                />

            {fmt==='%'
            ? <p className="adorn EndAdornment">%</p>
            : <></>}
            
        </div>

      
      <Styles />
    </React.Fragment>
  );
}


const cyan = {
  50: "#E9F8FC",
  100: "#BDEBF4",
  200: "#99D8E5",
  300: "#66BACC",
  400: "#1F94AD",
  500: "#0D5463",
  600: "#094855",
  700: "#063C47",
  800: "#043039",
  900: "#022127",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === "dark";
}

function Styles() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  return (
    <style>
      {`
      .CustomNumberInput {
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 400;
        border-radius: 8px;
        color: ${isDarkMode ? grey[300] : grey[900]};
        background: ${isDarkMode ? grey[900] : "#fff"};
        border: 1px solid ${isDarkMode ? grey[700] : grey[200]};
        box-shadow: 0px 2px 4px ${
          isDarkMode ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
        };
        height: auto;
        display: grid;
        grid-template-columns: 12px 1fr 14px 19px;
        grid-template-rows: 1fr 1fr;
        overflow: hidden;
        column-gap: 8px;
        padding: 4px;
        min-width: 132px;
      }

      .CustomNumberInput:hover {
        border-color: ${cyan[400]};
      }

      .CustomNumberInput.${numberInputClasses.focused} {
        border-color: ${cyan[400]};
        box-shadow: 0 0 0 3px ${isDarkMode ? cyan[500] : cyan[200]};
      }

      .CustomNumberInput .adorn {
        font-size: .875rem;
        font-familt: inherit;
        margin: 0px;
        height: auto;
      }
      .CustomNumberInput .StartAdornment {
        grid-column: 1;
        grid-row: 1 / span 2;
        align-self: center;
      }
      .CustomNumberInput .EndAdornment {
        grid-column: 3;
        grid-row: 1 / span 2;
        align-self: center;
      }

      .CustomNumberInput .input {
        font-size: 0.875rem;
        font-family: inherit;
        font-weight: 200;
        line-height: 1.5;
        grid-column: 2;
        grid-row: 1/3;
        color: ${isDarkMode ? grey[300] : grey[900]};
        background: inherit;
        border: none;
        border-radius: inherit;
        padding: 8px 0px 8px 0px;
        outline: 0;
        max-width: 100px;
        appearance: none;
        width: 100%;
      }

      .CustomNumberInput .input::-webkit-inner-spin-button,
    .CustomNumberInput .input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0; /* Optional: removes the margin */
    }

      .CustomNumberInput .input:focus-visible {
        outline: 0;
      }

      .CustomNumberInput .btn {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        appearance: none;
        padding: 0;
        width: 19px;
        height: 15px;
        font-family: system-ui, sans-serif;
        font-size: 0.875rem;
        line-height: 1;
        box-sizing: border-box;
        background: ${isDarkMode ? grey[900] : "#fff"};
        border: 0;
        color: ${isDarkMode ? grey[300] : grey[900]};
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 120ms;
      }

      .CustomNumberInput .btn:hover {
        background: ${isDarkMode ? grey[800] : grey[50]};
        border-color: ${isDarkMode ? grey[600] : grey[300]};
        cursor: pointer;
      }

      .CustomNumberInput .btn.increment {
        grid-column: 4;
        grid-row: 1;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border: 1px solid;
        border-bottom: 0;
        border-color: ${isDarkMode ? grey[800] : grey[200]};
        background: ${isDarkMode ? grey[900] : grey[50]};
        color: ${isDarkMode ? grey[200] : grey[900]};

          &:hover {
            cursor: pointer;
            color: #FFF;
            background: ${isDarkMode ? cyan[100] : cyan[500]};
            border-color: ${isDarkMode ? cyan[400] : cyan[600]};
          }
      }

      .CustomNumberInput .btn.decrement {
        grid-column: 4;
        grid-row: 2;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        border: 1px solid;
        border-color: ${isDarkMode ? grey[800] : grey[200]};
        background: ${isDarkMode ? grey[900] : grey[50]};
        color: ${isDarkMode ? grey[200] : grey[900]};

          &:hover {
            cursor: pointer;
            color: #FFF;
            background: ${isDarkMode ? cyan[100] : cyan[500]};
            border-color: ${isDarkMode ? cyan[400] : cyan[600]};
          }
        }

      & .arrow {
        transform: translateY(-1px);
      }
      `}
    </style>
  );
}