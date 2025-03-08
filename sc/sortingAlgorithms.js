let swaps = [] /*A global array to store swap operations for visualization purposes. Each swap is recorded as an object { firstPosition, lastPosition }*/
const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
}
  
const defaultCompare = (a, b) => {
    if (a === b) {
      return 0
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}
  
const partition = (array, left, right, compareFn) => {
    const pivot = array[Math.floor((right + left) / 2)]
  
    let i = left
    let j = right
  
    while (i <= j) {
      while (compareFn(array[i], pivot) === Compare.LESS_THAN) {
        i++
      } while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
        j--
      }
      if (i <= j) {
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
        swaps.push({ firstPosition: i, lastPosition: j })
        i++
        j--
      }
    }
  
    return i
}
  
const quick = (array, left, right, compareFn) => {
    let index
  
    if (array.length > 1) {
      index = partition(array, left, right, compareFn)
      if (left < index - 1) {
        quick(array, left, index - 1, compareFn)
      }
      if (index < right) {
        quick(array, index, right, compareFn)
      }
    }
  
    return array
}

const heapify = (array, n, i, swaps) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        let temp = array[i];
        array[i] = array[largest];
        array[largest] = temp;
        swaps.push({ firstPosition: i, lastPosition: largest });

        heapify(array, n, largest, swaps);
    }
};

class SortingAlgorithms {
    bubbleSort(array) {
        const swaps = [];
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    swaps.push({ firstPosition: j, lastPosition: j + 1 });
                }
            }
        }
        return swaps;
    }

    selectionSort(array) {
        const swaps = [];
        let min;
        for (let i = 0; i < array.length - 1; i++) {
            min = i;
            for (let j = i + 1; j < array.length; j++) {
                if (array[j] < array[min]) {
                    min = j;
                }
            }
            let temp = array[min];
            array[min] = array[i];
            array[i] = temp;
            swaps.push({ firstPosition: min, lastPosition: i });
        }
        return swaps;
    }

    insertionSort(array) {
        const swaps = [];
        let key;
        let i, j;
        for (i = 1; i < array.length; ++i) {
            key = array[i];
            j = i - 1;
            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                swaps.push({ firstPosition: j, lastPosition: j + 1 });
                j--;
            }
            array[j + 1] = key;
        }
        return swaps;
    }

    quickSort(array, compareFn = defaultCompare) {
        swaps = []
        quick(array, 0, array.length - 1, compareFn)
        return swaps
    }

    heapSort(array) {
        const swaps = [];
        for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
            heapify(array, array.length, i, swaps);
        }
        for (let i = array.length - 1; i > 0; i--) {
            let temp = array[0];
            array[0] = array[i];
            array[i] = temp;
            swaps.push({ firstPosition: 0, lastPosition: i });
            heapify(array, i, 0, swaps);
        }
        return swaps;
    }
}

export { SortingAlgorithms };
