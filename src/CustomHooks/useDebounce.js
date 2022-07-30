// Returns a function. Use that function as a handler instead

const useDebounce = (cb, delay) => {
        let timer;
        return function(...args){
          timer && clearTimeout(timer);
          timer = setTimeout(()=>cb(...args), delay);
        }
}

export default useDebounce