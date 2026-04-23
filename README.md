# DZ Fikraway

# ✅ 1️⃣ Installer `http-server`

Si Node.js est déjà installé, ouvre ton terminal et tape :

```bash
npm install -g http-server
```

> `-g` signifie global, tu pourras utiliser `http-server` depuis n’importe quel projet.

---

# ✅ 2️⃣ Aller dans ton projet

```bash
cd /chemin/vers/ton/projet
```

Ton projet doit avoir au minimum :

```
index.html
tracking.js
script.js
style.css (optionnel)
```

---

# ✅ 3️⃣ Lancer le serveur local

```bash
http-server -c-1 -p 8000
```

Explications :

* `-c-1` → désactive le cache, pour ne pas bloquer le JS mis à jour
* `-p 8000` → port 8000 (tu peux mettre un autre port si tu veux)

Après ça, ton terminal affichera quelque chose comme :

```
Starting up http-server, serving ./ on: http://127.0.0.1:8000
```

---

# ✅ 4️⃣ Ouvrir la page dans le navigateur

Va sur :

```
http://localhost:8000
```

* Tu devrais voir ton landing page avec ton formulaire
* Le JS externe (`script.js`) et `tracking.js` sera chargé
* Le formulaire peut envoyer les données à Google Sheet si ton Web App est configuré correctement
