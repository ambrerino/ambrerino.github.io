const imagesDeBase = {
    "soleil": "soleil.jpg",
    "chat": "chat.jpg",
    "etoile de mer": "etoile de mer.jpg",
    "lapin": "lapin.png",
    "chien": "chien.png",
    "serpent": "serpent.jpg",
    "annanas": "annanas.png",
    "renard": "renard.jpg",
    "loup": "loup.jpg",
    "koala": "koala.jpg",
    "licorne": "licorne.jpg",
    "lion": "lion.jpg",
    "melon": "melon.jpg",
    "ours": "ours.jpg",
    "renne": "renne.jpg",
    "tigre": "tigre.png",
    "tacos": "tacos.jpg",
    "girafe": "girafe.jpg"
};

let images = [];
for (const key of Object.keys(imagesDeBase)) {
    images.push(imagesDeBase[key]);
    images.push(imagesDeBase[key]);
}

function melangeur(tablo) {
    let indiceCourant = tablo.length;
    while (indiceCourant !== 0) {
        let indiceAleatoire = Math.floor(Math.random() * indiceCourant);
        indiceCourant--;
        [tablo[indiceCourant], tablo[indiceAleatoire]] = [tablo[indiceAleatoire], tablo[indiceCourant]];
    }
}

melangeur(images);

const memory = document.getElementById("memory");

let derniersBoutonsClique = [];
let nombreDeCoups = 0;

function init() {
    memory.innerHTML = ""
    let imageTrouve = 0;

    for (let i = 0; i < images.length; i++) {
        let button = document.createElement("div");
        button.classList.add('button-img')
        button.setAttribute("data-image", images[i]); // On stocke le nom de l'image comme attribut personnalisé
        button.innerText = "memory"; // On affiche "Cacher" pour chaque bouton
        memory.append(button);
        const score = document.getElementById("score");

        // Ajout d'un gestionnaire d'événements pour chaque bouton
        button.addEventListener("click", function () {
            // Vérifier si le bouton a déjà été cliqué ou s'il a été associé à une paire
            if (derniersBoutonsClique.length < 2 && !derniersBoutonsClique.includes(this)) {
                // Afficher l'image en cliquant sur le bouton
                let img = document.createElement("img");
                img.src = this.getAttribute("data-image");
                this.innerText = ""
                this.append(img)
                // Ajouter le bouton actuel à la liste des derniers boutons cliqués
                derniersBoutonsClique.push(this);

                // Vérifier si deux boutons ont été cliqués
                if (derniersBoutonsClique.length === 2) {
                    nombreDeCoups++;
                    // Vérifier si les deux images correspondent
                    if (derniersBoutonsClique[0].getAttribute("data-image") === derniersBoutonsClique[1].getAttribute("data-image")) {
                        // Si les images correspondent, les laisser affichées
                        derniersBoutonsClique[0].disabled = "true";
                        derniersBoutonsClique[1].disabled = "true";
                        derniersBoutonsClique = [];
                        console.log("Match! Nombre de coups: " + nombreDeCoups);
                        imageTrouve++;
                    }
                    else {
                        // Si les images ne correspondent pas, cacher les deux boutons après un court délai
                        setTimeout(function () {
                            derniersBoutonsClique[0].innerText = "memory";
                            derniersBoutonsClique[1].innerText = "memory";
                            derniersBoutonsClique = []; // Réinitialiser la liste des derniers boutons cliqués
                        }, 1000); // Délai de 1 seconde avant de cacher les boutons
                    }
                    score.innerText = nombreDeCoups;
                    console.log("Nombre de coups: " + nombreDeCoups);
                    if(imageTrouve === (images.length)/2) {
                        alert('Gagné en ' + nombreDeCoups + '!')
                    }
                }
            }
        });

    }

}
init()
const restart = document.getElementById("restart");
restart.addEventListener("click", function () {
    melangeur(images);



    derniersBoutonsClique = [];
    nombreDeCoups = 0;
    const score = document.getElementById("score");
    score.innerText = nombreDeCoups;
    init()
})

