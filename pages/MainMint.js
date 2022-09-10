import { useState } from "react"
import { ethers, BigNumber } from "ethers";
import { abi, address } from "../data";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";

export default function MainMint({ accounts, setAccounts }) {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

  
    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(address, abi, signer);

            try {
                await contract.mint(BigNumber.from(mintAmount), {
                    gasLimit: 100000,
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString())
                });
            } catch (error) {
                console.log(error);
            }
        }
    }
    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    }
    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    }
    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
                <div>
                    <Text fontSize="48px" textShadow="0 5px #000000">Tech Bulls</Text>
                    <Text
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                    >It's 2099, Can the Tech Bulls NFTs save humans from the Bears ? Mint TechBulls to find out !!!!! </Text>
                </div>
                {isConnected ? (<div>
                    <div>
                        <button onClick={handleDecrement}>-</button>
                        <Input
                            readOnly
                            fontFamily="inherit"
                            width="100px"
                            height="40px"
                            textAlign="center"
                            paddingLeft="19px"
                            marginTop="10px"
                            type="number" value={mintAmount} />
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <button onClick={handleMint}>Mint NFTs</button>
                </div>)
                    : (
                        <p>You must be connected to Mint NFTs</p>
                    )
                }
            </Box>
        </Flex>
    )
}
