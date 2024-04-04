import FormControl from "@mui/material/FormControl";
import { Button, FormHelperText, Input, InputLabel, TextField} from "@mui/material";
import {
  Unstable_NumberInput as BaseNumberInput,
  numberInputClasses,
} from '@mui/base/Unstable_NumberInput';
import { createTheme } from "@mui/material";
import { Box } from "@mui/material";
import { Stack, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { useTheme } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';

import { useState } from "react";
import NumberInput from "./CalcComps/NumberInput";
import NumberRow from "./CalcComps/NumberRow";
import PercentRow from "./CalcComps/PercentRow";
import RentRow from "./CalcComps/RentRow";
import BedBathsRow from "./CalcComps/BedBathsRow";
import TextRow from "./CalcComps/TextRow";
import {useLocation} from "react-router-dom";

const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Calculator() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let params = {};

  for (let param of searchParams) {
    params[param[0]] = param[1];
  } 

  function createState(init) {
    var r = {};
    var v, s, c;
    [v, s] = useState(init);
    c = (e,value) => {
      s(value);
    };
    r.val = v;
    r.set = s;
    r.Changed = c;
    return r;
  }

  function createPercentState(Quantity, init, init2) {
    var r = {};
    var v, s, c, v2, s2, c2;
    [v, s] = useState(init);
    [v2, s2] = useState(init2);
    c = (e, value=e.target.value) => {
      s(value);
      s2((value / Quantity.val) * 100);
    };
    c2 = (e, value=e.target.value) => {
      s2(value);
      s((value * Quantity.val) / 100);
    };
    r.val = v;
    r.set = s;
    r.Changed = c;
    r.valPercent = v2;
    r.setPercent = s2;
    r.ChangedPercent = c2;
    return r;
  }

  function getDefault(prop,def) {
    return params.hasOwnProperty(prop) ? params[prop] : def
  }

  const rawDefaultValues = {
    Address: "123 Main st",
    pPrice: 100000,
    DownPayment: 20,
    ClosingCosts: 3,
    mRate: 7,
    Term: 30,
    pTaxes: 2.17,
    MortgageInsurance: 1,
    Insurance: 1200,
    Units: 2,
    Beds: 4,
    Baths: 2,
    Rent: 700,
    CapEx: 10,
    Vacancy: 5,
    Maintenance: 5,
    Management: 10,
  };

  const defaultValues = {
    Address: getDefault('Address', rawDefaultValues.Address),
    pPrice: getDefault('pPrice', rawDefaultValues.pPrice),
    DownPayment: getDefault('DownPayment', rawDefaultValues.DownPayment),
    ClosingCosts: getDefault('ClosingCosts',rawDefaultValues.ClosingCosts),
    mRate: getDefault('mRate', rawDefaultValues.mRate),
    Term: getDefault('Term', rawDefaultValues.Term),
    pTaxes: getDefault('pTaxes', rawDefaultValues.pTaxes),
    MortgageInsurance: getDefault('MortgageInsurance', rawDefaultValues.MortgageInsurance),
    Insurance: getDefault('Insurance', rawDefaultValues.Insurance),
    Units: getDefault('Units', rawDefaultValues.Units),
    Beds: getDefault('Beds', rawDefaultValues.Beds),
    Baths: getDefault('Baths', rawDefaultValues.Baths),
    Rent: getDefault('Rent', rawDefaultValues.Rent),
    CapEx: getDefault('CapEx', rawDefaultValues.CapEx),
    Vacancy: getDefault('Vacancy', rawDefaultValues.Vacancy),
    Maintenance: getDefault('Maintenance', rawDefaultValues.Maintenance),
    Management: getDefault('Management', rawDefaultValues.Management),
  };

  var Address = createState(defaultValues.Address);
  var pPrice = createState(defaultValues.pPrice);
  const DownPayment = createPercentState(
    pPrice,
    (defaultValues.pPrice / 100) * defaultValues.DownPayment,
    defaultValues.DownPayment
  );
  const ClosingCosts = createPercentState(
    pPrice,
    (defaultValues.pPrice / 100) * defaultValues.ClosingCosts,
    defaultValues.ClosingCosts
  );
  const mRate = createState(defaultValues.mRate);
  const Term = createState(defaultValues.Term);
  const pTaxes = createPercentState(
    pPrice,
    (defaultValues.pPrice / 100) * defaultValues.pTaxes,
    defaultValues.pTaxes
  );
  const MortgageInsurance = createPercentState(
    pPrice,
    (defaultValues.pPrice / 100) * defaultValues.MortgageInsurance,
    defaultValues.MortgageInsurance
  );
  const Insurance = createState(defaultValues.Insurance);
  const Units = createState(defaultValues.Units);
  const TotalRent = createState(defaultValues.Rent * defaultValues.Units);
  const RentArray = createState(Array(8).fill(defaultValues.Rent));
  const Beds = createState(defaultValues.Beds);
  const Baths = createState(defaultValues.Baths);
  const Rent = createState(defaultValues.Rent);
  const CapEx = createPercentState(
    TotalRent,
    (defaultValues.Rent * defaultValues.Units / 100) * defaultValues.CapEx,
    defaultValues.CapEx
  );
  const Vacancy = createPercentState(
    TotalRent,
    (defaultValues.Rent * defaultValues.Units / 100) * defaultValues.Vacancy,
    defaultValues.Vacancy
  );
  const Maintenance = createPercentState(
    TotalRent,
    (defaultValues.Rent * defaultValues.Units / 100) * defaultValues.Maintenance,
    defaultValues.Maintenance
  );
  const Management = createPercentState(
    TotalRent,
    (defaultValues.Rent * defaultValues.Units / 100) * defaultValues.Management,
    defaultValues.Management
  );

  pPrice.Changed = (e, value=e.target.value) => {
    pPrice.set(value);
    DownPayment.set((value * DownPayment.valPercent) / 100);
    pTaxes.set((value * pTaxes.valPercent) / 100);
    MortgageInsurance.set((value * MortgageInsurance.valPercent) / 100);
    ClosingCosts.set( (value * ClosingCosts.valPercent) /100);
  };
  TotalRent.Changed = (e, value=e.target.value) => {
    TotalRent.set(value);
    CapEx.set((value * CapEx.valPercent) / 100);
    Vacancy.set((value * Vacancy.valPercent) / 100);
    Maintenance.set((value * Maintenance.valPercent) / 100);
    Management.set((value * Management.valPercent) / 100);
    Rent.set(value / Units.val);
    RentArray.set(Array(8).fill(value / Units.val));
  };
  Rent.Changed = (e, value=e.target.value) => {
    TotalRent.set(value * Units.val);
    CapEx.set((value * Units.val * CapEx.valPercent) / 100);
    Vacancy.set((value * Units.val * Vacancy.valPercent) / 100);
    Maintenance.set((value * Units.val * Maintenance.valPercent) / 100);
    Management.set((value * Units.val * Management.valPercent) / 100);
    Rent.set(value);
    RentArray.set(Array(8).fill(value));
  };
  RentArray.Changed = (e, value=e.target.value, i) => {
    let tmp = [...RentArray.val];
    tmp[i] = Number(value);
    RentArray.set(tmp)
    var tot = 0;
    for (let i=0; i<Units.val; i++){
      tot = Number(tot) + Number(tmp[i]);
    }
    TotalRent.set(tot);
    Rent.set(tot / Units.val)
  }
  Units.Changed = (e, value=e.target.value) => {
    Units.set(value);
    TotalRent.set(Rent.val * value);
  }

  function calcLoanPayment(P, r, n) {
    const R = Math.pow(1 + r / 1200, 12 * n);
    return (((P * r) / 1200) * R) / (R - 1);
  }

  var LoanPmt = calcLoanPayment(
    pPrice.val - DownPayment.val,
    mRate.val,
    Term.val
  );
  var Reserves = 
  Number(CapEx.val) +
  Number(Vacancy.val) +
  Number(Maintenance.val) +
  Number(Management.val);

  var NOI = (TotalRent.val -  Number(Reserves)) * 12 
  - (Number(pTaxes.val) + Number(Insurance.val) + Number(MortgageInsurance.val));

  var cashToClose = Number(DownPayment.val) + Number(ClosingCosts.val);

  const [open, setOpen] = React.useState(false);


  var CustomLink = queryUrl(Address, pPrice, DownPayment, ClosingCosts, mRate,
    Term, pTaxes, MortgageInsurance, Insurance, Units,
    Beds, Baths, TotalRent, CapEx, Vacancy, Maintenance, Management, rawDefaultValues);

  const FC_sx = {
    display: "flex",
    border: "1px",
    width: "100%",
  };

  


  return (
    <>
    <Box
      className="Calculator"
      sx={{
        border: 1,
        maxWidth: 1000,
        margin: "auto",
        bgcolor: "background.secondary",
      }}
      display={"flex"}
      flexDirection={{ xs: "column", md: "row" }}
      gap={3}
      padding={3}
    >
      <Stack>
        <FormBoxContainer className="Addr" sx={FC_sx} Title="Address">
          <TextRow label='Address' obj={Address}/>
        </FormBoxContainer>

        <FormBoxContainer className="Fin" Title="Financing" sx={FC_sx}>
          <NumberRow label="Purchase Price" obj={pPrice} fmt="$" inc={1000}/>
          <PercentRow label="Down Payment" obj={DownPayment} />
          <PercentRow label="Closing Costs" obj={ClosingCosts}/>
          <NumberRow label="Rate" obj={mRate} fmt="%" inc={.25}/>
          <NumberRow label="Term" obj={Term} />
          <DisplayRow label="Cash To Close" value={cashToClose} adorn="$"/>
        </FormBoxContainer>

        <FormBoxContainer className="Expen" Title="Expenses" sx={FC_sx}>
          <DisplayRow label="Loan Payment" value={LoanPmt} adorn="$" />
          <PercentRow label="Property Taxes" obj={pTaxes}/>
          <PercentRow label="Mortgage Insurance" obj={MortgageInsurance} incp={.05}/>
          <NumberRow label="Insurance" obj={Insurance} fmt="$" inc={12}/>
          <DisplayRow
            label="Mortgage Pymt"
            value={
              Number(LoanPmt) +
              (Number(pTaxes.val) + Number(Insurance.val) + Number(MortgageInsurance.val)) / 12
            }
            adorn="$"
          />
        </FormBoxContainer>
      </Stack>
      <Stack>
        <FormBoxContainer className="Inc" Title="Income" sx={FC_sx}>
          <NumberRow label="Units" obj={Units} />
          <Stack direction='row' display="flex" justifyItems={"right"}>
            <Stack justifyContent={'center'}>
            <Typography align="left" >Detail</Typography>
            </Stack>
            
            <IconButton
                aria-label="expand row"
                size="small"
                margin={0}
                padding={0}
                onClick={() => setOpen(!open)}
            >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton> 
          
          </Stack>
          {open
          ? UnitView(Units, RentArray, TotalRent)
          : <>
              <RentRow label="Total Rent" obj={Rent} rent={Rent} units={Units} totalrent={TotalRent} inc={10}/>
              <BedBathsRow label="Beds/Baths" beds={Beds} baths={Baths} />
            </>
          }
        </FormBoxContainer>
        <FormBoxContainer className="Reserves" Title="Reserves" sx={FC_sx}>
          <PercentRow label="CapEx" obj={CapEx} />
          <PercentRow label="Vacancy" obj={Vacancy} />
          <PercentRow label="Maintenance" obj={Maintenance} />
          <PercentRow label="Management" obj={Management} />
          <DisplayRow
            label="Reserves"
            value={Reserves}
            adorn="$"
          />
        </FormBoxContainer>

        <FormBoxContainer className="Results" Title="Results" sx={FC_sx}>
          <DisplayRow label="NOI" value={NOI} adorn="$" />
          <DisplayRow
            label="Cap Rate"
            value={(NOI / pPrice.val) * 100}
            adorn="%"
          />
          <DisplayRow label="Cash Flow" value={NOI / 12 - Number(LoanPmt)} adorn='$'/>
          <DisplayRow label="Cash Flow / Yr" value={Number(NOI) - 12*Number(LoanPmt)} adorn='$'/>
          <DisplayRow label="Cash on Cash" value = {100*(Number(NOI) - 12*Number(LoanPmt))/Number(cashToClose)} adorn='%'/>
        </FormBoxContainer>

        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Button variant="contained"
            sx={{margin: 1, width:"50%"}}
            href={CustomLink}
            >
            Calculate
          </Button>
          <Button variant="contained"
            sx={{margin: 1, width:"50%"}}
            onClick={(e) => {
              
              console.log(window.location.origin + window.location.pathname + CustomLink.slice(2));
              navigator.clipboard.writeText(window.location.origin + window.location.pathname + CustomLink.slice(2));
            }}>
            Copy  
          </Button>
        <Button variant="contained"
          sx={{margin: 1, width:"50%"}}
          onClick={ (e) => testPush(e, Address, pPrice, DownPayment, mRate,
                                    Term, LoanPmt, pTaxes, MortgageInsurance, Insurance,
                                    Units, Beds, Baths, TotalRent,
                                    CapEx, Vacancy, Maintenance, Management, NOI)}>
          Save
        </Button>

        </Box>
        </Stack>
    </Box>
    {process.env.NODE_ENV === 'development'
    ?
    <ul>
      <h4>Tickets</h4>
      <li>Databse View Details</li>
      <li>Import from Database to Calculator - Use Custom Url Params</li>
      <li>Rent Detail Breakdown</li>
      <li>Loan Options : Standard, Exact Payment</li>
      <li className="Done">Custom Increments</li>
      <li>What if Machine</li>
        <ul>
          <li>Rent to Cashflow</li>
          <li>Purchase Price to Cashflow</li>
        </ul>
      <li>Save Button feedback</li>
      <li className="Done">Url Parameters + Calculate Button</li>
      <li className="Done">Cash on Cash Return</li>
      <li className="Done">New Number Entry</li>
      <li>Database Hosting</li>
      <style>{`
        .Done {
          text-decoration: line-through;
          text-decoration-thickness: .05em;
        }
        `}
      </style>
    </ul>
    : <></>}
    </>
  );
}

