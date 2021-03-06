
# CacheMesHeros

Cette application a été programmée à l'aide de :

* Node.js
* Express.js
* Redis
* MongoDB

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

Si macOS : `brew services start mongodb-community@4.4` 

## Vider le cache

`redis-cli flushall`

### En mode développement

`npm run start:dev`

### En mode production 

`npm run start`

## Accéder au site

Il faut :
1. Ouvrir votre navigateur préféré
2. Taper http://localhost:3000/api/cachemesheros/ comme url

## Tuto MongoDB

Pour consulter notre base de données :

`use myHeroImages`

Pour voir la liste des collections disponibles :

`show collections`

Pour supprimer notre collection après s'être placée dans la db **myHeroImage**:

`db.heroImg.drop()`
