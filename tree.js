// INSERIR UMA INFORMACAO NO ELEMENTO QUE CONTENHA A POS[X,Y] DELE.

var arrArvore = [];
var iArrArvore = 0;
var nivelArvore;
var alturaNodo;
var arrNodosDerivacao = [];
var iArrNodosDerivacao = 0;

function criarRaiz(){
	rotulo = "10";
	nodo = document.createElement("div");
	nodo.className = "bola";
	nodo.id = rotulo;
	nodo.data = "sadadas";
	document.getElementById("arvore").appendChild(nodo);
	document.getElementById(rotulo).innerHTML = rotulo;
	document.getElementById(rotulo).style.right = (screen.width / 2) - 25 + "px";
	document.getElementById(rotulo).style.top = 10 + "px";

	arrArvore.push({paiNodo:"", 
					rotuloNodo:rotulo,
					arrFilhosNodo:[], 
					iArrFilhosNodo:0, 
					bloco:parseInt(document.getElementById(rotulo).style.right) * 2, 
					nivelNodo:1});
}

function enviar(){

	texto = document.getElementById('txtConsole').value;

	removerSelecionados();
	limparSaida();
	
	if(texto==""){
		erro("DIGITE UM COMANDO");
		return false;
	}else{
		var arr = texto.split(' ');

		if(arr[0] == "add"){
			flag = true;
			valor = 0;
			pai = 0;

			if(arr[1] === undefined || arr[1] == "" || arr.length>3){
				erro("COMANDO INVALIDO! VERIFIQUE AO LADO.");
				flag = false;
			}else{
				if(verificarValores(arr[1])==false){
					erro("COMANDO INVALIDO! VERIFIQUE AO LADO.");
					flag = false;
				}else
					valor = arr[1];

				if(arr[2] === undefined || arr[2] == ""){
					erro("COMANDO INVALIDO! VERIFIQUE AO LADO.");
					flag = false;
				}else{
					if(verificarValores(arr[2])==false){
						erro("COMANDO INVALIDO! VERIFIQUE AO LADO.");
						flag = false;
					}else
						pai = arr[2];
				}
			}

			if(flag == true){
				add(valor, pai)
			}

		}else if(arr[0] == "root"){
			nodosDerivacao();
		}else if(arr[0] == "leaf"){
			nodosFolhas();
		}else if(arr[0] == "grau"){
			mostrarGrau();
		}else if(arr[0] == "grau"){
			if(arr[1] === undefined || arr[1] == "" || arr.length>3){
				erro("COMANDO INVALIDO! VERIFIQUE AO LADO.");
			}else if(verificarValores(arr[1]) == false){
				erro("COMANDO INVALIDO! VERIFIQUE AO LADO.");
			}else{
				if(arr[2] === undefined || arr[2] == "" || arr.length>3){
					erro("COMANDO INVALIDO! VERIFIQUE AO LADO.");
				}else if(verificarValores(arr[2]) == false){
					erro("COMANDO INVALIDO! VERIFIQUE AO LADO.");
				}else{
					mostrarCaminho(arr[1],arr[2]);
				}
			}
		}else if(arr[0] == "nivel"){
			mostrarNivel();
		}else if(arr[0] == "consulte"){
			if(arr[1] === undefined || arr[1] == "" || arr.length>2){
				erro("COMANDO INVALIDO! VERIFIQUE AO LADO.");
			}else if(verificarValores(arr[1]) == false){
				erro("COMANDO INVALIDO! VERIFIQUE AO LADO.");
			}else{
				if(consultarNodo(arr[1]) == false){
					erro("NODO NAO EXISTE.");
				}
			}
		}else if(arr[0] == "del"){
			if(arr[1] === undefined || arr[1] == "" || arr.length>2){
				erro("COMANDO INVALIDO! VERIFIQUE AO LADO.");
			}else if(verificarValores(arr[1]) == false){
				erro("COMANDO INVALIDO! VERIFIQUE AO LADO.");
			}else{
				if(deletarNodo(arr[1]) == false){
					erro("NODO NAO EXISTE OU NAO EH FOLHA/TERMINAL");
				}else{
					msg("NODO REMOVIDO COM SUCESSO!");
				}
			}
		}else if(arr[0] == "x"){
			opcaoX();
		}else{
			erro("COMANDO INVALIDO! VERIFIQUE AO LADO.");
		}

	}
}

