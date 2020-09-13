### To get started

1. `yarn init -y`
2. `yarn add express body-parser mongodb mongoose nodemon`
3. `touch index.js`
4. `mongod`
5. `yarn start`
6. write your code

# Deploying database to Mongodb Cloud

1. Visit https://cloud.mongodb.com/ and sign up, choose "FREE"
2. Cloud Provider & Region, choose AWS (default)
3. Region, choose N. Virginia us-east-1 (default)
4. Cluster Tier, choose M0 Sandbox (default)
5. Cluster Name, name it something relevant to your app
6. Click "Create cluster"
7. Left panel, click "Database Access"
8. Click "Add New Database User"
9. Authentication Method, choose "Password" (default)
10. Password Authentication, username: "admin", password: whatever you want
11. Database User Privileges, choose "Atlas admin"
12. Click "Add User"
13. Left panel, click "Network Access"
14. Click "ALLOW ACCESS FROM ANYWHERE"
15. Click "Confirm"
16. Left panel, click "Clusters"
17. Click "Connect"
18. Click "Connect your application"
19. Copy the url to `index.js` in VSCode and replace the string where we have `mongoose.connect('mongodb://localhost:27017/something')`, the <password> is what you decided in step 10, the <dbname> you're making it up right now, name it something relevant
20. Save file then git add, git commit, and git push this change

# Deploying api to Heroku

1. Visit https://heroku.com and sign up
2. Click "New" then "Create new app"
3. Give it a name then click "Create app"
4. Click "Github Connect to Github"
5. Search for a repository to connect to, type the repo and click "Search"
6. Click "Connect"
7. Click "Enable Automatic Deploys"
8. In VSCode, change `index.js` where `app.listen(3001` to `app.listen(process.env.PORT || 3001`
9. Save file then git add, git commit, and git push this change
10. Visit your app i.e. https://tracking-system-api.herokuapp.com/api/v1/users (notice the `/api/v1/`), should see an empty array until you put some data into your database that's hosted on mongodb. If you see "Application error" that's not good. Repeat the steps or ask for help.

# Deploying frontend to Netlify

While you can deploy your frontend to Heroku, I strongly recommend Netlify to work around Heroku's free 1000 hour / month limit. Visit https://github.com/robghchen/tracking-system for instructions.
