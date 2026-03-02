export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-tailwindcss',
  ],
  ignoreFiles: [
    'dist/**/*',
    'node_modules/**/*',
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen'],
      },
    ],
    'custom-property-empty-line-before': null,
    'rule-empty-line-before': null,
    'at-rule-empty-line-before': null,
    'keyframe-selector-notation': null,
    'selector-pseudo-element-colon-notation': null,
    'declaration-block-single-line-max-declarations': null,
    'declaration-empty-line-before': null,
    'color-function-alias-notation': null,
    'color-function-notation': null,
    'alpha-value-notation': null,
    'value-keyword-case': null,
    'color-hex-length': null,
    'selector-class-pattern': null,
    'number-max-precision': null,
    'property-no-vendor-prefix': null,
    'no-duplicate-selectors': null,
  },
}
