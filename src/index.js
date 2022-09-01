import "./styles.css";

function getContent(offset, num) {
  let arr = [];
  for (var i = offset; i < offset + num; i++) {
    arr.push(i);
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(arr);
    }, Math.random() * 1000);
  });
}

function init() {
  var _offset = 0;
  var _num = 30;
  var root = document.getElementById("root");

  var observer = null;

  let initializeObserver = (root, target, callback) => {
    let options = {
      root,
      rootMargin: "10px",
      threshold: 1.0,
      delay: 400,
      trackVisibility: true
    };

    observer = new IntersectionObserver(callback, options);
    observer.observe(target);
  };

  let callback = async (entries, observer) => {
    let arr = await getContent(_offset, _num);

    entries &&
      entries.forEach((entry) => {
        console.log(entry);
        // Each entry describes an intersection change for one observed
        // target element:
        if (entry.isIntersecting) {
          drawTable(arr);
          observer.unobserve(entry.target);
        }
        //   entry.boundingClientRect
        //   entry.intersectionRatio
        //   entry.intersectionRect
        //   entry.isIntersecting
        //   entry.rootBounds
        //   entry.target
        //   entry.time
      });

    if (!entries) {
      drawTable(arr);
    }
  };

  let drawTable = (arr) => {
    let elementsArray = arr.map((i) => {
      let item = document.createElement("div");
      item.innerText = i;
      item.setAttribute("class", "item");
      root.append(item);
      return item;
    });
    let target = elementsArray[elementsArray.length - 1];
    initializeObserver(root, target, callback);
    _offset += _num;
  };
  callback();
}

init();
