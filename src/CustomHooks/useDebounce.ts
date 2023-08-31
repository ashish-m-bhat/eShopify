// Returns a function. Use that function as a handler instead

const useDebounce = <T>(cb: (...args: T[]) => void, delay: number) => {
        let timer: ReturnType<typeof setTimeout>;
        return function(...args: T[]){
          timer && clearTimeout(timer);
          timer = setTimeout(()=>cb(...args), delay);
        }
}

export default useDebounce;
