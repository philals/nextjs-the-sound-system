export async function getMP3FileList() {
  const fetchResult = await fetch(
    "https://api.github.com/repos/philals/nextjs-the-sound-system/git/trees/main?recursive=1"
  );
  const json = await fetchResult.json();

  const files = json.tree
    .filter((file) => file.path.includes("public/mp3") && file.type === "blob")
    .map((file) => file.path.replace("public", ""));

  return files;
}

export async function fetchFilesFromGitHub() {
    return await getMP3FileList()
  }