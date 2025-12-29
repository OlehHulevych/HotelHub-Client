import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

// Use tseslint.config to automatically flatten the array
export default tseslint.config(
    // 1. Global Ignores
    { ignores: ['dist'] },

    // 2. Base Configurations (Spread these instead of using 'extends')
    js.configs.recommended,
    ...tseslint.configs.recommended,

    // 3. React & Custom Rules
    {
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
      },
      // Register plugins manually if they don't provide a flat config
      plugins: {
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],

        // --- THE FIX ---
        // 1. Disable the base JS rule (crucial!)
        "no-unused-vars": "off",
        // 2. Disable the TS rule (as you wanted)
        "@typescript-eslint/no-unused-vars": "off"
      },
    },
)