function queryUrl(Address, pPrice, DownPayment, ClosingCosts, mRate,
  Term, pTaxes, MortgageInsurance, Insurance, Units,
  Beds, Baths, TotalRent, CapEx, Vacancy, Maintenance, Management, rawDefaultValues) {
    let st = './#calc/?';
    if (rawDefaultValues.Address!=Address.val) {
      st = st + '&Address=' + Address.val;
    }
    if (rawDefaultValues.pPrice!=pPrice.val) {
      st = st + '&pPrice=' + pPrice.val;
    }
    if (rawDefaultValues.DownPayment!=DownPayment.valPercent) {
      st = st + '&DownPayment=' + Math.round(10*DownPayment.valPercent)/10;
    }
    if (rawDefaultValues.ClosingCosts!=ClosingCosts.valPercent) {
      st = st + '&ClosingCosts=' + ClosingCosts.valPercent;
    }
    if (rawDefaultValues.mRate!=mRate.val) {
      st = st + '&mRate=' + mRate.val;
    }
    if (rawDefaultValues.Term!=Term.val) {
      st = st + '&Term=' + Term.val;
    }
    if (rawDefaultValues.pTaxes!=pTaxes.valPercent) {
      st = st + '&pTaxes=' + pTaxes.valPercent;
    }
    if (rawDefaultValues.MortgageInsurance!=MortgageInsurance.valPercent) {
      st = st + '&MortgageInsurance=' + MortgageInsurance.valPercent;
    }
    if (rawDefaultValues.Insurance!=Insurance.val) {
      st = st + '&Insurance=' + Insurance.val;
    }
    if (rawDefaultValues.Units!=Units.val) {
      st = st + '&Units=' + Units.val;
    }
    if (rawDefaultValues.Rent!= (TotalRent.val / Units.val)) {
      st = st + '&Rent=' + (TotalRent.val / Units.val);
    }
    if (rawDefaultValues.Beds!=Beds.val) {
      st = st + '&Beds=' + Beds.val;
    }
    if (rawDefaultValues.Baths!=Baths.val) {
      st = st + '&aths=' + Baths.val;
    }
    if (rawDefaultValues.CapEx!=CapEx.valPercent) {
      st = st + '&CapEx=' + CapEx.valPercent;
    }
    if (rawDefaultValues.Vacancy!=Vacancy.valPercent) {
      st = st + '&Vacancy=' + Vacancy.valPercent;
    }
    if (rawDefaultValues.Maintenance!=Maintenance.valPercent) {
      st = st + '&Maintenance=' + Maintenance.valPercent;
    }
    if (rawDefaultValues.Management!=Management.valPercent) {
      st = st + '&Management=' + Management.valPercent;
    }
    st = st.replace('?&','?');
    return st;
  }


