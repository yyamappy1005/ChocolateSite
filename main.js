import img0 from './assets/images/image0.jpg'
import img1 from './assets/images/image1.jpg'
import img2 from './assets/images/image2.jpg'
import gsap from 'gsap'
class main {
  constructor() {
    this.images = [img0,img1,img2]
    this.sliderText = ['CHOCOLATE','RASPBERRY','CHERRY PIE']
    this.sliderPath = []
    this.title =  document.getElementById('slideTitle');
    this.item = document.getElementById('slideItem');
    this.dots = document.querySelectorAll('.-dots li');
    this.slideNum = 0
    this.loader()
  }

  async loader() {
    await Promise.all(this.images.map(async (item,index) => await this.imagePush(item,index)))
    this.init()
  }

  async imagePush(obj,index) {
    const img = new Image()
    img.src = obj
    await img.decode()

    this.sliderPath[index] = {
      text: this.sliderText[index],
      img: img
    }
  }

  init() {
    gsap.timeline()
    .to('#cover', {
      duration:3,
      x:108,
      delay:1
    })
    .to('.-back-img', {
      x:50,
      opacity:0,
      duration:1,
      delay:0.5
    })
    .to('.loading', {
      scaleX:0,
      duration:0.5,
    },'-=0.2')
    .to('.js-fadein', {
      opacity:1,
      duration:1.5,
      delay:0.5,
      ease:'Circ.easeIn',
      onComplete: () => {
        setInterval(this.slider.bind(this),6000);
      }
    })
  }

  slider() {
    gsap.timeline()
    .to('.-slide-title',{
      x:50,
      opacity:0,
      duration:0.5
    })
    .set('.-slide-item', {
      className:'-slide-item -slide-item__cover'
    },'-=0.5')
    .add(this.setItem.bind(this),1.5)
    .set('.-slide-title',{
      x:-50
    })
    .to('.-slide-title',{
      x:0,
      opacity:1,
      duration:0.5
    })
    .set('.-slide-item',{
      className:'-slide-item'
    },"-=0.2")
  }

  setItem() {
    this.dots[this.slideNum].classList.remove('-active');
    this.slideNum += 1;
    if(this.slideNum === 3) {
      this.slideNum = 0;
    }
    
    this.item.style.backgroundImage = `url(${this.sliderPath[this.slideNum].img.currentSrc})`;
    this.title.innerText = this.sliderPath[this.slideNum].text;
    this.dots[this.slideNum].classList.add('-active');
  }

}

addEventListener('load', _ => {
  new main()
})