module.exports = {

  plugins: [require('prettier-plugin-tailwindcss')],
  trailingComma: 'none',
  jsxSingleQuote: true,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  tailwindcss: {
    plugins: ['tailwindcss', 'autoprefixer'],
  },
}