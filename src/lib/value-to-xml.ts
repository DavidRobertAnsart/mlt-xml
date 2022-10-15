const XML_CHARACTER_MAP = {
  '&': '&amp;',
  '"': '&quot;',
  "'": '&apos;',
  '<': '&lt;',
  '>': '&gt;',
};

export function espaceValueForXml(value: string | number | boolean): string {
  if (typeof value === 'boolean') {
    return value ? '1' : '0';
  }
  if (typeof value === 'number') {
    return `${value}`;
  }
  return value.replace(/([&"<>'])/g, (_str, item: keyof typeof XML_CHARACTER_MAP) => XML_CHARACTER_MAP[item]);
}
