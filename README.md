steps to install and run
1) npm install
2) npm run build && npm run start

To debug server code in chrome
1) npm run build
2) npm run debug
3) in browser goto chrome://inspect
4) click on project link, under source tab you will see all server file, now you can add breakpoints and debug

Note: dist folder will be created automatically when you build. Do not make code changes inside dist folder.

steps to connect to mysql:
1) opne your command prompt or terminal
2) mysql -u admin -p --host sl-us-south-1-portal.22.dblayer.com --port 39849 --ssl-ca={project_path}\server\cert\ssl.crt
3) it should ask you password enter below password
          YUNVSJBQKEHIOIQJ