function verificarValores(val){
	var arr = val.split('');
	if(arr.length > 4) return false;

	for(i = 0; i < arr.length; i++){
		
		if(arr[i] != '0' && arr[i] != '1' &&arr[i] != '2' &&arr[i] != '3' &&arr[i] != '4' &&arr[i] != '5' &&arr[i] != '6' &&arr[i] != '7' &&arr[i] != '8' &&arr[i] != '9'){
			return false;
		}
	}
}

function add(rotulo, pai){

	blocoPai = 0;

	for(i = 0; i <= iArrArvore; i++){
		if(arrArvore[i].rotuloNodo == pai){
			blocoPai = arrArvore[i].bloco;
			console.log(blocoPai);
		}
	}

	if(verificarExiste(rotulo) == false){
		erro("O VALOR DESTE NODO JA EXISTE");
	}else{
		if(verificarPai(pai) == false){
			erro("O PAI DESTE NODO NAO EXISTE");
		}else{
			arrArvore.push({paiNodo:pai, 
							rotuloNodo:rotulo, 
							arrFilhosNodo:[], 
							iArrFilhosNodo:0, 
							bloco:0, 
							nivelNodo:pegarNivelPai(pai) + 1});
			console.log(arrArvore);
			insereNodoDerivacao(pai);
			iArrArvore++;
			insereNodoFilho(rotulo, pai);
			criarNodo(rotulo, pai);
			msg("NODO ADICIONADO COM SUCESSO!")
		}
	}
}

function limparSaida(){
	document.getElementById("txtSaida").value = "";
	document.getElementById("txtSaida").style.color = "#000";
}

function focarConsole(){
	document.getElementById("txtConsole").focus();
}

function criarNodo(rotulo, pai){
	elPai = document.getElementById(pai);

	nodo = document.createElement("div");
	nodo.className = "bola";
	nodo.id = rotulo;
	document.getElementById("arvore").appendChild(nodo);
	document.getElementById(rotulo).innerHTML = rotulo;

	ajustaPosicoes(pai, rotulo);
}

function pegarPosicao(nodo) {

	var curleft = curtop = 0;

	if (nodo.offsetParent) {
		curleft = nodo.offsetLeft;
		curtop = nodo.offsetTop;
		while (nodo = nodo.offsetParent) {
			curleft += nodo.offsetLeft;
			curtop += nodo.offsetTop;
		}
	}

	return [curleft,curtop];
}

function verificarExiste(rotulo){
	for(i = 0; i <= iArrArvore; i++){
		if(arrArvore[i].rotuloNodo == rotulo) return false;
	}

	return true;
}

function verificarPai(pai){
	for(i = 0; i <= iArrArvore; i++){
		if(arrArvore[i].rotuloNodo == pai) return true;
	}

	return false;
}

function insereNodoDerivacao(pai){
	if(arrNodosDerivacao.indexOf(pai) == -1){
		arrNodosDerivacao.push(pai);
		iArrNodosDerivacao++;
	}
}

function nodosDerivacao(){
	if(iArrNodosDerivacao == 0){
		erro("NAO EXISTE NENHUM NODO DERIVACAO!");
	}else{
		for(i = 0; i <= iArrNodosDerivacao; i++){
			document.getElementById(arrNodosDerivacao[i]).style.backgroundColor = "red";
		}
	}
}

function removerSelecionados(){
	for(i = 0; i <= iArrArvore; i++){
			document.getElementById(arrArvore[i].rotuloNodo).style.backgroundColor = "#000";
	}
}

function nodosFolhas(){
	for(i = 0; i <= iArrArvore; i++){
		if(arrNodosDerivacao.indexOf(arrArvore[i].rotuloNodo) == -1){
			document.getElementById(arrArvore[i].rotuloNodo).style.backgroundColor = "red";
		}
	}
}

function mostrarComandos(){
	document.getElementById("comandos").style.display = "table";
}

function fecharComandos(){
	document.getElementById("comandos").style.display = "none";
	focarConsole();
}

function insereNodoFilho(rotulo, pai){
	for(i = 0; i <= iArrArvore; i++){
		if(arrArvore[i].rotuloNodo == pai){
			arrArvore[i].arrFilhosNodo.push(rotulo);
			arrArvore[i].iArrFilhosNodo++;
		}
	}
}

