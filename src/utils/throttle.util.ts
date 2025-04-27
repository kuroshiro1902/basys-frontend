// export function throttle<T extends (...args: any[]) => any>(func: T, limit: number) {
//   let lastFunc: ReturnType<typeof setTimeout> | undefined;
//   let lastRan: number | undefined;

//   return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
//     const context = this;

//     if (!lastRan) {
//       func.apply(context, args);
//       lastRan = Date.now();
//     } else {
//       clearTimeout(lastFunc);
//       lastFunc = setTimeout(function() {
//         if ((Date.now() - lastRan!) >= limit) {
//           func.apply(context, args);
//           lastRan = Date.now();
//         }
//       }, limit - (Date.now() - lastRan));
//     }
//   };
// }

export function throttle<T extends (...args: any[]) => any>(func: T, limit: number) {
  let lastRan: number | undefined;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this;
    const now = Date.now();

    if (!lastRan || now - lastRan >= limit) {
      func.apply(context, args);
      lastRan = now;
    }
  };
}
