import { scryptSync, randomBytes } from "crypto";

const password = process.argv[2];

if (!password) {
  console.log("=======================================================");
  console.log("🔑 CMS ADMIN PASSWORD HASH GENERATOR");
  console.log("=======================================================");
  console.log("Error: Please provide the password you want to hash.\n");
  console.log("Usage:");
  console.log("  bun run scripts/generate-password.mjs <your-new-password>");
  console.log("  node scripts/generate-password.mjs <your-new-password>");
  console.log("\nExample:");
  console.log('  bun run scripts/generate-password.mjs "jajang_sukmara"');
  console.log("=======================================================\n");
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const hash = scryptSync(password, salt, 64).toString("hex");
const storedHash = `${salt}:${hash}`;

console.log("=======================================================");
console.log("🔑 CMS ADMIN PASSWORD HASH GENERATOR");
console.log("=======================================================");
console.log(`Password to hash : "${password}"`);
console.log(`Generated Salt   : ${salt}`);
console.log("-------------------------------------------------------");
console.log("Your new ADMIN_PASSWORD_HASH string is:\n");
console.log(storedHash);
console.log("\n-------------------------------------------------------");
console.log("📋 INSTRUCTIONS TO APPLY:");
console.log("1. Open the .env file in the root of your project.");
console.log("2. Replace the ADMIN_PASSWORD_HASH value with the string above:");
console.log(`\n   ADMIN_PASSWORD_HASH="${storedHash}"\n`);
console.log("3. Save .env and restart your dev server (bun run dev).");
console.log("=======================================================\n");
