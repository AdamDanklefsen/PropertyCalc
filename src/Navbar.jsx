import * as React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

export default function Navbar(props) {

    return (
        <div id='NavBar'>
            <Box>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Button href="/" variant='text'>Home</Button>
                <Button href="/db" variant='text'>Database</Button>
                <Button href="/calc" variant='text'>Calculator</Button>
                
            </Stack>
            </Box>
            
        </div>
    );
  }