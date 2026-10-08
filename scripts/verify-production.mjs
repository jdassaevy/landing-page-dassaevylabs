import fs from "node:fs";
const requiredFiles = ["public/images/julio-dassaevy.webp", "public/cases/students-registration.webp", "public/brand/logo.png"];
const missingFiles = requiredFiles.filter((file) => !fs.existsSync(file));
const requiredEnv = ["RESEND_API_KEY", "RESEND_FROM_EMAIL", "QUOTE_RECIPIENT_EMAIL"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingFiles.length || missingEnv.length) {
  console.error("Production gate blocked.");
  if (missingFiles.length) console.error("Missing files:", missingFiles.join(", "));
  if (missingEnv.length) console.error("Missing env:", missingEnv.join(", "));
  process.exit(1);
}
console.log("Production gate passed.");
