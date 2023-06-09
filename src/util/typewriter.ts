export function typeWriter(
  whichElement: string,
  durationTime: number,
  afterDelete: boolean = false,
  afterDeleteDuration: number = 700,
  infinite: boolean = false
): void {
  whichElement === 'all' ? (whichElement = '.typewriter') : null;

  let elements = document.querySelectorAll<HTMLElement>(whichElement);
  elements.forEach((element: HTMLElement) => {
    let i = 0;
    let k = 0;
    let txt: string = element.innerText;
    element.innerText = '';
    element.style.display = 'block';
    setTimeout(write, durationTime);

    function write(): void {
      let speed = Math.floor(Math.random() * 40) + 60;
      if (i < txt.length) {
        element.innerHTML += txt.charAt(i);
        i++;
        setTimeout(write, speed);
      } else if (afterDelete) {
        setTimeout(del, afterDeleteDuration);
      }
    }

    function del(): void {
      const speed = Math.floor(Math.random() * 60) + 80;
      if (k < txt.length) {
        let a: string[] = element.innerText.split('');
        a.pop();
        element.innerText = a.join('');
        k++;
        setTimeout(del, speed);
      } else if (infinite) {
        i = 0;
        k = 0;
        setTimeout(write, durationTime);
      }
    }
  });
}
