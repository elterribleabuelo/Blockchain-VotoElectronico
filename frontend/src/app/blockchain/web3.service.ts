import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Contract } from "web3-eth-contract";

const contractAbi = require("../../../build/contracts/PollsContract.json");
declare var window: any;
@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  private web3:Web3;
  private contract:Contract;
  private contractAddress = "0xEb507661Ecc6bcfD35Fa248Bc110C6677d3Ae626"; // Dirección hash del contrat donde está desplegado --> viene de Ganache
  constructor() {

    // Verificamos si el usurio tiene instalado Metamask
    if (window.web3){
      this.web3 = new Web3(window.ethereum);
      console.log(contractAbi['abi']);
      console.log(typeof contractAbi);

      this.contract = new this.web3.eth.Contract(contractAbi['abi'],this.contractAddress);

      window.ethereum.enable().catch((err) => {
        console.log(err);
      });
    }else {
      console.warn("Metamask not found. Install or enable Metamask.")
    }
  }

  getAccount():Promise<String>{
    return this.web3.eth.getAccounts().then((accounts) => accounts[0] || '')
  }

  async executeTransaction(fnName:string, ...args:any[]):Promise<void>{
    /**
     * function vote(): funcion para realizar una transaccion
     * function getVoter: funcion de visualizacion que regresa datos
     */
    const acc = await this.getAccount();
    this.contract.methods[fnName](...args).send({from : acc});
  }

  // executeTransaction("vote",pollId,vote)
  // executeTransaction("createPoll",question,thumb,opt)

  async call(fnName:string, ...args:any[]){
    /**
     *Lee el smart contract y obtiene datos
     */
     const acc = await this.getAccount();
     return this.contract.methods[fnName](...args).call({from : acc});

  }
}



//https://ethereum.stackexchange.com/questions/29873/web3-contract-instantiation
//https://blog.logrocket.com/develop-test-deploy-smart-contracts-ganache/
