const resizeImage = async (image: Buffer, resolution: number) => {
  const sharp = require('sharp');

  if (image) {
    console.log('eğvle');

    const resizedImageBuffer = await sharp(image).resize(resolution).toBuffer();
    return resizedImageBuffer;
  }
};
export { resizeImage };
