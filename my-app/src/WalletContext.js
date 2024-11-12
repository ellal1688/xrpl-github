// WalletContext.js
import React, { createContext, useContext, useState } from 'react';
import { Wallet } from 'xrpl';

// Replace this with your actual test wallet seed
// const SOURCE_SEED = "sEdVND7M6aDSV3xbNpYUzrWYtm1Mbo6";
// const USER_SEED = 'sEdTr8wYNvu2bKkUY8WRFpyenQUTSNy';

// useState takes in an initial value and returns an array with currentstate value, function to update state
// cannot be called outside components or in side loops/conditionals 
// Create the context

const WalletContext = createContext();

// Provide the wallet context to components
export function WalletProvider({ children }) {
   // initialize the wallet 
    const [sourceWallet, setSourceWallet] = useState(null);
    const [userWallet, setUserWallet] = useState(null);

    // return the wallet in context
    return (
        <WalletContext.Provider value={{sourceWallet, setSourceWallet , userWallet, setUserWallet}}>
        {children}
        </WalletContext.Provider>
  );
  }

// Custom hook to use the wallet context
export function useWallet() {
    const context = useContext(WalletContext);
    if (!context) {
      throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
}
