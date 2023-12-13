
# Backend Materiais API
![Badge em Desenvolvimento](https://img.shields.io/badge/Status-Development-yellow)

## Description
This project is a simple API, builded in NodeJs, to serve a [React  aplication](https://github.com/brunoaffonso/dashboardDae_materialUI). This API just receive requests, consult database and show results (response) in JSON format.

## Installation
Building and running the project in your local dev environment is very easy. Be sure you have [Git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/) installed, then follow the directions below.

1. Clone the source code.
	`git clone https://github.com/brunoaffonso/backend_materiaisAPI.git`
	
2. Install development dependencies.
	`yarn install` or `npm install`
	
3. Configure MySql in [dbAccess_copy.js](https://github.com/brunoaffonso/backend_materiaisAPI/blob/master/dbAccess_copy.js)

4. Rename **dbAccess_copy.js** to **dbAccess.js**

5. Run a local development server.
	`node index.js`

## MySql
To create database, follow the commands in [create_database](https://github.com/brunoaffonso/backend_materiaisAPI/blob/master/create_database "create_database")

## MySql in docker (optional)
### Create container MySql docker 

Installing Docker ([source](https://docs.docker.com/engine/install/ubuntu/)):

`sudo apt-get update`
```
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```
```
sudo echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```
`sudo apt-get update`

`sudo apt-get install docker-ce docker-ce-cli containerd.io`
```
docker run -p 3306:3306 --name backend-api-mysql -v containervolume:/container -e MYSQL_ROOT_PASSWORD=[PASSWORD] -e MYSQL_DATABASE=db_materiais -d mysql:latest
```
`docker container exec -it backend-api-mysql bash`

`mysql -u root -p`

After creating the container, follow the commands to create the database structure.

## Deploy
To deploy using a Ubuntu server:
1. gen ssh keys to access by ssh
2. Install NodeJs
3. Install Yarn
4. Configure Iptables

### Create SSH keys to connect on Server
```
ssh-keygen -t rsa -f ~/.ssh/KEY_FILENAME -C USER -b 2048
```
KEY_FILENAME = file name
USER = username

Now open the created .pub file and copy the key to GCP.

After that, on the terminal screen type:
```
ssh server_ip
```

### [Installing NodeJS](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04-pt)


###  [Installing Yarn](https://linuxhint.com/install_yarn_ubuntu/)

###  [Setup App NodeJS Deploy](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04-pt)

###  [Deploy Oracle Cloud Infrastructure (Optional)](https://docs.oracle.com/en-us/iaas/developer-tutorials/tutorials/node-on-ol/01oci-ol-node-summary.htm)

### Iptables rule
`sudo iptables -I INPUT 1 -p tcp --dport 3001 -j ACCEPT`

`sudo iptables-save > /etc/sysconfig/iptables`

## Project pendences
- `user table`: Create user table in database and create their endpoints
- `authentication`: Implement JWT authentication

## Technologies
<div>
<a href="https://reactjs.org/" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="androidStudio" width="50" height="50"/></a>
<a href="https://reactjs.org/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg" alt="androidStudio" width="100" height="50"/></a>
</div>

## License
![Badge em Desenvolvimento](https://img.shields.io/badge/Licence-MIT-green)

**Project developed for learning purposes.**
