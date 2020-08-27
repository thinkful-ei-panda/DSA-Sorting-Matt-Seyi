const { LinkedList } = require('./linkedList');

//1.
//a.
//[21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40]
//first.[21, 1, 26, 45, 29, 28, 2, 9] [16, 49, 39, 27, 43, 34, 46, 40]
//second.[21, 1, 26, 45][29, 28, 2, 9][16, 49, 39, 27, 43, 34, 46, 40]
//third. [21, 1,] [26, 45,] [29, 28, 2, 9] [16, 49, 39, 27, 43, 34, 46, 40]
//fourth [21,] [1,] [26, 45,] [29, 28, 2, 9] [16, 49, 39, 27, 43, 34, 46, 40]
//fifth  [1,21] [26, 45,] [29, 28, 2, 9] [16, 49, 39, 27, 43, 34, 46, 40]
//sixth  [1,21] [26,] [45,] [29, 28, 2, 9] [16, 49, 39, 27, 43, 34, 46, 40]
//seventh [1,21] [26,45,] [29, 28, 2, 9] [16, 49, 39, 27, 43, 34, 46, 40]
//eighth  [1,21,26,45,] [29, 28,2, 9] [16, 49, 39, 27, 43, 34, 46, 40]
//ninth [1,21,26,45,] [28, 29,] [2, 9] [16, 49, 39, 27, 43, 34, 46, 40]
//ninth [1,21,26,45,] [28,] [29,] [2, 9] [16, 49, 39, 27, 43, 34, 46, 40]
//tenth [1,21,26,45,] [28, 29,] [2, 9] [16, 49, 39, 27, 43, 34, 46, 40]
//eleventh [1,21,26,45,] [28, 29,] [2,] [9,] [16, 49, 39, 27, 43, 34, 46, 40]
//twelfth [1,21,26,45,] [28, 29,] [2, 9,] [16, 49, 39, 27, 43, 34, 46, 40]
//thirteenth [1,21,26,45,] [2, 9, 28, 29,][16, 49, 39, 27, 43, 34, 46, 40]
//fourteenth [1,2,9,21,26,28,29,45][16, 49, 39, 27, 43, 34, 46, 40]
//fifteenth [1,2,9,21,26,28,29,45][16, 49, 39, 27,] [43, 34, 46, 40]
//sixteenth [1,2,9,21,26,28,29,45][16, 49,] [39, 27,] [43, 34, 46, 40]
//
//c. [21][1]
//d. [1,21][26,45]
//
//2.a the pivot could have been either 14 or 17

//2.b [14, 17, 13, 15, 19, 10, 3, 16, 9, 12]
//last item:
//end = 10
//pivot = 9 [12]
// [10, 17, 13, 15, 19, 14, 3, 16, 9, 12]
//[j] = 17
//[10, 3, 13, 15, 19, 14, 17, 16, 9, 12]
//[j] = 13
//[10, 3, 9, 15, 19, 14, 17, 16, 13, 12]
//[10, 3, 9, 12, 19, 14, 17, 16, 13, 15]
//[10, 3, 9, 12, 19]
//
//first item: [14, 17, 13, 15, 19, 10, 3, 16, 9, 12]
//end = 1
//pivot = 14
//j = 0
// [14, 17, 13, 15, 19, 10, 3, 16, 9, 12]
// [14, 13, 17, 15, 19, 10, 3, 16, 9, 12]
// [14, 13, 10, 15, 19, 17, 3, 16, 9, 12]
// [14, 13, 10, 15, 19, 17, 15, 16, 9,12]
// [14, 13, 10, 3, 19, 17, 15, 16, 9, 12]
// [14, 13, 10, 3, 9, 17, 15, 16, 19, 12]
// [14, 13, 10, 3, 9, 12, 15, 16, 19, 17]
// [12, 13, 10, 3, 9, 14, 15, 16, 19, 17]
//[12, 13, 10, 3, 9]



function swap(array, i, j) {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
};


function merge(left, right, array) {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array[outputIndex++] = left[leftIndex++];
        }
        else {
            array[outputIndex++] = right[rightIndex++];
        }
    }

    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
    }

    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
    }
    return array;
};


