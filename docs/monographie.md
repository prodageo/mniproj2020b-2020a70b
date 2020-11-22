---
consigne: http://prodageo.insa-rouen.fr/casimono/sujetprojmd/consignes.html
---
# Monographie - Système de cache et un peu de garbage collection

## Cartouche

 - Code du sujet : 70B
 - Code de l'alliance : 2020A70B 
 - Liste des équipes
   - E09 - Cache-cache
     - Beaugeard, Aurélie (abeaugeard)
     - Campbell, Dylan (d-campbell)
     - Fajardo Luis, Lucia (luciaFajardo)
     
  **Tableau de suivi des versions**
  
| Version | Date de modification            | Modification(s) apportée(s) |
|--------|--------------------|---------------|
| 0.0 | 05/11/2020 | Réalisation intégrale de la première version |
| 0.1 | 22/11/2020 | Tableau de suivi des versions + questions d'amorce + séparation Glossaire et mot-clés + définitions dans le Glossaire + suppression du mot-clé *hero image* dans les mots-clés pour remplacement par *Stockage* + qualification de la référence Oracle In-Memory Database Cache Concepts dans la Webographie + justification du facteur "Efficacité de Stockage"+ ajout de la formule de l'indicateur dérivé *Efficacité* + Ajout de 4 approches techniques dans B1. Description de deux d'entre elles|

