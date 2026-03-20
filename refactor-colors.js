const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      if (!dirFile.includes('.next') && !dirFile.includes('node_modules')) {
        filelist = walkSync(dirFile, filelist);
      }
    } else {
      if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const files = walkSync(path.join(process.cwd(), 'app')).concat(walkSync(path.join(process.cwd(), 'components')));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace utility classes
  content = content.replace(/\btext-white\b/g, 'text-foreground');
  content = content.replace(/\btext-white\//g, 'text-foreground/');
  content = content.replace(/\bbg-white\//g, 'bg-foreground/');
  content = content.replace(/\bborder-white\//g, 'border-foreground/');
  content = content.replace(/\bdivide-white\//g, 'divide-foreground/');
  
  // Exception: if it's a primary or danger button, we might want to ensure text is white or black depending on the button background.
  // Actually text-foreground will adapt. Let's see if that's acceptable.

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log("Updated: " + file);
  }
});
