// WalletContext.js
import React, { createContext, useContext, useState } from 'react';


const IssueContext = createContext();

export function IssueProvider({ children }) {
   const [openIssues, setOpenIssues] = useState([
    {title: 'Issue 1', description: "descr 1", repo:"testrepo", status:"open", bounty:"10"},
    {title: 'Issue 2', description: "descr 2", repo:"testrepo", status:"open", bounty:"20"},
    {title: 'Issue 3', description: "descr 3", repo:"testrepo", status:"open", bounty:"30"},
  ]);
 
  const [closedIssues, setClosedIssues] = useState([]);

    // return the issues in context
    return (
        <IssueContext.Provider value={{openIssues, setOpenIssues, closedIssues, setClosedIssues}}>
        {children}
        </IssueContext.Provider>
  );
  }

// Custom hook to use the wallet context
export function useIssues() {
    const context = useContext(IssueContext);
    if (!context) {
      throw new Error("useIssues must be used within an IssueProvider");
    }
    return context;
}
