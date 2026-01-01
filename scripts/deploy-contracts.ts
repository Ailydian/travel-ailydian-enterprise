/**
 * Smart Contract Deployment Script
 * Deploys BookingNFT, PaymentEscrow, and LoyaltyToken contracts
 *
 * Usage:
 * npx hardhat run scripts/deploy-contracts.ts --network polygon
 */

import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

interface DeploymentAddresses {
  bookingNFT: string;
  paymentEscrow: string;
  loyaltyToken: string;
  network: string;
  deployer: string;
  timestamp: string;
}

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("═══════════════════════════════════════════════════");
  console.log("🚀 AILYDIAN Smart Contract Deployment");
  console.log("═══════════════════════════════════════════════════");
  console.log();

  console.log("📝 Deploying contracts with account:", deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(await deployer.provider.getBalance(deployer.address)), "ETH");
  console.log();

  // Get network info
  const network = await ethers.provider.getNetwork();
  console.log("🌐 Network:", network.name, `(Chain ID: ${network.chainId})`);
  console.log();

  // ============================================
  // 1. Deploy BookingNFT
  // ============================================
  console.log("📦 Deploying BookingNFT...");
  const BookingNFT = await ethers.getContractFactory("BookingNFT");
  const bookingNFT = await BookingNFT.deploy();
  await bookingNFT.waitForDeployment();
  const bookingNFTAddress = await bookingNFT.getAddress();

  console.log("✅ BookingNFT deployed to:", bookingNFTAddress);
  console.log();

  // ============================================
  // 2. Deploy PaymentEscrow
  // ============================================
  console.log("📦 Deploying PaymentEscrow...");
  const feeRecipient = deployer.address; // Platform fee recipient
  const PaymentEscrow = await ethers.getContractFactory("PaymentEscrow");
  const paymentEscrow = await PaymentEscrow.deploy(feeRecipient);
  await paymentEscrow.waitForDeployment();
  const paymentEscrowAddress = await paymentEscrow.getAddress();

  console.log("✅ PaymentEscrow deployed to:", paymentEscrowAddress);
  console.log("   Fee Recipient:", feeRecipient);
  console.log();

  // ============================================
  // 3. Deploy LoyaltyToken
  // ============================================
  console.log("📦 Deploying LoyaltyToken...");
  const LoyaltyToken = await ethers.getContractFactory("LoyaltyToken");
  const loyaltyToken = await LoyaltyToken.deploy();
  await loyaltyToken.waitForDeployment();
  const loyaltyTokenAddress = await loyaltyToken.getAddress();

  console.log("✅ LoyaltyToken deployed to:", loyaltyTokenAddress);
  console.log();

  // ============================================
  // Save Deployment Addresses
  // ============================================
  const deploymentInfo: DeploymentAddresses = {
    bookingNFT: bookingNFTAddress,
    paymentEscrow: paymentEscrowAddress,
    loyaltyToken: loyaltyTokenAddress,
    network: network.name,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  };

  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const deploymentFile = path.join(
    deploymentsDir,
    `${network.name}-${network.chainId}.json`
  );

  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));

  console.log("═══════════════════════════════════════════════════");
  console.log("✅ Deployment Complete!");
  console.log("═══════════════════════════════════════════════════");
  console.log();
  console.log("📄 Contract Addresses:");
  console.log("   BookingNFT:     ", bookingNFTAddress);
  console.log("   PaymentEscrow:  ", paymentEscrowAddress);
  console.log("   LoyaltyToken:   ", loyaltyTokenAddress);
  console.log();
  console.log("💾 Deployment info saved to:", deploymentFile);
  console.log();
  console.log("🔍 Next Steps:");
  console.log("   1. Verify contracts on block explorer");
  console.log("   2. Update .env with contract addresses");
  console.log("   3. Grant REWARDER_ROLE to backend service");
  console.log("   4. Test contract interactions");
  console.log();
  console.log("📋 Verification Commands:");
  console.log(`   npx hardhat verify --network ${network.name} ${bookingNFTAddress}`);
  console.log(`   npx hardhat verify --network ${network.name} ${paymentEscrowAddress} ${feeRecipient}`);
  console.log(`   npx hardhat verify --network ${network.name} ${loyaltyTokenAddress}`);
  console.log();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
