import * as crypto from "crypto";

const secretKey = "ebd5d70b8052b9af8a41d0b7cd212625";

// Encrypt function
export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(16); // Generate a random IV (Initialization Vector)
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey),
    iv,
  );
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + encrypted;
};

// Decrypt function
export const decrypt = (encryptedText: string): string => {
  // console.log(encryptedText, "encryptedText");

  const iv = Buffer.from(encryptedText.slice(0, 32), "hex"); // Extract IV from the encrypted text
  const encryptedData = encryptedText.slice(32); // Extract encrypted data from the text
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey),
    iv,
  );
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
