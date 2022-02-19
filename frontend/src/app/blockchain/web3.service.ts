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
  private contractAddress = "0x4dfa9AA4D75ABFe4b72C25813a1079891CB58D90" // Dirección hash del contrat donde está desplegado --> viene de Ganache

  constructor() {
    // Verificamos si el usurio tiene instalado Metamask
    if (window.web3){
      this.web3 = new Web3(window.ethereum);
      this.contract = new this.web3.eth.Contract(contractAbi,this.contractAddress);

      window.ethereum.enable().catch((err) => {
        console.log(err);
      });
    }else {
      console.warn("Metamask not found. Install or enable Metamask.")
    }
  }
}
