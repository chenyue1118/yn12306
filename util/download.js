const request = require('request');

const fs = require('fs');

// const imageUrl = 'http://ds.parking-internal.yunzong:12315/api/image/income/20200616/479653527585165312.jpg';
const imageUrl = 'https://w.wallhaven.cc/full/39/wallhaven-3911w9.jpg';

/*
* arr
* index
*/
const filedirCreate = (arr, data, ind) => {
  if (ind >= arr.length) {
    console.log(new Date())
    console.log('Download all complete')
    return
  }
  const path = `./download/${arr[ind]}`
  try {
    fs.accessSync(path)
  } catch (e) {
    fs.mkdirSync(path)
  }
  console.log(data[arr[ind]]);
  downloadImage(arr, data, ind, data[arr[ind]], 0, path)
}

const downloadImage = (arr, data, ind, file, num, path) => {
  if (num >= file.length) {
    filedirCreate(arr, data, ind + 1)
  } else {
    const fileName = `${path}/${file[num]}.jpg`
    request(imageUrl)
      .on('error', () => {
        console.log(`request file error ${fileName}`);
        downloadImage(arr, data, ind, file, num + 1, path)
      })
      .pipe(fs.createWriteStream(fileName))
      .on('error', () => {
        console.log(`download file error ${fileName}`);
        downloadImage(arr, data, ind, file, num + 1, path)
      })
      .on('close', () => {
        downloadImage(arr, data, ind, file, num + 1, path)
      })
  }
}

const init = () => {
  console.log(new Date())
  const fileDir = ['今天星期一', '今天星期二', '今天星期三']
  const data = {
    '今天星期一': [0, 1, 2],
    '今天星期二': [`00`, 11, 22],
    '今天星期三': [`000`, 111, 222]
  }
  filedirCreate(fileDir, data, 0)
}

init();
