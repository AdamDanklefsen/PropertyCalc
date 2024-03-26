import FormControl from "@mui/material/FormControl";
import { Button, FormHelperText, Input, InputLabel, TextField } from "@mui/material";
import { createTheme } from "@mui/material";
import { Box } from "@mui/material";
import { Stack, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { useTheme } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';

import "./Calculator.css";
import { useState } from "react";

const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Calculator() {
  function createState(init) {
    var r = {};
    var v, s, c;
    [v, s] = useState(init);
    c = (e) => {
      s(e.target.value);
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
    c = (e) => {
      s(e.target.value);
      s2((e.target.value / Quantity.val) * 100);
    };
    c2 = (e) => {
      s2(e.target.value);
      s((e.target.value * Quantity.val) / 100);
    };
    r.val = v;
    r.set = s;
    r.Changed = c;
    r.valPercent = v2;
    r.setPercent = s2;
    r.ChangedPercent = c2;
    return r;
  }

  // Pull From Server
  const defaultValues = {
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

  pPrice.Changed = (e) => {
    pPrice.set(e.target.value);
    DownPayment.set((e.target.value * DownPayment.valPercent) / 100);
    pTaxes.set((e.target.value * pTaxes.valPercent) / 100);
    MortgageInsurance.set((e.target.value * MortgageInsurance.valPercent) / 100);
  };
  TotalRent.Changed = (e) => {
    TotalRent.set(e.target.value);
    CapEx.set((e.target.value * CapEx.valPercent) / 100);
    Vacancy.set((e.target.value * Vacancy.valPercent) / 100);
    Maintenance.set((e.target.value * Maintenance.valPercent) / 100);
    Management.set((e.target.value * Maintenance.valPercent) / 100);
    Rent.set(e.target.value / Units.val);
  };
  Rent.Changed = (e) => {
    TotalRent.set(e.target.value * Units.val);
    CapEx.set((e.target.value * Units.val * CapEx.valPercent) / 100);
    Vacancy.set((e.target.value * Units.val * Vacancy.valPercent) / 100);
    Maintenance.set((e.target.value * Units.val * Maintenance.valPercent) / 100);
    Management.set((e.target.value * Units.val * Maintenance.valPercent) / 100);
    Rent.set(e.target.value);
  };
  RentArray.Changed = (e, i) => {
    let tmp = [...RentArray.val];
    tmp[i] = Number(e.target.value);
    RentArray.set(tmp)
    var tot = 0;
    for (let i=0; i<Units.val; i++){
      tot = tot + tmp[i];
    }
    TotalRent.set(tot);
    Rent.set(tot / Units.val)
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

  var cashToClose = DownPayment.val + ClosingCosts.val;

  const [open, setOpen] = React.useState(false);

  const FC_sx = {
    display: "flex",
    border: "1px",
    width: "100%",
  };

  return (
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
          <NumberRow label="Address" obj={Address} textType='text' defVal='Enter Address'/>
        </FormBoxContainer>

        <FormBoxContainer className="Fin" Title="Financing" sx={FC_sx}>
          <NumberRow label="Purchase Price" obj={pPrice} adorn="$" />
          <DoubleRow label="Down Payment" obj={DownPayment} />
          <DoubleRow label="Closing Costs" obj={ClosingCosts}/>
          <NumberRow label="Rate" obj={mRate} adorn="%" />
          <NumberRow label="Term" obj={Term} adorn="Years" />
          <DisplayRow label="Cash To Close" value={cashToClose} adorn="$"/>
        </FormBoxContainer>

        <FormBoxContainer className="Expen" Title="Expenses" sx={FC_sx}>
          <DisplayRow label="Loan Payment" value={LoanPmt} adorn="$" />
          <DoubleRow label="Property Taxes" obj={pTaxes} />
          <DoubleRow label="Mortgage Insurance" obj={MortgageInsurance} />
          <NumberRow label="Insurance" obj={Insurance} adorn="$" />
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
              <DoubleRowRent label1="Total Rent" label2="Rent/Unit" rent={Rent} units={Units} totalrent={TotalRent}/>
              <DoubleRowNoPercent label="Beds/Baths" obj1={Beds} obj2={Baths} />
            </>
          }
          
        </FormBoxContainer>
        <FormBoxContainer className="Reserves" Title="Reserves" sx={FC_sx}>
          <DoubleRow label="CapEx" obj={CapEx} />
          <DoubleRow label="Vacancy" obj={Vacancy} />
          <DoubleRow label="Maintenance" obj={Maintenance} />
          <DoubleRow label="Management" obj={Management} />
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
        </FormBoxContainer>

        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Button variant="contained"
          sx={{margin: 1, width:"50%"}}
          onClick={ (e) => testPush(e, Address, pPrice, DownPayment, mRate,
                                    Term, LoanPmt, pTaxes, MortgageInsurance, Insurance,
                                    Units, Beds, Baths, TotalRent,
                                    CapEx, Vacancy, Maintenance, Management, NOI)}>
          Save Entry
        </Button>

        </Box>
        </Stack>
        <ul>
          <h4>Tickets</h4>
          <li>Databse View Details</li>
          <li>Import from Database to Calculator</li>
          <li>Rent Detail Breakdown</li>
          <li>Loan Options : Standard, Exact Payment</li>
          <li>Custom Increments</li>
          <li>What if Machine</li>
          <li>Save Button feedback</li>
          <li>Database Hosting</li>
          <li></li>
          <li></li>
        </ul>
    </Box>
  );
}

function UnitView(Units, RentArray, TotalRent) {
  const data = [];
  var label = "";
  for (let i=0; i<Units.val; i++){
    label = "Unit "+(Number(i)+1);
    data.push(<Stack key={i} direction={"row"} spacing={2} useFlexGap alignItems={"Center"}>
                <Typography minWidth={120}>{label}</Typography>
                <Box width={"100%"}>
                  <TextField
                    fullWidth
                    label={label}
                    color="primary"
                    variant="outlined"
                    type="Number"
                    placeholder={"0"}
                    value={(Math.round((RentArray.val[i])*100)/100).toString()}
                    onChange={(e) => RentArray.Changed(e, i)}
                    InputProps={ad('$')}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                  />
                </Box>
              </Stack>)
  }
  
  data.push(<NumberRow key={"Total"} label="Total Rent" obj={TotalRent}/>)
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

function NumberRow(props) {
  var label, value, onChange, adorn, defVal, TextType;
  if ("label" in props) {
    label = props.label;
  } else {
    label = "Empty";
  }
  if ("obj" in props) {
    if ("val" in props.obj && "Changed" in props.obj) {
      value = props.obj.val;
      onChange = props.obj.Changed;
    } else {
      value = 0;
      onChange = () => {
        console.log("Missing onChange Function in " + label);
      };
    }
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
  if ("textType" in props) {
    TextType = toString(props.textType);
  } else {
    TextType = 'number'
  }

  return (
    <>
      <Stack direction={"row"} spacing={2} useFlexGap alignItems={"Center"}>
        <Typography minWidth={120}>{label}</Typography>
        <Box width={"100%"}>
          <TextField
            fullWidth
            label={label}
            color="primary"
            variant="outlined"
            type={TextType}
            placeholder={defVal}
            value={TextType === 'number' ? (Math.round((value)*100)/100).toString() : value.toString()}
            onChange={onChange}
            InputProps={ad(adorn)}
            InputLabelProps={{ shrink: true }}
            size="small"
          />
        </Box>
      </Stack>
    </>
  );
}

function DoubleRowRent(props) {
    var label1, label2, Rent, Units, TotalRent;
    label1 = props.label1;
    label2 = props.label2;
    Rent = props.rent;
    Units = props.units;
    TotalRent = props.totalrent;

    return (
      <>
        <Stack direction={"row"} spacing={2} useFlexGap alignItems={"center"}>
          <Typography minWidth={120}>Rent</Typography>
          <Box width={"100%"} display={"flex"}>
            <Box width={"50%"}>
              <TextField
                fullWidth
                label={label1}
                color="primary"
                variant="outlined"
                type="number"
                placeholder={"100000"}
                value={TotalRent.val.toString()}
                onChange={TotalRent.Changed}
                InputProps={ad("$")}
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
                value={Rent.val.toString()}
                onChange={Rent.Changed}
                InputProps={ad("$")}
                InputLabelProps={{ shrink: true }}
                size="small"
              />
            </Box>
          </Box>
        </Stack>
      </>
    );
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

function DoubleRow(props) {
  var label, value, onChange, adorn, defVal, pctValue, pctChange;
  if ("label" in props) {
    label = props.label;
  } else {
    label = "Empty";
  }
  if ("obj" in props) {
    if ("val" in props.obj && "Changed" in props.obj) {
      value = props.obj.val;
      onChange = props.obj.Changed;
    } else {
      value = 0;
      onChange = () => {
        console.log("Missing onChange Function in " + label);
      };
    }
  }
  if ("obj" in props) {
    if ("valPercent" in props.obj && "ChangedPercent" in props.obj) {
      pctValue = props.obj.valPercent;
      pctChange = props.obj.ChangedPercent;
    } else {
      pctValue = 0;
      pctChange = () => {
        console.log("Missing pctChange Function in " + label);
      };
    }
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

  return (
    <>
      <Stack direction={"row"} spacing={2} useFlexGap alignItems={"center"}>
        <Typography minWidth={120}>{label}</Typography>
        <Box width={"100%"} display={"flex"}>
          <Box width={"50%"}>
            <TextField
              fullWidth
              label={label}
              color="primary"
              variant="outlined"
              type="number"
              placeholder={"100000"}
              value={(Math.round((value)*100)/100).toString()}
              onChange={onChange}
              InputProps={ad("$")}
              InputLabelProps={{ shrink: true }}
              size="small"
            />
          </Box>
          <Box width={"50%"}>
            <TextField
              fullWidth
              label={label}
              color="primary"
              variant="outlined"
              type="number"
              placeholder={"20"}
              value={pctValue.toString()}
              onChange={pctChange}
              InputProps={ad("%")}
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
