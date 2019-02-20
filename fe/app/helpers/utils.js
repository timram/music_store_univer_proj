export const cleanEvent = func => e => {
  e.preventDefault();
  e.stopPropagation();
  func();
}

export const getHOCprops = (HOCprops, componentProps) =>
  typeof HOCprops === 'function'
    ? HOCprops(componentProps)
    : HOCprops