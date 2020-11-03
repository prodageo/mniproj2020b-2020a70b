---
consigne: http://prodageo.insa-rouen.fr/casimono/sujetprojmd/consignes.html
---
# Monographie - Système de cache et un peu de garbage collection

## Cartouche

 - Code du sujet : 70B
 - Code de l'alliance : 2020A70B 
 - Liste des équipes
   - E09 - {Nom équipe 1 _(if any)_}
     - Beaugeard, Aurélie (abeaugeard)
     - Campbell, Dylan (d-campbell)
     - Fajardo Luis, Lucia (luciaFajardo)
  
## Partie A

### A0 : Introduction

L'objectif de ce projet est de gérer les problèmes liés à l'affichage d'une *hero image* chez une centaine de visiteur simultanément. Il faudra donc exploiter les systèmes de caches et garbage collections. Le cas d'utilisation est le suivant :

"Un web container (au sens Java EE), qu’on appelera **CacheMesHeros**, publie une page d’accueil avec une [hero image](https://envato.com/blog/hero-image-trend-in-web-design/) (de l’ordre de 50 mb). L’image est prise aléatoirement dans un pool de 5 images. Cette image est affichée par une centaine de visiteur simultanémet. On pourra initialiser l’application CacheMesHeros en simplifiant le projet Github suivant : [image-resize-servlet](https://github.com/soulgalore/image-resize-servlet). On peut trouver des images de plusieurs 10aines de Mo sur [WikiPedia](https://stackoverflow.com/questions/33159586/i-need-a-100-mb-test-image) ou simuler une image avec la commande `fallocate -l Image_Size_Here /path/to/image.img`."

Il faudra minimiser la configuration de la machine nécessaire et éventuellement d’optimiser le temps de traitement. On utilisera des techniques de cache pour optimiser le chargement des ressources en mémoire.

### A1. Glossaire et Mots-clés.


1. Caches
2. Ramasse-miettes
3. Servlet
4. Hero image
5. Optimisation
6. Mémoire
7. Pattern
8. Database
9. Disque 
10. Chargement


### A2. Webographie

1. [Oracle In-Memory Database Cache Concepts](https://docs.oracle.com/cd/E13085_01/timesten.1121/e13073/concepts.htm#TTCAC117)
2. [Apache Ignite In-Memory Database](https://ignite.apache.org/use-cases/in-memory-database.html)
3.

### A3. Bibliographie

1. (nom + section)
2.
3.

### A4. Acteurs

1.

**Présentation de l'entreprise** :

Google, LLC est une entreprise technologique multinationale américaine spécialisée dans les services et produits liés à Internet, qui comprend des technologies de publicité en ligne, un moteur de recherche, l'informatique en cloud, des logiciels et du matériel. Elle est considérée comme l'une des cinq grandes entreprises technologiques de l'industrie américaine des technologies de l'information, aux côtés d'Amazon, de Facebook, d'Apple et de Microsoft. Google a été fondé en septembre 1998 par Larry Page et Sergey Brin alors qu'ils étaient doctorants à l'université de Stanford en Californie. Google offre des services conçus pour le travail et la productivité (Google Docs, Google Sheets, and Google Slides), le courrier électronique (Gmail), la planification et la gestion du temps (Google Calendar), le stockage dans le cloud (Google Drive), la messagerie instantanée et le chat vidéo (Duo, Hangouts, Chat, and Meet), la traduction des langues (Google Translate), la cartographie et la navigation (Google Maps, Waze, Google Earth, and Street View), l'hébergement de podcasts (Google Podcasts), le partage de vidéos (YouTube), la publication de blogs (Blogger), la prise de notes (Google Keep and Google Jamboard), ainsi que l'organisation et l'édition de photos (Google Photos).

2. 

Oracle Corporation,  entreprise américaine de technologie informatique créée en 1977, est reconnue pour ses systèmes de gestion de base de données. Elle publia en 2014 un livret blanc sur son nouveau système de bases de données en mémoire, "Oracle Database In-Memory". Avec Oracle Database In-Memory, une seule base de données peut désormais prendre en charge efficacement des charges de travail mixtes, offrant ainsi des performances optimales pour les transactions tout en prenant en charge simultanément l'analyse et le reporting en temps réel. Cela est possible grâce à son architecture "dual-format" qui permet de conserver les données à la fois dans le format de ligne Oracle existant, pour les opérations OLTP, et dans un nouveau format de colonne purement en mémoire, optimisé pour le traitement analytique. Cela dit, il n'est plus nécessaire que toutes les données soient stockées dans la mémoire, mais seulement les "tables" ou partitions sensibles aux performances. Oracle Database In-Memory permet également aux "data marts" et aux "data warehouses" de fournir davantage d'analyses ad hoc, donnant aux utilisateurs finaux la possibilité d'exécuter plusieurs requêtes orientées métier dans le même temps qu'il fallait auparavant pour exécuter une seule requête. 

3.

### A5. Facteurs qualité

1. Efficacité de stockage
2. 
3.

### A6. Indicateurs qualité

1. Capacité fonctionnelle
2. Fiabilité

1. Efficacité
2.
3.

### A7. Références théoriques

## Partie B

### B1. Approche technique

### B2. Solutions technologiques concurrentes

### B3. Solutions retenues

### B4. Liste de métriques

### B5. Découpage (WBS) pour réalisation des prototypes

## Partie C

### C1. Architecture solution W

### C2. Architecture solution X

### C3. Architecture solution Y

### C4. Architecture solution Z
