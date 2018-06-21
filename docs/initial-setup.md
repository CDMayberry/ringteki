# New Developers Guide
This guide is intended to help with the initial setup, specifically for developers not familiar with Git. You will need a Github account.

## Fork and Clone

First off, you'll want to fork the main repo: https://github.com/gryffon/ringteki, click fork in the upper right corner.
![Imgur](https://i.imgur.com/Cf02DSI.png)

You should now have a copy of the repo under your account, similar to this: 
`https://github.com/<your-username>/ringteki`

At this point you need to install all of the [required software](https://github.com/gryffon/ringteki#required-software). Create a new folder anywhere then open a command prompt in the folder and clone your fork.

`
git clone https://github.com/<your-username>/ringteki.git
`

## Setup Project
From here you need to run the commands per the readme under required software.

Whenever you want to test a card yourself, you need to start the server, the gamenode, and have MongoDB running.
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
 2. Creates and switches to the new branch, based off develop
 3. Sends your new branch to your fork on Github

 * NOTE: The 'card/' isn't necessary in 'card/the-path-of-man', this is just a way of organizing branches.

We have a doc for implementing new cards: https://github.com/gryffon/ringteki/blob/master/docs/implementing-cards.md 

In some cases a new card has similiar function to a pre-existing card. If so it's usually best to use that card as a basis for the new card. Always check for any similiar cards, it can speed up the process immensely.

That should have you setup and able to start writing code, I'll update this later when I have more time about commiting, pull-requests, etc.
