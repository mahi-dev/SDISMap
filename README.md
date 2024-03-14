# SDIS ANTENNES
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmahi-dev%2FSDISMap.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmahi-dev%2FSDISMap?ref=badge_shield)


## À propos
"SDIS Antennes" est une application dédiée au recensement des antennes SDIS. Elle offre la possibilité d'ajouter des données via l'upload de fichiers au format `.xls` ou `.xlsx`. Par défaut, l'application est accessible sur le port **8096**.

## Configuration du Port
Pour modifier le port par défaut, ajustez la propriété **server.port** dans le fichier `src/main/resources/application.properties`.

## Récupération du Projet
Pour cloner le projet sur votre serveur, positionnez-vous dans le répertoire désiré et exécutez :

Depuis le terminal votre server à l'endroit ou vous voulez stocker le projet exécuter la commande :

```bash
git clone https://github.com/mahi-dev/SDISMap.git
```

## Mise à Jour du Projet
Pour mettre à jour le projet, utilisez les commandes suivantes :

```bash
cd SDISMap
git pull
```

## Installation de Docker sur Linux
Si Docker n'est pas déjà installé sur votre système, suivez les instructions spécifiques à votre distribution Linux.
### Ubuntu:
```bash
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update
sudo apt install docker-ce
```

### Debian:
```bash
sudo apt update
sudo apt install apt-transport-https ca-certificates curl gnupg2 software-properties-common
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
sudo apt update
sudo apt install docker-ce
```

### CentOS:
```bash
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker-ce docker-ce-cli containerd.io
sudo systemctl start docker
```

### Fedora:
```bash
sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
sudo dnf install docker-ce docker-ce-cli containerd.io
sudo systemctl start docker
```

### ArchLinux:
```bash
sudo pacman -Syu
sudo pacman -S docker
sudo systemctl start docker
```

## Lancement de l'Application
Pour démarrer l'application avec Docker, exécutez :

```bash
docker-compose up -d --force-recreate --build
```

### Vérification de l'État de l'Application
Pour vérifier si l'application s'exécute correctement :

```bash
docker ps
```

### Arrêter l'application

`docker ps`
copier le CONTAINER ID de l'image sdis

`docker stop <id que vous avez copier>` (ne pas mettre les crochets)



## Informations Complémentaires
Une configuration complète du serveur Nginx calqué sur http://sdis-antenne.info est disponible dans `server.config/nginx_config.zip` (protégé par un mot de passe).


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmahi-dev%2FSDISMap.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmahi-dev%2FSDISMap?ref=badge_large)