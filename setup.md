### How to update/set-up on server.

* Commit all to master. "git commit origin master"
* SSH into the aws server using the .ppk file for auth
* Navigate to /apps/el-website/
* Turn off the server by using "forever stopall"
* git pull the latest version from the git repo
* cd client and start with "forever start -c "npm run start" ./"
* cd server and start with "forever start index.js"