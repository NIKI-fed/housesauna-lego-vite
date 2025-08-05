import { defineConfig } from 'vite';
import { resolve } from 'path';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import svgSprite from 'vite-plugin-svg-sprite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';

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
            plugins: [
                autoprefixer(),
            ],
            map: true
        },
    },

    resolve: {
        alias: {
            '@img': resolve(root, 'img')
        }
    },

    plugins: [

        createSvgIconsPlugin({
            // Указываем папку с SVG-иконками
            iconDirs: [
                resolve(__dirname, './src/img')
            ],
            
            // Настройка вывода
            symbolId: 'icon-[dir]-[name]', // Формат именования спрайтов
            svgoOptions: true,             // Оптимизация SVG
            
            // Сохранение структуры папок
            preserveFileStructure: true,
            preserveEntrySignatures: true,
            
            // Настройка пути вывода
            outputDir: 'dist/css/',
            // publicPath: '/sprite/',
            
            // Дополнительные настройки
            inject: 'body-last',          // Куда вставлять спрайт
            spriteConfig: {
                mode: {
                symbol: {
                    example: false          // Отключаем пример HTML
                }
                }
            }
        }),

        // createSvgSpritePlugin({
        //     exportType: 'vanilla',
        //     include: 'img/icons/*.svg'
        // }),

        // svgSprite({
        //     // Папка с SVG-иконками
        //     iconDirs: [
        //         resolve(root, __dirname, './src'),
        //     ],
        //     // Символы для использования в спрайте
        //     symbolId: '[name]',
        //     // Настройки для инжектирования спрайта в HTML
        //     inject: true,
        //     // Настройки для разработки
        //     svgoOptions: true,
        //         plugins: [
        //             { name: 'removeAttrs', params: { attrs: ['fill', 'stroke'] } }
        //         ]
            
        // }),



        viteStaticCopy({
            targets: [
                {
                    src: 'img',
                    dest: ''
                }
            ],
        })
    ],

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
                supplier: resolve(root, 'supplier.html'),
                style: resolve(root, 'styles/style.scss'),
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
                
                assetFileNames: ({ name, source }) => {
                    name = name?.toLowerCase() ?? '';

                const srcPath = typeof source === 'string' ? source.replace(/\\/g, '/') : '';
                    // if (/\.(gif|jpe?g|png|webp|svg)$/.test(name)) {
                    //     return 'img/[name][extname]';
                    // }

                    if (/\.(ttf|otf|woff|woff2|eot)$/.test(name)) {
                        return 'fonts/lightgallery/[name][extname]';
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