function partition(array, start, end) {
    const pivot = array[end - 1];
    let j = start;
    for (let i = start; i < end - 1; i++) {
        if (array[i] <= pivot) {
            swap(array, i, j);
            j++;
        }
    }
    swap(array, end-1, j);
    return j;
};
//3.
function qSort(array, start = 0, end = array.length) {
    if (start >= end) {
        return array;
    }
    const middle = partition(array, start, end);
    array = qSort(array, start, middle);
    array = qSort(array, middle + 1, end);
    return array;
}

function mSort(array) {
    if(array.length <= 1) {
        return array;
    }

    let middle = Math.floor((array.length) / 2)
    let leftArr = array.slice(0, middle)
    let rightArr = array.slice(middle, array.length)

    leftArr = mSort(leftArr)
    rightArr = mSort(rightArr)

    return merge(leftArr,rightArr,array)
}

function getSize(linkedList) {
    let currNode = linkedList.head
    let counter = 0

    while (currNode !==null) {
        currNode = currNode.next
        counter++
    }
    return counter;
}

function getMiddle(linkedList) {
    let middle = linkedList.head
    let double = middle.next

    while(double != null && double.next != null) {
        middle = middle.next
        if(double.next) {
            double = double.next.next
        }
    }
    return middle;
}

function mSortLL(list) {
    let length = getSize(list)
    let curr = list.head

    if(getSize(list) <= 1) {
        return list
    }

    let middle = Math.floor(length / 2)
    let left = new LinkedList()

    for(let i = 0; i < middle; i++) {
        left.insertLast(curr.value)
        list.remove(curr.value)
        curr = curr.next
    }

    left = mSortLL(left)

    let right = new LinkedList()
    for (i = middle; i < length; i ++) {
        right.insertLast(curr.value)
        list.remove(curr.value)
        curr = curr.next
    }

    right = mSortLL(right)
    return mergeLL(left,right,list)
}

function mergeLL(left,right,list) {

    let leftNode = left.head
    let rightNode = right.head

    while(leftNode && rightNode) {
        if (leftNode.value < rightNode.value) {
            list.insertLast(leftNode.value)
            leftNode = leftNode.next
        } else {
            list.insertLast(rightNode.value)
            rightNode = rightNode.next
        }
    }

    while(leftNode) {
        list.insertLast(leftNode.value)
        leftNode = leftNode.next
    }

    while(rightNode) {
        list.insertLast(rightNode.value)
        rightNode = rightNode.next
    }

    return list

}

function bucketSort(array,min,max, bucketSize) {
    if (array.length === 0) {
        return array;
      }
    
      // Declaring vars
      var i,
          bucketSize = bucketSize || 5;
      
      // Setting min and max values
      array.forEach(function (currentVal) {
          if (currentVal < min) {
              min = currentVal;
          } else if (currentVal > max) {
              max = currentVal;
          }
      })
    
      // Initializing buckets
      var bucketCount = Math.floor((max - min) / bucketSize) + 1;
      var allBuckets = new Array(bucketCount);
      
      for (i = 0; i < allBuckets.length; i++) {
        allBuckets[i] = [];
      }
      
      // Pushing values to buckets
      array.forEach(function (currentVal) {
          allBuckets[Math.floor((currentVal - min) / bucketSize)].push(currentVal);
      });
    
      // Sorting buckets
      array.length = 0;
      
      allBuckets.forEach(function(bucket) {
          qSort(bucket);
          bucket.forEach(function (element) {
              array.push(element)
          });
      });
    
      return array;
   
}

function sortInPlace(arr) {
    arr.forEach((item, index) => swap(arr, index, Math.floor(Math.random() * arr.length)))
    return arr;
}

function sortBook(arr) {
    arr = arr.map(name => name.toLowerCase())
    qSort(arr)
    return arr;
}


function main(){
    arr = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56]
    // console.log(qSort(arr))
    // console.log(mSort(arr))

    let list = new LinkedList()
    list.insertFirst(80)
    list.insertLast(24)
    list.insertLast(20)
    list.insertLast(4)
    list.insertLast(14)
    list.insertLast(254)
    list.insertLast(25)
    // console.log(getSize(list))
    // console.log(getMiddle(list))
    console.log(JSON.stringify(list))
    console.log(JSON.stringify(mSortLL(list)))

    arr2 = [8, 3, 2, 5,]
    arr2 = bucketSort(arr2,2,8)
    console.log(arr2)
    console.log(bucketSort(arr,2,89))
    console.log(sortInPlace(arr))

    arr3 = ["zx","ad","cl","up","no"]
    console.log(sortBook(arr3))
}

main()