var tweets=0;
var todosTweets = new Array();

var maisLikes = 0
var maisvotos = 0;
var vetorDeGames = new Array();

var SuperMario = new Game("Super Mario World", "SNES", 0, "Imagens/smario.jpeg");
var PokeYellow = new Game("Pokémon Yellow", "GBA", 0, "Imagens/pokemonYellow.jpg");
var WE10 = new Game("Winning Eleven 10", "PS-one", 0, "Imagens/winningE.jpg");
var TLOU = new Game("The Last of Us", "PC", 0, "Imagens/tlou.jpg");
var CS16 = new Game("Counter Strike 1.6", "PC", 0, "Imagens/cs16.jpg");

vetorDeGames.push(SuperMario);
vetorDeGames.push(PokeYellow);
vetorDeGames.push(WE10);
vetorDeGames.push(TLOU);
vetorDeGames.push(CS16);

function Game(nome2, plataforma2, votos2, imagem2){
		this.nome=nome2;
		this.plataforma=plataforma2;
		this.votos=votos2;
		this.imagem=imagem2;
}

function votar(){
	var l;
	if(document.getElementById('supermario').checked) {
		vetorDeGames[0].votos++;
		l=0;
		document.getElementById("votosMario").innerHTML="("+ vetorDeGames[0].votos+")";
	}
	if(document.getElementById('pokemonyellow').checked) {
		vetorDeGames[1].votos++;
		l=1
		document.getElementById("votosPoke").innerHTML="("+ vetorDeGames[1].votos+")";
	}
	if(document.getElementById('winningeleven10').checked) {
		vetorDeGames[2].votos++;
		l=2;
		document.getElementById("votosWe").innerHTML="("+ vetorDeGames[2].votos+")";
	}
	if(document.getElementById('thelastofus').checked) {
		vetorDeGames[3].votos++;
		l=3;
		document.getElementById("votosTlou").innerHTML="("+ vetorDeGames[3].votos+")";
	}
	if(document.getElementById('counterstrike').checked) {
		vetorDeGames[4].votos++;
		l=4;
		document.getElementById("votosCs").innerHTML="("+ vetorDeGames[4].votos+")";
	}

	if (vetorDeGames[l].votos>=maisvotos){
		maisvotos=vetorDeGames[l].votos;
		document.getElementById("maisVotado").src=vetorDeGames[l].imagem;
		document.getElementById("titMaisVotado").innerHTML=vetorDeGames[l].nome;
		document.getElementById("plataforma").innerHTML=vetorDeGames[l].plataforma;
		document.getElementById("votos").innerHTML=vetorDeGames[l].votos;
	}				
}

function enviaMsg(){
	if ((document.getElementById("novaMensagem").value)==""){
		alert("Insira uma mensagem válida.")
	}
	else{
		var novaDiv = document.createElement("div");
		novaDiv.className = 'textMessage';
		novaDiv.id = "tweet";

//FOTO AO LADO DA MSG
		var foto=document.createElement("img");
		foto.src="Imagens/miniProfile.jpg";
		foto.className = "profilepic";
		foto.id="profpic";
		novaDiv.appendChild(foto);

//CONTEÚDO DIGITADO NA TEXTAREA					
		var conteudo = (document.createTextNode(document.getElementById("novaMensagem").value));
		novaDiv.appendChild(conteudo);
		
		var divAtual = document.getElementById("1");
		divAtual.parentNode.insertBefore(novaDiv, divAtual.nextSibling);
//RODAPÉ DA DIV CRIADA								
			var novaDivRodape = document.createElement("div");
			novaDivRodape.id = "rodapeInt";
			document.getElementById('tweet').appendChild(novaDivRodape);


				var novaDivPubPor = document.createElement("div");
				novaDivPubPor.className = 'pubPor';
//SALVA O HORÁRIO DE POSTAGEM
					var data = new Date();
					if ((data.getSeconds())<10){
						if((data.getMinutes()<10)){
							var horario=(data.getHours())+':0'+(data.getMinutes())+':0'+(data.getSeconds());
						}
						else{
							var horario=(data.getHours())+':'+(data.getMinutes())+':0'+(data.getSeconds());
						}
					}
					if ((data.getSeconds())>10){
						if((data.getMinutes()<10)){
							var horario=(data.getHours())+':0'+(data.getMinutes())+':'+(data.getSeconds());
						}
						else{
							var horario=(data.getHours())+':'+(data.getMinutes())+':'+(data.getSeconds());
						}
					}
//DATA COMPLETA DE ENVIO
					var enviadoPor = document.createTextNode("Enviado por @"+(document.getElementById("nickname").value)+" às "+horario+" do dia "+data.getDate()+"/"+(data.getMonth()+1)+"/"+data.getFullYear()+".");								
		
		todosTweets[tweets] = new Tweet((document.getElementById("novaMensagem").value),tweets,0);			
		
		novaDivPubPor.appendChild(enviadoPor);

//BOTAO CURTIR
		var buttonLike = document.createElement("button");
		buttonLike.className = "button3";
		buttonLike.id = tweets;
		buttonLike.onclick = function click(){likePost(this.id)};
		buttonLike.innerHTML = "Curtir";
		novaDivPubPor.appendChild(buttonLike);

//CONTADOR AO LADO DO BOTAO CURTIR
		var contador = document.createElement("p");
		contador.className = "pcontador";
		contador.id = "contador"+tweets;
		contador.innerHTML= "0";
		novaDivPubPor.appendChild(contador);

		


		document.getElementById("rodapeInt").appendChild(novaDivPubPor);

		document.getElementById("novaMensagem").value="";
		tweets++;
		document.getElementById("totalTweets").innerHTML=tweets;
	}
}

function Tweet(texto,posicao,likes){
	this.texto=texto;
	this.posicao=posicao;
	this.likes=likes;
}
function likePost(id){
	//alert(id);
	todosTweets[id].likes++;
	document.getElementById("contador"+id).innerHTML = todosTweets[id].likes;
	verifica(id);
}

function verifica(id){
	if (todosTweets[id].likes>maisLikes){
		document.getElementById("maisCurtido").innerHTML = todosTweets[id].texto;
		document.getElementById("totalVotos").innerHTML = todosTweets[id].likes;
		maisLikes = todosTweets[id].likes;
	}
}