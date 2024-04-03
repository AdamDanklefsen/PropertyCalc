import * as React from 'react';
import NumberInput from "./NumberInput";

export default function NumberRow( {
    obj,
    label,
    fmt,
    min = 0,
    max = 1e9,
    inc = 1
} ) {
    return (
    <React.Fragment>
        <div className='NumberRowDiv RowDiv'>
            <p className='RowLabel'>
                {label}
            </p>
            <NumberInput
                value={obj.val}
                onChange={obj.Changed}
                set={obj.set}
                inc={inc}
                fmt={fmt}
            />
        </div>
        
        <Styles />
      </React.Fragment>
      );
}


function Styles() {
    return (<style>{`
        .RowDiv {
            display: grid;
            align-items: center;
            margin: 4px;
            width: 100%;
        }
        .NumberRowDiv {
            grid-template-columns: 130px 1fr;
        }
        .RowLabel {
            font-size: 14px;
            margin: 0px;

        }
    `}</style>);
}