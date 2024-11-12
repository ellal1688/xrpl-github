import './App.css';
import React from 'react';
import { Client } from 'xrpl';
import {useState} from 'react';
import { Box, Flex, Heading, Input } from '@chakra-ui/react';
import { Provider } from "./components/ui/provider"
import { ChakraProvider } from "@chakra-ui/react";
import { Wallet } from 'xrpl';
import { Grid } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";

import { Card, Stack, Button,  Spacer, Container, Text } from "@chakra-ui/react"
import { WalletProvider } from './WalletContext';
import { useWallet } from './WalletContext';
import { IssueProvider, useIssues } from './IssueContext';
import { useEffect } from 'react';
// import { Avatar } from "./components/ui/avatar"
// export keyword makes function global
// default means main
// react components (functions) return one js element -
// if you want multiple put them in fragments
// to call a component: <comp />
// inside divs: <div className='name'> </div>
// can pass args into comps: 
// <square value="4" /> 
// handleclick, onclick in button
// to store state: const[value,setValue] = useState(null);
//
// function handleClick() {
//   setValue('X');
// }
// onclick={handleClick}
// can put state in larger component to handle multiple components

const xrpl = require("xrpl")



function TaskCard({onSend, issueInfo }) {
// function TaskCard({onSend, title, description, repo, status, bounty }) {
  const bounty_text = issueInfo.bounty + " XRP";
  console.log("issue info: ", issueInfo);
  return (
    <Card.Root width="320px" variant={"elevated"} key={"elevated"}>
      <Card.Body gap="2">
        {/* <Avatar
          src="https://picsum.photos/200/300"
          name="Nue Camp"
          size="lg"
          shape="rounded"
        /> */}
         <Grid templateColumns="67% 33% 1fr" gap={4} p={4}>
          <div>
            <Card.Title mb="2">{issueInfo.title}</Card.Title>
            <Card.Description>{issueInfo.description}</Card.Description>
          </div>
          <Text>{bounty_text}</Text>

        </Grid>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button variant="outline">View</Button>
        <Button colorScheme="blue" onClick={() => onSend(issueInfo, issueInfo.bounty)}>Close</Button>
      </Card.Footer>
    </Card.Root>
  )
}


function Taskboard({onSend, issues, boardTitle}) {
  return (
    <Provider>

      <Box p={4}>
        <Heading>{boardTitle}</Heading>
        <Flex>
          <Stack spacing={4} w="75%">
            {/* <Box bg="gray.200" p={4}>To Do</Box> */}
            {issues.map((issue, index) => (
              <TaskCard 
                key={index} 
                onSend={onSend}
                issueInfo = {issue}
                // title={issue.title} 
                // description={issue.description} 
                // repo={issue.repo}
                // status={issue.status}
                // bounty={issue.bounty}
              />
            ))}
          </Stack>
        </Flex>
      </Box>
    </Provider>

  );
}
function WalletDisplay({walletBalance}){
  // THIS ONLY WORKS SOMETIMES...
  console.log("user wallet ", walletBalance);
  const [balance, setBalance] = useState(null);

  
  // useEffect(() => {
  //   const fetchBalance = async () => {
  //     if (!userWallet || !userWallet.address) {
  //       return; // If the userWallet is not yet set, don't fetch balance
  //     }
  //     try {
  //       const client = new Client("wss://s.altnet.rippletest.net:51233");
  //       await client.connect();
  //       const balances = await client.getBalances(userWallet.address);
  //       setBalance(balances[0]?.value);  // Assuming the first balance is the one you want
  //       await client.disconnect();
  //     } catch (error) {
  //       console.error("Error fetching balance:", error);
  //     }
  //   };
  //   fetchBalance();
  // }, []); 



  return (
    <div>
    <Heading>"My Wallet"</Heading>
    <Card.Root width="320px" variant={"outline"} key={"outline"}>
      <Card.Body gap="2">
        {/* <Avatar
          src="https://picsum.photos/200/300"
          name="Nue Camp"
          size="lg"
          shape="rounded"
        /> */}
         {walletBalance} XRP
      </Card.Body>
      {/* <Card.Footer justifyContent="flex-end">
        <Button variant="outline">View</Button>
        <Button colorScheme="blue" onClick={() => onSend(issueInfo, issueInfo.bounty)}>Close</Button>
      </Card.Footer> */}
    </Card.Root>
    </div>
  )
}
function AccountDisplay({walletBalance}){
  console.log("walletdsiply ", {walletBalance});

  return (
    <Provider>
      <Box p={4}>
        {/* <Heading>{}</Heading> */}
        <Flex>
          <Stack spacing={4} w="75%">
            <WalletDisplay walletBalance={walletBalance}/>
          </Stack>
        </Flex>
      </Box>
    </Provider>
  );
}

