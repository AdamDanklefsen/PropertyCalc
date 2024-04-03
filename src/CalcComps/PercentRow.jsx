import * as React from 'react';
import NumberInput from "./NumberInput";

export default function PercentRow( {
    obj,
    label,
    min = 0,
    max = 1e9,
    inc = 10,
    incp= .5
} ) {
    return (
    <React.Fragment>
        <div className='PercentRowDiv RowDiv'>
            <p className='RowLabel'>
                {label}
            </p>
            <NumberInput
                value={obj.val}
                onChange={obj.Changed}
                set={obj.set}
                inc={inc}
                fmt={'$'}
            />
            <NumberInput
                value={obj.valPercent}
                onChange={obj.ChangedPercent}
                set={obj.setPercent}
                inc={incp}
                fmt={'%'}
            />
        </div>
        
        <Styles />
      </React.Fragment>
      );
}

function Styles() {
    return (<style>{`
    .PercentRowDiv {
        grid-template-columns: 100px 1fr 1fr;
    }
    `}</style>);
}