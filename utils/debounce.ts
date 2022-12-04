function debounce(fn: Function, delay: number) {
  // 存储定时标识符，以便清除定时器
  let timer = null
  return function _debounce() {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}

export {
	debounce
}