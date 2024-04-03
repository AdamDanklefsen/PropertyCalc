import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


//import './TableView.css'




export default function TableView(props) {
    const data = props["data"]["Elements"];
    return (
        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
            <TableHead>
            <TableRow>
                <TableCell />
                <TableCell>Address</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Listing Price</TableCell>
                <TableCell>Total Rent</TableCell>
                <TableCell>Beds / Baths</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {data.map((val, key) => (
                <Row key={key} row={val} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

function Row(props) {
    console.log(props);
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
            >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
                {row.hasOwnProperty('address') ?
                row.address :
                row.number + " " + row.street + " " + row.suf
            }
            </TableCell>
            <TableCell>
                {row.Units === 1
                ? "Single Family"
                : row.Units + "-Plex"
                }
            </TableCell>
            <TableCell>
                {row.ListPrice.toLocaleString("en-US", {style:"currency", currency:"USD"})}
            </TableCell>
            <TableCell>
                {row.TotalRent.toLocaleString("en-US", {style:"currency", currency:"USD"})}
            </TableCell>
            <TableCell>
                {row.Beds + " / " + row.Baths}
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box
                display={"flex"}
                flexDirection={'row'}
                >
                    <Stack>
                        <Box sx={{ margin: 1 }}>
                        Cashflow: {row.CashFlow.toLocaleString("en-US", {style:"currency", currency:"USD"})}
                        </Box>
                        <Box sx={{ margin: 1 }}>
                        Net Operating Income: {row.NOI.toLocaleString("en-US", {style:"currency", currency:"USD"})}
                        </Box>
                        <Box sx={{ margin: 1 }}>
                        CapRate: {Math.round(10000*row.CapRate)/100 + "%"}
                        </Box>
                    </Stack>
                    <Stack>
                        <Box sx={{ margin: 1 }}>
                        Loan Payment: {row.LoanPmt.toLocaleString("en-US", {style:"currency", currency:"USD"})}
                        </Box>
                        <Box sx={{ margin: 1 }}>
                        Property Taxes: {(row.pTaxes/12).toLocaleString("en-US", {style:"currency", currency:"USD"})}
                        </Box>
                        <Box sx={{ margin: 1 }}>
                        Insurance: {row.Insurance.toLocaleString("en-US", {style:"currency", currency:"USD"})}
                        </Box>
                        <Box sx={{ margin: 1 }}>
                        Mortgage Insurance: {(row.MortgageInsurance/12).toLocaleString("en-US", {style:"currency", currency:"USD"})}
                        </Box>
                        <Box sx={{ margin: 1 }}>
                        Mortgage Payment: {row.MortgagePmt.toLocaleString("en-US", {style:"currency", currency:"USD"})}
                        </Box>
                    </Stack>
                </Box>
            </Collapse>
            </TableCell>
        </TableRow>
        </React.Fragment>
    );
}