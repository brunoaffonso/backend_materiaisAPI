# Backend Materiais API

## Criar chaves SSH para conectar na instancia GCP

```console
ssh-keygen -t rsa -f ~/.ssh/KEY_FILENAME -C USER -b 2048
```

onde:
KEY_FILENAME = nome do arquivo
USER = nome do usuário

Agora abra o arquivo .pub criado e copie a chave para o GCP.

Feito isso, na tela do terminal digite:

```console
ssh ip_do_servidor
```

## Instalação do NodeJS

Fonte: https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04-pt

### Instalação do Yarn

Fonte: https://linuxhint.com/install_yarn_ubuntu/

### Setup App NodeJS Deploy

https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04-pt

### Deploy OCI

https://docs.oracle.com/en-us/iaas/developer-tutorials/tutorials/node-on-ol/01oci-ol-node-summary.htm

### Iptables rule

```console
sudo iptables -I INPUT 1 -p tcp --dport 3001 -j ACCEPT
sudo iptables-save > /etc/sysconfig/iptables
```

### Criar container docker do MySql

Instalando o Docker:
Fonte: https://docs.docker.com/engine/install/ubuntu/

```console
sudo apt-get update
```

```console
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

```console
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

```console
sudo echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

```console
sudo apt-get update
 $ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

```console
docker run -p 3306:3306 --name backend-api-mysql -v containervolume:/container -e MYSQL_ROOT_PASSWORD=pikiEP8mTXuraxHS -e MYSQL_DATABASE=db_materiais -d mysql:latest
```

```console
docker container exec -it backend-api-mysql bash
```

```console
mysql -u root -p
```
