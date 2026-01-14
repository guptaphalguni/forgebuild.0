const CONTRACT_ADDRESS = "PASTE_CONTRACT_ADDRESS_HERE";
const ABI = [
 
];

let provider;
let signer;
let contract;

const statusP = document.getElementById("status");
const historyP = document.getElementById("history");

async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not found");
    return;
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  const address = await signer.getAddress();
  statusP.innerText = "Connected: " + address;
}

async function loadHistory() {
  if (!contract) {
    historyP.innerText = "Connect wallet first.";
    return;
  }

  const length = await contract.getLedgerLength();
  const n = length.toNumber();

  if (n === 0) {
    historyP.innerText = "No history found.";
    return;
  }

  let result = "";
  const show = 10;
  const start = Math.max(0, n - show);

  for (let i = n - 1; i >= start; i--) {
    const entry = await contract.list(i);

    const name = entry.name;
    const time = new Date(Number(entry.time) * 1000).toLocaleString();
    const amount = ethers.utils.formatEther(entry.amtDeposited_);
    const total = ethers.utils.formatEther(entry.history_);

    result +=
      "#" + i + " | " + time +
      "\nName: " + name +
      "\nDeposited: " + amount + " ETH" +
      "\nTotal: " + total + " ETH\n\n";
  }

  historyP.innerText = result;
}

document.getElementById("connectBtn").onclick = connectWallet;
document.getElementById("loadBtn").onclick = loadHistory;

document.getElementById("backBtn").onclick = () => {
  window.location.href = "index.html";
};
