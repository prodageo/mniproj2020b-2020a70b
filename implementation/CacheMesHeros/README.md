
# CacheMesHeros

## Installer tous les modules

`npm i`

## Vérifier la syntaxe

`npm run lint`

## Vérifier et corriger la syntaxe automatiquement

`npm run lint:fix`

## Lancer le service

Il ne faut pas oublier de lancer le serveur redis grâce à cette commande :

`redis-server`

De même pour mongodb s'il n'est pas lancé (pour vérifier il faut taper `sudo systemctl status mongod` dans le terminal) au démarrage de la machine :

`sudo systemctl start mongod`

### En mode développement

`npm run start:dev`

### En mode production 

`npm run start`

