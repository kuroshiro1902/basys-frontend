#! Create Module - cm.cjs

const fs = require('fs');
const path = require('path');

// Get custom path from command line
const customPath = process.argv[2];
const srcPath = 'src';

// Check if path is provided
if (!customPath) {
  console.error('Please specify the module path');
  process.exit(1);
}

// Extract module name from path
let moduleName = path.basename(customPath).trim().toLowerCase();
// moduleName = moduleName.substring(0, 1).toUpperCase() + moduleName.substring(1);
const moduleDirPath = customPath.includes('/') ? customPath : `app/${moduleName}`;
const moduleDir = path.join(__dirname, srcPath, moduleDirPath);

const componentName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

// Check if the module already exists
if (fs.existsSync(moduleDir)) {
  console.error(`Module '${moduleName}' already exists at '${moduleDir}'.`);
  process.exit(1);
}

// Define paths for all files and folders
const paths = {
  containers: path.join(moduleDir, 'containers'),
  services: path.join(moduleDir, 'services'),
  hooks: path.join(moduleDir, 'hooks'),
  component: path.join(moduleDir, `${componentName}.tsx`),
  store: path.join(moduleDir, `${moduleName}.store.ts`),
  index: path.join(moduleDir, 'index.ts'),
  useQuery: path.join(moduleDir, 'hooks', `use${moduleName}.hook.ts`),
};

// Templates
const templates = {
  component: `function ${componentName}() {
  return (
    <div>
      ${componentName} component
    </div>
  )
};

export default ${componentName};
`,

  store: `import { create } from 'zustand';

type ${moduleName}Data = {
  state: any;
  setState: (state: any) => void;
};

export const use${moduleName}Store = create<${moduleName}Data>((set) => ({
  state: null,
  setState: (newState) => set({ state: newState }),
}));
`,

  services: `export const ${moduleName}Service = {
  get: async (data: any) => {
    // Implement get logic here
  },
  post: async (data: any) => {
    // Implement post logic here
  },
  patch: async (data: any) => {
    // Implement patch logic here
  },
  // Add more methods as needed
};
`,

  hooks: `import { useQuery, useMutation } from '@tanstack/react-query';
import { ${moduleName}Service } from '../services/${moduleName}.service';

export const ${moduleName}Hook = {
  useGet${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Query: () => {
    return useQuery({
      queryKey: ['${moduleName.toLowerCase()}'],
      queryFn: () => ${moduleName}Service.get({}),
    });
  },

  usePost${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Mutation: () => {
    return useMutation({
      mutationFn: (data) => ${moduleName}Service.post(data),
      // Add onSuccess, onError, etc. as needed
    });
  },
};
`,

  index: `export { default as ${componentName} } from './${componentName}';
export * from './services/${moduleName}.service';
export * from './${moduleName}.store';
export * from './hooks/${moduleName}.hook';
`,
};

// Create directories
[moduleDir, paths.containers, paths.services, paths.hooks].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Create component file
fs.writeFileSync(paths.component, templates.component, 'utf8');

// Create store file
fs.writeFileSync(paths.store, templates.store, 'utf8');

// Create a single service file for all methods
fs.writeFileSync(path.join(paths.services, `${moduleName}.service.ts`), templates.services, 'utf8');

// Create hooks file with organized hooks
fs.writeFileSync(path.join(paths.hooks, `${moduleName}.hook.ts`), templates.hooks, 'utf8');

// Create index file
fs.writeFileSync(paths.index, templates.index, 'utf8');

console.log(`'${moduleName}' module has been created at ${srcPath + '/' + moduleDirPath}`);

/*
  Add to package.json scripts:
  "cm": "node ./cm.cjs"

  Usage:
  >> npm run cm MyModule 
    -> src/modules/MyModule/

  >> npm run cm customPath/MyModule 
    -> src/customPath/MyModule/
*/ 