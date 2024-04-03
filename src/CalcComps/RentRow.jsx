import * as React from 'react';
import NumberInput from "./NumberInput";

export default function RentRow( {
    rent,
    totalrent,
    label,
    min = 0,
    max = 1e9,
    inc = 10,
    incp = 5
} ) {
    
    return (
    <React.Fragment>
        <div className='RentRowDiv RowDiv'>
            <p className='RowLabel'>
                {label}
            </p>
            <NumberInput
                value={totalrent.val}
                onChange={totalrent.Changed}
                set={totalrent.set}
                inc={inc}
                fmt={'$'}
            />
            <NumberInput
                value={rent.val}
                onChange={rent.Changed}
                set={rent.set}
                inc={incp}
                fmt={'$'}
            />
        </div>
        
        <Styles />
      </React.Fragment>
      );
}

function Styles() {
    return (<style>{`
    .RentRowDiv {
        grid-template-columns: 100px 1fr 1fr;
    }
    `}</style>);
}