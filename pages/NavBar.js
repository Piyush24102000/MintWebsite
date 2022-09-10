import React from "react";
import Image from 'next/image'

import { Box, Button, Flex, Link, Spacer } from "@chakra-ui/react";
import facebook from "./social-media-icons/facebook.png";
import twitter from "./social-media-icons/twitter.png";
import email from "./social-media-icons/email.png";

export default function NavBar({ accounts, setAccounts }) {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if (window.ethereum) {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setAccounts(accounts);
        }
    }
    return (
        <Flex justify="space-between" align="center" padding="30px">
            <Flex justify="space-around" width="40%" padding="0 75px">
                <Image src={facebook} boxSize="42px" margin="0 15px" />
                <Image src={twitter} boxSize="42px" margin="0 15px" />
                <Image src={email} boxSize="42px" margin="0 15px" />

            </Flex>
            <Flex justify="space-around" align="center" width="40%" padding="30px">
                <Box margin="0 15px">About</Box>
                <Spacer />
                <Box margin="0 15px">Mint</Box>
                <Spacer />
                <Box margin="0 15px">Team</Box>
                <Spacer />
                {isConnected ? (<Box margin="0 15px">Connected</Box>) : (<Button
                    backgroundColor="#D6517D"
                    borderRadius="5px"
                    boxShadow="0px 2px 2px 1px #0F0F0F"
                    color="white"
                    cursor="pointer"
                    fontFamily="inherit"
                    padding="15px"
                    margin="0 15px"
                    onClick={connectAccount}>
                        Connect
                        </Button>)}

            </Flex>

        </Flex>
    )
} 
