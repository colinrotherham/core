module.exports = {
  env: {
    node: true,
  },
  extends: 'semistandard',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  plugins: [
    'json',
  ],
  rules: {
    'array-bracket-spacing': [
      'warn',
      'never',
      {
        arraysInArrays: false,
        objectsInArrays: false,
      },
    ],
    'arrow-parens': [
      'error',
      'as-needed',
    ],
    'capitalized-comments': [
      'warn',
      'always',
      {
        ignorePattern: 'webpack',
      },
    ],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
    }],
    'eol-last': [
      'error',
      'always',
    ],
    'brace-style': [
      'error',
      'stroustrup',
    ],
    'lines-around-comment': [
      'warn',
      {
        beforeLineComment: true,
        beforeBlockComment: true,
        allowBlockStart: false,
        allowClassStart: false,
        allowObjectStart: false,
        allowArrayStart: false,
      },
    ],
    'lines-around-directive': [
      'warn',
      'always',
    ],
    'lines-between-class-members': [
      'warn',
      'always',
    ],
    'object-curly-spacing': [
      'warn',
      'always',
      {
        arraysInObjects: true,
        objectsInObjects: true,
      },
    ],
    'padded-blocks': 0,
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'function',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'multiline-block-like',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'block-like',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'block',
      },
    ],
    'prefer-const': 'warn',
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: [
          'none',
          'all',
          'multiple',
          'single',
        ],
      },
    ],
  },
};
