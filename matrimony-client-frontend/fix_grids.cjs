// const fs = require('fs');
// let content = fs.readFileSync('src/pages/UserProfileEditPage.jsx', 'utf8');
// content = content.replace(/<div\s+style={{\s*display:\s*"grid",\s*gridTemplateColumns:\s*"repeat\(2,\s*minmax\(0,\s*1fr\)\)",\s*columnGap:\s*"120px",\s*rowGap:\s*"24px",?\s*}}\s*>/g, "<div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-[120px] md:gap-y-6'>");
// content = content.replace(/<div\s+style={{\s*display:\s*"grid",\s*gridTemplateColumns:\s*"repeat\(2,\s*minmax\(0,\s*1fr\)\)",\s*columnGap:\s*"120px",\s*rowGap:\s*"24px",\s*marginTop:\s*"20px",?\s*}}\s*>/g, "<div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-[120px] md:gap-y-6 mt-5'>");
// content = content.replace(/<div\s+style={{\s*gridColumn:\s*"1 \/ -1",\s*display:\s*"grid",\s*gridTemplateColumns:\s*"repeat\(4,\s*minmax\(0,\s*1fr\)\)",\s*gap:\s*"16px"\s*}}\s*>/g, "<div className='col-span-full grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-x-[120px] md:gap-y-6'>");
// content = content.replace(/<div\s+style={{\s*display:\s*"grid",\s*gridTemplateColumns:\s*"repeat\(3,\s*minmax\(0,\s*1fr\)\)",\s*columnGap:\s*"120px",\s*rowGap:\s*"24px",?\s*}}\s*>/g, "<div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-x-[120px] md:gap-y-6'>");
// fs.writeFileSync('src/pages/UserProfileEditPage.jsx', content);
// console.log('Script executed');