function App() {
   // set up source wallet
   // create state var destinationAddress - value of dest wallet 
   // init as ''
   const SOURCE_SEED = "sEdVND7M6aDSV3xbNpYUzrWYtm1Mbo6"; // rUvc2W7pr6aNK2bfncmntdidfkXYAfFNR1
  const USER_SEED = 'sEdTr8wYNvu2bKkUY8WRFpyenQUTSNy';  //rEuHyqbdAJfvsbzRLkD9aHDZPMyNJM83H2

   const { sourceWallet, setSourceWallet, userWallet, setUserWallet } = useWallet();
   const {openIssues, setOpenIssues, closedIssues, setClosedIssues} = useIssues();
   const [transactionStatus, setTransactionStatus] = useState('');
   const [sending, setSending] = useState(false);
  const [walletBalance, setWalletBalance] = useState(null);

  useEffect(() => {
    
    try {
      setSourceWallet(Wallet.fromSeed(SOURCE_SEED));
      setUserWallet(Wallet.fromSeed(USER_SEED));
    } catch (error) {
      console.error("Error setting wallets:", error);
    }
  }, [setSourceWallet, setUserWallet]);

  console.log("source, user:  ", sourceWallet,userWallet);

  
  useEffect(() => {
    const fetchBalance = async () => {
      if (!userWallet || !userWallet.address) {
        return; // If the userWallet is not yet set, don't fetch balance
      }
      try {
        const client = new Client("wss://s.altnet.rippletest.net:51233");
        await client.connect();
        const balances = await client.getBalances(userWallet.address);
        setWalletBalance(balances[0]?.value);  // Assuming the first balance is the one you want
        await client.disconnect();
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };
    fetchBalance();
  }, []); 

  async function sendPayment(amount){
    console.log("sp amount", amount); // UNDEFINED
    // setSourceWallet(Wallet.fromSeed(SOURCE_SEED));
    // setUserWallet(Wallet.fromSeed(USER_SEED));

    setSending(true);
    setTransactionStatus('Sending XRP...');
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");

    // SOURCE AND USER ARE BOTH NULL, ISSUE IS UNDEFINED
    try {
      // Connect to the XRP Ledger
      await client.connect();
      // Create a payment transaction
      const prepared =  await client.autofill({
          TransactionType: "Payment",
          Account: sourceWallet.address, // Sender's address
          Destination: userWallet.address, // Receiver's address
          Amount: amount, // Amount to send in drops
      });

      const signed = sourceWallet.sign(prepared)
      console.log("Identifying hash:", signed.hash)
      console.log("Signed blob:", signed.tx_blob)
 // WALLET BALANCE ONLY SET WHEN SEND PAYMENT
      const tx = await client.submitAndWait(signed.tx_blob)
      // Check transaction results -------------------------------------------------
      const balances = await client.getBalances(userWallet.address);
      console.log("Transaction result:", tx.result.meta.TransactionResult)
      console.log("Balance changes:", JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))
      balances.forEach((balance) => {
        setWalletBalance(balance.value)
        console.log(`Currency: ${balance.currency}`);
        console.log(`Value: ${balance.value}`);
        console.log(`Issuer: ${balance.issuer}`);
        console.log('---');
      });
      // setUserWallet(userWallet);
    } catch (error) {
        console.error("Error sending payment: ", error);
    } finally {
        // Close the client connection
        await client.disconnect();
    }

  }

  function closeIssue(issue, bounty){
    // const {openIssues, setOpenIssues, closedIssues, setClosedIssues} = useIssues();
      // sends payment
      sendPayment(bounty);
      console.log("bounty: ", bounty);
      console.log("issue: ", issue);

      setOpenIssues(openIssues.filter(item => item !== issue));
      setClosedIssues([...closedIssues, issue]);
  
  }
 

    return (
      <Provider>
        <WalletProvider>
        <IssueProvider>
        <div className="App">
          <header className="App-header">
            <Text>Issue XRP</Text>
            <Text>receive XRP for closing open-source Github issues</Text>
            <SimpleGrid columns={3} spacing={4} p={4}>
            
              <Taskboard onSend={closeIssue} issues={openIssues} boardTitle="Your Issues"/>
              <Taskboard onSend={closeIssue}  issues={closedIssues} boardTitle="Closed Issues"/>
              <AccountDisplay walletBalance={walletBalance}/>
            </SimpleGrid>
            
          </header>
        </div>
        </IssueProvider>
      </WalletProvider>
      </Provider>
    );
  
}

export default App;
