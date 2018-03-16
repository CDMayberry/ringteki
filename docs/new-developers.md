# New Developers Guide
This guide is intended to help with the initial setup, specifically for developers not familiar with Git.

## Fork and Clone

First off, you'll want to fork the main repo: https://github.com/gryffon/ringteki (upper right corner, click 'Fork')

You should now have a copy of the repo under your account, similar to this: 
`https://github.com/<your-username>/ringteki`

If you don't have git installed, [then do so](https://git-scm.com/downloads), then create a folder somewhere and clone the repo.

`
git clone https://github.com/<your-username>/ringteki.git
`

## Setup Project
From here you need to ensure you have the required software and run the commands per the README, https://github.com/gryffon/ringteki#required-software

Whenever you want to test, you need to start the server and the gamenode (I also need to have MongoDB turn on, I have a powershell script to do it all for me)
```
node .
node server/gamenode
```
## Create Card Branch
Now, when working on cards its best to have each card in it's own branch. The following only needs to be done when you first setup each branch.
```
// 1
git checkout develop
// 2
git checkout -b card/the-path-of-man
// 3
git push --set-upstream origin card/the-path-of-man
```
This does the following:
 1. Switches your active branch to develop
 2. Creates and switches to the new branch
 3. Sets up the branch in github

 * NOTE: The 'card/' isn't necessary in 'card/the-path-of-man', but github (and I assume other sites) recognize the 'card/' and will group them together akin to a folder. It might also do more, but thats all I know for sure.

We have a doc for implementing cards, tho it might be a little out of date atm, https://github.com/gryffon/ringteki/blob/master/docs/implementing-cards.md 

Usually though, you can find a card that does something similar and use that as a basis for yours.

That should have you setup and able to start writing code, I'll update this later when I have more time about commiting, pull-requests, etc.

