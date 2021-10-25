export async function getMP3FileList() {
  const fetchResult = await fetch("/api/files");
  const json = await fetchResult.json();

  return json;
}

export async function fetchFiles() {
  return await getMP3FileList();
}