function UnitView(Units, RentArray, TotalRent) {
  const data = [];
  var label = "";
  for (let i=0; i<Units.val; i++){
    label = "Unit "+(Number(i)+1);
    data.push(
    <React.Fragment key={i}>
    <div className='NumberRowDiv RowDiv'>
      <p className='RowLabel'>
          {label}
      </p>
      <NumberInput
          id={i+1}
          value={(Math.round((RentArray.val[i])*100)/100).toString()}
          onChange={RentArray.Changed}
          inc={10}
          fmt={'$'}
      />
    </div>
    <Styles/>
    </ React.Fragment>)

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
  }
  
  data.push(<NumberRow key={"Total"} label="Total Rent" obj={TotalRent} fmt='$'/>)
  return(data);
}

function testPush(event, Address, pPrice, DownPayment, mRate,
    Term, LoanPmt, pTaxes, MortgageInsurance, Insurance,
    Units, Beds, Baths, TotalRent,
    CapEx, Vacancy, Maintenance, Management,
    NOI) {
     fetch('http://127.0.0.1:8000/api/api/',{
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       },
       method: 'POST',
       body: JSON.stringify({
           address: Address.val,
           ListPrice : pPrice.val,
           LoanDetails : {
             DownPayment: DownPayment.val,
             mRate: mRate.val,
             Term: Term.val,
             LoanPmt: LoanPmt,
           },
           MortgageDetails: {
             pTaxes: pTaxes.val,
             MortgageInsurance: MortgageInsurance.val,
             Insurance: Insurance.val,
             MortgagePmt: Number(LoanPmt) +
             (Number(pTaxes.val) + Number(Insurance.val) + Number(MortgageInsurance.val)) / 12
           },
           PropertyDetails: {
             Units: Units.val,
             Beds: Beds.val,
             Baths: Baths.val,
             TotalRent: TotalRent.val
           },
           ReservesDetails: {
             CapEx: CapEx.val,
             Vacancy: Vacancy.val,
             Maintenance: Maintenance.val,
             Management: Management.val,
             Reserves: Number(CapEx.val) + Number(Vacancy.val)
             + Number(Maintenance.val) + Number(Management.val)
           },
           CashFlowDetails: {
             NOI: NOI,
             CapRate: (NOI / pPrice.val),
             CashFlow: NOI / 12 - Number(LoanPmt)
           },
       })
  })
}

