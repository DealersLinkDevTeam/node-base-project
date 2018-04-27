function funtime(str) {
  return { cooked: str[0], raw: str.raw[0], thing: str, rawthing: str.raw };
}

function main() {
  let stra = '1111';
  return funtime`\u0127${stra}lift`;
}

console.log(main());
