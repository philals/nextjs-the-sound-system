import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const dirRelativeToPublicFolder = "mp3";

  const dir = path.resolve("./public", dirRelativeToPublicFolder);

  const filenames = fs.readdirSync(dir).map((file) => {
    return  "/" + dirRelativeToPublicFolder + "/" + file;
  });

  console.log("filenames", filenames);

  res.statusCode = 200;
  res.json(filenames);
}