function ajustaPosicoes(pai, rotulo){
	rightPai = parseInt(document.getElementById(pai).style.right);
	topPai = parseInt(document.getElementById(pai).style.top);

	var filhos;
	var iPai;

	for(i = 0; i <= iArrArvore; i++){
		if(arrArvore[i].rotuloNodo == pai){
			filhos = arrArvore[i].iArrFilhosNodo;
			iPai = i;
			break;
		}
	}

	blocoPai = arrArvore[iPai].bloco;


	blocos = arrArvore[iPai].bloco / (filhos);


	for(i = 0; i <= iArrArvore; i++){
		if(arrArvore[i].rotuloNodo == rotulo){
			arrArvore[i].bloco = blocoPai / 2;
			break;
		}
	}

	lado = false;

	dif = 0;

	for(i = 0; i <= arrArvore[iPai].iArrFilhosNodo - 1; i++){
		document.getElementById(arrArvore[iPai].arrFilhosNodo[i]).style.right = (blocos + (dif * 2)) / 2 + "px";
		dif = dif + blocos;
		document.getElementById(arrArvore[iPai].arrFilhosNodo[i]).style.top = topPai + 75 + "px";
	}

}

function mostrarGrau(){
	maior = 0;
	for(i=0; i<=iArrArvore; i++){
		if(arrArvore[i].iArrFilhosNodo > maior){
			maior = arrArvore[i].iArrFilhosNodo;
		}
	}

	document.getElementById("txtSaida").value = "GRAU DA ARVORE: " + maior;

}

function pegarNivelPai(pai){
	for(i=0; i<=iArrArvore; i++){
		if(arrArvore[i].rotuloNodo == pai){
			return arrArvore[i].nivelNodo;
		}
	}
}


function mostrarNivel(){
	maior = 0;
	for(i=0; i<=iArrArvore; i++){
		if(arrArvore[i].nivelNodo > maior){
			maior = arrArvore[i].nivelNodo;
		}
	}

	document.getElementById("txtSaida").value = "NIVEL DA ARVORE: " + maior;

}

function deletarNodo(rotulo){
	for(i=0; i<=iArrArvore; i++){
		if(arrArvore[i].rotuloNodo == rotulo){
			if(arrArvore[i].iArrFilhosNodo == 0){
				for(j=0; j<=iArrArvore; j++){
					if(arrArvore[j].rotuloNodo == arrArvore[i].paiNodo){
						for(k=0; k<=arrArvore[j].iArrFilhosNodo; k++){
							if(arrArvore[j].arrFilhosNodo[k] == rotulo){
								arrArvore[j].arrFilhosNodo.splice(k, 1);
								arrArvore[j].iArrFilhosNodo--;
							}
						}
					}
				}
				arrArvore.splice(i, 1);
				iArrArvore--;	
				el = document.getElementById(rotulo);
				el.remove();
				return true;
			}
		}
	}

	return false;
}

function erro(msg){
	document.getElementById("txtSaida").value = msg;
	document.getElementById("txtSaida").style.color = "#cc0000";
}

function msg(msg){
	document.getElementById("txtSaida").value = msg;
}

function consultarNodo(rotulo){
	for(i=0; i<=iArrArvore; i++){
		if(arrArvore[i].rotuloNodo == rotulo){
			document.getElementById(rotulo).style.backgroundColor="red";
			if(arrArvore[i].paiNodo != ""){
				document.getElementById(arrArvore[i].paiNodo).style.backgroundColor="blue";
			}
			if(arrArvore[i].iArrFilhosNodo > 0){
				for(j = 0; j < arrArvore[i].iArrFilhosNodo; j++){
					document.getElementById(arrArvore[i].arrFilhosNodo[j]).style.backgroundColor = "green";
				}
			}
			msg("GRAU DO NODO: " + arrArvore[i].iArrFilhosNodo + " | " + "NIVEL: " + arrArvore[i].nivelNodo);
			return true;
		}
	}

	return false;
}

function mostrarCaminho(val1, val2){
	if(verificarExiste(val1) == true || verificarExiste(val2) == true){

	}
}

function opcaoX(){
	msg("O NODO RAIZ EH: " + arrArvore[0].rotuloNodo);
}