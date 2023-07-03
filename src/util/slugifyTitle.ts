import slugify from 'slugify';

const slugifyText = (text: string): string => {
  const slug = slugify(text, {
    lower: true, // Convert the slug to lowercase
    remove: /[*+~.()'"!:@]/g, // Remove special characters
    strict: true, // Replace whitespace with hyphens
  });

  return slug;
};

export default slugifyText;
