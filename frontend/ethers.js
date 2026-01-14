
const contractAddress = "0x9830fea9d8079a68B6910A65C8747C1651723845";


const ABI = [
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			}
		],
		"name": "registerUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLedgerLength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "list",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amtDeposited_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "history_",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amtDeposited_",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "registered",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}

];

let provider;
let signer;
let contract;


async function connect() {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  contract = new ethers.Contract(contractAddress, ABI, signer);

  const address = await signer.getAddress();
  document.getElementById("status").innerText = "Connected: " + address;
}

async function register() {
  if (!contract) {
    alert("Connect wallet first!");
    return;
  }

  const username = document.getElementById("usernameInput").value;

  if (username.length === 0) {
    alert("Enter username!");
    return;
  }

  const tx = await contract.registerUser(username);
  document.getElementById("status").innerText = "Registering...";
  await tx.wait();
  document.getElementById("status").innerText = "Registered ";
}

async function deposit() {
  if (!contract) {
    alert("Connect wallet first!");
    return;
  }

  const amount = document.getElementById("amountInput").value;

  if (amount.length === 0) {
    alert("Enter amount!");
    return;
  }

  const value = ethers.utils.parseEther(amount);

  const tx = await contract.deposit({ value: value });
  document.getElementById("status").innerText = "Depositing...";
  await tx.wait();
  document.getElementById("status").innerText = "Deposit Successful ";
}

async function loadHistory() {
  if (!contract) {
    alert("Connect wallet first!");
    return;
  }

  const historyBox = document.getElementById("history");
  historyBox.innerText = "Loading history...";

  const length = await contract.getLedgerLength();
  const n = length.toNumber();

  if (n === 0) {
    historyBox.innerText = "No deposits yet.";
    return;
  }

  let text = "";

  for (let i = 0; i < n; i++) {
    const entry = await contract.list(i);

    const name = entry.name;
    const time = new Date(entry.time.toNumber() * 1000).toLocaleString();
    const deposited = ethers.utils.formatEther(entry.amtDeposited_);
    const total = ethers.utils.formatEther(entry.history_);

    text +=
      (i + 1) +
      ". " +
      name +
      "\nTime: " +
      time +
      "\nDeposited: " +
      deposited +
      " ETH" +
      "\nTotal Balance: " +
      total +
      " ETH\n\n";
  }

  historyBox.innerText = text;
}


window.addEventListener("DOMContentLoaded", function () {

  const connectBtn = document.getElementById("connectBtn");
  if (connectBtn) {
    connectBtn.addEventListener("click", connect);
  }

  const registerBtn = document.getElementById("registerBtn");
  if (registerBtn) {
    registerBtn.addEventListener("click", register);
  }

  const depositBtn = document.getElementById("depositBtn");
  if (depositBtn) {
    depositBtn.addEventListener("click", deposit);
  }
const loadBtn = document.getElementById("loadBtn");
  if (loadBtn) {
    loadBtn.addEventListener("click", loadHistory);
  }
  

  const historyBtn = document.getElementById("historyBtn");
  if (historyBtn) {
    historyBtn.addEventListener("click", function () {
      window.location.href = "history.html";
    });
  }

  const backBtn = document.getElementById("backBtn");
  if (backBtn) {
    backBtn.addEventListener("click", function () {
      window.location.href = "index.html";
    });
  }
});
