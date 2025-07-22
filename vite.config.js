import { defineConfig } from 'vite';
import { resolve } from 'path';

const root = resolve(__dirname, './src');
const outDir = resolve(__dirname, './dist');

export default defineConfig({

    server: {
        port: 8080,
        open: true,
        strictPort: true,
        host: true,
        origin: "http://0.0.0.0:8080",
    },

    preview: {
        port: 8081,
        open: true,
    },

    root,

    css: {
        devSourcemap: true,
        sourcemap: true,
        postcss: {
            map: true
        },
    },

    build: {
        outDir,
        emptyOutDir: true,
        assetsInlineLimit: 4096,
        minify: 'esbuild',
        cssMinify: 'esbuild',
        sourcemap: true,
        

        rollupOptions: {
            input: {
                main: resolve(root, 'index.html'),
                about: resolve(root, 'about.html'),
                design: resolve(root, 'design.html'),
                house_project: resolve(root, 'house-project.html'),
                house: resolve(root, 'house.html'),
                houses: resolve(root, 'houses.html'),
                production: resolve(root, 'production.html'),
                supplier: resolve(root, 'supplier.html')
            },

            output: {
                entryFileNames: 'js/[name].js',

                // Повторяем структуру папки src/blocks
                chunkFileNames: (chunkInfo) => {
                    const filePath = chunkInfo.facadeModuleId?.replace(/\\/g, '/') ?? '';
                    const blocksPath = filePath.match(/\/blocks\/(.+)\/[^/]+$/)?.[1];
                    return blocksPath 
                        ? `js/blocks/${blocksPath}/[name].js`
                        : 'js/[name].js';
                },
                
                assetFileNames: ({ name }) => {
                name = name?.toLowerCase() ?? '';
                    if (/\.(ttf|otf|woff|woff2|eot)$/.test(name)) {
                        return 'fonts/lightgallery/[name][extname]';
                    }
                    
                    if (/\.(gif|jpe?g|png|webp|svg)$/.test(name)) {
                        return 'img/[name][extname]';
                    }
                    
                    if (/\.css$/.test(name)) {
                        return 'css/[name][extname]';
                    }
                    
                    return 'assets/[name][extname]';
                }
            }
        }
    }
});