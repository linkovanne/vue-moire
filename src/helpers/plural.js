export default function plural(value, variants, defaultValue = '[pluralization failed ({type})]') {
  const type = (new Intl.PluralRules()).select(value);

  return variants[type]
    ? variants[type].replace('{n}', value)
    : defaultValue.replace('{type}', type);
}
