import { defineConfig } from 'vite';
// import vueSvgPlugin from '@vitejs/plugin-vue-svg'; // для обработки SVG
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { resolve } from 'path';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import postcssUrl from 'postcss-url';

// const root = resolve(__dirname, '.')
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
                    // https://github.com/FatehAK/vite-plugin-image-optimizer
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
                // '@': resolve(__dirname, '/node_modules/bootstrap'),
                // 'bootstrap': resolve(__dirname, '/node_modules/bootstrap'),
            }
        },

    build: {
        outDir,   // Директория вывода результатов сборки
        emptyOutDir: true,
        assetsInlineLimit: 4096, // Максимальный размер ресурсов для встраивания inline
        minify: true,     // Минификация JS и HTML файлов
        sourcemap: true,  // Генерация Source Maps для JS и CSS
        
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
                // entryFileNames: '[name].js',
                // chunkFileNames: '[name]-[hash].js',                
                assetFileNames: ({ name }) => {
                                    name = name.toLowerCase()

                                    if (/\\.(ttf|otf|woff|woff2|eot)$/.test(name)) {
                                        return 'fonts/[name]-[hash][extname]'
                                    }
                
                                    if (/\.(gif|jpe?g|png|svg)$/.test(name)){
                                        return 'img/[name]-[hash][extname]'
                                    }
                
                                    if (/\.css$/.test(name)) {
                                        return 'css/style-[hash][extname]'
                                    }
                
                                    // default value
                                    return 'assets/[name]-[hash][extname]'
                                },
            },
        },
    },

    // css: {
    //     postcss: {
    //         plugins: [
    //             autoprefixer(),
    //             cssnano({ preset: ['default'] }), // Оптимизация и минимизация CSS
    //             postcssUrl({
    //                 url: 'inline', // Inline for small images or fonts
    //             }),
    //         ],
    //     },
    // },

});





// export default defineConfig({


//     build: {
//         outDir,
//         emptyOutDir: true,
//         rollupOptions: {
//             input: {
//                 main: resolve(root, 'index.html'),
//                 about: resolve(root, 'about.html'),
//             },

//             // output: { // remove hashes from filenames on build
//             //     entryFileNames: `assets/[name].js`,
//             //     chunkFileNames: `assets/[name].js`,
//             //     assetFileNames: `assets/[name].[ext]`,
//             // },
//             output: {
//                 assetFileNames: ({ name }) => {
//                     name = name.toLowerCase()

//                     if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')){
//                         return 'assets/images/[name]-[hash][extname]'
//                     }

//                     if (/\.css$/.test(name ?? '')) {
//                         return 'assets/styles/[name]-[hash][extname]'
//                     }

//                     // default value
//                     return 'assets/[name]-[hash][extname]'
//                 },
//             },
//         }
//     },
// })