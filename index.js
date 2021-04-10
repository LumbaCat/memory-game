var taille = new Array(3);

for (var i=0; i<taille.length; i++){
	taille[i] = document.createElement("option");
	taille[i].value = (i+2)*2;
    taille[i].innerHTML  = taille[i].value;
    document.getElementById("taille").appendChild(taille[i]);
}

function nbAlea(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min +1)) + min;
  }

  function construireTableau(taille, mode) {

	var funcClick;
	if(mode == 2){
		funcClick = "choix(this)";
	}else{
		funcClick = "choix1j(this)";
		var j2 = document.getElementById("j2");
		j2.value = "AlphaMemo";
	}

	  var test = document.getElementById("test");
      var remove = document.getElementById("tableau");
	  test.removeChild(remove);

	  var remove2 = document.getElementById("arreter");
	  test.removeChild(remove2);

	  var table = document.createElement("table");
	  table.setAttribute("id", "tableau");

	  var lignes = new Array(taille);
	  for(var i = 0; i<taille; i++){
		  lignes[i] = document.createElement("tr");
	  }

	var col = new Array(taille);
	for(var i = 0; i<taille; i++){
		col[i] = new Array(taille);
		for(var j = 0; j<taille; j++){
			col[i][j] = document.createElement("td");
			col[i][j].setAttribute("class", "click");
			col[i][j].setAttribute("name", "clique");
			col[i][j].setAttribute("onclick", funcClick);
		}
	}

	  var tabRemplir = remplir(taille);
	  var tableauIndices = new Array();

	  for(var i = 0; i<taille; i++){
		  for(var j = 0; j<taille; j++){
			  var indice = hasard(taille, tableauIndices);
			  tableauIndices.push(indice);
			  col[i][j].value = tabRemplir[indice];
		  }
	  }
// _____________________________________________
	  var triche = new Array(taille);
	  for(var i = 0; i<taille; i++){
		  triche[i] = new Array(taille);
		  for(var j = 0; j<taille; j++){
			triche[i][j] = col[i][j].value;
		  }
	  }
	  console.log(triche);
// _____________________________________________
	  for(var i = 0; i<taille; i++){
		  for(var j = 0; j<taille; j++){
			  lignes[i].appendChild(col[i][j]);
		  }

		  table.appendChild(lignes[i]);
	  }

	  test.appendChild(table);

	  // ajout <button> arrêter
		arreter= document.createElement("button");
		arreter.setAttribute("id", "arreter");
		arreter.setAttribute("onclick", "document.location.reload(false)");
		arreter.setAttribute("class", "styledArret");
		arreter.innerHTML  = "Arrêter";
		test.appendChild(arreter);
  }

function hasard(t, tableau){
	do{
	  var alea = nbAlea(0, t*t-1);
	}while(appartient(alea,tableau));
	return alea;
}

function appartient(a, tab){
	var retour = false;
	for(var i=0; i<tab.length; i++){
		if(tab[i] == a){
			retour = true;
		}
	}
	return retour;
}

  function remplir(taille){
	  var nb = taille*taille/2;
	  var tab = new Array(nb);
	  for (var i=0; i<nb; i++){
		  tab[i] = i;
	  }
	  var retour = tab.concat(tab);
	  return retour;
  }


//________________________________________________________________

var couleur;
var couleurStyle;
var j1;
var j2;
var lead;
var appelChoix;
var tour;
var pointsJ1;
var pointsJ2;
var mode;
var taille;
var oncli;
var couple;
var memoire;

function choix(objet){
	couple.push(objet);
	associeImage(objet, 1);
	objet.removeAttribute("onclick");
	objet.removeAttribute("class");
	objet.removeAttribute("name");

	if(mode == 2){
		oncli = "choix(this)";
	}else{
		oncli = "choix1j(this)";
	}

	if(couple.length == 2){
		var cliques = document.getElementsByName("clique");
		for(var i=0; i<cliques.length; i++){
			cliques[i].removeAttribute("onclick");
			cliques[i].removeAttribute("class");
		}

		setTimeout(function(){
			compare(couple[0],couple[1]);
			couple.splice(0, 2);
			if(mode == 2){
				recliquable();
			}
			}, 1100);


	}

}

function recliquable(){
	var cliques2 = document.getElementsByName("clique");
	if(mode == 2){
		oncli = "choix(this)";
	}else{
		oncli = "choix1j(this)";
	}
	for(var i=0; i<cliques2.length; i++){
		cliques2[i].setAttribute("onclick", oncli);
		cliques2[i].setAttribute("class", "click");
	}
}

