import {defineConfig, globalIgnores} from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  {
    rules: {
      'quotes': ['error', 'single'],       // 문자열은 single quotes
      'comma-dangle': ['error', 'never'],  // 마지막 콤마 금지
      'semi': ['error', 'always'],         // 세미콜론 필수
      'indent': ['error', 2],              // 들여쓰기 2칸
    },
  },

])
