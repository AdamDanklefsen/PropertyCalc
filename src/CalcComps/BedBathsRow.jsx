import * as React from 'react';
import NumberInput from "./NumberInput";

export default function BedBathsRow( {
    beds,
    baths,
    label,
    min = 0,
    max = 1e9,
    inc = 1,
    incp = .5
} ) {
    
    return (
    <React.Fragment>
        <div className='BBRowDiv RowDiv'>
            <p className='RowLabel'>
                {label}
            </p>
            <NumberInput
                value={beds.val}
                onChange={beds.Changed}
                set={beds.set}
                inc={inc}
            />
            <NumberInput
                value={baths.val}
                onChange={baths.Changed}
                set={baths.set}
                inc={incp}
            />
        </div>
        
        <Styles />
      </React.Fragment>
      );
}

function Styles() {
    return (<style>{`
    .BBRowDiv {
        grid-template-columns: 130px 1fr 1fr;
    }
    `}</style>);
}