## Questions d'amorce

 <ins>Définition des termes suivants : </ins>
 
 + **memory reclamation mechanism** :
 
 + **garbage collection** :
 
 + **JEP (dans le monde Java)** : 
 
 + **classe WeakHashMap dans java.util** : Implémentation de l'interface Map de java.util basée sur une table de hachage, avec des clés dites "faibles". Une entrée dans un WeakHashMap sera automatiquement supprimée lorsque sa clé n'est plus utilisée. Plus précisément, la présence d'un mapping pour une clé donnée n'empêchera pas à la clé d'être jetée par le ramasseur d'ordures, c'est-à-dire rendue finalisable, finalisée, puis récupérée. Lorsqu'une clé a été jetée, son entrée est effectivement retirée de la Map, de sorte que cette classe se comporte quelque peu différemment des autres implémentations Map de Java. (définition donnée par la [documentation officielle de Java](https://docs.oracle.com/javase/7/docs/api/java/util/WeakHashMap.html))
 
 + **distributed in-memory data cache** : La "distributed in-memory data cache" ou en français "mise en cache distribuée en mémoire" n'est rien d'autre qu'un cache réparti sur différents nœuds. Il rend les données hautement disponibles pour la ou les applications qui les utilisent. Il s'agit généralement de magasins de clés/valeurs qui prennent en charge les opérations standard put/get ainsi que les capacités de partitionnement, de réplication ou de sauvegarde des données. Par exemple , [Apache](https://ignite.apache.org/use-cases/in-memory-cache.html) propose ce genre de service.

## Partie A

### A0 : Introduction

L'objectif de ce projet est de gérer les problèmes liés à l'affichage d'une *hero image* chez une centaine de visiteur simultanément. Il faudra donc exploiter les systèmes de caches et garbage collections. Le cas d'utilisation est le suivant :

"Un web container (au sens Java EE), qu’on appelera **CacheMesHeros**, publie une page d’accueil avec une [hero image](https://envato.com/blog/hero-image-trend-in-web-design/) (de l’ordre de 50 mb). L’image est prise aléatoirement dans un pool de 5 images. Cette image est affichée par une centaine de visiteur simultanémet. On pourra initialiser l’application CacheMesHeros en simplifiant le projet Github suivant : [image-resize-servlet](https://github.com/soulgalore/image-resize-servlet). On peut trouver des images de plusieurs 10aines de Mo sur [WikiPedia](https://stackoverflow.com/questions/33159586/i-need-a-100-mb-test-image) ou simuler une image avec la commande `fallocate -l Image_Size_Here /path/to/image.img`."

Il faudra minimiser la configuration de la machine nécessaire et éventuellement d’optimiser le temps de traitement. On utilisera des techniques de cache pour optimiser le chargement des ressources en mémoire.

### A1g. Glossaire 

* **Mémoire cache** : "Une mémoire cache ou antémémoire est, en informatique, une mémoire qui enregistre temporairement des copies de données provenant d'une source, afin de diminuer le temps d'un accès ultérieur (en lecture) d'un matériel informatique (en général, un processeur) à ces données." [Wikipédia](https://fr.wikipedia.org/wiki/M%C3%A9moire_cache)

* **Mémoire distribuée** : "La mémoire d'un système informatique multiprocesseur est dite distribuée lorsque la mémoire est répartie en plusieurs nœuds, chaque portion n'étant accessible qu'à certains processeurs. Un réseau de communication relie les différents nœuds, et l'échange de données doit se faire explicitement par *passage de messages*." [Wikipedia](https://fr.wikipedia.org/wiki/M%C3%A9moire_distribu%C3%A9e)

* **Pattern ou Patron de conception** : "En informatique, et plus particulièrement en développement logiciel, un patron de conception (souvent appelé design pattern) est un arrangement caractéristique de modules, reconnu comme bonne pratique en réponse à un problème de conception d'un logiciel." [Wikipedia](https://fr.wikipedia.org/wiki/Patron_de_conception)

* **Servlet** : "Un ou une servlet est une classe Java qui permet de créer dynamiquement des données au sein d'un serveur HTTP. Ces données sont le plus généralement présentées au format HTML, mais elles peuvent également l'être au format XML ou tout autre format destiné aux navigateurs web." [Wikipedia](https://www.google.com/search?client=firefox-b-d&q=servlet)

* **Mémoire Vive (RAM)** : "La mémoire vive, parfois abrégé avec l'acronyme anglais RAM (Random Access Memory), est la mémoire informatique dans laquelle peuvent être enregistrées les informations traitées par un appareil informatique. On écrit mémoire vive par opposition à la mémoire morte." [Wikipedia](https://fr.wikipedia.org/wiki/M%C3%A9moire_vive)

### A1m. Mot-clés

1. Caches
2. Ramasse-miettes
3. Servlet
4. Stockage
5. Optimisation
6. Mémoire
7. Pattern
8. Database
9. Disque 
10. Chargement


### A2. Webographie

1. [Oracle In-Memory Database Cache Concepts](https://docs.oracle.com/cd/E13085_01/timesten.1121/e13073/concepts.htm#TTCAC117) : Explication des concepts fondamentaux du système de cache, présentation des différents type de caches et présentation précise de l'architecture de la base de données cache d'Oracle. (consulté le 22/11/2020)
2. [Apache Ignite In-Memory Database](https://ignite.apache.org/use-cases/in-memory-database.html)
3. [Amazon : What is caching and how it works](https://aws.amazon.com/caching/?nc1=h_ls)//

### A3. Bibliographie

1. **Architecture of Computing Systems - ARCS 2013**, *Hana Kubátová, Christian Hochberger, Martin Daněk, Bernhard Sick (Eds)*, 26th International Conference Prague, Czech Republic, February 2013, Springer

    <ins>Sections d'intérêt</ins>
    
    * A Multi-core Memory Organization for 3-D DRAM as Main Memory, page 62
    * An Application-Aware  Cache  Replacement  Policy  forLast-Level Caches, page 207
    * Shrinking L1 Instruction Caches to Improve Energy–Delay in SMTEmbedded Processors, page 256
 
2. **The cache memory book, cache data and cache tag memories** Handy, Jim. Morgan Kaufmann Publishers In, 2nd edition édition 1998.


3. **Supercomputing systems: architectures, design, and performance**, *Svetlana P. Kartashev, Steven I. Kartashev, Von Nostrand Reinhold, cop.1990*
   
    <ins>Sections d'intérêt</ins>

    * Cache coherence in mind system: Petri net model for minimal state solution.
    * Optimization of hierarchical memory systems for high-speed computers

### A4. Acteurs

1. ***Google***:

Google, LLC est une entreprise technologique multinationale américaine spécialisée dans les services et produits liés à Internet, qui comprend des technologies de publicité en ligne, un moteur de recherche, l'informatique en cloud, des logiciels et du matériel. Elle est considérée comme l'une des cinq grandes entreprises technologiques de l'industrie américaine des technologies de l'information, aux côtés d'Amazon, de Facebook, d'Apple et de Microsoft. Google a été fondé en septembre 1998 par Larry Page et Sergey Brin alors qu'ils étaient doctorants à l'université de Stanford en Californie. Google offre des services conçus pour le travail et la productivité (Google Docs, Google Sheets, and Google Slides) mais également d'autre services comme le courrier électronique (Gmail). 

Google a développé un système de cache appliqué aux images, à présent intégré à Gmail. En effet, lorsqu'une image est mise en cache, elle est téléchargée du serveur d'origine et stockée sur un serveur proxy appartenant à Google. Les images ne sont donc affichées qu'une seule fois sur le serveur d'origine tandis que les vues successives proviendront de l'image mise en cache sur les serveurs proxy de Google. Entre autres, les vues ultérieures de l'image mise en cache s'affichent toujours à partir du serveur proxy plutôt que du serveur d'origine, ce qui a pour effet de réacheminer tous les téléchargements d'images ainsi que les données de suivi associées qui accompagnent le téléchargement de l'image.

2. ***Oracle Corporation***:

Oracle Corporation,  entreprise américaine de technologie informatique créée en 1977, est reconnue pour ses systèmes de gestion de base de données. Elle publia en 2014 un livret blanc sur son nouveau système de bases de données en mémoire, "Oracle Database In-Memory". Avec Oracle Database In-Memory, une seule base de données peut désormais prendre en charge efficacement des charges de travail mixtes, offrant ainsi des performances optimales pour les transactions tout en prenant en charge simultanément l'analyse et le reporting en temps réel. Cela est possible grâce à son architecture "dual-format" qui permet de conserver les données à la fois dans le format de ligne Oracle existant, pour les opérations OLTP, et dans un nouveau format de colonne purement en mémoire, optimisé pour le traitement analytique. Cela dit, il n'est plus nécessaire que toutes les données soient stockées dans la mémoire, mais seulement les "tables" ou partitions sensibles aux performances. Oracle Database In-Memory permet également aux "data marts" et aux "data warehouses" de fournir davantage d'analyses ad hoc, donnant aux utilisateurs finaux la possibilité d'exécuter plusieurs requêtes orientées métier dans le même temps qu'il fallait auparavant pour exécuter une seule requête. 

3. ***Amazon***

Amazon, créée en Juillet 1994, est l'une des GAFAM, et donc l'une des plus puissantes entreprises du monde. Roi de la vente en ligne, l'entreprise doit gérer un montant colossal de commandes, et donc de données, à chaque instant. Amazon est ainsi confronté en permanence a des soucis de mise à l'échelle de son système, et donc, à des problèmes de caching. 

L'entreprise a en 2019 publié un livre blanc présentant son service web ElastiCache. Celui-ci facilite le déploiement, l'utilisation, et la mise à l'échelle d'un cache de données en mémoire dans le cloud, ce qui permet d'améliorer la performances des applications web via une récupération des informations plus rapide. 
Ce système se repose sur le déploiement d'un ou plusieurs clusters de cache. Une fois ceux-ci en place, le service automatise de nombreuses tâches administratives, telles que la gestion des stocks, la détection et la correction d'erreurs ou la mise à jour du software. Le système fournit aussi de nombreuses métriques liées aux noeuds de cache afin de pouvoir diagnostiquer les problèmes rapidement. Il est entre autres possible d'être alerté lorsqu'un cache dépasse sa capacité maximale.
Il est important de noter que ce système n'est pas directement lié à la base de données, ce qui lui octroie une grande flexibilité d'utilisation.

### A5. Facteurs qualité

1. **Efficacité de stockage** : "Propriété d'un logiciel qui minimise la place mémoire nécessaire à une opération." [ProgYSM](https://yansanmo.progysm.com/document/93_logiqualdef.htm). Cette définition suffit à justifier ce choix car notre problématique porte exactement sur la minimisation de la place mémoire nécessaire à une opération.

2. **Efficacité d'exécution** :

3. **Facilité de migration** :

### A6. Indicateurs qualité

**Efficacité de stockage**

<ins>Indicateurs de base</ins>
- Capacité fonctionnelle
- Fiabilité

<ins>Indicateurs dérivés</ins>
- Efficacité :
  * Formule : <img src="http://www.sciweavers.org/tex2img.php?eq=%20%5Cfrac%7BS%7D%7BE%7D%20&bc=White&fc=Black&im=jpg&fs=12&ff=arev&edit=0" align="center" border="0" alt=" \frac{S}{E} " width="17" height="43" />
    + Où S est le service rendu par le logiciel et E sont les efforts qu'il faut entreprendre pour le faire fonctionner (la quantité de ressources utilisées par exemple). Ce rapport donne une qualification de l'efficacité

**Efficacité d'exécution**

<ins>Indicateurs de base</ins>
- Fiabilité
- Facilité d'utilisation

<ins>Indicateurs dérivés</ins>
- Efficacité

**Facilité de migration**

<ins>Indicateurs de base</ins>
- Fiabilité
- Rendement/Efficacité

<ins>Indicateurs dérivés</ins>
- Portabilité

### A7. Références théoriques

| Numéro | Pattern            | Problème géré |
|--------|--------------------|---------------|
| 1      | Caching            | Optimisation des performances lors du chargement répété d'une ressource              |
| 2      | Cache-Aside        | Maintien de la cohérence entre le cache et la ressource distante              |
| 3      | Garbage Collection | Garantie de l'absence de fuites mémoire              |
| 4      | Garbage Compactor  | Défragmentation et récupération de la mémoire libérée              |


**Caching**

Le Caching Pattern permet l'optimisation de l'usage des ressources machine lors du chargement répété de données, notamment depuis une source distante. Cela permet l'optimisation des performances de la machines lors des accès à ces données. 
Ce pattern est utilisé lorsque les ressources qui seront demandées sont prévisibles.

Afin d'atteindre cet objectif, le Caching Pattern stocke les données auquelles la machine a déjà accedé localement, ce qui permet ensuite de les recharger rapidement pour les réutiliser, sans avoir à les redemander auprès de la source distante. Lorsque les ressources stockées ne sont plus nécessaires, elles sont libérées pour gagner en espace mémoire. Elles devront cependant refaire l'objet d'une requêtes à la source pour être rechargées après cela.

**Cache-Aside**

Lors de l'utilisation d'un cache, il serait utopique de penser que les données mises en cache seront toujours conformes aux données distantes, et ce quoiqu'il arrive. Il est très fréquent, notamment lors d'accès concurrents à une ressource, que celle-ci soit modifiée tandis qu'elle se trouve dans le cache d'un utilisateur. C'est le problem que cherche à résoudre le Cache-Aside pattern. 

De nombreux systèmes aujourd'hui contournent ce problème en intégrant des opérations de double lecture et d'écriture différée. Ainsi, les modifications apportées au données du cache sont immédiatement répercutées sur la base de données. Tout cela est possible si l'application récupérant les données établit une référence au cache.

Cependant, dans le cas ou le cache n'intégrerait pas ces fonctionnalités, le pattern Cache-Aside permet d'émuler la double lecture. A la récupération de la donnée distante, une copie de celle-ci est sauvegardée dans le cache. Lors de la mise à jour d'un élément en cache, l'application peut ainsi écrire directement sur la base de données, puis invalider l'élément en cache.

**Garbage Collection**

Le Garbage Collection Pattern traite les défauts d'accès à la mémoire de manière propre et simple pour le programmeur d'applications. L'implémentation standard de ce modèle ne résout pas le problème de la fragmentation de la mémoire (voir Garbage Collector) mais il permet au système de fonctionner correctement face à une mémoire mal gérée. 

Les fuites de mémoire se produisent lorsque les programmeurs se trompent sur le moment et la manière dont la mémoire doit être désallouée. La solution offerte par le Garbage Collection Pattern supprime les défauts en mettant le programmeur hors de la boucle - le programmeur ne désalloue plus explicitement la mémoire. En retirant le programmeur, cette source de défauts disparaît.

Le Garbage Collection Pattern effectue une « collecte de déchets » par marquage et balayage. En effet, il existe une phase dite de « marquage » suivie d’une phase de « récupération ». Lors de la création d’objets, ces derniers vont être marqués comme "objets vivants". La phase de marquage s’exécute suite à un manque de mémoire ou à une demande explicite d'effectuer le ramassage des ordures. Lors du marquage, on vérifie que tous les objets stockés sont vivants. Ainsi, les objets n’ayant pas pu être atteints sont marqués comme morts. La phase de balayage intervient à ce moment là pour récupérer les objets morts et libérer de l’espace mémoire.


**Garbage Compactor**

Lors de la fragmentation, la mémoire libre est divisée en blocs non contigus. Or, la plupart des applications qui allouent et libèrent dynamiquement des blocs finissent par se retrouver dans une situation où, bien que la mémoire totale soit suffisante pour répondre à la demande d'allocation, il n'y a pas un seul bloc contigu suffisamment grand, entraînant l'échec de l'application. Le Garbage Collection Pattern répond à cette problématique.

Le Garbage Collection Pattern est une variante du "Garbage Collection Pattern". Tout comme lui, il traite la libération de la mémoire, mais en gérant à la fois la défragmentation et récupération automatique de la mémoire libérée pour qu'elle commence alors comme un bloc contigu.

Il atteint cet objectif en maintenant deux segments de mémoire dans le tas. Lors de la collecte des déchets, les objets vivants sont déplacés d'un segment à l'autre, de sorte que dans le segment cible, les objets soient juxtaposés l'un à côté de l'autre. La mémoire libre est ainsi sous la forme d'un seul grand bloc contigu.

## Partie B

### B1. Approche technique

Amazon a fourni une documentation assez complète sur les systèmes de cache en général. Il présente notamment [les bonnes pratiques de cache](https://aws.amazon.com/fr/caching/best-practices/) de façon détaillée. Nous nous servons donc de ces informations pour présenter les principales caractéristiques des différentes approches techniques portant sur le sujet des systèmes de cache.

+ **Lazy caching ou Cache-aside** : 

Il s'agit de la forme de mise en cache la plus répandue. Elle peut être considérée comme base à toute bonne stratégie de mise en cache. L'idée de base est de ne remplir le cache que lorsqu'un objet est  demandé par l'application. Voici les différentes étapes de cette approche :

 1. L'application reçoit une requête de données, par exemple les taux d'échange de diférentes monnaies
 2. L'application va vérifier si cet objet qu'il a reçu se trouve dans le cache ou non
  + Si oui, c'est l'objet stocké dans le cache qui est renvoyé et le flux d'appel se termine.
  + Dans le cas contraire, la base de données est interrogée afin de trouver l'objet requis. Celui-ci est alors stocké dans le cache puis renvoyé.
  
<ins>Les avantages de cette méthode par rapport aux autres méthodes sont multiples :</ins>

* D'abord, le cache ne contient que les objets réellement demandés par l'application, ceci permettant la gestion de la taille du cache. En effet, les nouveaux objets ne sont ajoutés au cache qu'en cas de besoin. 
* Le développement de l'application peut entraîner la mise en ligne de nouveaux *noeuds de cache*. La technique cache-aside permet le remplissage automatique de ces nouveaux noeuds à chaque fois qu'un objet inconnu est demandé.
* L'expiration du cache est simplement géré par la suppression de l'objet mis en cache. 
* Cette technique étant largement répandue, de nombreuses applications web ou frameworks proposent une prise en charge instantanée de celle-ci. 

<ins>Illustration du cache aside en Python</ins>

<pre><code># Python

def get_user(user_id):

    # Check the cache

    record = cache.get(user_id)

    if record is None:       

       # Run a DB query       

       record = db.query("select * from users where id = ?",user_id)

       # Populate the cache

       cache.set(user_id, record)

    return record
</code></pre>
<pre><code># App code

user = get_user(17)
</code></pre>

+ **Write-through** :

Cette technique est définie comme "cache en écriture" car elle propose une mise à jour en temps réel du cache dès que la base de donnée est soumise à une mise à jour. Ce système de cache doit être utilisé dans un contexte où les données sont très susceptibles d'être demandées mais aussi fréquemment sujettes à des actualisations. Ceci permet d'éviter des oublis inutiles dans la mémoire cache. Cela peut par exemple concerner les données d'un profil utilisateur ou encore les cours boursier, etc.

<ins>"Write-through" possède certains avantages sur le "Lazy caching" :</ins>

+ Performance supérieure quant à la limitation des objets manquants dans le cache. Ceci permet d'éviter l'impression de lenteur d'exécution (d'un point de vue expérience utilisateur) engendrée par l'absence de certains objets dans le cache.
+ Appliction plus vive
+ Tout retard de l'application dépend de la mise à jour des données lancée par l'utilisateur (plus conforme aux attentes de l'utilisateur). 
+ Expiration du cache d'autant plus simplifiée grâce à la constante mise à jour du cache.

<ins>Cependant, cette technique présente également quelques points faibles :</ins>

-  Le cache peut être rempli d'objets inutiles qui ne sont pas réellement accessibles. Cela peut engendrer une consommation de mémoire supplémentaire et les objets non utilisés risquent d'expulser du cache des objets plus utiles.
-  La mise à jour répétée de certains enregistrements peut entraîner une forte rotation de la mémoire cache.
-  Si les noeuds du cache "tombent en panne", nous risquons de nous retrouver avec un cache vide ne pouvant se repeupler par le système du "write-though". Il faudra donc opter pour le cache aside afin de remplir le cache à nouveau.

<ins>Voici une illustration de ce système en pseudocode python :</ins>

<pre><code># Python

def save_user(user_id, values):

    # Save to DB 

    record = db.query("update users ... where id = ?", user_id, values)

    # Push into cache

    cache.set(user_id, record)

    return record
</code></pre>
<pre><code># App code

user = save_user(17, {"name": "Nate Dogg"})
</code></pre>

<ins>Conclusion</ins>

On observe que ce système apporte certains avantages par rapport au lazy caching suivant le contexte. Cependant, le lazy caching semble incontournable pour palier les problèmes de panne du write-through. Il pourrait donc être judicieux de combiner les deux si l'utilisation du cache write-through porte un intérêt dans notre cas d'utilisation.

+ **Time-to-live**
+ **Evictions**
+ **The thundering herd**

### B2. Solutions technologiques concurrentes

### B3. Solutions retenues

### B4. Liste de métriques

### B5. Découpage (WBS) pour réalisation des prototypes

## Partie C

### C1. Architecture solution W

### C2. Architecture solution X

### C3. Architecture solution Y

### C4. Architecture solution Z
 
