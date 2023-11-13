import fs from "fs";

const env = process.env.NODE_ENV ?? "development";

export function getConfig() {
  let data = "";

  if (env === "development") {
    data = fs.readFileSync("./.env.development", "utf8");
  } else if (env === "production") {
    data = fs.readFileSync("./.env.production", "utf8");
  }

  const lines = data.split("\n").filter((line) => line !== "");

  let envObject: { [key: string]: string } = {};
  // Read each line and set the environment variable separated by "="
  lines.forEach((line) => {
    const [key, value] = line.split("=");
    envObject[key.trim()] = value.trim();
  });

  return envObject;
}
