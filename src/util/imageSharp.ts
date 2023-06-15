const resizeImage = async (image: Buffer, resolution: number) => {
  const sharp = require('sharp');

  if (image) {
    const resizedImageBuffer = await sharp(image).resize(resolution).toBuffer();
    return resizedImageBuffer;
  }
};
export { resizeImage };
