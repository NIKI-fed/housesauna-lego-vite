import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { resolve } from 'path';
import path from 'path';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssUrl from 'postcss-url';

const root = resolve(__dirname, './src')
const outDir = resolve(__dirname, 'dist')

export default defineConfig({
        preview: {
        port: 8080,
        strictPort: true,
    },
    server: {
        port: 8080,
        open: true,
        strictPort: true,
        host: true,
        origin: "http://0.0.0.0:8080",
    },

    plugins: [
                ViteImageOptimizer({
                    png: {
                        quality: 70,
                    },
                    jpeg: {
                        quality: 70,
                    },
                    jpg: {
                        quality: 70,
                    },
                }),
            ],

    root,

    resolve: {
        alias: {
            '@img': path.resolve(root, 'img'),
            '@': root
        }
    },

    css: {
        devSourcemap: true,    // Включает source maps в режиме разработки
        sourcemap: true,       // Включает source maps для production-сборки
        postcss: {
            map: true,
            plugins: [
                // require('postcss-discard-comments')(),
                // require('autoprefixer')({
                //     map: true
                // }),
                autoprefixer(),
                cssnano({ preset: 'default' }),
                postcssUrl({ url: 'rebase' })
            ],
        },
        preprocessorOptions: {
            scss: {
                sourceMap: true,  // Включение source maps для SCSS
                // implementation: 'sass',
                // additionalData: `@use "@/styles/variables.scss" as *;`
            },
        },
    },

    build: {
        outDir,   // Директория вывода результатов сборки
        sourcemap: true,  // Генерация Source Maps для JS и CSS
        emptyOutDir: true,
        assetsInlineLimit: 4096, // Максимальный размер ресурсов для встраивания inline
        minify: 'esbuild',     // Минификация JS и HTML файлов
        cssMinify: 'esbuild', // Минификация с сохранением source maps

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
                chunkFileNames: 'js/[name]-[hash].js',                
                assetFileNames: ({ name }) => {
                                    name = name?.toLowerCase() ?? '';

                                    if (/\.(ttf|otf|woff|woff2|eot)$/.test(name)) {
                                        return 'fonts/[name]-[hash][extname]'
                                    }
                
                                    if (/\.(gif|jpe?g|png|svg|webp)$/.test(name)){
                                        return 'img/[name]-[hash][extname]'
                                    }
                
                                    if (/\.css$/.test(name)) {
                                        return 'css/style-[hash][extname]'
                                    }

                                    return 'assets/[name]-[hash][extname]'
                                },
            },
        },
    },
    
});