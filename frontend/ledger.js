// 1) PASTE contract address here
const CONTRACT_ADDRESS = "PASTE_CONTRACT_ADDRESS_HERE";

// 2) PASTE ABI array here (from out/ledger.sol/Ledger.json -> "abi")
const ABI = [
  // PASTE ABI HERE
];

let provider;
let signer;
let contract;

const statusP = document.getElementById("status");
const outputP = document.getElementById("output");

function show(msg) {
  outputP.innerText = msg;
}

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
  show("Wallet connected");
}

async function registerUser() {
  const username = document.getElementById("usernameInput").value.trim();
  if (!username) {
    show("Enter a username first.");
    return;
  }

  show("Registering...");
  const tx = await contract.registerUser(username);
  await tx.wait();
  show("Registered ✅ Username: " + username);
}

async function depositETH() {
  const amount = document.getElementById("amountInput").value.trim();
  if (!amount || Number(amount) <= 0) {
    show("Enter a valid ETH amount.");
    return;
  }

  show("Depositing...");
  const tx = await contract.deposit({ value: ethers.utils.parseEther(amount) });
  await tx.wait();

  show("Deposit successful " + amount + " ETH");
}

async function myProfile() {
  const address = await signer.getAddress();
  const user = await contract.users(address);

  const username = user.username;
  const totalEth = ethers.utils.formatEther(user.amtDeposited_);
  const time = new Date(Number(user.time) * 1000).toLocaleString();

  show(
    "Username: " + username +
    "\nRegistered at: " + time +
    "\nTotal deposited: " + totalEth + " ETH"
  );
}

// Buttons
document.getElementById("connectBtn").onclick = connectWallet;
document.getElementById("registerBtn").onclick = registerUser;
document.getElementById("depositBtn").onclick = depositETH;
document.getElementById("profileBtn").onclick = myProfile;

// History page button
document.getElementById("historyBtn").onclick = () => {
  window.location.href = "history.html";
};
