const base64StringToBlob = (base64String: string, type: string): Blob => {
  const sliceSize = 512;
  const byteCharacters = atob(
    base64String.slice(base64String.indexOf(',') + 1)
  );
  const byteArrays: Uint8Array[] = [];
  let offset = 0;

  while (offset < byteCharacters.length) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
    offset += sliceSize;
  }

  return new Blob(byteArrays, { type });
};
export { base64StringToBlob };