function FormBoxContainer(props = { Title, sx }) {
  return (
    <FormControl sx={props.sx}>
      <Typography typography="h4" align="center">
        {props.Title}
      </Typography>
      <Stack spacing={1}>{props.children}</Stack>
    </FormControl>
  );
}

function ad(adorn) {
  if (adorn === "$") {
    return {
      startAdornment: <InputAdornment position="start">{adorn}</InputAdornment>,
    };
  } else if (adorn === "%" || adorn === "Years") {
    return {
      endAdornment: <InputAdornment position="end">{adorn}</InputAdornment>,
    };
  }
}


function DoubleRowNoPercent(props) {
    var label, label1, label2, obj1, obj2;
    label = props.label;
    [label1, label2] = props.label.split('/');
    obj1 = props.obj1;
    obj2 = props.obj2;

    return (
      <>
        <Stack direction={"row"} spacing={2} useFlexGap alignItems={"center"}>
          <Typography minWidth={120}>{label}</Typography>
          <Box width={"100%"} display={"flex"}>
            <Box width={"50%"}>
              <TextField
                fullWidth
                label={label1}
                color="primary"
                variant="outlined"
                type="number"
                placeholder={"100000"}
                value={(Math.round((obj1.val)*100)/100).toString()}
                onChange={obj1.Changed}
                //InputProps={ad("$")}
                InputLabelProps={{ shrink: true }}
                size="small"
              />
            </Box>
            <Box width={"50%"}>
              <TextField
                fullWidth
                label={label2}
                color="primary"
                variant="outlined"
                type="number"
                placeholder={"20"}
                value={(Math.round((obj2.val)*100)/100).toString()}
                onChange={obj2.Changed}
                //InputProps={ad("$")}
                InputLabelProps={{ shrink: true }}
                size="small"
              />
            </Box>
          </Box>
        </Stack>
      </>
    );
}


function DisplayRow(props) {
  var label, adorn, defVal, value;
  if ("label" in props) {
    label = props.label;
  } else {
    label = "Empty";
  }
  if ("adorn" in props) {
    adorn = props.adorn;
  } else {
    adorn = "";
  }
  if ("defVal" in props) {
    defVal = toString(props.defVal);
  } else {
    defVal = toString(0);
  }
  if ("value" in props) {
    value = props.value;
  } else {
    value = "";
  }

  const fmt = () => {
    if (adorn==='$') {
        return(<>{USD.format(value)}</>);
    } else if (adorn==='%') {
        return(<>{value.toLocaleString("en-US", {maximumFractionDigits: 2, minimumFractionDigits: 2}) + "%"}</>);
    } else {
        return(<>{value.toLocaleString("en-US", {maximumFractionDigits: 2, minimumFractionDigits: 2})}</>);
    }
    };

  return (
    <Stack direction={"row"} spacing={2} border={1}>
      <Typography minWidth={120}>{label}</Typography>
      <Box width={"100%"}>
        <Typography align="center">{fmt(value)}</Typography>
      </Box>
    </Stack>
  );
}