//________________________________________________________________
	function attendEtCompare(obj1,obj2){
	setTimeout(compare(obj1,obj2), 1100);
	}
	//_____________________________
	function compare(obj1,obj2){
		if(obj1.value == obj2.value){
			var points;
			if(lead == j1){
				pointsJ1++;
				if(pointsJ1 == 1){
					points = " point";
				}else{
					points = " points";
				}
				var infos = document.getElementById("infos");
				infos.innerHTML = lead+": "+pointsJ1+points+".";
				infos.style = couleurStyle;
			}else{
				pointsJ2++;
				if(pointsJ2 == 1){
					points = " point";
				}else{
					points = " points";
				}
				var infos2 = document.getElementById("infos2");
				infos2.innerHTML = lead+": "+pointsJ2+points+".";
				infos2.style = couleurStyle;
			}
			obj1.removeAttribute("name");
			obj2.removeAttribute("name");
			if(appartient(obj1, memoire) && appartient(obj2, memoire)){
				retireMemoire(obj1);
				retireMemoire(obj2);
			}
			verifieGain();
		}else{
			attendEtRemet(obj1,obj2);
			changeLead();
		}
	}
	//_____________________________
	function verifieGain(){
		if(pointsJ1+pointsJ2 == taille*taille/2){
			var inf = document.getElementById("inf");
			var nom = document.getElementById("nom");
			nom.style = "color: white";
			if(pointsJ1 == pointsJ2){
				inf.style = "background-color: purple";
				nom.innerHTML = "Match nul !";

			}else if(pointsJ1>pointsJ2){
				inf.style = "background-color: green";
				nom.innerHTML = "Bravo "+j1+"!";
			}else{
				inf.style = "background-color: blue";
				nom.innerHTML = "Bravo "+j2+"!";
			}
			lead = "fin";
		}
	}
	//_____________________________
	function changeLead(){
		if(lead == j1){
			lead = j2;
		}else{
			lead = j1;
		}

		if(couleurStyle == "color: green"){
			couleurStyle = "color: blue";
			couleur = "background-color: blue";
		}else{
			couleurStyle = "color: green";
			couleur = "background-color: green";
		}

		var inf = document.getElementById("inf");
		inf.style = couleur;
		var nom = document.getElementById("nom");
		nom.innerHTML = lead;
		nom.style = "color: white";
	}
	//_____________________________
	function attendEtRemet(obj1,obj2){
	setTimeout(remet(obj1,obj2), 100);
	}
	//_____________________________
	function remet(obj1,obj2){
		associeImage(obj1, 0);
		associeImage(obj2, 0);
		obj1.setAttribute("onclick", "choix(this)");
		obj1.setAttribute("class", "click");
		obj1.setAttribute("name", "clique");

		obj2.setAttribute("onclick", "choix(this)");
		obj2.setAttribute("class", "click");
		obj2.setAttribute("name", "clique");
	}
	//_____________________________
	function associeImage(obj, mod){
		var nombre = obj.value;
		if(mod == 1){
			switch (nombre) {
				case 0:
				  obj.style = "background-image: url(images/0.png)";
				  break;
				case 1:
					obj.style = "background-image: url(images/1.png)";
				  break;
				case 2:
					obj.style = "background-image: url(images/2.png)";
				  break;
				case 3:
					obj.style = "background-image: url(images/3.png)";
				break;
				case 4:
					obj.style = "background-image: url(images/4.png)";
				  break;
				case 5:
					obj.style = "background-image: url(images/5.png)";
				  break;
				case 6:
					obj.style = "background-image: url(images/6.png)";
				  break;
				case 7:
					obj.style = "background-image: url(images/7.png)";
				  break;
				case 8:
					obj.style = "background-image: url(images/8.png)";
				  break;
				case 9:
					obj.style = "background-image: url(images/9.png)";
				  break;
				case 10:
					obj.style = "background-image: url(images/10.png)";
				  break;
				case 11:
					obj.style = "background-image: url(images/11.png)";
				  break;
				case 12:
					obj.style = "background-image: url(images/12.png)";
				  break;
				case 13:
					obj.style = "background-image: url(images/13.png)";
				  break;
				case 14:
					obj.style = "background-image: url(images/14.png)";
				  break;
				case 15:
					obj.style = "background-image: url(images/15.png)";
				  break;
				case 16:
					obj.style = "background-image: url(images/16.png)";
				  break;
				case 17:
					obj.style = "background-image: url(images/17.png)";
				  break;
				  case 18:
					obj.style = "background-image: url(images/18.png)";
				  break;
				case 19:
					obj.style = "background-image: url(images/19.png)";
				  break;
				case 20:
					obj.style = "background-image: url(images/20.png)";
				break;
				case 21:
					obj.style = "background-image: url(images/21.png)";
				  break;
				case 22:
					obj.style = "background-image: url(images/22.png)";
				  break;
				case 23:
					obj.style = "background-image: url(images/23.png)";
				  break;
				case 24:
					obj.style = "background-image: url(images/24.png)";
				  break;
				case 25:
					obj.style = "background-image: url(images/25.png)";
				  break;
				case 26:
					obj.style = "background-image: url(images/26.png)";
				  break;
				case 27:
					obj.style = "background-image: url(images/27.png)";
				  break;
				case 28:
					obj.style = "background-image: url(images/28.png)";
				  break;
				case 29:
					obj.style = "background-image: url(images/29.png)";
				  break;
				case 30:
					obj.style = "background-image: url(images/30.png)";
				  break;
				case 31:
					obj.style = "background-image: url(images/31.png)";
				  break;
				default:
					obj.style = "background-image: url(images/default.png)";
				break;
			  }
		}else{
			obj.style = "background-image: url(images/carte.png)";
		}
	}
