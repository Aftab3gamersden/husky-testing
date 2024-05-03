import { debounce } from 'lodash'; // Import debounce from Lodash
// or define a custom debounce function
export const Debounce = <T extends any[]>(
  func: (...args: T) => void,
  delay: number
): ((...args: T) => void) => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};
