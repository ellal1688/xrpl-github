import './App.css';
import React from 'react';
import { ChakraProvider } from "@chakra-ui/react";

// import {userState} from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { Provider } from "./components/ui/provider"
import { Card, Stack, Button,  Spacer, Container, Text } from "@chakra-ui/react"
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

// function Header() {
//   return (
//     <Box bg="blue.500" color="white" w="100%" >
//       <Flex align="center">
//         <Heading size="md">My App</Heading>
//         <Spacer />
//         <Button variant="ghost" colorScheme="whiteAlpha" mr={4}>
//           Home
//         </Button>
//         <Button variant="ghost" colorScheme="whiteAlpha" mr={4}>
//           About
//         </Button>
//         <Button variant="ghost" colorScheme="whiteAlpha">
//           Contact
//         </Button>
//       </Flex>
//     </Box>
//   );
// }
const xrpl = require("xrpl")



function TaskCard({title, description, repo, status, bounty }) {
  return (
    <Card.Root width="320px" variant={"elevated"} key={"elevated"}>
      <Card.Body gap="2">
        {/* <Avatar
          src="https://picsum.photos/200/300"
          name="Nue Camp"
          size="lg"
          shape="rounded"
        /> */}
        <Card.Title mb="2">{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
        <Text>{bounty}</Text>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button variant="outline">View</Button>
        <Button>Join</Button>
      </Card.Footer>
    </Card.Root>
  )
}


function Taskboard() {
  const issues = [
    {title: 'Issue 1', description: "descr 1", repo:"testrepo", status:"open", bounty:"10"},
    {title: 'Issue 2', description: "descr 2", repo:"testrepo", status:"open", bounty:"10"},
    {title: 'Issue 3', description: "descr 3", repo:"testrepo", status:"open", bounty:"10"},
  
  ];

  return (
    <Provider>

      <Box p={4}>
        <Heading>Taskboard</Heading>
        <Flex>
          <Stack spacing={4} w="75%">
            {/* <Box bg="gray.200" p={4}>To Do</Box> */}
            {issues.map((issue, index) => (
              <TaskCard 
                key={index} 
                title={issue.title} 
                description={issue.description} 
                repo={issue.repo}
                status={issue.status}
                bounty={issue.bounty}
              />
            ))}
          </Stack>
        </Flex>
      </Box>
    </Provider>

  );
}


// export default Taskboard;

async function App() {
  // Define the network client
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
  await client.connect()

  // create wallet instance and generate keys
  const test_wallet = xrpl.Wallet.generate()
  

 
  return (
    <Provider>
    <div className="App">
      <header className="App-header">
        <Text>Welcome, Ella</Text>
        <Taskboard/>
      </header>
    </div>
    </Provider>
  );
   
  // Disconnect when done (If you omit this, Node.js won't end the process)
  await client.disconnect()
}

export default App;
