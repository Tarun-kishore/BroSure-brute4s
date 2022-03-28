# Integrated-Universities-Portal
Prototype for Smart India Hackathon

# What does it do?
`Integrated University Portal` is a web portal being desinged to get information about different universities and their courses.

# What do I need to run the code on my local machine?
- The backend server is based on `NodeJS`. So you need NodeJS on your local machine (An LTS version is preferred).
- You need `npm package manager`.
- You need `mongoDB` for database.
- At last you need an IDE of your choice.

  All Above softwares can be downloaded easily using any standard package manager. If that's not the case for you, you can download them from their official site.


# How can i run the source code on local machine?
- First clone this repository onto your local machine using your preferred method(Do not download the code but clone it to be able to get latest changes and make contribution).

Then follow the below mentioned steps.

First you need to setup an environment for the server to run (You have to do it only once).
- Create a file named `.env` into the cloned folder.
- Into the file place content :
  SECRET =`Any string to be used as secret string in authentication`
  DATABASE_URL = `mongodb database url in form of mongodb://localhost:27017/dbname`
  
  Every time you pull contents form repository make sure you run `npm install` to install all required modules.
  
 Then every time you run the server, run mongodb shell beforehand using command `mongod`.
 Then run `npm run devstart`
 
 # How can i contribute to repository?
 
 - When you want to push some changes to original code, create a branch in your local repository.
 - Then push to changes in remote repository by creating the branch in  remote repository.
 - After pushing the changes, create a pull request.
 - The pull need at least one approval from someone (other than creator of pull request) to be merged.
 Note: The approving of pull request can be done by any of the contributors, Not neccessarily the creator of repository.
 
 The main branch is be protected from direct push.
 
