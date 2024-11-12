# Issue XRP

A platform to encourage open-source code contribution by tracking Github Issues. Receive XRP for closing an issue!

In order to run this demo:
1. Install React and Node.js
2. Run the app from the my-app folder using "npm start"

Code Structure - 
Main functionality in App.js. List of open and closed issues stored, with the open issues being initialized upon start from the Github repo specified. User's XRP wallet is displayed also upon start. When users close an issue, a transaction is sent from the source wallet (in this case, a designated address) to the user wallet. The user's transaction processes to update the wallet's display amount. Subroutines are implemented for updating various components, retrieving data, and loading visual elements. 


Inspiration - 
Contributing to open-source code is not only one of the best ways to learn, it also benefits larger communities. It is a personal goal of mine to become involved in an open-source project, and I thought it would be useful to encourage people to get started doing so.

What it Does - 
Takes Open issues from a Github repo and assigns them to your taskboard. Each issue is assigned a monetary bounty. When you close an issue on Github, you can close it on IssueXRP, and it will automatically send the bounty to your wallet. The transaction is counted and your wallet balance is displayed for easy tracking. The bounties are assigned by the user who created the repo and the funds are transferred from their account.

How I built it - 
I built IssueXRP using React, Chakra UI, and the XRPL library.

Challenges - 
Main challenges included the integration of the system with Github. Many nice-to-have features, such as login and Github verification were more difficult to implement that imagined, and other more important features had to be prioritized.

What I learned - 
I mainly learned how blockchain development works, as well as practiced my skills in React development. Before the project, I had minimal experience with blockchain or XRP, but the learning resources allowed me to learn the basics and build a project in a relatively short time. 



