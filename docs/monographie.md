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
9.
10.


### A2. Webographie

1. [Oracle In-Memory Database Cache Concepts](https://docs.oracle.com/cd/E13085_01/timesten.1121/e13073/concepts.htm#TTCAC117)
2. [Apache Ignite In-Memory Database](https://ignite.apache.org/use-cases/in-memory-database.html)
3.

### A3. Bibliographie

1. (nom + section)
2.
3.

### A4. Acteurs

1. (Organisation + 10 lignes description + contribution à la technique étudiée)
2. Oracle Corporation,  
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
