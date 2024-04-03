import * as React from 'react';
import { useTheme } from '@mui/system';
import {
    Unstable_NumberInput as BaseNumberInput,
    numberInputClasses,
  } from "@mui/base/Unstable_NumberInput";

export default function TextRow( {
    obj,
    label,
    fmt,
    min = 0,
    max = 1e9,
    inc = 1
} ) {
    return (
    <React.Fragment>
        <div className='TextRowDiv RowDiv'>
            <p className='RowLabel'>
                {label}
            </p>
            <div className="CustomTextInput">
            <input
                className="input autofill-background"
                type="text"
                value={obj.val}
                onChange={
                    (e) => {
                    const newValue = (e.target.value);
                    onChange(e,newValue)}
                    }
                />            
            </div>
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
    const isDarkMode = useIsDarkMode();
    return (<style>{`
        .TextRowDiv {
            grid-template-columns: 130px 1fr;
        }
        .CustomTextInput {
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
            overflow: hidden;
            column-gap: 8px;
            padding: 4px;
            min-width: 132px;
            display: flex;
            
            }

        .CustomTextInput:hover {
            border-color: ${cyan[400]};
        }

        .CustomTextInput.${numberInputClasses.focused} {
            border-color: ${cyan[400]};
            box-shadow: 0 0 0 3px ${isDarkMode ? cyan[500] : cyan[200]};
        }

        .CustomTextInput .input {
            font-size: 0.875rem;
            font-family: inherit;
            font-weight: 200;
            line-height: 1.5;
            color: ${isDarkMode ? grey[300] : grey[900]};
            background: inherit;
            border: none;
            border-radius: inherit;
            padding: 8px 0px 8px 0px;
            outline: 0;
            appearance: none;
            width: 100%;
        }
        .CustomTextInput input[type="text"]::-ms-fill {
            background-color: ${isDarkMode ? grey[900] : "#fff"} !important;
        }
    `}</style>);
}