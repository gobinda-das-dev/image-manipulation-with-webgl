import gsap from "gsap";

const $ = (e, p = document) => p.querySelector(e);
const $$ = (e, p = document) => p.querySelectorAll(e);




// Calling F(x)
appendNav();
appendCursor();
handleCursorMovement();






// Imp F(x)
function appendNav() {
   const canvasContainer = $('.canvas');
   const currentPath = window.location.pathname;
   const noOfPages = 9;

   const linksContainer = document.createElement('div');
   for (let i = 1; i <= noOfPages; i++) {
      const route = i.toString().padStart(2, '0');
      const finalRoute = `/${route}/`;
      if (currentPath === finalRoute) {
         linksContainer.innerHTML += `
            <a href="${finalRoute}" data-cursor-scale="0.5" class="size-10 text-[#f5f5f5] bg-[#333] border border-current rounded-full flex items-center justify-center">${i}</a>
         `;
      } else {
         linksContainer.innerHTML += `
            <a href="${finalRoute}" data-cursor-scale="0.5" class="size-10 transition-all hover:text-[#f5f5f5] hover:bg-[#333] border border-current rounded-full flex items-center justify-center">${i}</a>
         `;
      }

   }

   canvasContainer.innerHTML += `
      <nav class="h-screen font-medium w-[32vw] bg-[#f5f5f5] py-[10vh] flex flex-col gap-10 text-[#333] fixed right-0 top-0 px-[5vw] overflow-y-auto">
        <h1 class="text-center text-2xl font-bold">Some webgl image manipulation practice</h1>
        <p class="px-7 py-2 border border-current rounded-full w-fit cursor-not-allowed">hover to see the magic</p>
        
        <div class="w-[80%] space-y-2">
          <p>Varients:</p>
          <div class="flex flex-wrap gap-2">${linksContainer.innerHTML}</div>
        </div>
      </nav>
`;
}

function appendCursor() {
   // Append cursor
   document.body.insertAdjacentHTML('afterbegin', `
      <div id="cursor" class="size-10 rounded-full border-2 pointer-events-none border-pink-600 fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-10"></div>
   `);
}

function handleCursorMovement() {
   const cursor = $('#cursor');

   const mouse = { x: 0, y: 0 }
   const smoothMouse = { x: 0, y: 0 }
   const mouseVelocity = { x: 0, y: 0 }
   const lerp = (x, y, a) => x * (1 - a) + y * a;

   window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
   })

   gsap.set(cursor, { xPercent: -50, yPercent: -50 })
   const setter = {
      x: gsap.quickSetter(cursor, 'x', 'px'),
      y: gsap.quickSetter(cursor, 'y', 'px'),
      scaleY: gsap.quickSetter(cursor, 'scaleY'),
      scaleX: gsap.quickSetter(cursor, 'scaleX'),
      rotation: gsap.quickSetter(cursor, 'rotation', 'deg'),
      wc: gsap.quickSetter(cursor, 'willChange'),
   }

   gsap.ticker.add(() => {
      smoothMouse.x = lerp(smoothMouse.x, mouse.x, 0.2);
      smoothMouse.y = lerp(smoothMouse.y, mouse.y, 0.2);

      mouseVelocity.x = Math.abs(mouse.x - smoothMouse.x);
      mouseVelocity.y = Math.abs(mouse.y - smoothMouse.y);

      const angle = Math.atan2(mouse.y - smoothMouse.y, mouse.x - smoothMouse.x) * (180 / Math.PI);
      const scaleAmount = Math.min((mouseVelocity.x + mouseVelocity.y) * 0.007, 0.7);

      setter.x(smoothMouse.x);
      setter.y(smoothMouse.y);
      setter.scaleY(1 - scaleAmount);
      setter.scaleX(1 + scaleAmount);
      setter.rotation(angle);
      setter.wc('transform');
   })













   const scaleCursor = $$('[data-cursor-scale]');
   const cursorSize = 40;

   scaleCursor.forEach(sc => {
      const scale = sc.getAttribute('data-cursor-scale') * cursorSize;
      console.log(sc);

      sc.addEventListener('mouseenter', () => {
         gsap.to('#cursor', { height: scale, width: scale, duration: 0.3 });
      })
      sc.addEventListener('mouseleave', () => {
         gsap.to('#cursor', { height: cursorSize, width: cursorSize, duration: 0.3 });
      });
   })
}
