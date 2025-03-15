#! Create Component - cc.cjs

const fs = require('fs');
const path = require('path');

// Lấy đường dẫn tùy chỉnh từ dòng lệnh
const customPath = process.argv[2];
const srcPath = 'src';

let isGenerateSkeleton = false;
// Có tạo file skeletion không
const addition = process.argv[3];
if (addition === 'sk') {
  isGenerateSkeleton = true;
}
// Kiểm tra xem đường dẫn đã được cung cấp hay chưa
if (!customPath) {
  console.error('Please specify the component path');
  process.exit(1);
}

// Tách tên component từ đường dẫn
let componentName = path.basename(customPath).trim();
componentName = componentName.substring(0, 1).toUpperCase() + componentName.substring(1);
const componentDirPath = customPath.includes('/') ? customPath : `components/${componentName}`;
const componentDir = path.join(__dirname, srcPath, componentDirPath);
const componentPath = path.join(componentDir, `${componentName}.tsx`);
const stylePath = path.join(componentDir, `${componentName}.module.scss`);
const skeletonPath = isGenerateSkeleton ? path.join(componentDir, `${componentName}Skeleton.tsx`) : '';
const indexPath = path.join(componentDir, 'index.tsx');
const template = `import s from './${componentName}.module.scss'
type props = {
	
};

function ${componentName}({}: props){
  return (
    <div className={s.${componentName}}>
      ${componentName} component
    </div>
  )
};

export default ${componentName};
`;

const skeleton = isGenerateSkeleton
  ? `import s from './${componentName}.module.scss'
type props = {
	
};

function ${componentName}Skeleton({}: props){
  return (
    <div className={s.${componentName}} data-skeleton>
      Loading ${componentName} component...
    </div>
  )
};

export default ${componentName}Skeleton;
`
  : '';

const index =
  `export { default as ${componentName} } from './${componentName}';\n` +
  (isGenerateSkeleton ? `export { default as ${componentName}Skeleton } from './${componentName}Skeleton';\n` : '');

const css =
  `.${componentName} {\n\t\n}\n` + (isGenerateSkeleton ? `\n.${componentName}[data-skeleton] {\n\t\n}\n` : '');

// Kiểm tra và tạo thư mục nếu nó chưa tồn tại
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

// Tạo file .tsx cho component
fs.writeFileSync(componentPath, template, 'utf8');
// Tạo file .scss cho component
fs.writeFileSync(stylePath, css, 'utf8');
// Tạo file skeleton
isGenerateSkeleton && fs.writeFileSync(skeletonPath, skeleton, 'utf8');
// Tạo file index
fs.writeFileSync(indexPath, index, 'utf8');

console.log(`'${componentName}' has been created at ${srcPath + '/' + componentDirPath}`);

// Đặt file cùng cấp với package.json.
// Thêm "cc": "node ./cc.cjs" vào scripts trong package.json.
/*
  Mở Git Bash terminal.
  Cấp quyền cho script:
  >> chmod +x cc.cjs
*/

/*
  Tạo một component mới:
  (mặc định component sẽ nằm trong thư mục components nếu không chỉ định đường dẫn cụ thể)
  
  >> npm run cc MyComponent 
    -> src/components/MyComponent/ MyComponent.tsx + MyComponent.module.scss 

  >> npm run cc customPath/MyComponent 
    -> src/customPath/MyComponent/ MyComponent.tsx + MyComponent.module.scss

  >> npm run cc MyComponent sk
    -> src/components/MyComponent/ MyComponent.tsx + MyComponent.module.scss + MyComponentSkeleton.tsx
*/
