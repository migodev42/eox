import pkg from './package.json';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel'

const makeExternalPredicate = (externalArr) => {
  if (externalArr.length === 0) {
    return () => false
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`)
  return (id) => pattern.test(id)
}

export default [
  // CommonJS
  {
    input: 'src/index.tsx',
    output: { dir: 'dist/lib', format: 'cjs', indent: false, }, // file: 'es/Jhooks.js',
    external: makeExternalPredicate([
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ]),
    plugins: [
      alias(alias_config),
      nodeResolve({ extensions }),
      commonjs(),
      postcss({
        extensions: ['.less'],
        modules: true,
        use: {
          sass: null,
          stylus: null,
          less: true,
          // less: { javascriptEnabled: true }
        },
      }),
      typescript({
        'declaration': true,  // 配置输出.d.ts
        'declarationMap': true,  // 输出从.d.ts映射回.ts的map，让vscode等ide可以做变量声明跳转
        'emitDeclarationOnly': true,  // 只输出.d.ts，不生成编译后的js结果
        'outDir': 'dist/lib',
        'target': 'esnext',  // ecmascript版本:最新
        'module': 'commonjs',
        'jsx': 'react-jsx'
      }),
      babel({
        babelHelpers: 'runtime',
        extensions,
      }),

    ],
  }
]