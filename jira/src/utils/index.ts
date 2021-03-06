import { useEffect, useState } from "react";
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

//在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach(key => {
    //@ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      //@ts-ignore
      delete result[key];
    }
  });
  return result;
};

// hook要以use开头
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// 后面用泛型来规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export const useArray = <T>(entity: T[]) => {
  const [value, setValue] = useState(entity);
  const clear = () => {
    setValue([]);
  };
  const removeIndex = (index: number) => {
    const temp = [...value];
    temp.splice(index, 1);
    setValue(temp);
  };

  const add = (item: T) => {
    setValue([...value, item]);
  };

  return { value, clear, removeIndex, add };
};
