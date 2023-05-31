export const getImage = (img: Buffer) => {
  if (img) {
    const buffer = Buffer.from(img);
    const base64String = buffer.toString('base64');
    let mimeType = 'image/png';

    // Check the file format based on the buffer content
    if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
      mimeType = 'image/jpeg';
    }

    const dataURL = `data:${mimeType};base64,${base64String}`;
    return dataURL;
  }
  return '';
};
