function debounce(fn: Function, delay: number) {
  // 存储定时标识符，以便清除定时器
  let timer = null
  return function _debounce(...args:any) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

function throttle(fn: Function, delay: number) {
      let timeout = null
      return function(...args: any) {
        if(!timeout){
          timeout = setTimeout(()=>{
            timeout = null;
            fn(...args)
          },delay)
        }
      }
    }

export {
	debounce, throttle
}