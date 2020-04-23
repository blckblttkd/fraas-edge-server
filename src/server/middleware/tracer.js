/**
 * @returns {string}
 */
function randomString() {
   const CHARS = '0123456789abcdefghijklmnopqrstuvwxyz';
   let ans = '';
   // eslint-disable-next-line no-plusplus
   for (let i = 16; i > 0; --i) {
      ans
         += CHARS[Math.floor(Math.random() * CHARS.length)];
   }
   return ans;
}

export default function createTracer(req, res, next) {
   req.tracer = randomString();
   next();
}
