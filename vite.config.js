import { defineConfig } from 'vite';
import {fileURLToPath} from "url";
import { resolve } from 'path';
import autoprefixer from 'autoprefixer';
import svgSpritemap from 'vite-plugin-svg-spritemap'
import { viteStaticCopy } from 'vite-plugin-static-copy';
import fs from 'fs';
import path from 'path';

const root = resolve(__dirname, './src');
const outDir = resolve(__dirname, './dist');

// Заменяем все /img/icon-*.svg на svg из спрайта
function replaceSvgToSprite() {
    return {
        name: 'replace-svg-to-sprite',
        apply: 'build',
        writeBundle() {
            
            function processDirectory(dir) {
                if (!fs.existsSync(dir)) return;
                
                const files = fs.readdirSync(dir);
                
                files.forEach(file => {
                    const filePath = path.join(dir, file);
                    const stat = fs.statSync(filePath);
                    
                    if (stat.isDirectory()) {
                        processDirectory(filePath);
                    } else if (file.endsWith('.html')) {
                        processHtmlFile(filePath);
                    }
                });
            }
            
            function processHtmlFile(filePath) {
                try {
                    const relativePath = path.relative(outDir, filePath);
                    // console.log(`📄 Processing: ${relativePath}`);
                    
                    let html = fs.readFileSync(filePath, 'utf8');
                    
                    // Заменяем пути на спрайт
                    const newHtml = html.replace(
                        /<use href="\/img\/icon-([a-zA-Z0-9-]+)\.svg"><\/use>/g,
                        '<use href="/img/sprite.svg#icon-$1"></use>'
                    );
                    
                    if (newHtml !== html) {
                        fs.writeFileSync(filePath, newHtml, 'utf8');
                        // console.log(`   ✅ Replaced SVG paths`);
                    } else {
                        // console.log(`   ℹ️ No SVG paths found to replace`);
                    }
                } catch (error) {
                    console.error(`   ❌ Error: ${error.message}`);
                }
            }
            
            processDirectory(outDir);
            console.log('✅ HTML processing completed');
        }
    };
};

// Форматируем спрайт после его создания для читаемости
function formatSpritePlugin() {
    return {
        name: 'format-sprite-plugin',
        apply: 'build',
        closeBundle() {
            setTimeout(() => {
                try {
                    const spritePath = path.resolve(outDir, 'img/sprite.svg');
                    if (fs.existsSync(spritePath)) {
                        let content = fs.readFileSync(spritePath, 'utf8');
                        // Добавляем переносы ДО <symbol и ПОСЛЕ </symbol>
                        content = content
                            .replace(/<symbol/g, '\n\n<symbol')
                            .replace(/<\/svg>/g, '\n\n</svg>')
                        fs.writeFileSync(spritePath, content, 'utf8');
                    } else {
                        console.log('❌ Sprite not found:', spritePath);
                    }
                } catch (error) {
                    console.error('❌ Error formatting sprite:', error);
                }
            }, 100); // Небольшая задержка чтобы файл точно был записан
        }
    };
};

// Плагин для замены переменной $env на зкщвгсешщт
function replaceEnvVariablePlugin() {
    let originalContent = null;
    const filePath = path.resolve(__dirname, 'src/styles/variables.scss');
    
    return {
        name: 'replace-env-variable',
        apply: 'build',
        
        buildStart() {
            
            try {
                // Сохраняем оригинальное содержимое
                originalContent = fs.readFileSync(filePath, 'utf8');
                
                // Меняем на production
                const productionContent = originalContent.replace(
                    "$env: 'development' !default;",
                    "$env: 'production' !default;"
                );
                
                fs.writeFileSync(filePath, productionContent, 'utf8');
                console.log('✅ Переменная $env установлена в production');
                
            } catch (error) {
                console.log('❌ Ошибка:', error.message);
            }
        },
        
        closeBundle() {
            if (originalContent) {
                try {
                    // Возвращаем оригинальное содержимое
                    fs.writeFileSync(filePath, originalContent, 'utf8');
                    console.log('↩️ Вернули исходное значение development');
                } catch (error) {
                    console.log('⚠️ Не удалось вернуть исходное значение');
                }
            }
        }
    };
}

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
        alias: 
            {
                '@img': path.resolve(__dirname, './src/img')
            }
    },

    plugins: [
        replaceEnvVariablePlugin(),

        svgSpritemap({
            pattern: 'src/img/icons/*.svg', // Путь к SVG иконкам
            filename: 'img/sprite.svg', // Итоговый спрайт
            svgo: false,
            symbols: {
                prefix: 'icon-',
                id: '{name}'
            }
        }),
        
        formatSpritePlugin(),
        replaceSvgToSprite(),

        // viteStaticCopy({
        //     targets: [
        //         {
        //             src: 'img',
        //             dest: '',
        //             filter: (filePath) => !filePath.includes('icons') // Исключаем иконки
        //         }
        //     ],
        // })
    ],

    base: './',

    build: {
        outDir,
        emptyOutDir: true,
        assetsInlineLimit: 0,
        minify: 'esbuild',
        cssMinify: 'esbuild',
        sourcemap: true,

        rollupOptions: {
            input: {
                main: resolve(root, 'index.html'),
                about: resolve(root, 'about.html'),
                contact_form: resolve(root, 'contact-form.html'),
                design: resolve(root, 'design.html'),
                house_project: resolve(root, 'house-project.html'),
                house: resolve(root, 'house.html'),
                houses: resolve(root, 'houses.html'),
                production: resolve(root, 'production.html'),
                supplier: resolve(root, 'supplier.html'),
                agreement: resolve(root, 'agreement.html'),
                best: resolve(root, 'advantages.html'),
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

                    if (/\.(svg|jpg|jpeg|png|webp)$/.test(name)) {
                        return 'img/[name][extname]';
                    }

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