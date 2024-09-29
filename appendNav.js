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

   const noOfPages = 8;

   const linksContainer = document.createElement('div');
   for (let i = 0; i < noOfPages; i++) {
      const route = (i + 1).toString().padStart(2, '0');

      linksContainer.innerHTML += `
      <a href="/${route}/" class="size-10 hover:text-[#f5f5f5] hover:bg-[#333] border border-current rounded-full flex items-center justify-center">${i + 1}</a>
   `;
   }

   canvasContainer.innerHTML += `
      <nav class="h-screen font-medium w-[32vw] bg-[#f5f5f5] py-[10vh] flex flex-col gap-10 text-[#333] fixed right-0 top-0 px-[5vw] overflow-y-auto">
        <h1 class="text-center text-2xl font-bold">Some webgl image manipulation practice</h1>
        <p class="px-7 py-2 border border-current rounded-full w-fit">hover to see the magic</p>
        
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
   // handle cursor movement
   document.body.addEventListener('mousemove', ({ x, y }) => {
      gsap.to('#cursor', {
         x, y,
         ease: 'expo',
         duration: 0.7
      });
   });
   document.body.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      gsap.to('#cursor', {
         x: touch.clientX,
         y: touch.clientY,
         ease: 'expo',
         duration: 0.7
      });
   });
   const cursorTw = gsap.to('#cursor', {
      height: 20,
      width: 20,
      ease: 'power1.inOut',
      paused: true
   });
   
   const image = $('.images img');
   image.addEventListener('mouseenter', () => cursorTw.play());
   image.addEventListener('touchstart', () => cursorTw.play());
   image.addEventListener('mouseleave', () => cursorTw.reverse());
   image.addEventListener('touchend', () => cursorTw.reverse());
}
