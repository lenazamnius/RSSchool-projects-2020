const sections = ['Action (set A)', 'Action (set B)', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotions', 'Shapes', 'Vehicle'];

const cards = [
  [
    {
      word: 'cry',
      translation: 'плакать',
      image: 'images/cry.jpg',
      audioSrc: 'audio/cry.mp3',
    },
    {
      word: 'dance',
      translation: 'танцевать',
      image: 'images/dance.jpg',
      audioSrc: 'audio/dance.mp3',
    },
    {
      word: 'dive',
      translation: 'нырять',
      image: 'images/dive.jpg',
      audioSrc: 'audio/dive.mp3',
    },
    {
      word: 'draw',
      translation: 'рисовать',
      image: 'images/draw.jpg',
      audioSrc: 'audio/draw.mp3',
    },
    {
      word: 'fish',
      translation: 'ловить рыбу',
      image: 'images/fish.jpg',
      audioSrc: 'audio/fish.mp3',
    },
    {
      word: 'fly',
      translation: 'летать',
      image: 'images/fly.jpg',
      audioSrc: 'audio/fly.mp3',
    },
    {
      word: 'hug',
      translation: 'обнимать',
      image: 'images/hug.jpg',
      audioSrc: 'audio/hug.mp3',
    },
    {
      word: 'jump',
      translation: 'прыгать',
      image: 'images/jump.jpg',
      audioSrc: 'audio/jump.mp3',
    },
  ],
  [
    {
      word: 'open',
      translation: 'открывать',
      image: 'images/open.jpg',
      audioSrc: 'audio/open.mp3',
    },
    {
      word: 'play',
      translation: 'играть',
      image: 'images/play.jpg',
      audioSrc: 'audio/play.mp3',
    },
    {
      word: 'point',
      translation: 'указывать',
      image: 'images/point.jpg',
      audioSrc: 'audio/point.mp3',
    },
    {
      word: 'ride',
      translation: 'ездить',
      image: 'images/ride.jpg',
      audioSrc: 'audio/ride.mp3',
    },
    {
      word: 'run',
      translation: 'бегать',
      image: 'images/run.jpg',
      audioSrc: 'audio/run.mp3',
    },
    {
      word: 'sing',
      translation: 'петь',
      image: 'images/sing.jpg',
      audioSrc: 'audio/sing.mp3',
    },
    {
      word: 'skip',
      translation: 'пропускать',
      image: 'images/skip.jpg',
      audioSrc: 'audio/skip.mp3',
    },
    {
      word: 'swim',
      translation: 'плавать',
      image: 'images/swim.jpg',
      audioSrc: 'audio/swim.mp3',
    },
  ],
  [
    {
      word: 'cat',
      translation: 'кот',
      image: 'images/cat.jpg',
      audioSrc: 'audio/cat.mp3',
    },
    {
      word: 'chick',
      translation: 'цыплёнок',
      image: 'images/chick.jpg',
      audioSrc: 'audio/chick.mp3',
    },
    {
      word: 'chicken',
      translation: 'курица',
      image: 'images/chicken.jpg',
      audioSrc: 'audio/chicken.mp3',
    },
    {
      word: 'dog',
      translation: 'собака',
      image: 'images/dog.jpg',
      audioSrc: 'audio/dog.mp3',
    },
    {
      word: 'horse',
      translation: 'лошадь',
      image: 'images/horse.jpg',
      audioSrc: 'audio/horse.mp3',
    },
    {
      word: 'pig',
      translation: 'свинья',
      image: 'images/pig.jpg',
      audioSrc: 'audio/pig.mp3',
    },
    {
      word: 'rabbit',
      translation: 'кролик',
      image: 'images/rabbit.jpg',
      audioSrc: 'audio/rabbit.mp3',
    },
    {
      word: 'sheep',
      translation: 'овца',
      image: 'images/sheep.jpg',
      audioSrc: 'audio/sheep.mp3',
    },
  ],
  [
    {
      word: 'bird',
      translation: 'птица',
      image: 'images/bird.jpg',
      audioSrc: 'audio/bird.mp3',
    },
    {
      word: 'fish',
      translation: 'рыба',
      image: 'images/fish1.jpg',
      audioSrc: 'audio/fish.mp3',
    },
    {
      word: 'frog',
      translation: 'жаба',
      image: 'images/frog.jpg',
      audioSrc: 'audio/frog.mp3',
    },
    {
      word: 'giraffe',
      translation: 'жирафа',
      image: 'images/giraffe.jpg',
      audioSrc: 'audio/giraffe.mp3',
    },
    {
      word: 'lion',
      translation: 'лев',
      image: 'images/lion.jpg',
      audioSrc: 'audio/lion.mp3',
    },
    {
      word: 'mouse',
      translation: 'мышь',
      image: 'images/mouse.jpg',
      audioSrc: 'audio/mouse.mp3',
    },
    {
      word: 'turtle',
      translation: 'черепаха',
      image: 'images/turtle.jpg',
      audioSrc: 'audio/turtle.mp3',
    },
    {
      word: 'dolphin',
      translation: 'дельфин',
      image: 'images/dolphin.jpg',
      audioSrc: 'audio/dolphin.mp3',
    },
  ],
  [
    {
      word: 'skirt',
      translation: 'юбка',
      image: 'images/skirt.jpg',
      audioSrc: 'audio/skirt.mp3',
    },
    {
      word: 'pants',
      translation: 'брюки',
      image: 'images/pants.jpg',
      audioSrc: 'audio/pants.mp3',
    },
    {
      word: 'blouse',
      translation: 'блузка',
      image: 'images/blouse.jpg',
      audioSrc: 'audio/blouse.mp3',
    },
    {
      word: 'dress',
      translation: 'платье',
      image: 'images/dress.jpg',
      audioSrc: 'audio/dress.mp3',
    },
    {
      word: 'boot',
      translation: 'ботинок',
      image: 'images/boot.jpg',
      audioSrc: 'audio/boot.mp3',
    },
    {
      word: 'shirt',
      translation: 'рубашка',
      image: 'images/shirt.jpg',
      audioSrc: 'audio/shirt.mp3',
    },
    {
      word: 'coat',
      translation: 'пальто',
      image: 'images/coat.jpg',
      audioSrc: 'audio/coat.mp3',
    },
    {
      word: 'shoe',
      translation: 'туфли',
      image: 'images/shoe.jpg',
      audioSrc: 'audio/shoe.mp3',
    },
  ],
  [
    {
      word: 'sad',
      translation: 'грустный',
      image: 'images/sad.jpg',
      audioSrc: 'audio/sad.mp3',
    },
    {
      word: 'angry',
      translation: 'сердитый',
      image: 'images/angry.jpg',
      audioSrc: 'audio/angry.mp3',
    },
    {
      word: 'happy',
      translation: 'счастливый',
      image: 'images/happy.jpg',
      audioSrc: 'audio/happy.mp3',
    },
    {
      word: 'tired',
      translation: 'уставший',
      image: 'images/tired.jpg',
      audioSrc: 'audio/tired.mp3',
    },
    {
      word: 'surprised',
      translation: 'удивлённый',
      image: 'images/surprised.jpg',
      audioSrc: 'audio/surprised.mp3',
    },
    {
      word: 'scared',
      translation: 'испуганный',
      image: 'images/scared.jpg',
      audioSrc: 'audio/scared.mp3',
    },
    {
      word: 'smile',
      translation: 'улыбка',
      image: 'images/smile.jpg',
      audioSrc: 'audio/smile.mp3',
    },
    {
      word: 'laugh',
      translation: 'смех',
      image: 'images/laugh.jpg',
      audioSrc: 'audio/laugh.mp3',
    },
  ],
  [
    {
      word: 'cross',
      translation: 'крест',
      image: 'images/cross.jpg',
      audioSrc: 'audio/cross.mp3',
    },
    {
      word: 'ellipse',
      translation: 'овал',
      image: 'images/ellipse.jpg',
      audioSrc: 'audio/ellipse.mp3',
    },
    {
      word: 'circle',
      translation: 'круг',
      image: 'images/circle.jpg',
      audioSrc: 'audio/circle.mp3',
    },
    {
      word: 'triangle',
      translation: 'треугольник',
      image: 'images/triangle.jpg',
      audioSrc: 'audio/triangle.mp3',
    },
    {
      word: 'square',
      translation: 'квадрат',
      image: 'images/square.jpg',
      audioSrc: 'audio/square.mp3',
    },
    {
      word: 'star',
      translation: 'звезда',
      image: 'images/star.jpg',
      audioSrc: 'audio/star.mp3',
    },
    {
      word: 'rhombus',
      translation: 'ромб',
      image: 'images/rhombus.jpg',
      audioSrc: 'audio/rhombus.mp3',
    },
    {
      word: 'ring',
      translation: 'окружность',
      image: 'images/ring.jpg',
      audioSrc: 'audio/ring.mp3',
    },
  ],
  [
    {
      word: 'car',
      translation: 'машина',
      image: 'images/car.jpg',
      audioSrc: 'audio/car.mp3',
    },
    {
      word: 'bus',
      translation: 'автобус',
      image: 'images/bus.jpg',
      audioSrc: 'audio/bus.mp3',
    },
    {
      word: 'bicycle',
      translation: 'велосипед',
      image: 'images/bicycle.jpg',
      audioSrc: 'audio/bicycle.mp3',
    },
    {
      word: 'train',
      translation: 'поезд',
      image: 'images/train.jpg',
      audioSrc: 'audio/train.mp3',
    },
    {
      word: 'boat',
      translation: 'лодка',
      image: 'images/boat.jpg',
      audioSrc: 'audio/boat.mp3',
    },
    {
      word: 'plane',
      translation: 'самолёт',
      image: 'images/plane.jpg',
      audioSrc: 'audio/plane.mp3',
    },
    {
      word: 'truck',
      translation: 'грузовик',
      image: 'images/truck.jpg',
      audioSrc: 'audio/truck.mp3',
    },
    {
      word: 'motorcycle',
      translation: 'мотоцикл',
      image: 'images/motorcycle.jpg',
      audioSrc: 'audio/motorcycle.mp3',
    },
  ],
];

export { cards, sections };
