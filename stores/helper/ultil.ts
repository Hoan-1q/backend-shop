const str2Num = (input: string) => {
  if (!input) return null;

  if (input.trim().length === 0) {
    return null;
  }
  return Number(input);
};

const num2Str = (input: number) => {
  if (!input) return null;
  const num = input.toString();
  return num;
};

export { str2Num, num2Str };