//________________________________________________________________




function choix1j(objet){

	ajouteMemoire(objet);
	var a = 1500;
	// var cliques = document.getElementsByName("clique");
	// memoireDivine(cliques);

	if(lead == j1){
		choix(objet);
		bet(a);
	}

	function bet(a){
		setTimeout(function(){
						if(lead == j2){
							var cliques = document.getElementsByName("clique");
						 	// memoireDivine(cliques);
							for(var i=0; i<cliques.length; i++){
								cliques[i].removeAttribute("onclick");
								cliques[i].removeAttribute("class");
							}
							var joueIa = selectionIa(cliques);
							ajouteMemoire(joueIa[0]);
							ajouteMemoire(joueIa[1]);

							setTimeout(function(){
								choix(joueIa[0]);
								setTimeout(function(){
									choix(joueIa[1]);
									setTimeout(function(){
										var cliques2 = document.getElementsByName("clique");
										for(var i=0; i<cliques2.length; i++){
											cliques2[i].setAttribute("onclick", "choix1j(this)");
											cliques2[i].setAttribute("class", "click");
										}
										bet(500);
									}, 1500);
								}, 1500);
							}, 500);
						}else{
							recliquable();
						}
					}, a);
	}

}


function memoireDivine(cliques){
	memoire.splice(0, memoire.length);
	for(var i=0; i<cliques.length; i++){
		ajouteMemoire(cliques[i]);
	}
}


function jouer(joueIa){
	joueIa[0].removeAttribute("name");
	joueIa[0].removeAttribute("onclick");
	joueIa[0].removeAttribute("class");
	joueIa[1].removeAttribute("name");
	joueIa[1].removeAttribute("onclick");
	joueIa[1].removeAttribute("class");

	setTimeout(function(){ metImg(0); }, 500);
	setTimeout(function(){ metImg(1); }, 1500);

	function metImg(a){
		associeImage(joueIa[a], 1);
	}
}

function selectionIa(cl){
	var max = cl.length-1;
	var alea1 = nbAlea(0, max);
	var selectionAlea = [cl[alea1]];
	chercheAleaMemoire(cl[alea1]);
	// console.log("selectionAlea avant: ");
	// for(var i=0; i<selectionAlea.length; i++){
	// 	console.log(selectionAlea[i].value);
	// }
	if (selectionAlea.length == 1){
		do{
			var alea2 = nbAlea(0, max);
		}while(alea2 == alea1);
		selectionAlea.push(cl[alea2]);
	}
	// console.log("selectionAlea après: ");
	// for(var i=0; i<selectionAlea.length; i++){
	// 	console.log(selectionAlea[i].value);
	// }

	var selectMemoire = chercheMemoire();
	// console.log("selectMemoire: ");
	// for(var i=0; i<selectMemoire.length; i++){
	// 	console.log(selectMemoire[i].value);
	// }

	var selection = (selectMemoire.length == 0)? selectionAlea : selectMemoire;
	// console.log("selection: ");
	// for(var i=0; i<selection.length; i++){
	// 	console.log(selection[i].value);
	// }

	// fonctions
	function chercheMemoire(){
		var choixIa = new Array();
		if(memoire.length>1){
			for(var i=0; i<memoire.length-1; i++){
				for(var j=i+1; j<memoire.length; j++){
					if (memoire[i].value == memoire[j].value){
						choixIa.push(memoire[i]);
						choixIa.push(memoire[j]);
					}
				}
			}
		}
		return choixIa;
	}

	function chercheAleaMemoire(a){
		if(memoire.length>0){
			for(var i=0; i<memoire.length; i++){
				if ((memoire[i] != a) && (memoire[i].value == a.value)){
					selectionAlea.push(memoire[i]);
				}
			}
		}
	}

	return selection;
}

function ajouteMemoire(a){
	if(!appartient(a,memoire)){
		memoire.push(a);
	}
}

function retireMemoire(a){
	var indice;
	for(var i=0; i<memoire.length; i++){
		if(memoire[i] == a){
			indice = i;
		}
	}
	memoire.splice(indice,1);
}
//________________________________________________________________


function rootCommencer(){
	mode = document.getElementById("mode").value;
	taille = document.getElementById('taille').value;
	construireTableau(taille, mode);

	j1 = document.getElementById("j1").value;
	j2 = document.getElementById("j2").value;
	couleur = "background-color: green";
	couleurStyle = "color: green";
	lead = j1;
	appelChoix = 0;
	tour = 0;
	pointsJ1 = 0;
	pointsJ2 = 0;
	couple = new Array();
	memoire = new Array();

	var inf = document.getElementById("inf");
	inf.style = couleur;
	var nom = document.getElementById("nom");
	nom.innerHTML = lead;
	nom.style = "color: white";


	var infos = document.getElementById("infos");
	infos.innerHTML = j1+": 0 point.";
	infos.style = "color: green";

	var infos2 = document.getElementById("infos2");
	infos2.innerHTML = j2+": 0 point.";
	infos2.style = "color: blue";
}


